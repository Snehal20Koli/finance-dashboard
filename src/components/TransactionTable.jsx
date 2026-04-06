export default function TransactionTable({ transactions, role }) {
  return (
    <div className="table-container">
      <h2>Transactions</h2>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Type</th>
            <th style={{ textAlign: "right" }}>Amount</th>
            {role === "admin" && <th style={{ textAlign: "center" }}>Actions</th>}
          </tr>
        </thead>

        <tbody>
          {transactions.map((t, i) => (
            <tr key={i}>
              <td>{t.date}</td>
              <td>{t.category}</td>

              {/* 🔥 Badge */}
              <td>
                <span className={`badge ${t.type}`}>
                  {t.type}
                </span>
              </td>

              {/* 🔥 Colored amount */}
              <td className={t.type} style={{ textAlign: "right" }}>
                {t.type === "expense" ? "-" : "+"}${t.amount}
              </td>

              {role === "admin" && (
                <td style={{ textAlign: "center" }}>
                  <button className="edit-btn">Edit</button>
                  <button className="delete-btn">Delete</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}