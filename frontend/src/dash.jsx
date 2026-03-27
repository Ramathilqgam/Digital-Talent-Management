import React, { useEffect, useState } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "../api";
import TaskCard from "./TaskCard";
import TaskModal from "./TaskModal";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);

  // Fetch tasks from backend
  const fetchTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Create or Update Task
  const handleCreateOrUpdate = async (taskData) => {
    try {
      if (editTask) {
        await updateTask(editTask._id, taskData);
        setEditTask(null);
      } else {
        await createTask(taskData);
      }
      setIsModalOpen(false);
      fetchTasks();
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  // Delete Task
  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Dashboard Stats
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === "Completed").length;
  const inProgressTasks = tasks.filter(t => t.status === "In Progress").length;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">
        Task Management Dashboard
      </h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white shadow-lg rounded-lg p-4 text-center">
          <h2 className="text-gray-500">Total Tasks</h2>
          <p className="text-2xl font-bold">{totalTasks}</p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-4 text-center">
          <h2 className="text-gray-500">In Progress</h2>
          <p className="text-2xl font-bold text-yellow-600">
            {inProgressTasks}
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-4 text-center">
          <h2 className="text-gray-500">Completed</h2>
          <p className="text-2xl font-bold text-green-600">
            {completedTasks}
          </p>
        </div>
      </div>

      {/* Add Task Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          + Add Task
        </button>
      </div>

      {/* Task List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tasks.map(task => (
          <TaskCard
            key={task._id}
            task={task}
            onEdit={(task) => {
              setEditTask(task);
              setIsModalOpen(true);
            }}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {/* Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditTask(null);
        }}
        onSubmit={handleCreateOrUpdate}
        initialData={editTask}
      />
    </div>
  );
};

export default Dashboard;