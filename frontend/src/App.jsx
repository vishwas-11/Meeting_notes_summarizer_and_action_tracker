// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import CreateMeeting from "./pages/CreateMeeting";
// import MeetingDetails from "./pages/MeetingDetails";
// import ActionsDashboard from "./pages/ActionsDashboard";
// import History from "./pages/History";
// import Navbar from "./components/Navbar";
// import Landing from "./pages/Landing"

// function App() {
//   return (
//     <BrowserRouter>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<CreateMeeting />} />
//         <Route path="/meeting/:id" element={<MeetingDetails />} />
//         <Route path="/actions" element={<ActionsDashboard />} />
//         <Route path="/history" element={<History />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;




import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing"; // Now the first thing people see
import CreateMeeting from "./pages/CreateMeeting";
import MeetingDetails from "./pages/MeetingDetails";
import ActionsDashboard from "./pages/ActionsDashboard";
import History from "./pages/History";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      {/* Pro Tip: Use a "Layout" component if you only want the 
         Navbar to show up once the user enters the app, 
         keeping the landing page clean and immersive.
      */}
      <Navbar /> 
      
      <Routes>
        {/* The Landing Page is now the Entry Point */}
        <Route path="/" element={<Landing />} />

        {/* The Application Features move to specific paths */}
        <Route path="/summarize" element={<CreateMeeting />} />
        <Route path="/meeting/:id" element={<MeetingDetails />} />
        <Route path="/actions" element={<ActionsDashboard />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;