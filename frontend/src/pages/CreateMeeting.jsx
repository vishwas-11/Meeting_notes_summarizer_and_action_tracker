import { useState } from "react";
import { createMeeting, processMeeting } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function CreateMeeting() {
  const [form, setForm] = useState({
    title: "",
    type: "",
    participants: "",
    notes: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async () => {
    const payload = {
      ...form,
      participants: form.participants.split(","),
    };

    const res = await createMeeting(payload);
    const id = res.data.meeting_id;

    await processMeeting(id);

    navigate(`/meeting/${id}`);
  };

  return (
    <div className="p-6 space-y-4">
      <input
        placeholder="Title"
        className="border p-2 w-full"
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <input
        placeholder="Type"
        className="border p-2 w-full"
        onChange={(e) => setForm({ ...form, type: e.target.value })}
      />

      <input
        placeholder="Participants (comma separated)"
        className="border p-2 w-full"
        onChange={(e) =>
          setForm({ ...form, participants: e.target.value })
        }
      />

      <textarea
        placeholder="Meeting Notes"
        className="border p-2 w-full"
        rows={6}
        onChange={(e) => setForm({ ...form, notes: e.target.value })}
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2"
      >
        Generate Insights
      </button>
    </div>
  );
}