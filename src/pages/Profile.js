import { useState } from "react";
import Auth from "@capable-health/capable-auth-sdk";
import {
  Avatar,
  Container,
  Typography,
  List,
  Divider,
  DialogActions,
  Alert,
  Skeleton,
  Snackbar,
} from "@mui/material";
import { StyledCard, IconListLink, ListLink, BasicModal } from "../components";
import {
  AllergiesIcon,
  MedicationsIcon,
  PreferencesIcon,
  ProfileIcon,
  VitalsIcon,
  WellnessIcon,
} from "../components/icons";
import { useCurrentPatient, usePatientRelatedPersons } from "../fetchDataHooks";
import gravatar from "../utils/gravatar";
import { useNavigate } from "react-router-dom";
import PrimaryHeader from "../components/PrimaryHeader";

/* leaving this here to uncomment once avatar upload is working
const AvatarUploader = () => {
  const [openModal, setOpenModal] = useState(false);
  const handleCloseModal = () => setOpenModal(false);
  const handleOpenModal = () => setOpenModal(true);

  return (
    <>
      <AvatarUploadModal open={openModal} close={handleCloseModal} />
      <LinkButton sx={{color: "primary.contrastText"}} onClick={handleOpenModal}>Upload photo</LinkButton>
    </>
  );
};
*/

function Header() {
  // Ignoring any errors because it's just for the avatar URL / memberSince
  // and we'll be graceful about it.
  const { currentPatient } = useCurrentPatient();

  const firstName = currentPatient?.name;
  const memberSince = currentPatient?.joinedAt || "2021"; // hardcode default for demo.

  let avatarUrl;
  if (currentPatient && process.env.REACT_APP_USAGE_MODE === "demo") {
    avatarUrl =
      currentPatient.avatar_url ||
      (currentPatient.email && gravatar(currentPatient.email));
  } else if (currentPatient) {
    avatarUrl = currentPatient.avatar_url;
  }

  return (
    <PrimaryHeader>
      <Avatar src={avatarUrl} sx={{ height: 112, width: 112, marginY: 2 }} />

      <Typography
        marginBottom={0.5}
        color="common.white"
        variant="h4"
        component="h1"
      >
        {firstName}
      </Typography>

      <Typography variant="medium" component="small">
        Member since {memberSince}
      </Typography>
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
  const { patientRelatedPersons, isLoading, isError } =
    usePatientRelatedPersons();

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

  if (
    !filteredPatientRelatedPersons ||
    filteredPatientRelatedPersons.length === 0
  ) {
    return null;
  }

  return (
    <Container sx={{ marginTop: 3 }}>
      <Typography variant="h6" component="h2">
        My Care Team
      </Typography>

      {filteredPatientRelatedPersons.map(
        ({ related_person: { first_name, last_name } }) => (
          <CareTeamMember
            avatarSrc={require("../assets/profile-member-02.png")}
            practitionerName={`${first_name} ${last_name}`}
          />
        )
      )}
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
              onClick={() =>
                handleOpenModal(
                  "This section may be populated by intake survey"
                )
              }
            />
            <Divider />
            <IconListLink
              icon={<MedicationsIcon />}
              text="Current Medications"
              onClick={() =>
                handleOpenModal(
                  "This section may be populated by observations recorded by patient"
                )
              }
            />
            <Divider />
            <IconListLink
              icon={<VitalsIcon />}
              text="Vitals & Trends"
              onClick={() =>
                handleOpenModal(
                  "This section may be populated by observations recorded by patient"
                )
              }
            />
            <Divider />
            <IconListLink
              icon={<PreferencesIcon />}
              text="Care preferences"
              onClick={() =>
                handleOpenModal("This section may launch a questionnaire")
              }
            />
          </List>
        </StyledCard>
      </Container>
    );
  };

  return (
    <>
      <BasicModal
        children={modalContent}
        open={openModal}
        handleClose={handleCloseModal}
      />

      <Header />

      <CareTeam />

      {process.env.REACT_APP_USAGE_MODE === "demo" && <MyInformation />}

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
          <ListLink
            textColor="error.main"
            onClick={handleLogout}
            text="Logout"
          />
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
