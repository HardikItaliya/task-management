import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap CSS is imported
// import logo from '../assets/logo.webp';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
      <Link to="/" className="navbar-brand">
      <i className="bi bi-kanban-fill"></i>
      </Link>
      <div className="collapse navbar-collapse">
        <div className="d-flex ms-auto">
        <h2>Task Management </h2>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
