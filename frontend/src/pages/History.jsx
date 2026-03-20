import { useEffect, useState } from "react";
import { getMeetings } from "../api/api";
import { Link } from "react-router-dom";

export default function History() {
  const [meetings, setMeetings] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getMeetings().then((res) => setMeetings(res.data));
  }, []);

  const filtered = meetings.filter((m) =>
    m.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
     
      <input
        placeholder="Search meetings..."
        className="border p-2 w-full mb-4"
        onChange={(e) => setSearch(e.target.value)}
      />

      {filtered.map((m) => {
        
        const source =
          m.source ||
          (m.type === "Uploaded" || m.type === "File Upload"
            ? "Uploaded"
            : "Manual");

        return (
          <Link key={m._id} to={`/meeting/${m._id}`}>
            <div className="border p-4 mb-3 rounded hover:shadow-lg hover:scale-[1.01] transition-all duration-200 cursor-pointer">
              
              {/* TITLE */}
              <h2 className="font-semibold text-lg">{m.title}</h2>

              
              <div className="mt-1 flex items-center gap-2">
                <span className="text-sm">
                  {source === "Uploaded" ? "📄" : "✍️"}
                </span>

                <span
                  className={`text-xs px-2 py-1 rounded ${
                    source === "Uploaded"
                      ? "bg-purple-200 text-purple-800"
                      : "bg-blue-200 text-blue-800"
                  }`}
                >
                  {source}
                </span>

                {/* CATEGORY */}
                {m.type && (
                  <span className="text-xs text-gray-500">
                    • {m.type}
                  </span>
                )}
              </div>

              
              <p className="text-sm text-gray-600 mt-2">
                {m.summary || "No summary available"}
              </p>

              
              {m.created_at && (
                <p className="text-xs text-gray-400 mt-2">
                  {new Date(m.created_at).toLocaleString("en-IN", {
                    timeZone: "Asia/Kolkata",
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
}