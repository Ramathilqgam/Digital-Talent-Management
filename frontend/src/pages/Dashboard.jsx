import { useEffect, useState } from "react";
import axios from "axios";
import { FaPlus, FaTrash, FaEdit, FaCheck, FaSpinner, FaSearch, FaExclamationTriangle, FaClock, FaFire } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  const API = "http://127.0.0.1:5000/api/tasks";

  // Fetch tasks
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API);
      setTasks(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTasks(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Create task
  const createTask = async () => {
    if (!form.title || !form.description) return;
    setLoading(true);
    try {
      await axios.post(API, form);
      setForm({ title: "", description: "" });
      setShowAddForm(false);
      setShowAddForm(True);
      fetchTasks();
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  // Edit task
  const startEdit = (task) => { setEditingId(task._id); setEditForm({ title: task.title, description: task.description }); };
  const saveEdit = async () => {
    setLoading(true);
    try {
      await axios.put(`${API}/${editingId}`, editForm);
      setEditingId(null);
      fetchTasks();
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  // Delete task
  const deleteTask = async (id) => {
    if (!confirm("Delete this task?")) return;
    setLoading(true);
    try { await axios.delete(`${API}/${id}`); fetchTasks(); } 
    catch (err) { console.error(err); } 
    finally { setLoading(false); }
  };

  // Filtered tasks
  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'completed').length,
    pending: tasks.filter(t => t.status === 'pending').length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8 font-sans">
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="glassmorphism mb-12 p-10 rounded-3xl shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-5xl font-black text-white mb-2">Task Dashboard</h1>
            <button onClick={() => setShowAddForm(!showAddForm)} className="bg-emerald-500 text-white px-6 py-3 rounded-xl">{showAddForm ? "Close" : "New Task"}</button>
          </div>
          <div className="grid grid-cols-3 gap-6">
            <div className="p-6 bg-blue-500 text-white rounded-xl">Total: {stats.total}</div>
            <div className="p-6 bg-orange-500 text-white rounded-xl">Pending: {stats.pending}</div>
            <div className="p-6 bg-green-500 text-white rounded-xl">Completed: {stats.completed}</div>
          </div>
        </div>

        {/* Search */}
        <div className="glassmorphism p-6 rounded-3xl mb-8">
          <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search..." className="w-full p-4 rounded-xl"/>
        </div>

        {/* Add Task */}
        <AnimatePresence>
          {showAddForm && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="glassmorphism p-6 rounded-3xl mb-8">
              <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="w-full p-4 mb-4 rounded-xl"/>
              <input name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full p-4 mb-4 rounded-xl"/>
              <button onClick={createTask} disabled={loading} className="bg-emerald-500 text-white px-6 py-3 rounded-xl">Add Task</button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Task List */}
        <div className="space-y-6">
          {filteredTasks.map(task => (
            <div key={task._id} className="glassmorphism p-6 rounded-3xl flex justify-between items-center">
              <div>
                {editingId === task._id ? (
                  <input value={editForm.title} onChange={e => setEditForm({...editForm, title: e.target.value})} />
                ) : <h3 className="text-xl text-white">{task.title}</h3>}
                {editingId === task._id ? (
                  <input value={editForm.description} onChange={e => setEditForm({...editForm, description: e.target.value})} />
                ) : <p className="text-gray-300">{task.description}</p>}
              </div>
              <div className="flex space-x-2">
                {editingId === task._id ? (
                  <button onClick={saveEdit} className="bg-green-500 px-3 py-2 rounded-xl">Save</button>
                ) : (
                  <button onClick={() => startEdit(task)} className="bg-blue-500 px-3 py-2 rounded-xl">Edit</button>
                )}
                <button onClick={() => deleteTask(task._id)} className="bg-red-500 px-3 py-2 rounded-xl">Delete</button>
              </div>
            </div>
          ))}
          {filteredTasks.length === 0 && <p className="text-white">No tasks found</p>}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;