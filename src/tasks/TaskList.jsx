// import { Link, useNavigate } from "react-router-dom";
// import useTaskStore from "../store";
// const TaskList = () => {
//   const navigate = useNavigate();
//   const tasks = useTaskStore((s) => s.tasks);
//   // const updateTask = useTaskStore((s) => s.updateTask);
//   const deleteTask = useTaskStore((s) => s.deleteTask);
//   console.log(tasks);

//   return (
//     <div className="container mt-4">
//       <div className="d-flex align-items-center justify-content-between mb-2">
//         <h2 className="mb-0">Task List</h2>
//         <Link to="/tasks/add" className="btn btn-primary">
//           Add New Task
//         </Link>
//       </div>
//       <table className="table table-hover table-bordered align-middle">
//         <thead className="table-dark">
//           <tr>
//             <th scope="col">#</th>
//             <th scope="col">Task Name</th>
//             <th scope="col">Due Date</th>
//             <th scope="col">Priority</th>
//             <th scope="col">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {tasks?.length > 0 ? (
//             tasks.map((task, index) => (
//               <tr key={index}>
//                 <th scope="row">{index + 1}</th>
//                 <td>{task.name}</td>
//                 <td>{task.dueDate}</td>
//                 <td>
//                   <span
//                     className={`badge text-bg-${
//                       task.priority === "High" || task.priority === "Very High"
//                         ? "danger"
//                         : task.priority === "Medium"
//                         ? "warning"
//                         : "success"
//                     }`}
//                   >
//                     {task.priority}
//                   </span>
//                 </td>
//                 <td>
//                   {/* Action Icons: Edit, Delete, and Navigate */}
//                   <Link
//                     to={`/tasks/${task.id}/edit`}
//                     className="btn btn-warning me-2"
//                   >
//                     <i className="bi bi-pencil"></i> Edit
//                   </Link>

//                   <button
//                     className="btn btn-sm btn-outline-danger me-2"
//                     onClick={() => deleteTask(task.id)}
//                     title="Delete Task"
//                   >
//                     <i className="bi bi-trash"></i>
//                   </button>

//                   <button
//                     className="btn btn-sm btn-outline-secondary"
//                     onClick={() => navigate(`/tasks/${task.id}`)}
//                     title="View Task"
//                   >
//                     <i className="bi bi-box-arrow-in-right"></i>
//                   </button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="4" className="text-muted">
//                 No tasks available.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default TaskList;

// import { Link } from "react-router-dom";
// import useTasks from "../hooks/useTasks";
// import { useEffect, useState } from "react";
// import TaskFilter from "../components/TaskFilter";

// const TaskList = () => {
//   const { tasksQuery, deleteTaskMutation } = useTasks();
//   const [filteredTasks, setFilteredTasks] = useState([]);
//   const [filters, setFilters] = useState({ priority: "", dueDate: "" });

//   useEffect(() => {
//     tasksQuery.refetch();
//   }, []);

//   useEffect(() => {
//     if (tasksQuery.data) {
//       applyFilters();
//     }
//   }, [tasksQuery.data, filters]);

//   const applyFilters = () => {
//     let tasks = tasksQuery.data || [];

//     if (filters.priority) {
//       tasks = tasks.filter((task) => task.priority === filters.priority);
//     }

//     if (filters.dueDate) {
//       tasks = tasks.filter(
//         (task) =>
//           new Date(task.dueDate).toISOString().split("T")[0] === filters.dueDate
//       );
//     }

//     setFilteredTasks(tasks);
//   };

//   const handleFilterChange = (newFilters) => {
//     setFilters(newFilters);
//   };

//   if (tasksQuery.isLoading) return <div>Loading tasks...</div>;
//   if (tasksQuery.isError)
//     return <div>Error fetching tasks: {tasksQuery.error.message}</div>;

//   const handleDelete = (id) => {
//     deleteTaskMutation.mutate(id);
//   };

