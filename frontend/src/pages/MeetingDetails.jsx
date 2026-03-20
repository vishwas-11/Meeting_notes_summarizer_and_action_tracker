import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API, { getActions } from "../api/api";

export default function MeetingDetails() {
  const { id } = useParams();

  const [data, setData] = useState(null);
  const [actions, setActions] = useState([]);

  useEffect(() => {
    // ✅ Fetch meeting details
    API.get(`/meetings/${id}`).then((res) => setData(res.data));

    // ✅ Fetch ALL actions, then filter by meeting_id
    getActions().then((res) => {
      const filtered = res.data.filter(
        (a) => String(a.meeting_id) === String(id)
      );
      setActions(filtered);
    });
  }, [id]);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="p-6">
      {/* ✅ Title */}
      <h1 className="text-xl font-bold">{data.title}</h1>

      {/* ✅ Summary */}
      <h2 className="mt-4 font-semibold">Summary</h2>
      <p>{data.summary}</p>

      {/* ✅ Decisions */}
      <h2 className="mt-4 font-semibold">Decisions</h2>
      <ul>
        {data.decisions?.map((d, i) => (
          <li key={i}>• {d}</li>
        ))}
      </ul>

      {/* ✅ Action Items (NEW - fetched separately) */}
      <h2 className="mt-6 font-semibold">Action Items</h2>

      {actions.length === 0 ? (
        <p className="text-gray-500">No action items found.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {actions.map((a, i) => (
            <div key={i} className="border p-3 rounded">
              <h4 className="font-semibold">{a.task}</h4>
              <p>Owner: {a.owner}</p>
              <p>Priority: {a.priority}</p>
              <p>Deadline: {a.deadline}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}