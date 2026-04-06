import { useStore } from "../store/useStore";
import SummaryCard from "../components/SummaryCard";
import TransactionTable from "../components/TransactionTable";
import RoleSwitcher from "../components/RoleSwitcher";
import BalanceChart from "../components/Charts/BalanceChart";
import CategoryChart from "../components/Charts/CategoryChart";
import Insights from "../components/Insights";

export default function Dashboard() {
  const transactions = useStore((s) => s.transactions);

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  const balance = income - expenses;

  const chartData = transactions.map((t, i) => ({
    date: t.date,
    balance: transactions
      .slice(0, i + 1)
      .reduce((sum, curr) => {
        return curr.type === "income"
          ? sum + curr.amount
          : sum - curr.amount;
      }, 0),
  }));

  const categoryData = Object.values(
    transactions
      .filter((t) => t.type === "expense")
      .reduce((acc, curr) => {
        if (!acc[curr.category])
          acc[curr.category] = { name: curr.category, value: 0 };
        acc[curr.category].value += curr.amount;
        return acc;
      }, {})
  );

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-black space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
          Finance Dashboard
        </h1>
        <RoleSwitcher />
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <SummaryCard title="Balance" value={balance} />
        <SummaryCard title="Income" value={income} />
        <SummaryCard title="Expenses" value={expenses} />
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-5">
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-md">
          <h2 className="mb-3 text-gray-700 dark:text-gray-200 font-semibold">
            Balance Trend
          </h2>
          <BalanceChart data={chartData} />
        </div>

        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-md">
          <h2 className="mb-3 text-gray-700 dark:text-gray-200 font-semibold">
            Category Breakdown
          </h2>
          <CategoryChart data={categoryData} />
        </div>
      </div>

      {/* Insights */}
      <Insights transactions={transactions} />

      {/* Table */}
      <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-md">
        <h2 className="mb-3 text-gray-700 dark:text-gray-200 font-semibold">
          Transactions
        </h2>
        <TransactionTable />
      </div>
    </div>
  );
}