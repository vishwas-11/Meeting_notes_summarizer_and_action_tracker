// export default function StatusBadge({ status }) {
//   const colors = {
//     Pending: "bg-yellow-200 text-yellow-800",
//     "In Progress": "bg-blue-200 text-blue-800",
//     Done: "bg-green-200 text-green-800",
//   };

//   return (
//     <span className={`px-2 py-1 rounded text-sm ${colors[status]}`}>
//       {status}
//     </span>
//   );
// }



import { CheckCircle2, Clock, Construction } from "lucide-react";

export default function StatusBadge({ status }) {
  // Relaxing, muted color palette
  const styles = {
    Pending: {
      container: "bg-[#EFEBE3] text-[#8C7E6A] border-[#E7E2D8]",
      icon: <Clock size={12} className="opacity-70" />
    },
    "In Progress": {
      container: "bg-[#F2EFE9] text-[#6B705C] border-[#EAE7DF]",
      icon: <Construction size={12} className="opacity-70" />
    },
    Done: {
      container: "bg-[#F1F3F0] text-[#6B705C] border-[#E3E8E1]",
      icon: <CheckCircle2 size={12} className="opacity-70" />
    },
  };

  const currentStyle = styles[status] || styles.Pending;

  return (
    <span className={`
      inline-flex items-center gap-1.5 
      px-2.5 py-0.5 
      rounded-full text-[11px] font-bold uppercase tracking-wider
      border shadow-sm
      ${currentStyle.container}
      transition-all duration-300
    `}>
      {currentStyle.icon}
      {status}
    </span>
  );
}