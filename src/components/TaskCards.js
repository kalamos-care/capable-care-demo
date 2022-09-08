import {
  Box,
  CardContent,
  Typography,
  ToggleButton,
  DialogActions,
  Skeleton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CheckCircleOutlineSharpIcon from "@mui/icons-material/CheckCircleOutlineSharp";
import RadioButtonUncheckedSharpIcon from "@mui/icons-material/RadioButtonUncheckedSharp";

import { filterAndSortTasks } from "features/tasks/utils/taskUtils.utils";
import { useTasks } from "features/tasks/hooks/useTasks.hook";
import { useUpdateTask } from "features/tasks/hooks/useUpdateTask.hook";
import BasicModal from "./BasicModal";
import StyledCard from "./StyledCard";
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
  const { mutate: updateTask } = useUpdateTask();
  const navigate = useNavigate();

  const isTaskCompleted =
    task?.achievement_status === "completed" ||
    task?.achievement_status === "not_attainable";

  const toggleAchievementStatus = async () => {
    const new_achievement_status = isTaskCompleted
      ? "in_progress"
      : "completed";

    updateTask({
      taskId: task.id,
      task: {
        achievement_status: new_achievement_status,
      },
    });
  };

  return (
    <StyledCard
      key={task.id}
      sx={{
        marginBottom: "0.75rem",
        marginTop: 0,
        textTransform: "none",
        border: "none",
        textAlign: "left",
        padding: "0.75rem",
      }}
      onClick={(e) => {
        navigate(`/task/${task.id}`);
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "1rem",
        }}
      >
        <ToggleButton
          value="check"
          onChange={(e) => {
            e.stopPropagation();
            e.preventDefault();
            toggleAchievementStatus();
          }}
          sx={{
            border: "none",
          }}
        >
          <CheckBoxIcon isCompleted={isTaskCompleted} />
        </ToggleButton>
        <TaskDetails task={task} />
      </Box>
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
  const { data: tasks, isLoading, isError } = useTasks();
  const filteredTasks = filterAndSortTasks(tasks, carePlan.id);

  if (isLoading) {
    return <Skeleton variant="rectangular" animation="wave" height={280} />;
  }

  if (isError) {
    return <div>Woops something went wrong...</div>;
  }

  const OpenTasks =
    filteredTasks?.open?.length > 0 ? (
      <TaskCards tasks={filteredTasks?.open} status="open" />
    ) : null;

  const CompletedTasks =
    filteredTasks?.completed?.length > 0 ? (
      <TaskCards tasks={filteredTasks?.completed} status="completed" />
    ) : null;

  return (
    <>
      {OpenTasks}
      {CompletedTasks}
    </>
  );
};

export default TaskCardsByStatus;
