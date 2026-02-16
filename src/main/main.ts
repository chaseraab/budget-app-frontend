import { renderAccountsPage } from "@pages/Accounts.js";
import { renderIncomePage } from "@pages/Income.js";
const root = document.getElementById("root")!;

function renderHomePage() {
    root.innerHTML = "";

    const accountButton = document.createElement("button");
    accountButton.textContent = "Accounts";
    accountButton.addEventListener("click", () => {
        renderAccountsPage(root);
    });

    const incomeButton = document.createElement("button");
    incomeButton.textContent = "Income";
    incomeButton.addEventListener("click", () => {
        renderIncomePage(root)
    });

    root?.appendChild(accountButton);
    root?.appendChild(incomeButton);
}

renderHomePage();