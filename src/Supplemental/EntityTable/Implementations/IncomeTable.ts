import { createEntityTable } from "../EntityTable.js";
import type { Income } from "../../../types/Income.js";
import type { Account } from "../../../types/Account.js";

const GET_URL = "http://localhost:8080/api/income/all";
const ACCOUNT_URL = "http://localhost:8080/api/accounts/all";

export async function generateIncomeTable(onDataChanged?: (updatedData: Income[]) => void) {

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
            ],
            onDataChanged
        
       });
    } catch (error) {
        console.error("Error fetching allocations:", error);
        table.innerHTML = "<tr><td colspan='2'>Failed to load allocations. Please try again later.</td></tr>";
    }

    return table;
}