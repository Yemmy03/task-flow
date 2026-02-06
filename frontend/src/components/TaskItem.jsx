export default function TaskItem({ task }) {
    return (
      <li className="task-item">
        <span className="task-title">{task.title}</span>
        <span className={`badge ${task.status}`}>
          {task.status || "pending"}
        </span>
      </li>
    );
  }
  