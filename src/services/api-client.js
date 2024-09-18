import axios from "axios";

export class APIClient {
  constructor() {
    this.client = axios.create({
      baseURL: "http://localhost:5000/api/",
    });
  }

  getAll() {
    return this.client.get("/tasks",);
  }

  getById(id) {
    return this.client.get(`/tasks/${id}`);
  }

  create(data) {
    return this.client.post("/tasks", data);
  }

  update(id, data) {
    return this.client.put(`/tasks/${id}`, data);
  }

  delete(id) {
    return this.client.delete(`/tasks/${id}`);
  }
}

export default APIClient;
