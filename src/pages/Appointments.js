import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Modal,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import {
  CalendarMonth,
  Delete,
  Edit,
  Event,
  LocationOn,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import api from "capableApi/index";
import { useAppointments } from "../fetchDataHooks";
import { LinkButton, NoDataCards, PrimaryHeader, StyledCard } from "../components";
import { isValidHttpUrl } from "../utils/validators";
import titlecase from "../utils/titlecase";
import WebinarCall from "../components/WebinarCall";

// show link to video call if webinar otherwise show the location
function LinkToVideo({ onClick, status }) {
  if (status === "past") {
    return (
      <Typography sx={{ fontSize: "0.825rem", color: "grey.900" }}>
        Video call link has expired
      </Typography>
    );
  } else {
    return (
      <LinkButton onClick={onClick} sx={{ fontWeight: 400 }}>
        Click to join video call
      </LinkButton>
    );
  }
}

function WebinarCallModal({ appointment, isWebinarCallModelOpen, setIsWebinarCallModelOpen }) {
  return (
    <Modal open={isWebinarCallModelOpen} aria-labelledby="Webinar" aria-describedby="Webinar">
      <Box>
        <WebinarCall
          callUrl={appointment?.location}
          onLeave={() => setIsWebinarCallModelOpen(false)}
        />
      </Box>
    </Modal>
  );
}

const AppointmentActionModal = ({ isOpen, setIsOpen, title, body, error, isLoading, onClickActionButton, actionButtonTitle }) => {
  const closeModal = () => setIsOpen(false);

  return (
    <Modal
      open={isOpen}
      aria-labelledby="modal"
      aria-describedby="modal"
    >
      <Box
        onClick={closeModal}
        sx={{
          margin: "auto",
          marginBottom: 3,
          width: "375px",
          height: "100%",
          textAlign: "center",
          position: "relative",
        }}>
        <Card
          onClick={(event) => event.stopPropagation()} // stops modal from being closed on click
          sx={{
            width: "80%",
            padding: "1.5rem",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Typography sx={{ fontSize: "0.825rem", color: "text.card", marginBottom: "1rem", fontWeight: 500 }}>
            {title}
          </Typography>

          <Typography sx={{ fontSize: "0.825rem", color: "text.card", marginBottom: "1rem" }}>
            {body}
          </Typography>

          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <Button
              sx={{ fontSize: "0.825rem", textTransform: "none" }}
              variant="outlined"
              onClick={closeModal}
            >
              Go back
            </Button>
            <LoadingButton
              loading={isLoading || false}
              sx={{ fontSize: "0.825rem", textTransform: "none" }}
              variant="contained"
              onClick={onClickActionButton}
            >
              {actionButtonTitle}
            </LoadingButton>
          </div>

          { error &&
            <Typography sx={{ fontSize: "0.825rem", color: "red", marginTop: "1rem", fontWeight: 500 }}>
              {error}
            </Typography>
          }
        </Card>
      </Box>
    </Modal>
  );
}

const CancelAppointmentModal = ({
  appointment,
  appointments,
  setAppointments,
  isCancelAppointmentModelOpen,
  setIsCancelAppointmentModelOpen,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const toggleCancelAppointmentModal = () => {
    setError("");
    setIsCancelAppointmentModelOpen(!isCancelAppointmentModelOpen);
  };

  const onCancelAppointment = async () => {
    try {
      setIsLoading(true);
      await api.client.Appointment.cancel(appointment.id);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      const { errors } = JSON.parse(error.message);
      setError(errors[0].detail.message);
      return;
    }

    setError("");
    setIsLoading(false);

    const updatedAppointments = appointments.filter(oldAppointment => oldAppointment.id !== appointment.id);
    setAppointments(updatedAppointments);

    toggleCancelAppointmentModal();
    
  };

  return (
    <AppointmentActionModal
      isOpen={isCancelAppointmentModelOpen}
      setIsOpen={setIsCancelAppointmentModelOpen}
      title="Cancel Appointment"
      body="Are you sure you want to cancel this appointment?"
      error={error}
      actionButtonTitle="Yes, cancel"
      onClickActionButton={onCancelAppointment}
      isLoading={isLoading}
    />
  );
}

const RescheduleAppointmentModal = ({ isRescheduleAppointmentModelOpen, setIsRescheduleAppointmentModelOpen }) => {
  const navigate = useNavigate();

  return (
    <AppointmentActionModal
      isOpen={isRescheduleAppointmentModelOpen}
      setIsOpen={setIsRescheduleAppointmentModelOpen}
      title="Reschedule Appointment"
      body="To reschedule this appointment, please reach out to us via chat."
      actionButtonTitle="Go to chat"
      onClickActionButton={() => navigate("/chat")}
    />
  );
}

function AppointmentCard(props) {
  const {
    appointment,
    activeAppointment,
    hideActions,
    setActiveAppointment,
    isCancelAppointmentModelOpen,
    setIsCancelAppointmentModelOpen,
    isRescheduleAppointmentModelOpen,
    setIsRescheduleAppointmentModelOpen,
    isWebinarCallModelOpen,
    setIsWebinarCallModelOpen,
    status,
  } = props;


  // if the user is already in a meeting, close it, otherwise activate this appointment.
  const toggleWebinar = () => {
    setIsWebinarCallModelOpen(!isWebinarCallModelOpen);
    setActiveAppointment(appointment);
  };

  const toggleRescheduleAppointmentModal = () => {
    setIsRescheduleAppointmentModelOpen(!isRescheduleAppointmentModelOpen);
    setActiveAppointment(appointment);
  };

  const toggleCancelAppointmentModal = () => {
    setIsCancelAppointmentModelOpen(!isCancelAppointmentModelOpen);
    setActiveAppointment(appointment);
  };

  const AppointmentActions = () => {
    if (hideActions) {
      return null;
    }

    return (
      <div style={{ display: "flex" }}>
        <Box>
          <Edit
            onClick={toggleRescheduleAppointmentModal}
            fontSize="small"
            sx={{ color: "grey.500", marginRight: 2, cursor: "pointer" }}
          />
        </Box>

        <Box>
          <Delete
            onClick={toggleCancelAppointmentModal}
            fontSize="small"
            sx={{ color: "grey.500", marginRight: 2, cursor: "pointer" }}
          />
        </Box>
      </div>
    )
  };

  return (
    <StyledCard sx={{ marginBottom: 2 }}>
      <div style={{ display: "flex", "justifyContent": "space-between" }}>
        <Stack>
          <Typography component="h3" sx={{ fontSize: "1rem", fontWeight: 500 }}>
            {appointment.appointment_type}
          </Typography>

          <Typography sx={{ fontSize: "0.825rem", color: "grey.900" }}>
            {appointment.date}
          </Typography>

          <Typography sx={{ fontSize: "0.825rem", color: "grey.900" }}>
            {appointment.time}
          </Typography>
        </Stack>

        <AppointmentActions />
        
      </div>

      <Divider sx={{ marginY: 2, border: "1px solid #F3F4F5", backgroundColor: "#F3F4F5" }} />

      <Stack sx={{ marginY: 2 }}>
        <Box sx={{ display: "flex", marginTop: 1 }}>
          <LocationOn
            fontSize="small"
            sx={{ color: "grey.500", marginRight: 2 }}
          />

          {isValidHttpUrl(appointment.location) ? (
            <LinkToVideo
              onClick={() => !hideActions && toggleWebinar()}
              status={status}
            />
          ) : (
            <Typography sx={{ fontSize: "0.825rem", color: "grey.900" }}>
              {appointment.location}
            </Typography>
          )}
        </Box>

        <Box sx={{ display: "flex", marginTop: 1 }}>
          <Event
            fontSize="small"
            sx={{ color: "grey.500", marginRight: 2 }}
          />

          <Typography
            component="p"
            sx={{ fontSize: "0.825rem", color: "grey.900" }}
          >
            {appointment.calendar}
          </Typography>
        </Box>
      </Stack>
    </StyledCard>
  );
}

const AppointmentList = ({ appointments, status, ...props }) => {
  if (appointments.length === 0) {
    return null;
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0 0.5rem",
        }}
      >
        <Typography variant="subtitle">{titlecase(status)}</Typography>
      </Box>
      {
        appointments.map((appointment) => (
          <AppointmentCard
            key={appointment.id}
            appointment={appointment}
            status={status}
            {...props}
          />
        ))
      }
    </>
  );
}

const useAppointmentsHook = () => {
  const { appointments, isLoading } = useAppointments();
  const [appointmentsState, setAppointmentsState] = useState({ past: [], upcoming: [] });
  const [isLoadingAppointments, setIsLoadingAppointments] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      setAppointmentsState(appointments);
      setIsLoadingAppointments(false);
    }
  }, [isLoading]); // eslint-disable-line react-hooks/exhaustive-deps

  return [appointmentsState.past, appointmentsState.upcoming, setAppointmentsState, isLoadingAppointments];
};

