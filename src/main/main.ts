import { renderAccountsPage } from "@pages/Accounts.js";
import { renderIncomePage } from "@pages/Income.js";
import { renderAllocationsPage } from "@pages/Allocation.js";
import { renderPlanningPage } from "@pages/Planning.js";

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

    const allocationButton = document.createElement("button");
    allocationButton.textContent = "Allocations";
    allocationButton.addEventListener("click", () => {
        renderAllocationsPage(root);
    });

    const planningButton = document.createElement("button");
    planningButton.textContent = "Planning";
    planningButton.addEventListener("click", () => {
        renderPlanningPage(root);
    });

    root?.appendChild(accountButton);
    root?.appendChild(incomeButton);
    root?.appendChild(allocationButton);
    root?.appendChild(planningButton);
}

renderHomePage();