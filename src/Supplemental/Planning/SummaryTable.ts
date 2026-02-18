export function createSummaryTable(): HTMLTableElement {

    const table = document.createElement("table");
    table.className = "summary-table-totals";
    const headerRow = document.createElement("tr");
    ["Category", "Amount"].forEach(headerText => {
        const th = document.createElement("th");
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    const totalIncomeRow = document.createElement("tr");
    
    const totalIncomeCell = document.createElement("td");
    totalIncomeCell.textContent = "Total Income";
    totalIncomeRow.appendChild(totalIncomeCell);

    const totalIncomeValue = document.createElement("td");
    totalIncomeValue.id = "total-income-value";
    totalIncomeRow.appendChild(totalIncomeValue);
    
    

}