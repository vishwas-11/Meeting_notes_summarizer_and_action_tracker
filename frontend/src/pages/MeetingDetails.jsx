// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import API, { getActions } from "../api/api";

// export default function MeetingDetails() {
//   const { id } = useParams();

//   const [data, setData] = useState(null);
//   const [actions, setActions] = useState([]);

//   useEffect(() => {
//     // ✅ Fetch meeting details
//     API.get(`/meetings/${id}`).then((res) => setData(res.data));

//     // ✅ Fetch ALL actions, then filter by meeting_id
//     getActions().then((res) => {
//       const filtered = res.data.filter(
//         (a) => String(a.meeting_id) === String(id)
//       );
//       setActions(filtered);
//     });
//   }, [id]);

//   if (!data) return <div>Loading...</div>;

//   return (
//     <div className="p-6">
//       {/* ✅ Title */}
//       <h1 className="text-xl font-bold">{data.title}</h1>

//       {/* ✅ Summary */}
//       <h2 className="mt-4 font-semibold">Summary</h2>
//       <p>{data.summary}</p>

//       {/* ✅ Decisions */}
//       <h2 className="mt-4 font-semibold">Decisions</h2>
//       <ul>
//         {data.decisions?.map((d, i) => (
//           <li key={i}>• {d}</li>
//         ))}
//       </ul>

//       {/* ✅ Action Items (NEW - fetched separately) */}
//       <h2 className="mt-6 font-semibold">Action Items</h2>

//       {actions.length === 0 ? (
//         <p className="text-gray-500">No action items found.</p>
//       ) : (
//         <div className="grid grid-cols-2 gap-4">
//           {actions.map((a, i) => (
//             <div key={i} className="border p-3 rounded">
//               <h4 className="font-semibold">{a.task}</h4>
//               <p>Owner: {a.owner}</p>
//               <p>Priority: {a.priority}</p>
//               <p>Deadline: {a.deadline}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }






import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API, { getActions } from "../api/api";
import { ChevronLeft, Calendar, User, Flag, CheckCircle2 } from "lucide-react";

export default function MeetingDetails() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [actions, setActions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const meetingRes = await API.get(`/meetings/${id}`);
        setData(meetingRes.data);

        const actionsRes = await getActions();
        const filtered = actionsRes.data.filter(
          (a) => String(a.meeting_id) === String(id)
        );
        setActions(filtered);
      } catch (err) {
        console.error("Error fetching meeting details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center">
        <div className="animate-pulse text-[#8C7E6A] font-serif italic">Gathering insights...</div>
      </div>
    );
  }

  if (!data) return <div className="p-20 text-center">Meeting not found.</div>;

  // Helper for soft priority colors
  const getPriorityStyle = (priority) => {
    const p = priority?.toLowerCase();
    if (p === 'high') return 'bg-[#E9D8D6] text-[#A64452]';
    if (p === 'medium') return 'bg-[#EFEBE3] text-[#8C7E6A]';
    return 'bg-[#F1F3F0] text-[#6B705C]';
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] pt-24 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Navigation Back */}
        <Link to="/history" className="flex items-center gap-2 text-[#8C7E6A] hover:text-[#6B705C] transition-colors mb-8 group">
          <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to History</span>
        </Link>

        {/* Header Section */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
             <span className="px-3 py-1 bg-[#EFEBE3] text-[#8C7E6A] text-xs font-bold uppercase tracking-widest rounded-full">
               {data.type || "General"}
             </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-light text-[#2D2D2D] leading-tight">
            {data.title}
          </h1>
        </header>

        <div className="grid grid-cols-1 gap-12">
          
          {/* Summary Section */}
          <section className="bg-white/50 backdrop-blur-sm border border-white rounded-3xl p-8 shadow-sm">
            <h2 className="text-sm font-bold uppercase tracking-widest text-[#8C7E6A] mb-6 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#6B705C]"></div>
              Executive Summary
            </h2>
            <p className="text-[#4A4A4A] text-lg leading-relaxed font-light italic">
              "{data.summary}"
            </p>
          </section>

          {/* Decisions & Action Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Decisions */}
            <div className="space-y-6">
              <h2 className="text-sm font-bold uppercase tracking-widest text-[#8C7E6A] flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#6B705C]" />
                Key Decisions
              </h2>
              <ul className="space-y-4">
                {data.decisions?.map((d, i) => (
                  <li key={i} className="flex gap-3 text-[#4A4A4A] leading-relaxed">
                    <span className="text-[#6B705C] mt-1">•</span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Items */}
            <div className="space-y-6">
              <h2 className="text-sm font-bold uppercase tracking-widest text-[#8C7E6A] flex items-center gap-2">
                <Flag size={16} className="text-[#6B705C]" />
                Action Items
              </h2>
              
              {actions.length === 0 ? (
                <p className="text-[#A3A199] italic text-sm font-light">No specific actions identified.</p>
              ) : (
                <div className="space-y-4">
                  {actions.map((a, i) => (
                    <div key={i} className="bg-white border border-[#EAE7DF] rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group">
                      <h4 className="font-medium text-[#2D2D2D] mb-4 group-hover:text-[#6B705C] transition-colors">{a.task}</h4>
                      
                      <div className="grid grid-cols-2 gap-y-3">
                        <div className="flex items-center gap-2 text-xs text-[#706C61]">
                          <User size={14} className="opacity-60" />
                          <span>{a.owner}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-[#706C61] justify-end">
                          <Calendar size={14} className="opacity-60" />
                          <span>{a.deadline}</span>
                        </div>
                        <div className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase w-fit ${getPriorityStyle(a.priority)}`}>
                          {a.priority}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}