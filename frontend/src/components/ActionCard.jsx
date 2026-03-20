import { useState } from "react";
import { updateAction } from "../api/api";
import StatusBadge from "./StatusBadge";

export default function ActionCard({ action, refresh }) {
  const [editing, setEditing] = useState(false);
  const [owner, setOwner] = useState(action.owner);
  const [deadline, setDeadline] = useState(action.deadline);

  const save = async () => {
    await updateAction(action._id, { owner, deadline });
    setEditing(false);
    refresh();
  };

  const updateStatus = async (status) => {
    await updateAction(action._id, { status });
    refresh();
  };

  return (
    <div className="border p-4 rounded shadow">
      <h3 className="font-semibold">{action.task}</h3>

      <div className="flex justify-between mt-2">
        <StatusBadge status={action.status} />
        <span className="text-sm">{action.priority}</span>
      </div>

      {editing ? (
        <>
          <input
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            className="border p-1 mt-2 w-full"
          />

          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="border p-1 mt-2 w-full"
          />

          <button
            onClick={save}
            className="bg-green-500 text-white px-2 py-1 mt-2"
          >
            Save
          </button>
        </>
      ) : (
        <>
          <p>Owner: {action.owner}</p>
          <p>Deadline: {action.deadline}</p>

          <button
            onClick={() => setEditing(true)}
            className="text-blue-500 mt-2"
          >
            Edit
          </button>
        </>
      )}

      <div className="flex gap-2 mt-3">
        <button onClick={() => updateStatus("Pending")}>⏳</button>
        <button onClick={() => updateStatus("In Progress")}>🚧</button>
        <button onClick={() => updateStatus("Done")}>✅</button>
      </div>
    </div>
  );
}