// import { useState } from "react";
// import { updateAction } from "../api/api";
// import StatusBadge from "./StatusBadge";

// export default function ActionCard({ action, refresh }) {
//   const [editing, setEditing] = useState(false);
//   const [owner, setOwner] = useState(action.owner);
//   const [deadline, setDeadline] = useState(action.deadline);

//   const save = async () => {
//     await updateAction(action._id, { owner, deadline });
//     setEditing(false);
//     refresh();
//   };

//   const updateStatus = async (status) => {
//     await updateAction(action._id, { status });
//     refresh();
//   };

//   return (
//     <div className="border p-4 rounded shadow">
//       <h3 className="font-semibold">{action.task}</h3>

//       <div className="flex justify-between mt-2">
//         <StatusBadge status={action.status} />
//         <span className="text-sm">{action.priority}</span>
//       </div>

//       {editing ? (
//         <>
//           <input
//             value={owner}
//             onChange={(e) => setOwner(e.target.value)}
//             className="border p-1 mt-2 w-full"
//           />

//           <input
//             type="date"
//             value={deadline}
//             onChange={(e) => setDeadline(e.target.value)}
//             className="border p-1 mt-2 w-full"
//           />

//           <button
//             onClick={save}
//             className="bg-green-500 text-white px-2 py-1 mt-2"
//           >
//             Save
//           </button>
//         </>
//       ) : (
//         <>
//           <p>Owner: {action.owner}</p>
//           <p>Deadline: {action.deadline}</p>

//           <button
//             onClick={() => setEditing(true)}
//             className="text-blue-500 mt-2"
//           >
//             Edit
//           </button>
//         </>
//       )}

//       <div className="flex gap-2 mt-3">
//         <button onClick={() => updateStatus("Pending")}>⏳</button>
//         <button onClick={() => updateStatus("In Progress")}>🚧</button>
//         <button onClick={() => updateStatus("Done")}>✅</button>
//       </div>
//     </div>
//   );
// }





import { useState } from "react";
import { updateAction } from "../api/api";
import StatusBadge from "./StatusBadge";
import { Edit2, Save, X, User, Calendar, CheckCircle2, Clock, Construction } from "lucide-react";

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

  const inputStyle = "bg-[#FAF9F6] border border-[#EAE7DF] rounded-lg px-2 py-1 text-sm text-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#6B705C]/10 w-full mb-2";

  return (
    <div className="bg-white/80 backdrop-blur-sm border border-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
      
      {/* Priority Indicator - Top edge color strip */}
      <div className={`absolute top-0 left-0 w-full h-1 ${
        action.priority === 'High' ? 'bg-[#D6B2B1]' : 'bg-[#EAE7DF]'
      }`} />

      <div className="flex justify-between items-start mb-3">
        <h3 className="font-serif font-medium text-[#2D2D2D] text-lg leading-tight group-hover:text-[#6B705C] transition-colors">
          {action.task}
        </h3>
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#A3A199] bg-[#FAF9F6] px-2 py-0.5 rounded border border-[#EAE7DF]">
          {action.priority}
        </span>
      </div>

      <div className="mb-4">
        <StatusBadge status={action.status} />
      </div>

      <div className="space-y-2 mb-4">
        {editing ? (
          <div className="bg-[#FAF9F6]/50 p-3 rounded-xl border border-[#EAE7DF]/50">
            <div className="flex items-center gap-2 mb-2">
                <User size={14} className="text-[#8C7E6A]" />
                <input
                    value={owner}
                    onChange={(e) => setOwner(e.target.value)}
                    className={inputStyle}
                    placeholder="Owner"
                />
            </div>
            <div className="flex items-center gap-2">
                <Calendar size={14} className="text-[#8C7E6A]" />
                <input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className={inputStyle}
                />
            </div>
          </div>
        ) : (
          <div className="text-xs text-[#706C61] space-y-1">
            <div className="flex items-center gap-2">
              <User size={14} className="opacity-60" />
              <span>{action.owner}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={14} className="opacity-60" />
              <span>{action.deadline}</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-[#F2EFE9]">
        {/* Status Quick-Switch */}
        <div className="flex gap-1.5">
          <button 
            onClick={() => updateStatus("Pending")} 
            className={`p-2 rounded-lg transition-colors ${action.status === 'Pending' ? 'bg-[#EFEBE3] text-[#8C7E6A]' : 'text-[#A3A199] hover:bg-[#FAF9F6]'}`}
            title="Pending"
          >
            <Clock size={16} />
          </button>
          <button 
            onClick={() => updateStatus("In Progress")} 
            className={`p-2 rounded-lg transition-colors ${action.status === 'In Progress' ? 'bg-[#F2EFE9] text-[#6B705C]' : 'text-[#A3A199] hover:bg-[#FAF9F6]'}`}
            title="In Progress"
          >
            <Construction size={16} />
          </button>
          <button 
            onClick={() => updateStatus("Done")} 
            className={`p-2 rounded-lg transition-colors ${action.status === 'Done' ? 'bg-[#F1F3F0] text-[#6B705C]' : 'text-[#A3A199] hover:bg-[#FAF9F6]'}`}
            title="Done"
          >
            <CheckCircle2 size={16} />
          </button>
        </div>

        {/* Edit/Save Actions */}
        {editing ? (
          <div className="flex gap-2">
            <button onClick={() => setEditing(false)} className="p-2 text-[#A3A199] hover:text-red-400 transition-colors">
              <X size={18} />
            </button>
            <button onClick={save} className="flex items-center gap-1 px-3 py-1 bg-[#6B705C] text-white text-xs font-medium rounded-lg hover:bg-[#5B604C] shadow-sm">
              <Save size={14} /> Save
            </button>
          </div>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="flex items-center gap-1 px-3 py-1 text-[#8C7E6A] text-xs font-medium hover:bg-[#EFEBE3] rounded-lg transition-colors"
          >
            <Edit2 size={14} /> Edit
          </button>
        )}
      </div>
    </div>
  );
}