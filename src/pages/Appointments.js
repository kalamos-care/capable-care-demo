import {
  Box,
  Container,
  Modal,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EventIcon from "@mui/icons-material/Event";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import PrimaryHeader from "../components/PrimaryHeader";
import { useAppointments, useCurrentPatient } from "../fetchDataHooks";
import { LinkButton, StyledCard } from "../components";
import { isValidHttpUrl } from "../utils/validators";
import WebinarCall from "../components/WebinarCall";
import { useState } from "react";

// show link to video call if webinar otherwise show the location
function LinkToVideo({ onClick, active, anotherCallInProgress }) {
  if (anotherCallInProgress) {
    return (
      <Typography sx={{ fontSize: "0.825rem", color: "grey.900" }}>
        Another call is in progress
      </Typography>
    );
  } else {
    return (
      <LinkButton onClick={onClick} sx={{ fontWeight: 400 }}>
        {active ? "Click to leave video call" : "Click to join video call"}
      </LinkButton>
    );
  }
}

function WebinarCallModal({ appointment, setActiveAppointment }) {
  const open = new Boolean(appointment).valueOf();

  return (
    <Modal open={open} aria-labelledby={"Webinar"} aria-describedby={"Webinar"}>
      <Box>
        <WebinarCall
          callUrl={appointment?.location}
          onLeave={() => setActiveAppointment(null)}
        />
      </Box>
    </Modal>
  );
}

function AppointmentCard({ appointment, ...props }) {
  const { currentPatient } = useCurrentPatient();
  const { activeAppointment, setActiveAppointment } = props;
  const thisAppointmentIsActive = activeAppointment?.id === appointment.id;
  const anotherCallInProgress =
    activeAppointment && activeAppointment?.id !== appointment.id;

  // if the user is already in a meeting, close it, otherwise activate this appointment.
  const toggleWebinar = () => {
    if (anotherCallInProgress) return;
    const newValue = thisAppointmentIsActive ? null : appointment;
    setActiveAppointment(newValue);
  };

  return (
    <StyledCard sx={{ marginBottom: 2 }}>
      <Stack>
        <Typography component="h3" sx={{ fontSize: "1rem" }}>
          {appointment.appointment_type}
        </Typography>

        <Typography sx={{ fontSize: "0.825rem", color: "grey.900" }}>
          {appointment.date}
        </Typography>

        <Typography sx={{ fontSize: "0.825rem", color: "grey.900" }}>
          {appointment.time}
        </Typography>
      </Stack>

      <Stack sx={{ marginY: 2 }}>
        <Box sx={{ display: "flex", marginTop: 1 }}>
          <PermContactCalendarIcon
            fontSize="small"
            sx={{ color: "grey.500", marginRight: 2 }}
          />

          <Typography
            component="p"
            sx={{ fontSize: "0.825rem", color: "grey.900" }}
          >
            {currentPatient?.name}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", marginTop: 1 }}>
          <LocationOnIcon
            fontSize="small"
            sx={{ color: "grey.500", marginRight: 2 }}
          />

          {isValidHttpUrl(appointment.location) ? (
            <LinkToVideo
              onClick={() => toggleWebinar()}
              active={thisAppointmentIsActive}
              anotherCallInProgress={anotherCallInProgress}
            />
          ) : (
            <Typography sx={{ fontSize: "0.825rem", color: "grey.900" }}>
              {appointment.location}
            </Typography>
          )}
        </Box>

        <Box sx={{ display: "flex", marginTop: 1 }}>
          <EventIcon
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

function renderAppointmentList(appointments, appointmentProps) {
  if (appointments.length > 0) {
    return appointments.map((appointment) => (
      <AppointmentCard
        key={appointment.id}
        appointment={appointment}
        {...appointmentProps}
      />
    ));
  } else {
    return (
      <Typography
        component="h3"
        sx={{ fontSize: "1rem", textAlign: "center", margin: 3 }}
      >
        No scheduled appointments
      </Typography>
    );
  }
}

export default function Appointments() {
  const [activeAppointment, setActiveAppointment] = useState(null);
  const { appointments, isLoading } = useAppointments();
  const appointmentProps = { activeAppointment, setActiveAppointment };

  return (
    <>
      <WebinarCallModal
        setActiveAppointment={setActiveAppointment}
        appointment={activeAppointment}
      />

      <PrimaryHeader sx={{ height: "8rem", paddingTop: "1.5rem" }}>
        <CalendarMonthIcon
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

      <Container>
        {isLoading && (
          <Skeleton
            variant="rectangular"
            animation="wave"
            height={100}
            sx={{ marginY: 3, borderRadius: "0.5rem" }}
          />
        )}

        {!isLoading && renderAppointmentList(appointments, appointmentProps)}
      </Container>
    </>
  );
}
