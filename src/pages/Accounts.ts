import type { Account } from "../types/Account";

const GET_URL = "http://localhost:8080/api/accounts/all";
const POST_URL = "http://localhost:8080/api/accounts/new";
const DELETE_URL = "http://localhost:8080/api/accounts/delete/";
const UPDATE_URL = "http://localhost:8080/api/accounts/update/";

function enableClickOff(element: HTMLElement, callback: () => void) {
    function handler(event: MouseEvent) {
        if (!element.contains(event.target as Node)) {
            callback();
            document.removeEventListener("pointerdown", handler);
        }
    }

    document.addEventListener("pointerdown", handler);
}

function createDisplayRow(account: Account): HTMLTableRowElement {
    const row = document.createElement("tr");
    row.appendChild(Object.assign(document.createElement("td"), { textContent: account.name, onclick: () => {
    const editRow = createEditRow(account);
    row.replaceWith(editRow);

    // Delay so this click doesn’t instantly trigger click-off
    setTimeout(() => {
        enableClickOff(editRow, () => {
            editRow.replaceWith(createDisplayRow(account));
        });
    }, 0);
}}));
    row.appendChild(Object.assign(document.createElement("td"), { textContent: account.type, onclick: () => {
    const editRow = createEditRow(account);
    row.replaceWith(editRow);

    // Delay so this click doesn’t instantly trigger click-off
    setTimeout(() => {
        enableClickOff(editRow, () => {
            editRow.replaceWith(createDisplayRow(account));
        });
    }, 0);
}}));
    row.appendChild(Object.assign(document.createElement("td"), { textContent: account.isActive ? "Yes" : "No", onclick: () => {
    const editRow = createEditRow(account);
    row.replaceWith(editRow);

    // Delay so this click doesn’t instantly trigger click-off
    setTimeout(() => {
        enableClickOff(editRow, () => {
            editRow.replaceWith(createDisplayRow(account));
        });
    }, 0);
}}));
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", async () => {
    try {
        if (confirm(`Are you sure you want to delete account "${account.name}"?`)) {
            const response = await fetch(DELETE_URL + account.id, {
            method: "DELETE",
        });
        if (response.ok) {
            row.remove();
        }}
    } catch (error) {                
        console.error("Error deleting account:", error);
        }
    });
    row.appendChild(deleteButton);

    return row;
}

function createEditRow(account: Account): HTMLTableRowElement {
    const row = document.createElement("tr");

    const nameInput = document.createElement("input");
    nameInput.value = account.name;
    const nameCell = document.createElement("td");
    nameCell.appendChild(nameInput);
    row.appendChild(nameCell);

    const typeInput = document.createElement("input");
    typeInput.value = account.type;
    const typeCell = document.createElement("td");
    typeCell.appendChild(typeInput);
    row.appendChild(typeCell);
    
    const isActiveInput = document.createElement("input");
    isActiveInput.type = "checkbox";
    isActiveInput.checked = account.isActive;
    const isActiveCell = document.createElement("td");
    isActiveCell.appendChild(isActiveInput);
    row.appendChild(isActiveCell);

    const saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    saveButton.addEventListener("click", async () => {
        const updatedAccount: Account = {
            id: account.id,
            name: nameInput.value,
            type: typeInput.value,
            isActive: isActiveInput.checked,
        };
        try {
            const response = await fetch(UPDATE_URL + account.id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedAccount),
            });
            if (response.ok) {
                const updatedAccountFromServer = await response.json();
                const newRow = createDisplayRow(updatedAccountFromServer);
                row.replaceWith(newRow);
            } else {
                alert("Failed to update account");
            }
        } catch (error) {
            console.error("Error updating account:", error);
        }
    });
    row.appendChild(saveButton);
    const cancelButton = document.createElement("button");
    cancelButton.textContent = "Cancel";
    cancelButton.addEventListener("click", () => {
        const displayRow = createDisplayRow(account);
        row.replaceWith(displayRow);
    });
    row.appendChild(cancelButton);
    return row;
}

function createEntryRow(table: HTMLTableElement): HTMLTableRowElement {
    const entryRow = document.createElement("tr");

    const nameInput = document.createElement("input");
    nameInput.placeholder = "Name";
    const nameCell = document.createElement("td");
    nameCell.appendChild(nameInput);
    entryRow.appendChild(nameCell);

    const typeInput = document.createElement("input");
    typeInput.placeholder = "Type";
    const typeCell = document.createElement("td");
    typeCell.appendChild(typeInput);
    entryRow.appendChild(typeCell);

    const isActiveInput = document.createElement("input");
    isActiveInput.type = "checkbox";
    const isActiveCell = document.createElement("td");
    isActiveCell.appendChild(isActiveInput);
    entryRow.appendChild(isActiveCell);
    
    // Add event listener for addButton here

    const addButton = document.createElement("button");
    addButton.textContent = "Add";
    addButton.addEventListener("click", async () => {
        const newAccount: Account = {
            id: 0, 
            name: nameInput.value,
            type: typeInput.value,
            isActive: isActiveInput.checked,
        };
        try {
            const response = await fetch(POST_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newAccount),
            });
                if (response.ok) {
                    const createdAccount = await response.json();
                    const newRow = createDisplayRow(createdAccount);
                    
                    table.insertBefore(newRow, entryRow);
                    
                    // Clear input fields
                    nameInput.value = "";
                    typeInput.value = "";
                    isActiveInput.checked = false;
                } else {
                    alert("Failed to add account");
                }
        } catch (error) {
            console.error("Error adding account:", error);
        }
    })
    entryRow.appendChild(addButton);

    return entryRow;
}

function createAccountTable(accounts: Account[]): HTMLTableElement {
    const table = document.createElement("table");

    // Create header row
    const headerRow = document.createElement("tr");
    table.appendChild(headerRow).appendChild(Object.assign(document.createElement("th"), { textContent: "Name" }));
    table.appendChild(headerRow).appendChild(Object.assign(document.createElement("th"), { textContent: "Type" }));
    table.appendChild(headerRow).appendChild(Object.assign(document.createElement("th"), { textContent: "Is Active?" }));

    // Create data rows
    for (const account of accounts) {
            table.appendChild(createDisplayRow(account));
    }
    table.appendChild(createEntryRow(table));

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
    const response = await fetch(GET_URL);
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