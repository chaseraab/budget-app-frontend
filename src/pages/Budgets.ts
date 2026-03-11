import type { Budget } from "../types/Budget";
import { createParentTable } from "../Supplemental/ParentTable/ParentTable.js";

const GET_URL = "http://localhost:8080/api/budgets/all";

export async function renderBudgetsPage(app: HTMLElement) {
    app.innerHTML = "";

    const pageContainer = document.createElement("div");
    pageContainer.className = "page-container";
    app.appendChild(pageContainer);

    const heading = document.createElement("h1");
    heading.textContent = "Budgets";
    pageContainer.appendChild(heading);

    const tableContainer = document.createElement("div");
    tableContainer.className = "table-container";
    pageContainer.appendChild(tableContainer);

    const response = await fetch(GET_URL);
    const data: Budget[] = await response.json();

    var table = createParentTable<Budget>(data, {
        baseURL: "http://localhost:8080/api/budgets",
        entityName: "budget",
        columns: [
            {
                header: "Name",
                field: "name",
                input: (value: string) => {
                    const i = document.createElement("input");
                    i.value = value;
                    i.name = "name";
                    return i;
                },
                getValue: (i) => (i as HTMLInputElement).value
            },
            {
                header: "Month",
                field: "month",
                input: (value) => {
                    const i = document.createElement("input");
                    i.type = "month";
                    i.value = String(value);
                    i.name = "month";
                    return i;
                },
                getValue: (i) => (i as HTMLInputElement).value
            }
        ]
    }); 
    tableContainer.appendChild(table);
}