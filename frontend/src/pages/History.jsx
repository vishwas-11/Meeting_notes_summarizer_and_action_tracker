import { useEffect, useState } from "react";
import { getMeetings } from "../api/api";
import { Link } from "react-router-dom";

export default function History() {
  const [meetings, setMeetings] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getMeetings().then((res) => setMeetings(res.data));
  }, []);

  //  filter logic INSIDE component
  const filtered = meetings.filter((m) =>
    m.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      {/*  Search Input */}
      <input
        placeholder="Search meetings..."
        className="border p-2 mb-4 w-full"
        onChange={(e) => setSearch(e.target.value)}
      />

      {/*  Use filtered instead of meetings */}
      {filtered.map((m) => (
        <Link key={m._id} to={`/meeting/${m._id}`}>
          <div className="border p-3 mb-2">
            <h3>{m.title}</h3>
            <p>{m.summary}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}