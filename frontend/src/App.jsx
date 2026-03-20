import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateMeeting from "./pages/CreateMeeting";
import MeetingDetails from "./pages/MeetingDetails";
import ActionsDashboard from "./pages/ActionsDashboard";
import History from "./pages/History";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<CreateMeeting />} />
        <Route path="/meeting/:id" element={<MeetingDetails />} />
        <Route path="/actions" element={<ActionsDashboard />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;