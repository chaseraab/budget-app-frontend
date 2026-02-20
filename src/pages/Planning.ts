import { generateAllocationTable } from "../Supplemental/EntityTable/Implementations/AllocationTable.js";
import { generateIncomeTable } from "../Supplemental/EntityTable/Implementations/IncomeTable.js";
import { generateAccountTable } from "../Supplemental/EntityTable/Implementations/AccountTable.js";
import { createSummaryTable } from "../Supplemental/Planning/SummaryTable.js";
import { createSpendingBreakdownTable } from "../Supplemental/Planning/SpendingBreakdownTable.js";

import type { Account } from "@models/Account.js";
import type { Income } from "@models/Income.js";
import type { Allocation } from "@models/Allocation.js";

let incomes: Income[] = [];
let allocations: Allocation[] = [];

let updateSummaryTable: ((totals: {
    totalIncome: number;
    totalSpending: number;
    remainingIncome: number;
}) => void) | undefined;

let updateSpendingBreakdownTable: ((totals: {
    totalNeed: number;
    totalWant: number;
    totalSave: number;
}) => void) | undefined;

function renderSummary(value: number) {
    return `$${value.toFixed(2)}`;
}

function updateSummary() {
    if (!updateSummaryTable) return;

    const totalIncome = incomes.reduce((sum, i) => sum + i.amount, 0);
    const totalSpending = allocations.reduce((sum, a) => sum + a.amount, 0);
    const remainingIncome = totalIncome - totalSpending;

    updateSummaryTable({
        totalIncome,
        totalSpending,
        remainingIncome
    });

    if (updateSpendingBreakdownTable) {
        const totalNeed = allocations.filter(a => a.type === "need").reduce((sum, a) => sum + a.amount, 0);
        const totalWant = allocations.filter(a => a.type === "want").reduce((sum, a) => sum + a.amount, 0);
        const totalSave = allocations.filter(a => a.type === "save").reduce((sum, a) => sum + a.amount, 0);
        updateSpendingBreakdownTable({
            totalNeed,
            totalWant,
            totalSave
        });
    }
}
export async function renderPlanningPage(app: HTMLElement) {
    app.innerHTML = "";

    const pageContainer = document.createElement("div");
    pageContainer.className = "page-container";
    app.appendChild(pageContainer);

    const headerContainer = document.createElement("div");
    headerContainer.className = "header-container";
    pageContainer.appendChild(headerContainer);

    const heading = document.createElement("h1");
    heading.textContent = "Planning";
    headerContainer.appendChild(heading);

    const tablesContainer = document.createElement("div");
    tablesContainer.className = "tables-container";
    pageContainer.appendChild(tablesContainer);

    const leftTableContainer = document.createElement("div");
    leftTableContainer.className = "tables-container-left";
    tablesContainer.appendChild(leftTableContainer);

    const rightTableContainer = document.createElement("div");
    rightTableContainer.className = "tables-container-right";
    tablesContainer.appendChild(rightTableContainer);

    const allocationTable = await generateAllocationTable((updatedAllocations) => {
        allocations = updatedAllocations;
        console.log("Updated Allocations:", allocations);
        updateSummary();
    });
    allocationTable.className = "allocation-table";
    leftTableContainer.appendChild(allocationTable);

    const accountTable = await generateAccountTable();
    accountTable.className = "account-table";
    rightTableContainer.appendChild(accountTable);

    const incomeTable = await generateIncomeTable((updatedIncomes) => {
        incomes = updatedIncomes;
        updateSummary();
    });
    incomeTable.className = "income-table";
    rightTableContainer.appendChild(incomeTable);

    const summaryContainer = document.createElement("div");
    summaryContainer.className = "summary-container";
    rightTableContainer.appendChild(summaryContainer);

    const { table: spendingBreakdownTable, update: updateSpendingBreakdown } = createSpendingBreakdownTable();
    summaryContainer.appendChild(spendingBreakdownTable);
    updateSpendingBreakdownTable = updateSpendingBreakdown;
    updateSummary();

    const { table: summaryTable, update } = createSummaryTable();
    updateSummaryTable = update;
    summaryContainer.appendChild(summaryTable);
    updateSummary();


}