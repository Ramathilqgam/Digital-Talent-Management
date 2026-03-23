import { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {
  const [task, setTask] = useState({ title: "", description: "" });
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await axios.get("http://127.0.0.1:5000/api/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const addTask = async () => {
    await axios.post("http://127.0.0.1:5000/api/tasks", task);
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://127.0.0.1:5000/api/tasks/${id}`);
    fetchTasks();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Dashboard</h2>

      <input name="title" placeholder="Title" onChange={handleChange} />
      <input name="description" placeholder="Description" onChange={handleChange} />
      <button onClick={addTask}>Add Task</button>

      <h3>Tasks</h3>

      {tasks.map((t) => (
        <div key={t._id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          <h4>{t.title}</h4>
          <p>{t.description}</p>
          <button onClick={() => deleteTask(t._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
