import type { Transaction } from "./Transaction.js";

export type AllocationBudget = {
    id: number;
    name: string;
    type: string;        // "need" | "want" | "save" | "debt"
    amount: number;
    budgetId: number;
    transactions: Transaction[];
};
