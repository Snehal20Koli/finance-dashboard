// src/components/Insights.jsx
import React from "react";

export default function Insights({ transactions }) {
  if (!transactions || transactions.length === 0) return <p>No transactions to analyze</p>;

  // Total income and expenses
  const income = transactions
    .filter(t => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);
  const expenses = transactions
    .filter(t => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  // Highest spending category
  const expenseByCategory = transactions
    .filter(t => t.type === "expense")
    .reduce((acc, curr) => {
      if (!acc[curr.category]) acc[curr.category] = 0;
      acc[curr.category] += curr.amount;
      return acc;
    }, {});
  const highestCategory = Object.entries(expenseByCategory).reduce(
    (max, curr) => (curr[1] > max[1] ? curr : max),
    ["None", 0]
  );

  return (
    <div className="ins"
      style={{
        marginTop: "40px",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
      }}
    >
      <h3>Insights</h3>
      <p>Total Income: ${income}</p>
      <p>Total Expenses: ${expenses}</p>
      <p>Highest Spending Category: {highestCategory[0]} (${highestCategory[1]})</p>
    </div>
  );
}