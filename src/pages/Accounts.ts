import type { Account } from "../types/Account";

const API_URL = "http://localhost:8080/api/accounts/all";



function createAccountTable(accounts: Account[]): HTMLTableElement {
    const table = document.createElement("table");

    // Create header row
    const headerRow = document.createElement("tr");
    table.appendChild(headerRow).appendChild(Object.assign(document.createElement("th"), { textContent: "Name" }));
    table.appendChild(headerRow).appendChild(Object.assign(document.createElement("th"), { textContent: "Type" }));
    table.appendChild(headerRow).appendChild(Object.assign(document.createElement("th"), { textContent: "Is Active?" }));

    // Create data rows
    for (const account of accounts) {
        const row = document.createElement("tr");
        row.appendChild(Object.assign(document.createElement("td"), { textContent: account.name }));
        row.appendChild(Object.assign(document.createElement("td"), { textContent: account.type }));
        row.appendChild(Object.assign(document.createElement("td"), { textContent: account.isActive ? "Yes" : "No" }));

        table.appendChild(row);
    }

    return table;
}

export async function renderAccountsPage(app: HTMLElement) {
  app.innerHTML = "";

  const pageContainer = document.createElement("div");
  pageContainer.className = "page-container";
  app.appendChild(pageContainer);

  const heading = document.createElement("h1");
  heading.textContent = "Accounts";
  pageContainer.appendChild(heading);

  const tableContainer = document.createElement("div");
  tableContainer.className = "table-container";
  pageContainer.appendChild(tableContainer);


  var table = document.createElement("table");

  try {
    const response = await fetch(API_URL);
    const accounts: Account[] = await response.json();

    table = createAccountTable(accounts);


  } catch {
    const error = document.createElement("p");
    error.textContent = "Failed to load accounts";
    app.appendChild(error);
    return;
  }
  
    tableContainer.appendChild(table);

}