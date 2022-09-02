import { useState } from "react";
import * as Sentry from "@sentry/react";
import useTasksByStatus from "../fetchDataHooks/useTasksByStatus";
import {
  Box,
  CardContent,
  Typography,
  ToggleButton,
  DialogActions,
  Alert,
  Skeleton,
} from "@mui/material";
import StyledCard from "./StyledCard";
import BasicModal from "./BasicModal";
import CheckCircleOutlineSharpIcon from "@mui/icons-material/CheckCircleOutlineSharp";
import RadioButtonUncheckedSharpIcon from "@mui/icons-material/RadioButtonUncheckedSharp";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import api from "../capableApi/index";
import titlecase from "../utils/titlecase";

// Function to render the correct check box icon based on the state.
const CheckBoxIcon = ({ isCompleted }) => {
  if (isCompleted) {
    return (
      <CheckCircleOutlineSharpIcon
        sx={{ color: "icon.primary", marginY: "auto" }}
      />
    );
  } else {
    return <RadioButtonUncheckedSharpIcon sx={{ marginY: "auto" }} />;
  }
};

// Function to render the Calendar icon with the due_on date.
const DueOn = ({ date }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <CalendarMonthIcon sx={{ fontSize: "0.9rem", marginRight: "0.4rem" }} />
      <Typography variant="h7"> {date} </Typography>
    </Box>
  );
};

// Function to render the task details, like name/title and a due_on date.
const TaskDetails = ({ task }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", marginY: "auto" }}>
      <Typography variant="h7"> {task.name} </Typography>
      {task.due_on && <DueOn date={task.due_on} />}
    </Box>
  );
};

// Renders a modal.
const AddToDoModal = ({ open, close }) => {
  return (
    <BasicModal open={open} handleClose={close}>
      <DialogActions
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="modal"
          component="h1"
          sx={{ fontSize: "1.2rem", color: "theme.black" }}
        >
          Increase Patient Engagement
        </Typography>
      </DialogActions>

      <DialogActions
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          marginBottom: 2,
        }}
      >
        <Typography variant="modal" component="h2">
          Allow patients to add their own tasks to their Care Plan
        </Typography>
      </DialogActions>
    </BasicModal>
  );
};

// Renders a link that opens a modal when clicked.
/*
const AddToDoLink = () => {
  const [openModal, setOpenModal] = useState(false);
  const handleCloseModal = () => setOpenModal(false);
  const handleOpenModal = () => setOpenModal(true);

  return (
    <>
      <AddToDoModal open={openModal} close={handleCloseModal} />
      <LinkButton onClick={handleOpenModal}>+ Add To Do</LinkButton>
    </>
  );
};
*/
// Renders a single task, which can be toggled between checked and unchecked.
const TaskCard = ({ task }) => {
  // NOTE: Capable tasks can have 1 of 3 states (in_progress, completed,
  //       cancelled). This app only allows the user to toggle
  //       between in_progress and completed.
  const isTaskCompleted = task.achievement_status == "completed";
  const [completedState, updateCompletedState] = useState(isTaskCompleted);
  const [failedRequest, updateFailedRequest] = useState(false);

  // Updates the state of the todo in Capable and if successful updates the
  // state of the task in the react app.
  const updateTask = async () => {
    const toggledState = !completedState;
    const newStatus = toggledState ? "completed" : "in_progress";
    try {
      await api.client.Task.update(task.id, {
        body: { task: { achievement_status: newStatus } },
      });
      updateCompletedState(toggledState);
      updateFailedRequest(false);
    } catch (e) {
      Sentry.captureException(e);
      console.error("Update failed!");
      updateFailedRequest(true);
    }
  };

  return (
    <StyledCard
      key={task.id}
      sx={{ marginBottom: "1rem", marginTop: 0, padding: 0 }}
    >
      <ToggleButton
        value="check"
        onChange={updateTask}
        fullWidth={true}
        sx={{
          textTransform: "none",
          boxShadow: "none",
          border: "none",
          textAlign: "left",
          padding: "0.75rem",
        }}
      >
        <CardContent sx={{ padding: 0, width: 1 }}>
          <Box sx={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
            <CheckBoxIcon isCompleted={completedState} />
            <TaskDetails task={task} />
          </Box>
        </CardContent>
      </ToggleButton>
      {failedRequest && (
        <Alert severity="error">
          Woops something went wrong. Please try again!
        </Alert>
      )}
    </StyledCard>
  );
};

// Renders a list of tasks and the '+ Add To Do' link.
const TaskCards = ({ tasks, status }) => {
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
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </>
  );
};

const TaskCardsByStatus = ({ carePlan }) => {
  const { tasks, isLoading, isError } = useTasksByStatus();

  if (isLoading) {
    return (
      <Skeleton variant="rectangular" animation="wave" height={280} />
    );
  }

  if (isError) {
    return (
      <div>Woops something went wrong...</div>
    );
  }

  const openTasks = tasks.open.filter(openTask => openTask.care_plan_id === carePlan.id);
  const OpenTasks = openTasks.length > 0
    ? <TaskCards tasks={openTasks} status="open" />
    : null;

  const completedTasks = tasks.completed.filter(completedTask => completedTask.care_plan_id === carePlan.id);
  const CompletedTasks = completedTasks.length > 0
    ? <TaskCards tasks={completedTasks} status="completed" />
    : null;

  return (
    <>
      {OpenTasks}
      {CompletedTasks}
    </>
  );
};

export default TaskCardsByStatus;
