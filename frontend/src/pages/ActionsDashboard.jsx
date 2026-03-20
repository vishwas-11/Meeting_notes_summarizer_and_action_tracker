import { useEffect, useState } from "react";
import { getActions } from "../api/api";
import ActionCard from "../components/ActionCard";

export default function ActionsDashboard() {
  const [actions, setActions] = useState([]);
  const [filters, setFilters] = useState({
    owner: "",
    status: "",
    search: "",
  });

  const fetchActions = async () => {
    const res = await getActions();
    setActions(res.data);
  };

  useEffect(() => {
    fetchActions();
  }, []);

  // 🔍 Combined filtering (frontend)
  const filtered = actions.filter((a) => {
    return (
      a.task.toLowerCase().includes(filters.search.toLowerCase()) &&
      (filters.owner
        ? a.owner.toLowerCase().includes(filters.owner.toLowerCase())
        : true) &&
      (filters.status ? a.status === filters.status : true)
    );
  });

  // ✅ 📊 Progress Stats
  const total = filtered.length;
  const done = filtered.filter((a) => a.status === "Done").length;
  const percentage = total === 0 ? 0 : (done / total) * 100;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Action Dashboard</h1>

      {/* FILTERS */}
      <div className="flex gap-4 mb-4">
        <input
          placeholder="Search task..."
          className="border p-2"
          onChange={(e) =>
            setFilters({ ...filters, search: e.target.value })
          }
        />

        <input
          placeholder="Owner"
          className="border p-2"
          onChange={(e) =>
            setFilters({ ...filters, owner: e.target.value })
          }
        />

        <select
          className="border p-2"
          onChange={(e) =>
            setFilters({ ...filters, status: e.target.value })
          }
        >
          <option value="">All Status</option>
          <option>Pending</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>
      </div>

      {/* ✅ PROGRESS INDICATOR (ADD HERE) */}
      <div className="mb-4">
        <p>Total: {total}</p>
        <p>Completed: {done}</p>

        <div className="w-full bg-gray-200 h-3 rounded">
          <div
            className="bg-green-500 h-3 rounded"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* ACTION LIST */}
      <div className="grid grid-cols-3 gap-4">
        {filtered.map((a) => (
          <ActionCard
            key={a._id}
            action={a}
            refresh={fetchActions}
          />
        ))}
      </div>
    </div>
  );
}