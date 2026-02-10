import { renderAccountsPage } from "@pages/Accounts.js";
const root = document.getElementById("root")!;

function renderHomePage() {
    root.innerHTML = "";

    const accountButton = document.createElement("button");
    accountButton.textContent = "Accounts";
    accountButton.addEventListener("click", () => {
        renderAccountsPage(root);
    });

    root?.appendChild(accountButton);
}

renderHomePage();