import type { Account } from "../../../types/Account";
import { createEntityTable } from "../EntityTable.js";

const GET_URL = "http://localhost:8080/api/accounts/all";

export async function generateAccountTable() {

  var table = document.createElement("table");

  try {
    const response = await fetch(GET_URL);
    const accounts: Account[] = await response.json();

    // table = createAccountTable(accounts);
    table = createEntityTable<Account>(accounts, {
        baseURL: "http://localhost:8080/api/accounts",
        entityName: "account",
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
                    ["saving", "checking", "debt", "credit card", "debit card", "investment"].forEach(optionValue => {
                        const option = document.createElement("option");
                        option.value = optionValue;
                        option.textContent = optionValue;
                        if (optionValue === value) {
                            option.selected = true;
                        }
                        select.appendChild(option);
                    });
                    return select;
                },
                getValue: (select) => (select as HTMLSelectElement).value
            },
            {
                header: "Active",
                field: "isActive",
                render: (a) => a.isActive ? "Yes" : "No",
                input: (value) => {
                    const i = document.createElement("input");
                    i.type = "checkbox";
                    i.checked = value;
                    i.name = "isActive";
                    return i;
                },
                getValue: (i) => (i as HTMLInputElement).checked
            }
        ]
    });

    } catch (error) {
        console.error("Error fetching allocations:", error);
        table.innerHTML = "<tr><td colspan='2'>Failed to load allocations. Please try again later.</td></tr>";
    }
  
    return table;

}