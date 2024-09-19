// import { useParams, Link } from "react-router-dom";
// import useTaskStore from "../store";

// const TaskDetails = () => {
//   const { taskId } = useParams();
//   console.log("taskid", taskId)
//   const task = useTaskStore((state) => {
//     console.log("state", state);
//     state.tasks.find((t) => t._id == parseInt(taskId));
//   });

//   if (!task) {
//     return (
//       <div className="container mt-4">
//         <p className="text-muted">Task not found.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="container mt-4">
//       <div className="d-flex align-items-center justify-content-between mb-2">
//         <h2>Task Details</h2>
//         <Link to="/" className="btn btn-secondary">
//           Back to Task List
//         </Link>
//       </div>
//       <div className="card">
//         <div className="card-body">
//           <h5 className="card-title">Task: {task.name}</h5>
//           <h6 className="card-subtitle mb-2 text-muted">
//             Due Date: {task.dueDate}
//           </h6>
//           <p className="card-text">
//             Priority:
//             <span
//               className={`badge text-bg-${
//                 task.priority === "High" || task.priority === "Very High"
//                   ? "danger"
//                   : task.priority === "Medium"
//                   ? "warning"
//                   : "success"
//               }`}
//             >
//               {task.priority}
//             </span>
//           </p>
//           <p className="card-text">
//             Description: <br />
//             Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum
//             repellendus amet minus error dolorem autem quidem facilis, animi
//             vitae repellat totam dolore sequi?
//           </p>
//           <Link to={`/tasks/${task.id}/edit`} className="btn btn-warning me-2">
//             <i className="bi bi-pencil"></i> Edit
//           </Link>
//           <Link to="/" className="btn btn-secondary">
//             <i className="bi bi-arrow-left"></i> Back
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TaskDetails;

import { useParams, Link } from "react-router-dom";
import useTasks from "../hooks/useTasks";

const TaskDetails = () => {
  const { taskId } = useParams(); // Fetch task ID from URL params
  const { tasksQuery } = useTasks(); // Fetch tasks using custom hook

  // Handle loading state
  if (tasksQuery.isLoading) {
    return <div>Loading task details...</div>;
  }

  // Handle error state
  if (tasksQuery.isError) {
    return <div>Error loading task: {tasksQuery.error.message}</div>;
  }

  // Once tasks are loaded, find the specific task by ID
  const task = tasksQuery.data.find((t) => t._id === taskId);

  // If task is not found
  if (!task) {
    return (
      <div className="container mt-4">
        <p className="text-muted">Task not found.</p>
        <Link to="/" className="btn btn-secondary">
          Back to Task List
        </Link>
      </div>
    );
  }

  const formattedDueDate = new Date(task.dueDate).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="container mt-4">
      <div className="d-flex align-items-center justify-content-between mb-2">
        <h3>Task Details</h3>
        {/* <Link to="/" className="btn btn-secondary">
          Back to Task List
        </Link> */}
      </div>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Task: {task.name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">
            Due Date: {formattedDueDate}
          </h6>
          <p className="card-text">
            Priority:
            <span
              className={`badge ms-1 text-bg-${
                task.priority === "High" || task.priority === "Very High"
                  ? "danger"
                  : task.priority === "Medium"
                  ? "warning"
                  : "success"
              }`}
            >
              {task.priority}
            </span>
          </p>
          <p className="card-text">
            Description: <br />
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum
            repellendus amet minus error dolorem autem quidem facilis, animi
            vitae repellat totam dolore sequi?
          </p>
          <Link to={`/tasks/${task._id}/edit`} className="btn btn-warning me-2">
            <i className="bi bi-pencil"></i> Edit
          </Link>
          <Link to="/" className="btn btn-secondary">
            <i className="bi bi-arrow-left"></i> Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
