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

    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    //  Manual flow
    const handleSubmit = async () => {
        try {
            setLoading(true);

            const payload = {
                ...form,
                participants: form.participants.split(","),
            };

            const res = await createMeeting(payload);
            const id = res.data.meeting_id;

            await processMeeting(id);

            navigate(`/meeting/${id}`);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    //  Upload flow
    const handleUpload = async () => {
        if (!file) return alert("Please select a file");

        try {
            setLoading(true);

            const formData = new FormData();
            formData.append("file", file);

            //   const res = await fetch(
            //     "http://localhost:8000/meetings/upload",
            //     {
            //       method: "POST",
            //       body: formData,
            //     }
            //   );

            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/meetings/upload`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            const data = await res.json();
            const id = data.meeting_id;

            //  IMPORTANT: still run LLM processing
            await processMeeting(id);

            navigate(`/meeting/${id}`);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 space-y-6">

            <h1 className="text-2xl font-bold">Create Meeting</h1>

            {/* ================= MANUAL FORM ================= */}
            <div className="border p-4 rounded">
                <h2 className="font-semibold mb-2">Manual Entry</h2>

                <input
                    placeholder="Title"
                    className="border p-2 w-full mb-2"
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                />

                <input
                    placeholder="Type"
                    className="border p-2 w-full mb-2"
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                />

                <input
                    placeholder="Participants (comma separated)"
                    className="border p-2 w-full mb-2"
                    onChange={(e) =>
                        setForm({ ...form, participants: e.target.value })
                    }
                />

                <textarea
                    placeholder="Meeting Notes"
                    className="border p-2 w-full mb-2"
                    rows={6}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                />

                <button
                    onClick={handleSubmit}
                    className="bg-blue-500 text-white px-4 py-2"
                >
                    Generate from Notes
                </button>
            </div>

            {/* ================= FILE UPLOAD ================= */}
            <div className="border p-4 rounded">
                <h2 className="font-semibold mb-2">Upload Minutes File</h2>

                <input
                    type="file"
                    accept=".txt"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="mb-2"
                />

                <button
                    onClick={handleUpload}
                    className="bg-purple-500 text-white px-4 py-2"
                >
                    Upload & Generate
                </button>
            </div>

            {loading && <p className="text-gray-500">Processing...</p>}
        </div>
    );
}