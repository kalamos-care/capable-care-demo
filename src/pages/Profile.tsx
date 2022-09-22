import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Auth from "@capable-health/capable-auth-sdk";
import {
  Avatar,
  Badge,
  Container,
  Typography,
  List,
  Divider,
  DialogActions,
  Alert,
  Skeleton,
  Snackbar,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import * as Sentry from "@sentry/react";

import { StyledCard, IconListLink, ListLink, BasicModal } from "../components/index";
import {
  AllergiesIcon,
  MedicationsIcon,
  PreferencesIcon,
  ProfileIcon,
  VitalsIcon,
  WellnessIcon,
  CreditCardIcon,
} from "components/icons/index";
import { useCurrentPatient, usePatientRelatedPersons } from "fetchDataHooks/index";
import gravatar from "utils/gravatar";
import PrimaryHeader from "components/PrimaryHeader";
import Patient from "models/patients/Patient";
import api from "capableApi";

type SetPatient = React.Dispatch<React.SetStateAction<Patient>>;

const ProfileAvatar = ({
  patient,
  setError,
  setPatient,
}: {
  patient: Patient;
  setError: React.Dispatch<React.SetStateAction<string | undefined>>;
  setPatient: SetPatient;
}) => {
  const fileUploadRef = useRef<HTMLInputElement>(null);

  let avatarUrl;
  if (patient && process.env.REACT_APP_USAGE_MODE === "demo") {
    avatarUrl = patient.avatar_url || (patient.email && gravatar(patient.email));
  } else if (patient) {
    avatarUrl = patient.avatar_url;
  }

  const ProfileAvatarUploader = () => {
    return (
      <Avatar
        sx={{
          height: 30,
          width: 30,
          border: "white 1px solid",
          backgroundColor: process.env.REACT_APP_COLOR,
          cursor: "pointer",
        }}
        onClick={() => {
          fileUploadRef.current?.click();
        }}
      >
        <Edit fontSize="small" />
        <input
          accept="image/png,image/jpeg"
          type="file"
          id="fileUploader"
          ref={fileUploadRef}
          style={{ display: "none" }}
          onChange={async (event) => {
            const target = event.target as HTMLInputElement;
            const file = target.files?.[0];

            try {
              const response = await api.client.Patient.avatarUpload(patient.id, {
                avatar: file,
              });

              setError(undefined);
              setPatient(
                new Patient({
                  ...patient,
                  avatar_url: response.body.avatar_url,
                })
              );
            } catch (error) {
              Sentry.captureException(error);
              const { errors } = JSON.parse((error as Error).message);
              setError(errors[0].message);
            }
          }}
        />
      </Avatar>
    );
  };

  return (
    <Badge
      overlap="circular"
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      badgeContent={<ProfileAvatarUploader />}
    >
      <Avatar src={avatarUrl} sx={{ height: 112, width: 112, border: "white 0.25rem solid" }} />
    </Badge>
  );
};

const usePatient = (): [Patient, SetPatient, boolean] => {
  const { currentPatient, isLoading } = useCurrentPatient();
  const [patient, setPatient] = useState<Patient>(new Patient());
  const [isLoadingPatient, setIsLoadingPatients] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      setPatient(currentPatient);
      setIsLoadingPatients(false);
    }
  }, [isLoading]); // eslint-disable-line react-hooks/exhaustive-deps

  return [patient, setPatient, isLoadingPatient];
};

const Header = ({
  isLoading,
  patient,
  setPatient,
}: {
  isLoading: boolean;
  patient: Patient;
  setPatient: SetPatient;
}) => {
  // Ignoring any errors because it's just for the avatar URL / memberSince
  // and we'll be graceful about it.
  const [error, setError] = useState<string>();

  const firstName = patient?.name;
  const memberSince = patient?.joinedAt || "2021"; // hardcode default for demo.

  if (isLoading) {
    return <Skeleton variant="rectangular" animation="wave" height={280} />;
  }

  if (!patient) {
    return null;
  }

  return (
    <PrimaryHeader sx={{ textAlign: "center" }}>
      <ProfileAvatar patient={patient} setError={setError} setPatient={setPatient} />

      <Typography marginBottom={0.5} color="common.white" variant="h4" component="h1">
        {firstName}
      </Typography>

      <Typography variant="medium" component="small">
        Member since {memberSince}
      </Typography>

      {error && (
        <Typography
          sx={{
            fontSize: "0.825rem",
            color: "white",
            marginTop: "1rem",
            fontWeight: 500,
          }}
        >
          {error}
        </Typography>
      )}
    </PrimaryHeader>
  );
};

const CareTeamMember = ({ practitionerName }: { practitionerName: string }) => {
  return (
    <StyledCard
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <ProfileIcon />
      <Typography variant="h6" component="div" marginLeft={1} width="100%">
        {practitionerName}
      </Typography>
    </StyledCard>
  );
};

