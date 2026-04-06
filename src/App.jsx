import { useState, useEffect } from "react";
import SummaryCard from "./components/SummaryCard";
import RoleSwitcher from "./components/RoleSwitcher";
import TransactionTable from "./components/TransactionTable";
import BalanceChart from "./components/Charts/BalanceChart";
import CategoryChart from "./components/Charts/CategoryChart";
import Insights from "./components/Insights";
import "./styles/dashboard.css";

export default function App() {
  const [role, setRole] = useState("viewer");
  const [theme, setTheme] = useState("light");

  // Load saved theme
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) setTheme(saved);
  }, []);

  // Apply theme
  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Mock transactions
  const transactions = [
    { date: "2026-04-01", category: "Food", type: "expense", amount: 50 },
    { date: "2026-04-02", category: "Salary", type: "income", amount: 2000 },
    { date: "2026-04-03", category: "Entertainment", type: "expense", amount: 100 },
    { date: "2026-04-04", category: "Investment", type: "income", amount: 500 },
    { date: "2026-04-05", category: "Shopping", type: "expense", amount: 150 },
  ];

  // Summary calculations
  const income = transactions.filter(t => t.type === "income").reduce((a, b) => a + b.amount, 0);
  const expenses = transactions.filter(t => t.type === "expense").reduce((a, b) => a + b.amount, 0);
  const balance = income - expenses;
  const balanceData = transactions.map((t, i) => ({
  date: t.date,
  balance: transactions.slice(0, i + 1).reduce(
    (sum, curr) => (curr.type === "income" ? sum + curr.amount : sum - curr.amount),
    0
  ),
}));
const categoryData = Object.values(
  transactions
    .filter(t => t.type === "expense")
    .reduce((acc, curr) => {
      if (!acc[curr.category]) acc[curr.category] = { name: curr.category, value: 0 };
      acc[curr.category].value += curr.amount;
      return acc;
    }, {})
);

  return (
    <div className="dashboard" style={{ padding: "20px" }}>
      {/* Header */}
      <div className="header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Finance Dashboard</h1>
        <div className="controls" style={{ display: "flex", alignItems: "center" }}>
          <RoleSwitcher role={role} setRole={setRole} />
          <button
            style={{ marginLeft: "10px", padding: "8px 12px" }}
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>
        </div>
      </div>

      {/* Current Role Display */}
      <p style={{ fontStyle: "italic", marginTop: "5px" }}>Current Role: {role.toUpperCase()}</p>

      {/* Summary Cards */}
      <div className="cards-container" style={{ display: "flex", gap: "15px", marginTop: "20px" }}>
        <SummaryCard title="Balance" value={balance} />
        <SummaryCard title="Income" value={income} />
        <SummaryCard title="Expenses" value={expenses} />
      </div>

 
      <div className="charts" style={{ display: "flex", gap: "30px", marginTop: "40px", flexWrap: "wrap" }}>
        <BalanceChart data={balanceData || []} />
        <CategoryChart data={categoryData || []} />
      </div>
      <Insights transactions={transactions} />
      {/* Transactions Table */}
      <TransactionTable transactions={transactions} role={role} />
    </div>
  );
}