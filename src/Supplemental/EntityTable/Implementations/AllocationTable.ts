import type { Allocation } from "../../../types/Allocation";
import { createEntityTable } from "../EntityTable.js";

const GET_URL = "http://localhost:8080/api/allocations/all";

export async function generateAllocationTable() {

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

    return table;
}