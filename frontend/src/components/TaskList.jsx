import { useState } from "react";

export default function TaskList({ tasks, onUpdate }) {
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
