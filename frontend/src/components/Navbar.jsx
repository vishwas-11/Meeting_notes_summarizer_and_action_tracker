import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="bg-black text-white p-4 flex gap-6">
      <Link to="/">Create</Link>
      <Link to="/actions">Actions</Link>
      <Link to="/history">History</Link>
    </div>
  );
}