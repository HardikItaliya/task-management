// import { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import useTaskStore from "../store";

// const TaskForm = ({ mode }) => {
//   const tasks = useTaskStore((s) => s.tasks);
//   const addTask = useTaskStore((s) => s.addTask);
//   const updateTask = useTaskStore((s) => s.updateTask);
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [task, setTask] = useState({
//     name: "",
//     dueDate: "",
//     priority: "Low",
//   });

//   useEffect(() => {
//     if (mode === "edit" && id) {
//       const taskToEdit = tasks.find((t) => t.id === parseInt(id));
//       if (taskToEdit) {
//         setTask(taskToEdit);
//       }
//     }
//   }, [id, mode, tasks]);

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setTask((prevTask) => ({
//       ...prevTask,
//       [name]: value,
//     }));
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (mode === "edit") {
//       updateTask(id, task.name, task.dueDate, task.priority);
//     } else {
//       addTask(task.name, task.dueDate, task.priority);
//     }

//     // Redirect to task list after adding/updating task
//     navigate("/");
//   };

//   return (
//     <div className="container mt-4">
//       <h2 className="text-center mb-4">
//         {mode === "edit" ? "Update Task" : "Add New Task"}
//       </h2>
//       <form onSubmit={handleSubmit} className="p-4 bg-light rounded border">
//         <div className="mb-3">
//           <label htmlFor="name" className="form-label">
//             Task Name
//           </label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={task.name}
//             onChange={handleChange}
//             className="form-control"
//             required
//           />
//         </div>

//         <div className="mb-3">
//           <label htmlFor="dueDate" className="form-label">
//             Due Date
//           </label>
//           <input
//             type="date"
//             id="dueDate"
//             name="dueDate"
//             value={task.dueDate}
//             onChange={handleChange}
//             className="form-control"
//             required
//           />
//         </div>

//         <div className="mb-3">
//           <label htmlFor="priority" className="form-label">
//             Priority
//           </label>
//           <select
//             id="priority"
//             name="priority"
//             value={task.priority}
//             onChange={handleChange}
//             className="form-select"
//           >
//             <option value="Low">Low</option>
//             <option value="Medium">Medium</option>
//             <option value="High">High</option>
//             <option value="Very High">Very High</option>
//           </select>
//         </div>

//         <button type="submit" className="btn btn-primary">
//           {mode === "edit" ? "Update Task" : "Add Task"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default TaskForm;

import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useTasks from "../hooks/useTasks";

const TaskForm = () => {
  const { id } = useParams();
  const { tasksQuery, createTaskMutation, updateTaskMutation } = useTasks();
  const navigate = useNavigate();

  const [task, setTask] = useState({
    name: "",
    dueDate: "",
    priority: "Low",
  });
  const [errors, setErrors] = useState({});

  const isEditing = !!id;

  React.useEffect(() => {
    if (isEditing && tasksQuery.data) {
      const existingTask = tasksQuery.data.find((t) => t._id == id);
      if (existingTask) {
        setTask({
          name: existingTask.name,
          dueDate: existingTask.dueDate,
          priority: existingTask.priority,
        });
      }
    }
  }, [id, isEditing, tasksQuery.data]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const validateTask = () => {
    const newErrors = {};
    const today = new Date().toISOString().split("T")[0];

    if (task.name.length < 3) {
      newErrors.name = "Task name must have minimum 3 characters.";
    }
    if (task.name.length > 20) {
      newErrors.name = "Task name should not have more than 20 characters.";
    }

    if (task.dueDate < today) {
      newErrors.dueDate = "Due date cannot be in the past.";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateTask();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (isEditing) {
      updateTaskMutation.mutate(
        { id: id, updatedTask: task },
        {
          onSuccess: () => {
            navigate("/");
          },
        }
      );
    } else {
      createTaskMutation.mutate(task, {
        onSuccess: () => {
          navigate("/");
        },
      });
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex align-items-center justify-content-between mb-2">
        <h3>{isEditing ? "Update Task" : "Add New Task"}</h3>
      </div>

      <form onSubmit={handleSubmit} className="p-4 bg-light rounded border">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Task Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={task.name}
            onChange={handleChange}
            className="form-control"
            placeholder="Task name here"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="dueDate" className="form-label">
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={
              task.dueDate
                ? new Date(task.dueDate).toISOString().split("T")[0]
                : ""
            }
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="priority" className="form-label">
            Priority
          </label>
          <select
            id="priority"
            name="priority"
            value={task.priority}
            onChange={handleChange}
            className="form-select"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Very High">Very High</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          {isEditing ? "Update Task" : "Add Task"}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
