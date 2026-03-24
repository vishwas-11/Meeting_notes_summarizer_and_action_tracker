// import { useEffect, useState } from "react";
// import { getMeetings } from "../api/api";
// import { Link } from "react-router-dom";
// import { Search, FileText, Edit3, Calendar, ChevronRight } from "lucide-react";

// export default function History() {
//   const [meetings, setMeetings] = useState([]);
//   const [search, setSearch] = useState("");

//   useEffect(() => {
//     getMeetings().then((res) => setMeetings(res.data));
//   }, []);

//   const filtered = meetings.filter((m) =>
//     m.title.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen bg-[#FAF9F6] pt-24 pb-12 px-6">
//       <div className="max-w-4xl mx-auto">
        
//         <header className="mb-10">
//           <h1 className="text-3xl font-serif font-light text-[#2D2D2D]">Meeting History</h1>
//           <p className="text-[#706C61] mt-1 font-light">A timeline of your past conversations and insights.</p>
//         </header>

//         {/* Search Bar */}
//         <div className="relative mb-8">
//           <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A3A199]" size={18} />
//           <input
//             placeholder="Search meetings by title..."
//             className="w-full bg-white/50 border border-[#EAE7DF] rounded-2xl pl-12 pr-4 py-3 text-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#6B705C]/10 focus:border-[#6B705C] transition-all placeholder:text-[#A3A199]"
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>

//         {/* Meeting List */}
//         <div className="space-y-4">
//           {filtered.length === 0 ? (
//             <div className="text-center py-20 bg-white/20 border border-dashed border-[#EAE7DF] rounded-3xl">
//               <p className="text-[#8C7E6A] italic">No archived meetings found.</p>
//             </div>
//           ) : (
//             filtered.map((m) => {
//               const source =
//                 m.source ||
//                 (m.type === "Uploaded" || m.type === "File Upload"
//                   ? "Uploaded"
//                   : "Manual");

//               return (
//                 <Link key={m._id} to={`/meeting/${m._id}`} className="block group">
//                   <div className="bg-white/60 backdrop-blur-sm border border-white p-6 rounded-2xl shadow-sm group-hover:shadow-md group-hover:bg-white/80 transition-all duration-300 relative overflow-hidden">
                    
//                     <div className="flex justify-between items-start gap-4">
//                       <div className="flex-1">
//                         {/* Title & Source Badge */}
//                         <div className="flex items-center gap-3 mb-2">
//                           <h2 className="font-serif text-xl text-[#2D2D2D] group-hover:text-[#6B705C] transition-colors line-clamp-1">
//                             {m.title}
//                           </h2>
//                           <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border ${
//                             source === "Uploaded" 
//                               ? "bg-[#EFEBE3] text-[#8C7E6A] border-[#E7E2D8]" 
//                               : "bg-[#F2EFE9] text-[#6B705C] border-[#EAE7DF]"
//                           }`}>
//                             {source}
//                           </span>
//                         </div>

//                         {/* Metadata */}
//                         <div className="flex items-center gap-4 text-xs text-[#A3A199] mb-3">
//                           <div className="flex items-center gap-1.5">
//                             <Calendar size={12} />
//                             <span>
//                               {m.created_at ? new Date(m.created_at).toLocaleString("en-IN", {
//                                 day: "2-digit",
//                                 month: "short",
//                                 year: "numeric",
//                               }) : "Date unknown"}
//                             </span>
//                           </div>
//                           {m.type && (
//                             <div className="flex items-center gap-1.5">
//                               <span className="w-1 h-1 rounded-full bg-[#EAE7DF]" />
//                               <span>{m.type}</span>
//                             </div>
//                           )}
//                         </div>

//                         {/* Summary Snippet */}
//                         <p className="text-sm text-[#706C61] line-clamp-2 font-light leading-relaxed italic">
//                           {m.summary || "No summary available for this meeting."}
//                         </p>
//                       </div>

//                       {/* Right Arrow Icon */}
//                       <div className="mt-2 text-[#EAE7DF] group-hover:text-[#6B705C] transition-colors">
//                         <ChevronRight size={20} />
//                       </div>
//                     </div>
//                   </div>
//                 </Link>
//               );
//             })
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }






import { useEffect, useState } from "react";
import { getMeetings } from "../api/api";
import { Link } from "react-router-dom";
import { Search, Calendar, ChevronRight } from "lucide-react";

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
    /* REMOVED solid background class to let Threads show through */
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-4xl mx-auto">
        
        <header className="mb-10">
          <h1 className="text-3xl font-serif font-light text-[#2D2D2D]">Meeting History</h1>
          <p className="text-[#706C61] mt-1 font-light">A timeline of your past conversations and insights.</p>
        </header>

        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A3A199]" size={18} />
          <input
            placeholder="Search meetings by title..."
            className="w-full bg-white/40 backdrop-blur-sm border border-[#EAE7DF] rounded-2xl pl-12 pr-4 py-3 text-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#6B705C]/10 focus:border-[#6B705C] transition-all placeholder:text-[#A3A199]"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Meeting List */}
        <div className="space-y-4">
          {filtered.length === 0 ? (
            <div className="text-center py-20 bg-white/20 border border-dashed border-[#EAE7DF] rounded-3xl">
              <p className="text-[#8C7E6A] italic">No archived meetings found.</p>
            </div>
          ) : (
            filtered.map((m) => {
              const source =
                m.source ||
                (m.type === "Uploaded" || m.type === "File Upload"
                  ? "Uploaded"
                  : "Manual");

              return (
                <Link key={m._id} to={`/meeting/${m._id}`} className="block group">
                  <div className="bg-white/40 backdrop-blur-md border border-white p-6 rounded-2xl shadow-sm group-hover:shadow-md group-hover:bg-white/60 transition-all duration-300 relative overflow-hidden">
                    
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h2 className="font-serif text-xl text-[#2D2D2D] group-hover:text-[#6B705C] transition-colors line-clamp-1">
                            {m.title}
                          </h2>
                          <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border ${
                            source === "Uploaded" 
                              ? "bg-[#EFEBE3]/80 text-[#8C7E6A] border-[#E7E2D8]" 
                              : "bg-[#F2EFE9]/80 text-[#6B705C] border-[#EAE7DF]"
                          }`}>
                            {source}
                          </span>
                        </div>

                        <div className="flex items-center gap-4 text-xs text-[#A3A199] mb-3">
                          <div className="flex items-center gap-1.5">
                            <Calendar size={12} />
                            <span>
                              {m.created_at ? new Date(m.created_at).toLocaleString("en-IN", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              }) : "Date unknown"}
                            </span>
                          </div>
                          {m.type && (
                            <div className="flex items-center gap-1.5">
                              <span className="w-1 h-1 rounded-full bg-[#EAE7DF]" />
                              <span>{m.type}</span>
                            </div>
                          )}
                        </div>

                        <p className="text-sm text-[#706C61] line-clamp-2 font-light leading-relaxed italic">
                          {m.summary || "No summary available for this meeting."}
                        </p>
                      </div>

                      <div className="mt-2 text-[#EAE7DF] group-hover:text-[#6B705C] transition-colors">
                        <ChevronRight size={20} />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}