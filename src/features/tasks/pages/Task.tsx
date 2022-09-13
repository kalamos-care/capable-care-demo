import { Box, Card, Container, Skeleton, Typography } from "@mui/material";
import { Navigate, useParams } from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";

import { HeaderImage, Recurrence, RichText } from "components";
import { TaskAchievementStatus } from "../models/Task";
import { useTask } from "../hooks/useTask.hook";
import { useUpdateTask } from "../hooks/useUpdateTask.hook";
import ActionButton from "components/ActionButton";
import useCRMContent from "fetchDataHooks/useCRMContent";

const Task = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const { data: task, isLoading: taskLoading, isError: taskError, refetch } = useTask(taskId);
  const {
    data: taskWithCRM,
    isLoading: taskWithCRMLoading,
    isError: taskWithCRMError,
  } = useCRMContent(task);
  const { mutate: updateTask } = useUpdateTask();

  const isTaskCompleted = task?.achievement_status === TaskAchievementStatus.COMPLETED;

  const toggleAchievementStatus = async () => {
    const new_achievement_status = isTaskCompleted
      ? TaskAchievementStatus.IN_PROGRESS
      : TaskAchievementStatus.COMPLETED;

    updateTask(
      {
        taskId: task.id,
        task: {
          achievement_status: new_achievement_status,
        },
      },
      { onSuccess: () => refetch() }
    );
  };

  if (taskLoading || taskWithCRMLoading) {
    return <Skeleton variant="rectangular" animation="wave" height={280} />;
  }

  if (taskError || taskWithCRMError) {
    return <Navigate to="/" />;
  }

  return (
    <>
      {taskWithCRM.imageUrl ? (
        <Card sx={{ position: "relative" }}>
          <ActionButton
            type={"back"}
            route={"/"}
            sx={{ position: "absolute", zIndex: 100 }}
          />
          <HeaderImage data={taskWithCRM} />
        </Card>
      ) : (
        <ActionButton type={"back"} route={"/"} />
      )}

      <Container
        sx={{
          overflow: "auto",
          position: "relative",
        }}
      >
        <Typography variant="h5" component="h2" sx={{ marginY: 3 }}>
          {taskWithCRM.name}
        </Typography>

        <div style={{ display: "flex", gap: "1.5rem" }}>
          {taskWithCRM.cron_expression && (
            <Recurrence cron_expression={taskWithCRM.cron_expression} />
          )}

          {isTaskCompleted && (
            <Box sx={{ display: "flex", gap: 0.5, marginTop: "0.5rem" }}>
              <CheckIcon />
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 300,
                  marginTop: "auto",
                  marginBottom: "auto",
                }}
              >
                Complete
              </Typography>
            </Box>
          )}
        </div>

        <RichText content={taskWithCRM.description} />
      </Container>

      <Container
        sx={{
          position: !isTaskCompleted && "sticky",
          bottom: "1rem",
          marginBottom: "1rem",
          marginTop: "1rem",
        }}
      >
        <Card
          sx={{
            backgroundColor: isTaskCompleted ? "white" : process.env.REACT_APP_COLOR,
            cursor: "pointer",
          }}
          onClick={toggleAchievementStatus}
        >
          <Typography
            component="h2"
            sx={{
              color: isTaskCompleted ? process.env.REACT_APP_COLOR : "white",
              marginY: "1rem",
              textAlign: "center",
              fontWeight: 500,
            }}
          >
            {isTaskCompleted ? "Mark as Open" : "Mark Complete"}
          </Typography>
        </Card>
      </Container>
    </>
  );
};

export default Task;
