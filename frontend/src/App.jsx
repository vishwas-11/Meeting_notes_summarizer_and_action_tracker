// import { BrowserRouter, Routes, Route } from "react-router-dom";

// // Pages
// import Landing from "./pages/Landing";
// import CreateMeeting from "./pages/CreateMeeting";
// import MeetingDetails from "./pages/MeetingDetails";
// import ActionsDashboard from "./pages/ActionsDashboard";
// import History from "./pages/History";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";

// // Components
// import Navbar from "./components/Navbar";
// import ProtectedRoute from "./components/ProtectedRoute";

// function App() {
//   return (
//     <BrowserRouter>
//       <Navbar />

//       <Routes>
//         {/* -------- Public Routes -------- */}
//         <Route path="/" element={<Landing />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />

//         {/* -------- Protected Routes -------- */}
//         <Route
//           path="/summarize"
//           element={
//             <ProtectedRoute>
//               <CreateMeeting />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/meeting/:id"
//           element={
//             <ProtectedRoute>
//               <MeetingDetails />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/actions"
//           element={
//             <ProtectedRoute>
//               <ActionsDashboard />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/history"
//           element={
//             <ProtectedRoute>
//               <History />
//             </ProtectedRoute>
//           }
//         />
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
import BackgroundLayout from "./components/BackgroundLayout"; // <-- Added this

function App() {
  return (
    <BrowserRouter>
      {/* The BackgroundLayout is the 'Container'. 
          It stays active while the Routes inside it change.
      */}
      <BackgroundLayout>
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
      </BackgroundLayout>
    </BrowserRouter>
  );
}

export default App;