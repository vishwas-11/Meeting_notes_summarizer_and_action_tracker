// import { useState } from "react";
// import { createMeeting, processMeeting } from "../api/api";
// import { useNavigate } from "react-router-dom";

// export default function CreateMeeting() {
//     const [form, setForm] = useState({
//         title: "",
//         type: "",
//         participants: "",
//         notes: "",
//     });

//     const [file, setFile] = useState(null);
//     const [loading, setLoading] = useState(false);

//     const navigate = useNavigate();

//     //  Manual flow
//     const handleSubmit = async () => {
//         try {
//             setLoading(true);

//             const payload = {
//                 ...form,
//                 participants: form.participants.split(","),
//             };

//             const res = await createMeeting(payload);
//             const id = res.data.meeting_id;

//             await processMeeting(id);

//             navigate(`/meeting/${id}`);
//         } catch (err) {
//             console.error(err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     //  Upload flow
//     const handleUpload = async () => {
//         if (!file) return alert("Please select a file");

//         try {
//             setLoading(true);

//             const formData = new FormData();
//             formData.append("file", file);

//             //   const res = await fetch(
//             //     "http://localhost:8000/meetings/upload",
//             //     {
//             //       method: "POST",
//             //       body: formData,
//             //     }
//             //   );

//             const res = await fetch(
//                 `${import.meta.env.VITE_API_URL}/meetings/upload`,
//                 {
//                     method: "POST",
//                     body: formData,
//                 }
//             );

//             const data = await res.json();
//             const id = data.meeting_id;

//             //  IMPORTANT: still run LLM processing
//             await processMeeting(id);

//             navigate(`/meeting/${id}`);
//         } catch (err) {
//             console.error(err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="p-6 space-y-6">

//             <h1 className="text-2xl font-bold">Create Meeting</h1>

//             {/* ================= MANUAL FORM ================= */}
//             <div className="border p-4 rounded">
//                 <h2 className="font-semibold mb-2">Manual Entry</h2>

//                 <input
//                     placeholder="Title"
//                     className="border p-2 w-full mb-2"
//                     onChange={(e) => setForm({ ...form, title: e.target.value })}
//                 />

//                 <input
//                     placeholder="Type"
//                     className="border p-2 w-full mb-2"
//                     onChange={(e) => setForm({ ...form, type: e.target.value })}
//                 />

//                 <input
//                     placeholder="Participants (comma separated)"
//                     className="border p-2 w-full mb-2"
//                     onChange={(e) =>
//                         setForm({ ...form, participants: e.target.value })
//                     }
//                 />

//                 <textarea
//                     placeholder="Meeting Notes"
//                     className="border p-2 w-full mb-2"
//                     rows={6}
//                     onChange={(e) => setForm({ ...form, notes: e.target.value })}
//                 />

//                 <button
//                     onClick={handleSubmit}
//                     className="bg-blue-500 text-white px-4 py-2"
//                 >
//                     Generate from Notes
//                 </button>
//             </div>

//             {/* ================= FILE UPLOAD ================= */}
//             <div className="border p-4 rounded">
//                 <h2 className="font-semibold mb-2">Upload Minutes File</h2>

//                 <input
//                     type="file"
//                     accept=".txt"
//                     onChange={(e) => setFile(e.target.files[0])}
//                     className="mb-2"
//                 />

//                 <button
//                     onClick={handleUpload}
//                     className="bg-purple-500 text-white px-4 py-2"
//                 >
//                     Upload & Generate
//                 </button>
//             </div>

//             {loading && <p className="text-gray-500">Processing...</p>}
//         </div>
//     );
// }







