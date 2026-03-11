import type { AllocationBudget } from "./AllocationBudget.js";
import type { IncomeBudget } from "./IncomeBudget.js";
import type { AccountBalance } from "./AccountBalance.js";

export type BudgetDetail = {
    id: number;
    name: string;
    month: string;
    income: IncomeBudget[];
    allocations: AllocationBudget[];
    startOfMonthBalances: AccountBalance[];
    endOfMonthBalances: AccountBalance[];
};
