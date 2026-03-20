export default function StatusBadge({ status }) {
  const colors = {
    Pending: "bg-yellow-200 text-yellow-800",
    "In Progress": "bg-blue-200 text-blue-800",
    Done: "bg-green-200 text-green-800",
  };

  return (
    <span className={`px-2 py-1 rounded text-sm ${colors[status]}`}>
      {status}
    </span>
  );
}