import { useState } from "react";
import { createMeeting, processMeeting, uploadMeeting } from "../api/api";
import { useNavigate } from "react-router-dom";
import { Upload, FileText, Loader2 } from "lucide-react"; // Optional: for soft icons

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

    const handleUpload = async () => {
        if (!file) return alert("Please select a file");
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("file", file);

            const res = await uploadMeeting(formData);
            const id = res.data.meeting_id;
            await processMeeting(id);
            navigate(`/meeting/${id}`);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Shared Tailwind styles for consistency
    const inputStyle = "w-full bg-white/50 border border-[#EAE7DF] rounded-xl px-4 py-3 text-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#6B705C]/20 focus:border-[#6B705C] transition-all placeholder:text-[#A3A199]";
    const cardStyle = "bg-white/40 backdrop-blur-sm border border-white rounded-2xl p-8 shadow-sm transition-all hover:shadow-md";

    return (
        <div className="min-h-screen bg-[#FAF9F6] pt-24 pb-12 px-6">
            <div className="max-w-4xl mx-auto">
                <header className="mb-10">
                    <h1 className="text-3xl font-serif font-light text-[#2D2D2D]">New Meeting</h1>
                    <p className="text-[#706C61] mt-2 font-light">Choose a method to generate your summary.</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                    
                    {/* Manual Form */}
                    <div className={cardStyle}>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-[#EFEBE3] rounded-lg text-[#6B705C]">
                                <FileText size={20} />
                            </div>
                            <h2 className="font-medium text-[#2D2D2D]">Manual Entry</h2>
                        </div>

                        <div className="space-y-4">
                            <input
                                placeholder="Meeting Title"
                                className={inputStyle}
                                onChange={(e) => setForm({ ...form, title: e.target.value })}
                            />
                            <input
                                placeholder="Type (e.g. Brainstorming)"
                                className={inputStyle}
                                onChange={(e) => setForm({ ...form, type: e.target.value })}
                            />
                            <input
                                placeholder="Participants (comma separated)"
                                className={inputStyle}
                                onChange={(e) => setForm({ ...form, participants: e.target.value })}
                            />
                            <textarea
                                placeholder="Paste your meeting notes here..."
                                className={`${inputStyle} resize-none`}
                                rows={6}
                                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                            />
                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="w-full py-3 bg-[#6B705C] text-white rounded-xl font-medium hover:bg-[#5B604C] transition-all shadow-lg shadow-[#6B705C]/10 flex items-center justify-center gap-2"
                            >
                                {loading ? <Loader2 className="animate-spin" size={18} /> : "Generate from Notes"}
                            </button>
                        </div>
                    </div>

                    {/* File Upload */}
                    <div className={cardStyle}>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-[#EFEBE3] rounded-lg text-[#6B705C]">
                                <Upload size={20} />
                            </div>
                            <h2 className="font-medium text-[#2D2D2D]">Upload Minutes</h2>
                        </div>

                        <div className="flex flex-col items-center justify-center border-2 border-dashed border-[#EAE7DF] rounded-2xl p-10 bg-[#FDFBF7]/50 transition-colors hover:bg-white/60">
                            <input
                                type="file"
                                id="file-upload"
                                accept=".txt"
                                className="hidden"
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                            <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-[#EAE7DF] mb-4">
                                    <Upload size={20} className="text-[#8C7E6A]" />
                                </div>
                                <span className="text-[#706C61] text-sm">
                                    {file ? file.name : "Select a .txt file"}
                                </span>
                            </label>
                        </div>

                        <button
                            onClick={handleUpload}
                            disabled={loading || !file}
                            className="w-full mt-6 py-3 bg-[#EFEBE3] text-[#6B705C] rounded-xl font-medium hover:bg-[#E7E2D8] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {loading ? <Loader2 className="animate-spin" size={18} /> : "Upload & Generate"}
                        </button>
                    </div>

                    {/* Loading Overlay */}
                    {loading && (
                        <div className="absolute inset-0 bg-[#FAF9F6]/60 backdrop-blur-[2px] z-10 flex items-center justify-center rounded-2xl">
                             <div className="flex flex-col items-center gap-2">
                                <Loader2 className="animate-spin text-[#6B705C]" size={32} />
                                <p className="text-[#6B705C] font-medium text-sm">Whispering to the AI...</p>
                             </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}