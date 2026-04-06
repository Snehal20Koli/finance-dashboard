// src/components/RoleSwitcher.jsx
export default function RoleSwitcher({ role, setRole }) {
  return (
    <select
      value={role}
      onChange={(e) => setRole(e.target.value)}
      style={{
        padding: "8px 12px",
        borderRadius: "6px",
        border: "1px solid #ccc",
        background: "white",
        cursor: "pointer",
      }}
    >
      <option value="viewer">Viewer</option>
      <option value="admin">Admin</option>
    </select>
  );
}