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




// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Landing from "./pages/Landing"; // Now the first thing people see
// import CreateMeeting from "./pages/CreateMeeting";
// import MeetingDetails from "./pages/MeetingDetails";
// import ActionsDashboard from "./pages/ActionsDashboard";
// import History from "./pages/History";
// import Navbar from "./components/Navbar";

// function App() {
//   return (
//     <BrowserRouter>
      
//       <Navbar /> 
      
//       <Routes>
//         {/* The Landing Page is now the Entry Point */}
//         <Route path="/" element={<Landing />} />

//         {/* The Application Features move to specific paths */}
//         <Route path="/summarize" element={<CreateMeeting />} />
//         <Route path="/meeting/:id" element={<MeetingDetails />} />
//         <Route path="/actions" element={<ActionsDashboard />} />
//         <Route path="/history" element={<History />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;








import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Landing from "./pages/Landing";
import CreateMeeting from "./pages/CreateMeeting";
import MeetingDetails from "./pages/MeetingDetails";
import ActionsDashboard from "./pages/ActionsDashboard";
import History from "./pages/History";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// Components
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* -------- Public Routes -------- */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* -------- Protected Routes -------- */}
        <Route
          path="/summarize"
          element={
            <ProtectedRoute>
              <CreateMeeting />
            </ProtectedRoute>
          }
        />

        <Route
          path="/meeting/:id"
          element={
            <ProtectedRoute>
              <MeetingDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/actions"
          element={
            <ProtectedRoute>
              <ActionsDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;