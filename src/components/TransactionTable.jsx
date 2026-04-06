import React, { useState } from "react";

export default function TransactionTable({ transactions = [], role }) {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [sortBy, setSortBy] = useState("");

  // 🔍 FILTER + SEARCH
  const filtered = transactions
    .filter((t) => {
      const matchesSearch =
        t.category.toLowerCase().includes(search.toLowerCase()) ||
        t.type.toLowerCase().includes(search.toLowerCase());

      const matchesType =
        filterType === "all" ? true : t.type === filterType;

      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      if (sortBy === "amount") return b.amount - a.amount;
      if (sortBy === "date") return new Date(b.date) - new Date(a.date);
      return 0;
    });

  return (
    <div className="table-container">
      <h2>Transactions</h2>

      {/* 🔎 Controls */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "15px", flexWrap: "wrap" }}>
        
        {/* Search */}
        <input
          type="text"
          placeholder="Search category or type..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
        />

        {/* Filter */}
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          style={{ padding: "8px", borderRadius: "6px" }}
        >
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{ padding: "8px", borderRadius: "6px" }}
        >
          <option value="">Sort By</option>
          <option value="amount">Amount</option>
          <option value="date">Date</option>
        </select>
      </div>

      {/* 📋 Table */}
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Type</th>
            <th style={{ textAlign: "right" }}>Amount</th>
            {role === "admin" && <th>Actions</th>}
          </tr>
        </thead>

        <tbody>
          {filtered.map((t, i) => (
            <tr key={i}>
              <td>{t.date}</td>
              <td>{t.category}</td>
              <td>
                <span className={`badge ${t.type}`}>
                  {t.type}
                </span>
              </td>
              <td
                className={t.type}
                style={{ textAlign: "right" }}
              >
                ${t.amount}
              </td>

              {role === "admin" && (
                <td>
                  <button className="edit-btn">Edit</button>
                  <button className="delete-btn">Delete</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* ❗ Empty State */}
      {filtered.length === 0 && (
        <p style={{ marginTop: "10px", color: "gray" }}>
          No transactions found
        </p>
      )}
    </div>
  );
}