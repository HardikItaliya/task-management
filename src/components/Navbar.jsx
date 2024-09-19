import { Link } from "react-router-dom";
import useTasks from "../hooks/useTasks";
// import logo from '../assets/logo.webp';

const Navbar = () => {
  const { tasksQuery } = useTasks(); // Get the tasks from Zustand or API

  const taskCount = tasksQuery?.data?.length || 0;

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light  px-2 px-sm-3">
      <Link to="/" className="navbar-brand">
        <i className="bi bi-kanban-fill fs-1 fs-sm-2"></i>
      </Link>
      <div className="d-flex ms-auto align-items-center">
        <h2 className="me-2 mb-0">Task Management</h2>
        <span className="badge bg-primary d-flex">
          {taskCount} Task{taskCount !== 1 ? "s" : ""}
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
