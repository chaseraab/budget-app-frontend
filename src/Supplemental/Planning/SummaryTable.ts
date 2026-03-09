export function createSummaryTable(): {
    table: HTMLTableElement;
    update: (totals: {
        totalIncome: number;
        totalSpending: number;
        remainingIncome: number;
    }) => void;
} {

    const table = document.createElement("table");
    table.className = "summary-table-totals";

    const headerRow = document.createElement("tr");
    ["Totals", "Amount"].forEach(headerText => {
        const th = document.createElement("th");
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    // Total Income
    const totalIncomeRow = document.createElement("tr");
    totalIncomeRow.innerHTML = `
        <td>Income</td>
        <td id="total-income-value"></td>
    `;
    table.appendChild(totalIncomeRow);

    // Total Spending
    const totalSpendingRow = document.createElement("tr");
    totalSpendingRow.innerHTML = `
        <td>Spending</td>
        <td id="total-spending-value"></td>
    `;
    table.appendChild(totalSpendingRow);

    // Remaining Income
    const remainingIncomeRow = document.createElement("tr");
    remainingIncomeRow.innerHTML = `
        <td>Remaining Income</td>
        <td id="remaining-income-value"></td>
    `;
    table.appendChild(remainingIncomeRow);

    function update(totals: {
        totalIncome: number;
        totalSpending: number;
        remainingIncome: number;
    }) {
        table.querySelector<HTMLTableCellElement>("#total-income-value")!
            .textContent = `$${totals.totalIncome.toFixed(2)}`;

        table.querySelector<HTMLTableCellElement>("#total-spending-value")!
            .textContent = `$${totals.totalSpending.toFixed(2)}`;

        table.querySelector<HTMLTableCellElement>("#remaining-income-value")!
            .textContent = `$${totals.remainingIncome.toFixed(2)}`;
    }

    return { table, update };
}