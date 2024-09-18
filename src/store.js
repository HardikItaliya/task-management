// import { create } from "zustand";
// import { tasks } from "./utiles/task";

// const useTaskStore = create((set) => ({
//   tasks: tasks,

//   // Add Task
//   addTask: (name, dueDate, priority) =>
//     set((state) => ({
//       tasks: [
//         ...state.tasks,
//         { id: tasks.length + 1, name, dueDate, priority },
//       ],
//     })),

//   // Toggle Priority (for example, if you want to handle changing the priority)
//   togglePriority: (id, newPriority) =>
//     set((state) => ({
//       tasks: state.tasks.map((task) =>
//         task.id === id ? { ...task, priority: newPriority } : task
//       ),
//     })),

//   // Delete Task
//   deleteTask: (id) =>
//     set((state) => ({
//       tasks: state.tasks.filter((task) => task.id !== id),
//     })),

//   // Update Task (name, dueDate, priority)
//   updateTask: (id, newName, newDueDate, newPriority) =>
//     set((state) => ({
//       tasks: state.tasks.map((task) =>
//         task.id == id
//           ? {
//               ...task,
//               name: newName,
//               dueDate: newDueDate,
//               priority: newPriority,
//             }
//           : task
//       ),
//     })),
// }));

// export default useTaskStore;

import { create } from "zustand";
import APIClient from "./services/api-client"; // Adjust the import path
// import { tasks as initialTasks } from "./utiles/task"; // Adjust the import path

const apiClient = new APIClient("/tasks"); // Adjust the endpoint if needed

const useTaskStore = create((set) => ({
  tasks: [],

  // Fetch tasks from API
  fetchTasks: async () => {
    try {
      const tasks = await apiClient.getAll(); // Assuming getAll fetches tasks
      set({ tasks });
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  },

  // Add Task
  addTask: async (name, dueDate, priority) => {
    try {
      const newTask = await apiClient.create({ name, dueDate, priority }); // Assuming create method
      set((state) => ({
        tasks: [...state.tasks, newTask],
      }));
    } catch (error) {
      console.error("Error adding task:", error);
    }
  },

  // Update Task
  updateTask: async (id, newName, newDueDate, newPriority) => {
    try {
      const updatedTask = await apiClient.update(id, {
        name: newName,
        dueDate: newDueDate,
        priority: newPriority,
      }); // Assuming update method
      set((state) => ({
        tasks: state.tasks.map((task) => (task.id === id ? updatedTask : task)),
      }));
    } catch (error) {
      console.error("Error updating task:", error);
    }
  },

  // Delete Task
  deleteTask: async (id) => {
    try {
      await apiClient.delete(id); // Assuming delete method
      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id),
      }));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  },
}));

export default useTaskStore;
