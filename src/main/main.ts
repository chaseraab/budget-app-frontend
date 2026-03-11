// import { renderAccountsPage } from "@pages/Accounts.js";
// import { renderIncomePage } from "@pages/Income.js";
// import { renderAllocationsPage } from "@pages/Allocation.js";
import { renderPlanningPage } from "@pages/Planning.js";
import { renderBudgetsPage } from "@pages/Budgets.js";

const root = document.getElementById("root")!;

function renderHomePage() {
    root.innerHTML = "";

    const planningButton = document.createElement("button");
    planningButton.textContent = "Planning";
    planningButton.addEventListener("click", () => {
        renderPlanningPage(root);
    });

    const budgetsButton = document.createElement("button");
    budgetsButton.textContent = "Budgets";
    budgetsButton.addEventListener("click", () => {
        renderBudgetsPage(root);
    });
    
    root?.appendChild(planningButton);
    root?.appendChild(budgetsButton);
}

renderHomePage();