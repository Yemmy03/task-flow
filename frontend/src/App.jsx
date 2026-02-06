import { useEffect, useState } from "react";
import axios from "axios";
import TaskInput from "./components/TaskInput";
import "./styles/app.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8001";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/tasks`);
      setTasks(res.data);
    } catch (err) {
      console.error("Failed to fetch tasks", err);
    } finally {
      setLoading(false);
    }
  };

  // Add new task
  const createTask = async (title) => {
    if (!title.trim()) return;
    await axios.post(`${API_URL}/tasks`, { title });
    fetchTasks();
  };

  // Update task title
  const updateTask = async (id, title) => {
    if (!title.trim()) return;
    await axios.put(`${API_URL}/tasks/${id}`, { title });
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Task summary
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === "completed").length;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <div className="app">
      <div className="card">
        <h1 className="title">TaskFlow</h1>
        <p className="subtitle">A simple task manager</p>

        {/* Task count summary */}
        <p className="task-summary">
          Total: {totalTasks}, Pending: {pendingTasks}, Completed: {completedTasks}
        </p>

        {/* Add task */}
        <TaskInput onAdd={createTask} />

        {/* Loading or task list */}
        {loading ? (
          <p className="status">Loading tasks…</p>
        ) : (
          <TaskList tasks={tasks} onUpdate={updateTask} />
        )}
      </div>
    </div>
  );
}

// TaskList + TaskItem components
function TaskList({ tasks, onUpdate }) {
  return (
    <ul className="task-list">
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} onUpdate={onUpdate} />
      ))}
    </ul>
  );
}

function TaskItem({ task, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);

  const saveEdit = () => {
    onUpdate(task.id, title);
    setEditing(false);
  };

  return (
    <li className="task-item">
      {editing ? (
        <>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button onClick={saveEdit}>Save</button>
        </>
      ) : (
        <>
          <span>{task.title}</span>
          <button onClick={() => setEditing(true)}>Edit</button>
        </>
      )}
    </li>
  );
}
