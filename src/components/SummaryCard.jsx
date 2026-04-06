import { FaDollarSign, FaMoneyBillWave, FaShoppingCart } from "react-icons/fa";

export default function SummaryCard({ title, value }) {
  const getIcon = () => {
    if (title === "Balance") return <FaDollarSign />;
    if (title === "Income") return <FaMoneyBillWave />;
    if (title === "Expenses") return <FaShoppingCart />;
  };

  return (
    <div className="summary-card">
      <div className="card-top">
        <span className="icon">{getIcon()}</span>
        <span className="title">{title}</span>
      </div>

      <h2 className="value">${value}</h2>
    </div>
  );
}