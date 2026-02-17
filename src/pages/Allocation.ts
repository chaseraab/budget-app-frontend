import type { Allocation } from "../types/Allocation";
import { createEntityTable } from "../Supplemental/EntityTable/EntityTable.js";

const GET_URL = "http://localhost:8080/api/allocations/all";

export async function renderAllocationsPage(app: HTMLElement) {
    app.innerHTML = "";

    const pageContainer = document.createElement("div");
    pageContainer.className = "page-container";
    app.appendChild(pageContainer);

    const heading = document.createElement("h1");
    heading.textContent = "Allocations";
    pageContainer.appendChild(heading);

    const tableContainer = document.createElement("div");
    tableContainer.className = "table-container";
    pageContainer.appendChild(tableContainer);

    var table = document.createElement("table");

    try {
        const response = await fetch(GET_URL);
        const data: Allocation[] = await response.json();
        table = createEntityTable<Allocation>(data, {
            baseURL: "http://localhost:8080/api/allocations",
            entityName: "allocation",
            columns: [
                {
                    header: "Name",
                    field: "name",
                    input: (value) => {
                        const i = document.createElement("input");
                        i.value = value;
                        i.name = "name";
                        return i;
                    },
                    getValue: (i) => (i as HTMLInputElement).value
                },
                {
                    header: "Type",
                    field: "type",
                    input: (value) => {
                        const select = document.createElement("select");
                        select.name = "type";
                        ["need", "want", "save", "debt"].forEach(optionValue => {
                            const option = document.createElement("option");
                            option.value = optionValue;
                            option.textContent = optionValue;
                            if (optionValue === value) {
                                option.selected = true;
                            }
                            select.appendChild(option);
                        });
                        return select;
                    }
                },
                {
                    header: "Amount",
                    field: "amount",
                    input: (value) => {
                        const i = document.createElement("input");
                        i.type = "number";
                        i.value = String(value);
                        i.name = "amount";
                        return i;
                    },
                    getValue: (i) => (i as HTMLInputElement).value
                }
            ]
        });
    } catch (error) {
        console.error("Error fetching allocations:", error);
        table.innerHTML = "<tr><td colspan='2'>Failed to load allocations. Please try again later.</td></tr>";
    }

    tableContainer.appendChild(table);
}