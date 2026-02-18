import { generateAllocationTable } from "../Supplemental/EntityTable/Implementations/AllocationTable.js";
import { generateIncomeTable } from "../Supplemental/EntityTable/Implementations/IncomeTable.js";
import { generateAccountTable } from "../Supplemental/EntityTable/Implementations/AccountTable.js";
import type { Account } from "@models/Account.js";
import type { Income } from "@models/Income.js";
import type { Allocation } from "@models/Allocation.js";

let incomes: Income[] = [];
let allocations: Allocation[] = [];

function updateSummary() {
    const totalIncome = incomes.reduce((sum, i) => sum + i.amount, 0);
    console.log("Total Income:", totalIncome);
    const totalSpending = allocations.reduce((sum, a) => sum + a.amount, 0);
    const remainingIncome = totalIncome - totalSpending;
    console.log("Total Spending:", totalSpending);
    console.log("Remaining Income:", remainingIncome);
    const totalSavings = allocations.filter(a => a.type === "save").reduce((sum, a) => sum + a.amount, 0);
    console.log("Total Savings:", totalSavings);
    const totalNeeds = allocations.filter(a => a.type === "need").reduce((sum, a) => sum + a.amount, 0);
    console.log("Total Needs:", totalNeeds);
    const totalWants = allocations.filter(a => a.type === "want").reduce((sum, a) => sum + a.amount, 0);
    console.log("Total Wants:", totalWants);

    // summaryContainer.innerHTML = `
    //     <div>Total Income: $${totalIncome}</div>
    //     <div>Total Spending: $${totalSpending}</div>
    //     <div>Remaining Income: $${remainingIncome}</div>
    // `;
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

}