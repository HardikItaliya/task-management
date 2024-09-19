import { useEffect, useState } from "react";

const TaskFilter = ({ onFilter }) => {
  const [priority, setPriority] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleFilterChange = () => {
    onFilter({ priority, dueDate });
  };

  useEffect(() => {
    handleFilterChange();
  }, [priority, dueDate]);

  return (
    <div className="mb-3 p-sm-3 p-2 bg-light rounded shadow-sm d-flex align-items-center">
      <div className="me-3 me-sm-2">
        <label htmlFor="priorityFilter" className="form-label fw-bold">
          Filter by Priority
        </label>
        <select
          id="priorityFilter"
          className="form-select"
          value={priority}
          onChange={(e) => {
            setPriority(e.target.value);
            handleFilterChange();
          }}
        >
          <option value="">All</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          <option value="Very High">Very High</option>
        </select>
      </div>

      <div>
        <label htmlFor="dueDateFilter" className="form-label fw-bold">
          Filter by Due Date
        </label>
        <input
          type="date"
          id="dueDateFilter"
          className="form-control"
          value={dueDate}
          onChange={(e) => {
            setDueDate(e.target.value);
            handleFilterChange();
          }}
        />
      </div>
    </div>
  );
};

export default TaskFilter;