//   return (
//     <div className="container mt-4">
//       <div className="d-flex align-items-center justify-content-between mb-2">
//         <h2>Task List</h2>
//         <Link to="/tasks/add" className="btn btn-primary">
//           Add New Task
//         </Link>
//       </div>
//       <TaskFilter onFilter={handleFilterChange} />
//       <table className="table table-hover table-bordered align-middle">
//         <thead className="table-dark">
//           <tr>
//             <th scope="col">#</th>
//             <th scope="col">Task Name</th>
//             <th scope="col">Due Date</th>
//             <th scope="col">Priority</th>
//             <th scope="col">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredTasks.length > 0 ? (
//             filteredTasks.map((task, index) => (
//               <tr key={task._id}>
//                 <th scope="row">{index + 1}</th>
//                 <td>{task.name}</td>
//                 <td>{task.dueDate}</td>
//                 <td>
//                   <span
//                     className={`badge text-bg-${
//                       task.priority === "High" || task.priority === "Very High"
//                         ? "danger"
//                         : task.priority === "Medium"
//                         ? "warning"
//                         : "success"
//                     }`}
//                   >
//                     {task.priority}
//                   </span>
//                 </td>
//                 <td>
//                   <Link
//                     to={`/tasks/${task._id}/edit`}
//                     className="btn btn-warning me-2"
//                   >
//                     <i className="bi bi-pencil"></i> Edit
//                   </Link>
//                   <button
//                     className="btn btn-sm btn-outline-danger me-2"
//                     onClick={() => handleDelete(task._id)}
//                   >
//                     <i className="bi bi-trash"></i> Delete
//                   </button>
//                   <Link
//                     to={`/tasks/${task._id}`}
//                     className="btn btn-sm btn-outline-secondary"
//                   >
//                     <i className="bi bi-box-arrow-in-right"></i> View
//                   </Link>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="5" className="text-center text-muted">
//                 No tasks available.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default TaskList;

import { Link } from "react-router-dom";
import useTasks from "../hooks/useTasks";
import TaskFilter from "../components/TaskFilter";
import { useState, useEffect } from "react";

const TaskList = () => {
  const { tasksQuery, deleteTaskMutation } = useTasks();
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filters, setFilters] = useState({ priority: "", dueDate: "" });

  useEffect(() => {
    tasksQuery.refetch();
  }, []);

  useEffect(() => {
    if (tasksQuery.data) {
      applyFilters();
    }
  }, [tasksQuery.data, filters]);

  const applyFilters = () => {
    let tasks = tasksQuery.data || [];

    if (filters.priority) {
      tasks = tasks.filter((task) => task.priority === filters.priority);
    }

    if (filters.dueDate) {
      tasks = tasks.filter(
        (task) =>
          new Date(task.dueDate).toISOString().split("T")[0] === filters.dueDate
      );
    }

    setFilteredTasks(tasks);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${String(date.getUTCDate()).padStart(2, "0")}-${String(
      date.getUTCMonth() + 1
    ).padStart(2, "0")}-${date.getUTCFullYear()}`;
  };

  const handleDelete = (id) => {
    deleteTaskMutation.mutate(id);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  if (tasksQuery.isLoading) return <div>Loading tasks...</div>;
  if (tasksQuery.isError)
    return <div>Error fetching tasks: {tasksQuery.error.message}</div>;

  return (
    <div className="container-fluid px-3 px-md-5 mt-4">
      <div className="d-flex align-items-center justify-content-between mb-2">
        <h2>Task List</h2>
        <Link to="/tasks/add" className="btn btn-primary">
          Add New Task
        </Link>
      </div>

      {/* Task Filter Component */}
      <TaskFilter onFilter={handleFilterChange} />

      <table className="table table-hover table-bordered align-middle">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Task Name</th>
            <th scope="col">Due Date</th>
            <th scope="col">Priority</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task, index) => (
              <tr key={task._id}>
                <th scope="row">{index + 1}</th>
                <td>{task.name}</td>
                <td>{formatDate(task.dueDate)}</td>
                <td>
                  <span
                    className={`badge text-bg-${
                      task.priority === "High" || task.priority === "Very High"
                        ? "danger"
                        : task.priority === "Medium"
                        ? "warning"
                        : "success"
                    }`}
                  >
                    {task.priority}
                  </span>
                </td>
                <td>
                  <div className="d-grid d-sm-block d-md-inline-flex my-2">
                    <Link
                      to={`/tasks/${task._id}/edit`}
                      className="btn btn-sm btn-warning me-2 my-1"
                    >
                      <i className="bi bi-pencil"></i> Edit
                    </Link>
                    <button
                      className="btn btn-sm btn-outline-danger me-2 my-1"
                      onClick={() => handleDelete(task._id)}
                    >
                      <i className="bi bi-trash"></i> Delete
                    </button>
                    <Link
                      to={`/tasks/${task._id}`}
                      className="btn btn-sm btn-outline-secondary me-2 my-1"
                    >
                      <i className="bi bi-box-arrow-in-right"></i> View
                    </Link>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center text-muted">
                No tasks available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
