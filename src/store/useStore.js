import { create } from "zustand";
import { mockTransactions } from "../data/mockData";

export const useStore = create((set) => ({
  transactions: mockTransactions,
  role: "viewer",
  filter: "all",
  search: "",

  setRole: (role) => set({ role }),
  setFilter: (filter) => set({ filter }),
  setSearch: (search) => set({ search }),

  addTransaction: (txn) =>
    set((state) => ({
      transactions: [...state.transactions, txn],
    })),

  deleteTransaction: (id) =>
    set((state) => ({
      transactions: state.transactions.filter((t) => t.id !== id),
    })),
}));