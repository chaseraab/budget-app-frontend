export function createSpendingBreakdownTable(): {
    table: HTMLTableElement;
    update: (totals: {
        totalWant: number;
        totalNeed: number;
        totalSave: number;
    }) => void;
} {

    const table = document.createElement("table");
    table.className = "spending-breakdown-table";

    const headerRow = document.createElement("tr");
    ["Spending Breakdown", ""].forEach(headerText => {
        const th = document.createElement("th");
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    // Total Income
    const totalNeedRow = document.createElement("tr");
    totalNeedRow.innerHTML = `
        <td>Total Need</td>
        <td id="total-need-value"></td>
    `;
    table.appendChild(totalNeedRow);

    // Total Spending
    const totalWantRow = document.createElement("tr");
    totalWantRow.innerHTML = `
        <td>Total Want</td>
        <td id="total-want-value"></td>
    `;
    table.appendChild(totalWantRow);

    // Remaining Income
    const totalSaveRow = document.createElement("tr");
    totalSaveRow.innerHTML = `
        <td>Total Save</td>
        <td id="total-save-value"></td>
    `;
    table.appendChild(totalSaveRow);

    function update(totals: {
        totalNeed: number;
        totalWant: number;
        totalSave: number;
    }) {
        table.querySelector<HTMLTableCellElement>("#total-need-value")!
            .textContent = `$${totals.totalNeed.toFixed(2)}`;

        table.querySelector<HTMLTableCellElement>("#total-want-value")!
            .textContent = `$${totals.totalWant.toFixed(2)}`;

        table.querySelector<HTMLTableCellElement>("#total-save-value")!
            .textContent = `$${totals.totalSave.toFixed(2)}`;
    }

    return { table, update };
}