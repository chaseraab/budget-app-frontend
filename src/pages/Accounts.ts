import type { Account } from "../types/Account";

const API_URL = "http://localhost:8080/api/accounts/all";

export async function renderAccountsPage(app: HTMLElement) {
  app.innerHTML = "";

  const heading = document.createElement("h1");
  heading.textContent = "Accounts";

  const list = document.createElement("ul");

  try {
    const response = await fetch(API_URL);
    const accounts: Account[] = await response.json();

    for (const account of accounts) {
      const li = document.createElement("li");
      li.textContent = account.name;
      list.appendChild(li);
    }
  } catch {
    const error = document.createElement("p");
    error.textContent = "Failed to load accounts";
    app.appendChild(error);
    return;
  }

  app.appendChild(heading);
  app.appendChild(list);
}