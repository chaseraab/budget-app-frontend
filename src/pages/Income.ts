import { createEntityTable } from "../Supplemental/EntityTable/EntityTable.js";
import type { Income } from "../types/Income.js";
import type { Account } from "../types/Account.js";

const GET_URL = "http://localhost:8080/api/income/all";
const ACCOUNT_URL = "http://localhost:8080/api/accounts/all";

export async function renderIncomePage(app: HTMLElement) {
    app.innerHTML = "";

    const pageContainer = document.createElement("div");
    pageContainer.className = "page-container";
    app.appendChild(pageContainer);

    const heading = document.createElement("h1");
    heading.textContent = "Income";
    pageContainer.appendChild(heading);

    const tableContainer = document.createElement("div");
    tableContainer.className = "table-container";
    pageContainer.appendChild(tableContainer);

    var table = document.createElement("table");

    try {
        const accountResponse = await fetch(ACCOUNT_URL);
        const accounts: Account[] = await accountResponse.json();

        const accountsMap = new Map<number, string>();
        accounts.forEach(account => {
            accountsMap.set(account.id, account.name);
        });

        const response = await fetch(GET_URL);
        const data: Income[] = await response.json();
        table = createEntityTable<Income>(data, {
            baseURL: "http://localhost:8080/api/income",
            entityName: "income",
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
                    header: "Amount",
                    field: "amount",
                    input: (value) => {
                        const i = document.createElement("input");
                        i.type = "number";
                        i.value = String(value);
                        i.name = "amount";
                        return i;
                    },
                    getValue: (i) => parseFloat((i as HTMLInputElement).value)
                },
                {
                    header: "Recurring",
                    field: "isRecurring",
                    input: (value) => {
                        const i = document.createElement("input");
                        i.type = "checkbox";
                        i.checked = value;
                        i.name = "isRecurring";
                        return i;
                    },
                    getValue: (i) => (i as HTMLInputElement).checked
                },
                {
                    header: "Account",
                    field: "accountId",
                    render: (income) => accountsMap.get(income.accountId) || "Unknown",
                    input: (value) => {
                        const select = document.createElement("select");
                        select.name = "accountId";
                        accounts.forEach(account => {
                            const option = document.createElement("option");
                            option.value = String(account.id);
                            option.textContent = account.name;
                            if (account.id === value) {
                                option.selected = true;
                            }
                            select.appendChild(option);
                        });
                        return select;
                    },
                    getValue: (select) => parseInt((select as HTMLSelectElement).value)
                }
            ]
        
       });
    } catch {
        const error = document.createElement("p");
        error.textContent = "Failed to load income data";
        app.appendChild(error);
        return;
    }

    tableContainer.appendChild(table);
}