export default function Appointments() {
  const [activeAppointment, setActiveAppointment] = useState(null);
  const [pastAppointments, upcomingAppointments, setAppointments, isLoading] = useAppointmentsHook();
  const [isCancelAppointmentModelOpen, setIsCancelAppointmentModelOpen] = useState(false);
  const [isRescheduleAppointmentModelOpen, setIsRescheduleAppointmentModelOpen] = useState(false);
  const [isWebinarCallModelOpen, setIsWebinarCallModelOpen] = useState(false);

  const appointmentProps = {
    activeAppointment,
    setActiveAppointment,
    isCancelAppointmentModelOpen,
    setIsCancelAppointmentModelOpen,
    isRescheduleAppointmentModelOpen,
    setIsRescheduleAppointmentModelOpen,
    isWebinarCallModelOpen,
    setIsWebinarCallModelOpen,
  };

  const Layout = ({ children }) => {
    return (
      <>
        <PrimaryHeader sx={{ height: "8rem", paddingTop: "1.5rem" }}>
          <CalendarMonth
            color="common.white"
            sx={{
              fontSize: "3rem",
              marginBottom: "1rem",
            }}
          />

          <Typography
            marginBottom={0.5}
            color="common.white"
            variant="h5"
            component="h1"
          >
            Appointments
          </Typography>
        </PrimaryHeader>

        {children}
      </>
    );
  }

  if (isLoading) {
    return (
      <Layout>
        <Skeleton
          variant="rectangular"
          animation="wave"
          height={100}
          sx={{ marginY: 3, borderRadius: "0.5rem" }}
        />
      </Layout>
    );
  }

  if ((!pastAppointments && !upcomingAppointments) || (pastAppointments.length === 0 && upcomingAppointments.length === 0)) {
    return (
      <Layout>
        <NoDataCards
          firstText="Past appointment"
          secondText="Upcoming appointment"
          title="No appointments yet"
          body="Join upcoming and view past appointments with your Care Team here."
        />
      </Layout>
    );
  }

  return (
    <>
      <WebinarCallModal
        appointment={activeAppointment}
        isWebinarCallModelOpen={isWebinarCallModelOpen}
        setIsWebinarCallModelOpen={setIsWebinarCallModelOpen}
      />

      <CancelAppointmentModal
        appointment={activeAppointment}
        appointments={upcomingAppointments}
        setAppointments={setAppointments}
        isCancelAppointmentModelOpen={isCancelAppointmentModelOpen}
        setIsCancelAppointmentModelOpen={setIsCancelAppointmentModelOpen}
      />
      
      <RescheduleAppointmentModal
        appointment={activeAppointment}
        isRescheduleAppointmentModelOpen={isRescheduleAppointmentModelOpen}
        setIsRescheduleAppointmentModelOpen={setIsRescheduleAppointmentModelOpen}
      />

      <Layout>
        <Container>
          <AppointmentList appointments={upcomingAppointments} status="upcoming" {...appointmentProps} />
          <AppointmentList appointments={pastAppointments} status="past" hideActions={true} {...appointmentProps} />
        </Container>
      </Layout>
    </>
  );
}
