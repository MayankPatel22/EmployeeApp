export const getTaskStatus = (task) => {
  if (task.active) return "active";
  if (task.newTask) return "new";
  if (task.completed) return "completed";
  if (task.failed) return "failed";
  return "unknown";
};

export const validateTask = (task) => {
  const requiedFields = [
    "taskTitle",
    "taskDescription",
    "taskDate",
    "category",
  ];
  return requiedFields.every((field) => task[field]);
};

export const updateTaskStatus = (userData, targetTask, newStatus) => {
  return userData.map((employee) => {
    const taskIndex = employee.tasks.findIndex(
      (task) =>
        task.taskTitle === targetTask.taskTitle &&
        task.taskDate === targetTask.taskDate
    );
    if (taskIndex === -1) return employee;

    const updatedTasks = [...employee.tasks];
    const oldStatus = getTaskStatus(updatedTasks[taskIndex]);

    updatedTasks[taskIndex] = {
      ...updatedTasks[taskIndex],
      active: false,
      newTask: false,
      completed: false,
      failed: false,
    };
    switch (newStatus) {
      case "active":
        updatedTasks[taskIndex].active = true;
        break;
      case "completed":
        updatedTasks[taskIndex].completed = true;
        break;
      case "failed":
        updatedTasks[taskIndex].failed = true;
        break;
      default:
        updatedTasks[taskIndex].newStatus = true;
    }
    const taskCounts = { ...employee.taskCounts };
    if (oldStatus !== "unknown") {
      taskCounts[oldStatus] = Math.max(0, taskCounts[oldStatus] - 1);
    }
    taskCounts[newStatus] = (taskCounts[newStatus] || 0) + 1;

    return {
      ...employee,
      tasks: updatedTasks,
      taskCounts,
    };
  });
};
