// import { useEffect, useState } from "react";
// import { getActions } from "../api/api";
// import ActionCard from "../components/ActionCard";

// export default function ActionsDashboard() {
//   const [actions, setActions] = useState([]);
//   const [filters, setFilters] = useState({
//     owner: "",
//     status: "",
//     search: "",
//   });

//   const fetchActions = async () => {
//     const res = await getActions();
//     setActions(res.data);
//   };

//   useEffect(() => {
//     fetchActions();
//   }, []);

//   //  Combined filtering (frontend)
//   const filtered = actions.filter((a) => {
//     return (
//       a.task.toLowerCase().includes(filters.search.toLowerCase()) &&
//       (filters.owner
//         ? a.owner.toLowerCase().includes(filters.owner.toLowerCase())
//         : true) &&
//       (filters.status ? a.status === filters.status : true)
//     );
//   });

//   // Progress Stats
//   const total = filtered.length;
//   const done = filtered.filter((a) => a.status === "Done").length;
//   const percentage = total === 0 ? 0 : (done / total) * 100;

//   return (
//     <div className="p-6">
//       <h1 className="text-xl font-bold mb-4">Action Dashboard</h1>

//       {/* FILTERS */}
//       <div className="flex gap-4 mb-4">
//         <input
//           placeholder="Search task..."
//           className="border p-2"
//           onChange={(e) =>
//             setFilters({ ...filters, search: e.target.value })
//           }
//         />

//         <input
//           placeholder="Owner"
//           className="border p-2"
//           onChange={(e) =>
//             setFilters({ ...filters, owner: e.target.value })
//           }
//         />

//         <select
//           className="border p-2"
//           onChange={(e) =>
//             setFilters({ ...filters, status: e.target.value })
//           }
//         >
//           <option value="">All Status</option>
//           <option>Pending</option>
//           <option>In Progress</option>
//           <option>Done</option>
//         </select>
//       </div>

//       {/*  PROGRESS INDICATOR (ADD HERE) */}
//       <div className="mb-4">
//         <p>Total: {total}</p>
//         <p>Completed: {done}</p>

//         <div className="w-full bg-gray-200 h-3 rounded">
//           <div
//             className="bg-green-500 h-3 rounded"
//             style={{ width: `${percentage}%` }}
//           />
//         </div>
//       </div>

//       {/* ACTION LIST */}
//       <div className="grid grid-cols-3 gap-4">
//         {filtered.map((a) => (
//           <ActionCard
//             key={a._id}
//             action={a}
//             refresh={fetchActions}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }






import { useEffect, useState } from "react";
import { getActions } from "../api/api";
import ActionCard from "../components/ActionCard";
import { Search, User, Filter, CheckCircle } from "lucide-react";

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

  const filtered = actions.filter((a) => {
    return (
      a.task.toLowerCase().includes(filters.search.toLowerCase()) &&
      (filters.owner
        ? a.owner.toLowerCase().includes(filters.owner.toLowerCase())
        : true) &&
      (filters.status ? a.status === filters.status : true)
    );
  });

  const total = filtered.length;
  const done = filtered.filter((a) => a.status === "Done").length;
  const percentage = total === 0 ? 0 : (done / total) * 100;

  // Shared Style for Inputs
  const inputStyle = "bg-white/50 border border-[#EAE7DF] rounded-xl px-4 py-2 text-sm text-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#6B705C]/10 focus:border-[#6B705C] transition-all placeholder:text-[#A3A199]";

  return (
    <div className="min-h-screen bg-[#FAF9F6] pt-24 pb-12 px-6">
      <div className="max-w-6xl mx-auto">
        
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-serif font-light text-[#2D2D2D]">Action Dashboard</h1>
            <p className="text-[#706C61] mt-1 font-light">Track and manage your meeting outcomes.</p>
          </div>

          {/* PROGRESS STATS CARD */}
          <div className="bg-white/40 backdrop-blur-sm border border-white p-4 rounded-2xl shadow-sm min-w-[240px]">
            <div className="flex justify-between items-end mb-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#8C7E6A]">Completion</span>
              <span className="text-sm font-medium text-[#6B705C]">{Math.round(percentage)}%</span>
            </div>
            <div className="w-full bg-[#EFEBE3] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#6B705C] h-full rounded-full transition-all duration-700 ease-out"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <div className="flex gap-4 mt-2 text-[10px] text-[#A3A199] font-medium uppercase">
              <span>Total: {total}</span>
              <span>Done: {done}</span>
            </div>
          </div>
        </header>

        {/* FILTERS BAR */}
        <div className="flex flex-wrap gap-4 mb-8 p-2 bg-[#F2EFE9]/50 rounded-2xl">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A3A199]" size={16} />
            <input
              placeholder="Search tasks..."
              className={`${inputStyle} w-full pl-10`}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            />
          </div>

          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A3A199]" size={16} />
            <input
              placeholder="Filter by owner"
              className={`${inputStyle} pl-10`}
              onChange={(e) => setFilters({ ...filters, owner: e.target.value })}
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A3A199]" size={16} />
            <select
              className={`${inputStyle} pl-10 appearance-none pr-8 cursor-pointer`}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            >
              <option value="">All Statuses</option>
              <option>Pending</option>
              <option>In Progress</option>
              <option>Done</option>
            </select>
          </div>
        </div>

        {/* ACTION GRID */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-white/20 border border-dashed border-[#EAE7DF] rounded-3xl">
            <CheckCircle className="mx-auto text-[#EAE7DF] mb-4" size={48} />
            <p className="text-[#8C7E6A] italic">No actions found matching your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((a) => (
              <ActionCard
                key={a._id}
                action={a}
                refresh={fetchActions}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}