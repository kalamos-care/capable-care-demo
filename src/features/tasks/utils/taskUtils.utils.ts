import { Task, TaskAchievementStatus } from "../models/Task";

export const filterAndSortTasks = (tasks: Task[], carePlanId?: string) => {
  // Divide the tasks by achievement_status
  const sortedTasks = {
    open: [],
    completed: [],
  };

  if (tasks) {
    tasks.forEach((task) => {
      if (carePlanId && task.care_plan_id !== carePlanId) {
        return;
      }
      if (task.achievement_status === TaskAchievementStatus.CANCELLED) {
        return;
      }
      if (task.achievement_status === TaskAchievementStatus.COMPLETED) {
        sortedTasks.completed.push(task);
      }
      if (task.achievement_status === TaskAchievementStatus.IN_PROGRESS) {
        sortedTasks.open.push(task);
      }
    });
  }
  for (const dividedTasks in sortedTasks) {
    // You can sort by a date string rather than an actual Date object:
    // https://stackoverflow.com/questions/10123953/how-to-sort-an-object-array-by-date-property
    sortedTasks[dividedTasks] = sortedTasks[dividedTasks].sort((a, b) => {
      if (a.due_on === null && b.due_on === null) {
        return 0;
      } else if (a.due_on === null) {
        return 1;
      } else if (b.due_on === null) {
        return -1;
      } else {
        return a.due_on - b.due_on;
      }
    });
  }

  return sortedTasks;
};
