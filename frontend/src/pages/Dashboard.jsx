import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: ""
  });

  // Fetch tasks
  const fetchTasks = async () => {
    const res = await axios.get("http://127.0.0.1:5000/api/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Create task
  const createTask = async () => {
    if (!form.title || !form.description) {
      return alert("Fill all fields");
    }

    await axios.post("http://127.0.0.1:5000/api/tasks", form);

    setForm({ title: "", description: "" });
    fetchTasks();
  };

  // Delete task
  const deleteTask = async (id) => {
    await axios.delete(`http://127.0.0.1:5000/api/tasks/${id}`);
    fetchTasks();
  };

  return (
    <div style={styles.container}>
      <h2>Dashboard 📋</h2>

      {/* Create Task */}
      <div style={styles.form}>
        <input
          name="title"
          placeholder="Task Title"
          value={form.title}
          onChange={handleChange}
        />

        <input
          name="description"
          placeholder="Task Description"
          value={form.description}
          onChange={handleChange}
        />

        <button onClick={createTask}>Add Task</button>
      </div>

      {/* Task List */}
      <div>
        {tasks.map((task) => (
          <div key={task._id} style={styles.card}>
            <h4>{task.title}</h4>
            <p>{task.description}</p>

            <button onClick={() => deleteTask(task._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "600px",
    margin: "50px auto"
  },
  form: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px"
  },
  card: {
    border: "1px solid #ddd",
    padding: "10px",
    marginBottom: "10px"
  }
};

export default Dashboard;