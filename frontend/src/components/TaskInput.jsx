import { useState } from "react";

export default function TaskInput({ onAdd }) {
  const [title, setTitle] = useState("");

  const handleAdd = () => {
    onAdd(title);
    setTitle(""); // clear input after adding
  };

  return (
    <div className="task-input">
      <input
        type="text"
        value={title}
        placeholder="New task"
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleAdd()}
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}
