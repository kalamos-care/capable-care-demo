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

import { StyledCard, IconListLink, ListLink, BasicModal } from "../components";
import {
  AllergiesIcon,
  MedicationsIcon,
  PreferencesIcon,
  ProfileIcon,
  VitalsIcon,
  WellnessIcon,
  CreditCardIcon,
} from "../components/icons";
import { useCurrentPatient, usePatientRelatedPersons } from "../fetchDataHooks";
import gravatar from "../utils/gravatar";
import PrimaryHeader from "../components/PrimaryHeader";
import Patient from "../dataModels/Patient";
import api from "../capableApi/index";

const ProfileAvatar = ({ patient, setError, setPatient }) => {
  const fileUploadRef = useRef(null);

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
          fileUploadRef.current.click();
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
            const file = event.target.files[0];

            try {
              const response = await api.client.Patient.avatarUpload(patient.id, {
                avatar: file,
              });

              setError(null);
              setPatient(
                new Patient({
                  ...patient,
                  avatar_url: response.body.avatar_url,
                })
              );
            } catch (error) {
              Sentry.captureException(error);
              const { errors } = JSON.parse(error.message);
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

const usePatient = () => {
  const { currentPatient, isLoading } = useCurrentPatient();
  const [patient, setPatient] = useState();
  const [isLoadingPatient, setIsLoadingPatients] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      setPatient(currentPatient);
      setIsLoadingPatients(false);
    }
  }, [isLoading]); // eslint-disable-line react-hooks/exhaustive-deps

  return [patient, setPatient, isLoadingPatient];
};

function Header() {
  // Ignoring any errors because it's just for the avatar URL / memberSince
  // and we'll be graceful about it.
  const [error, setError] = useState(null);
  const [patient, setPatient, isLoading] = usePatient();

  const firstName = patient?.name;
  const memberSince = patient?.joinedAt || "2021"; // hardcode default for demo.

  if (isLoading) {
    return <Skeleton variant="rectangular" animation="wave" height={280} />;
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
}

const CareTeamMember = ({ practitionerName }) => {
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

      {filteredPatientRelatedPersons.map(({ related_person: { first_name, last_name } }) => (
        <CareTeamMember
          avatarSrc={require("../assets/profile-member-02.png")}
          practitionerName={`${first_name} ${last_name}`}
        />
      ))}
    </Container>
  );
};

function ModalContent({ copy }) {
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
}

function copyToken(setShowAlert) {
  Auth.user.getAccessToken().then((token) => {
    navigator.clipboard.writeText(token);
    setShowAlert(true);
  });
}

export default function Profile({ signOut }) {
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const handleCloseModal = () => setOpenModal(false);
  const handleOpenModal = (content) => {
    setModalContent(<ModalContent copy={content} />);
    setOpenModal(true);
  };
  const handleLogout = () => {
    // reset the route before signout
    navigate("/");
    signOut();
  };

  const MyInformation = () => {
    const surveyId = process.env.REACT_APP_WELLNESS_SURVEY_ID ?? "";

    return (
      <Container sx={{ marginTop: 3 }}>
        <Typography variant="h6" component="h2">
          My Information
        </Typography>

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
      </Container>
    );
  };

  return (
    <>
      <BasicModal children={modalContent} open={openModal} handleClose={handleCloseModal} />

      <Header />

      <CareTeam />

      {process.env.REACT_APP_USAGE_MODE === "demo" ? (
        <MyInformation />
      ) : process.env.REACT_APP_ENABLE_REQUIRE_SUBSCRIPTION === "true" ? (
        <Container sx={{ marginTop: 3 }}>
          <Typography variant="h6" component="h2">
            My Information
          </Typography>

          <StyledCard sx={{ paddingY: 0 }}>
            <List>
              <IconListLink
                icon={<CreditCardIcon />}
                text="Subscriptions"
                onClick={() => navigate(`/subscriptions`)}
              />
            </List>
          </StyledCard>
        </Container>
      ) : null}

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
