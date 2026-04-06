import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

// Define some colors for categories

const COLORS_LIGHT = ["#4f46e5", "#9333ea", "#f43f5e"];
const COLORS_DARK = ["#818cf8", "#a78bfa", "#fb7185"];

const isDark = document.body.classList.contains("dark");

const COLORS = isDark ? COLORS_DARK : COLORS_LIGHT;
export default function CategoryChart({ data }) {
  if (!data || data.length === 0) return <p>No category data available</p>;

  return (
    <div className="chart"
      style={{
        flex: 1,
        minWidth: "300px",
        height: "300px",
        padding: "20px",
        background: "#fff",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
      }}
    >
      <h3>Spending by Category</h3>
      <ResponsiveContainer width="100%" height="80%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}