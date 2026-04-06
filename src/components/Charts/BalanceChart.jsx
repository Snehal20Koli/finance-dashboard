import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

export default function BalanceChart({ data }) {
  if (!data || data.length === 0) return <p>No balance data available</p>;

  return (
    <div className="chart1"  style={{ flex: 1, minWidth: "300px", height: "300px", padding: "20px", background: "#fff", borderRadius: "10px", boxShadow: "0 4px 10px rgba(0,0,0,0.05)" }}>
      <h3 >Balance Trend</h3>
      <ResponsiveContainer width="100%" height="80%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="balance" stroke="#4f46e5" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}