const CareTeam = () => {
  const { patientRelatedPersons, isLoading, isError } = usePatientRelatedPersons();

  if (isLoading) {
    return <Skeleton variant="rectangular" animation="wave" height={280} />;
  }

  if (isError) {
    return null;
  }

  const filteredPatientRelatedPersons =
    patientRelatedPersons &&
    patientRelatedPersons.filter((patientRelatedPerson) => {
      return patientRelatedPerson.relationship_type === "Practitioner";
    });

  if (!filteredPatientRelatedPersons || filteredPatientRelatedPersons.length === 0) {
    return null;
  }

  return (
    <Container sx={{ marginTop: 3 }}>
      <Typography variant="h6" component="h2">
        My Care Team
      </Typography>

      {filteredPatientRelatedPersons.map(({ related_person: { first_name, last_name, id } }) => (
        <CareTeamMember
          key={`care_team_member_${id}`}
          practitionerName={`${first_name} ${last_name}`}
        />
      ))}
    </Container>
  );
};

const ModalContent = ({ copy }: { copy: string }) => {
  return (
    <DialogActions
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        marginBottom: 2,
      }}
    >
      <Typography variant="modal" component="h2">
        {copy}
      </Typography>
    </DialogActions>
  );
};

function copyToken(setShowAlert) {
  Auth.user.getAccessToken().then((token) => {
    navigator.clipboard.writeText(token);
    setShowAlert(true);
  });
}

const MyInformation = ({
  patient,
  setModalContent,
  setOpenModal,
}: {
  patient: Patient;
  setModalContent: React.Dispatch<React.SetStateAction<JSX.Element | undefined>>;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const navigate = useNavigate();

  const surveyId = process.env.REACT_APP_WELLNESS_SURVEY_ID ?? "";

  const handleOpenModal = (content) => {
    setModalContent(<ModalContent copy={content} />);
    setOpenModal(true);
  };

  const MyInformationWrapper: React.FC = ({ children }) => {
    return (
      <Container sx={{ marginTop: 3 }}>
        <Typography variant="h6" component="h2">
          My Information
        </Typography>

        <Typography variant="small" color="black" sx={{ textTransform: "unset" }}>
          {`${patient.name}, ${patient.email}`}
        </Typography>

        {children}
      </Container>
    );
  };

  if (process.env.REACT_APP_USAGE_MODE === "demo") {
    return (
      <MyInformationWrapper>
        <StyledCard sx={{ paddingY: 0 }}>
          <List>
            <IconListLink
              icon={<WellnessIcon />}
              text="Wellness Profile"
              onClick={() => navigate(`/survey/${surveyId}`)}
            />
            <Divider />
            <IconListLink
              icon={<AllergiesIcon />}
              text="Allergies"
              onClick={() => handleOpenModal("This section may be populated by intake survey")}
            />
            <Divider />
            <IconListLink
              icon={<MedicationsIcon />}
              text="Current Medications"
              onClick={() =>
                handleOpenModal("This section may be populated by observations recorded by patient")
              }
            />
            <Divider />
            <IconListLink
              icon={<VitalsIcon />}
              text="Vitals & Trends"
              onClick={() =>
                handleOpenModal("This section may be populated by observations recorded by patient")
              }
            />
            <Divider />
            <IconListLink
              icon={<PreferencesIcon />}
              text="Care preferences"
              onClick={() => handleOpenModal("This section may launch a questionnaire")}
            />
            {process.env.REACT_APP_ENABLE_REQUIRE_SUBSCRIPTION === "true" && (
              <>
                <Divider />
                <IconListLink
                  icon={<CreditCardIcon />}
                  text="Subscriptions"
                  onClick={() => navigate(`/subscriptions`)}
                />
              </>
            )}
          </List>
        </StyledCard>
      </MyInformationWrapper>
    );
  }

  if (process.env.REACT_APP_ENABLE_REQUIRE_SUBSCRIPTION === "true") {
    return (
      <MyInformationWrapper>
        <StyledCard sx={{ paddingY: 0 }}>
          <List>
            <IconListLink
              icon={<CreditCardIcon />}
              text="Subscriptions"
              onClick={() => navigate(`/subscriptions`)}
            />
          </List>
        </StyledCard>
      </MyInformationWrapper>
    );
  }

  return <MyInformationWrapper />;
};

export default function Profile({ signOut }: { signOut: () => void }) {
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState<JSX.Element>();
  const [patient, setPatient, isLoading] = usePatient();
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const handleCloseModal = () => setOpenModal(false);
  const handleLogout = () => {
    // reset the route before signout
    navigate("/");
    signOut();
  };

  return (
    <>
      <BasicModal open={openModal} handleClose={handleCloseModal}>
        {modalContent}
      </BasicModal>

      <Header isLoading={isLoading} patient={patient} setPatient={setPatient} />

      <CareTeam />

      <MyInformation
        patient={patient}
        setModalContent={setModalContent}
        setOpenModal={setOpenModal}
      />

      <Container sx={{ marginTop: 3 }}>
        <StyledCard sx={{ paddingY: 0 }}>
          {process.env.NODE_ENV !== "production" && (
            <>
              <ListLink
                onClick={() => {
                  copyToken(setShowAlert);
                }}
                text="Copy Token"
              />
              <Divider />
            </>
          )}
          <ListLink textColor="error.main" onClick={handleLogout} text="Logout" />
        </StyledCard>
      </Container>

      <Snackbar
        open={showAlert}
        autoHideDuration={4000}
        onClose={() => setShowAlert(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        // Adding a little margin to raise the alert over the Nav bar
        sx={{ marginBottom: "3.5rem" }}
      >
        <Alert icon={false} severity="success">
          Token copied to clipboard!
        </Alert>
      </Snackbar>
    </>
  );
}
