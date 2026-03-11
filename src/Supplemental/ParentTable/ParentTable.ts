type ColumnConfig<T> = {
    header: string;
    field: keyof T;                      // which property it maps to
    render?: (item: T) => string;        // optional custom display
    input?: (value: any) => HTMLElement; // for edit/create row
    getValue?: (input: HTMLElement) => any; // extract value
};

type TableConfig<T> = {
    baseURL: string;
    entityName: string;
    columns: ColumnConfig<T>[];
};

export function createParentTable<T extends { id: number }>(data: T[], config: TableConfig<T>): HTMLTableElement {

    function createHeaderRow<T>(config: TableConfig<T>): HTMLTableRowElement {
        const row = document.createElement("tr");
        config.columns.forEach(col => {
            const th = document.createElement("th");
            th.textContent = col.header;
            row.appendChild(th);
        });
        return row;
    }

    function createDataRow(item: T): HTMLTableRowElement {
        const row = document.createElement("tr");
        config.columns.forEach(col => {
            const td = document.createElement("td");
            if (col.render) {
                td.textContent = col.render(item);
            } else {
                td.textContent = String(item[col.field]);
            }
            row.appendChild(td);
        });
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", async () => {
            if (!confirm(`Are you sure you want to delete this ${config.entityName}?`)) return;
            const res = await fetch(`${config.baseURL}/delete/${item.id}`, {
                method: "DELETE"
            });
            if (res.ok) {
                row.remove();
            } else {
                alert(`Failed to delete ${config.entityName}`);
            }
        });
        row.appendChild(deleteBtn);
        return row;
    }

    function createEntryRow(): HTMLTableRowElement {
        const row = document.createElement("tr");
        config.columns.forEach(col => {
            const td = document.createElement("td");
            if (col.input) {
                td.appendChild(col.input(""));
            } else {
                const input = document.createElement("input");
                input.name = String(col.field);
                td.appendChild(input);
            }
            row.appendChild(td);
        });

        const addBtn = document.createElement("button");
        addBtn.textContent = "Add";
        addBtn.addEventListener("click", async () => {
            const newItem: any = {};
            config.columns.forEach(col => {
                if (col.getValue) {
                    newItem[col.field] = col.getValue(document.getElementsByName(String(col.field))[0] as HTMLElement);
                } else {
                    const input = document.getElementsByName(String(col.field))[0] as HTMLInputElement;
                    newItem[col.field] = input.value;
                }
            });
        const res = await fetch(`${config.baseURL}/new`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newItem)
            });
            if (res.ok) {
                const createdItem = await res.json();
                const newRow = createDataRow(createdItem);
                row.replaceWith(newRow);
                table.appendChild(createEntryRow());
            } else {
                alert(`Failed to create ${config.entityName}`);
            }
        });
        row.appendChild(addBtn);
        return row;
    }

    const table = document.createElement("table");
    table.appendChild(createHeaderRow(config));
    data.forEach(item => {
        table.appendChild(createDataRow(item));
    });
    table.appendChild(createEntryRow());
    return table;
}