import { generateAllocationTable } from "../Supplemental/EntityTable/Implementations/AllocationTable.js";
import { generateIncomeTable } from "../Supplemental/EntityTable/Implementations/IncomeTable.js";
import { generateAccountTable } from "../Supplemental/EntityTable/Implementations/AccountTable.js";


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

    const allocationTable = await generateAllocationTable();
    allocationTable.className = "allocation-table";
    leftTableContainer.appendChild(allocationTable);

    const accountTable = await generateAccountTable();
    accountTable.className = "account-table";
    rightTableContainer.appendChild(accountTable);

    const incomeTable = await generateIncomeTable();
    incomeTable.className = "income-table";
    rightTableContainer.appendChild(incomeTable);

    const summaryContainer = document.createElement("div");
    summaryContainer.className = "summary-container";
    pageContainer.appendChild(summaryContainer);

    
}