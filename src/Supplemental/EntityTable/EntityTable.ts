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



export function createEntityTable<T extends { id: number }>(data: T[], config: TableConfig<T>): HTMLTableElement {

    function enableClickOff(element: HTMLElement, callback: () => void) {
        function handler(event: MouseEvent) {
            if (!element.contains(event.target as Node)) {
                callback();
                document.removeEventListener("pointerdown", handler);
            }
        }

        document.addEventListener("pointerdown", handler);
    }

    function createHeaderRow<T>(config: TableConfig<T>): HTMLTableRowElement {
        const row = document.createElement("tr");
        config.columns.forEach(col => {
            const th = document.createElement("th");
            th.textContent = col.header;
            row.appendChild(th);
        });
        return row;
    }

    function createEditRow(item: T): HTMLTableRowElement {
        const row = document.createElement("tr");
        config.columns.forEach(col => {
            const td = document.createElement("td");
            if (col.input) {
                td.appendChild(col.input(item[col.field]));
            } else {
                const input = document.createElement("input");
                input.value = String(item[col.field]);
                td.appendChild(input);
            }
            row.appendChild(td);
        });
        const saveBtn = document.createElement("button");
        saveBtn.textContent = "Save";
        saveBtn.addEventListener("click", async () => {
            const updatedItem: any = { id: item.id };
            config.columns.forEach(col => {
                if (col.getValue) {
                    updatedItem[col.field] = col.getValue(
                        row.querySelector(`[name="${String(col.field)}"]`) as HTMLElement
                    );
                } else {
                    const input = row.querySelector(`[name="${String(col.field)}"]`) as HTMLInputElement;
                    updatedItem[col.field] = input.value;
                }
            });

            const res = await fetch(
                `${config.baseURL}/update/${item.id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(updatedItem),
                }
            );
            if (res.ok) {
                const newData = await res.json();
                row.replaceWith(createDisplayRow(newData));
            } else {
                alert("Failed to update. Please try again.");
            }
        });

        row.appendChild(saveBtn);
        return row;
    }

    function createDisplayRow(item: T): HTMLTableRowElement {
        const row = document.createElement("tr");
        config.columns.forEach(col => {
            const td = document.createElement("td");
            if (col.render) {
                td.textContent = col.render(item);
            } else {
                td.textContent = String(item[col.field]);
            }
            td.addEventListener("click", () => {
                const editRow = createEditRow(item);
                row.replaceWith(editRow);
                setTimeout(() => {
                    enableClickOff(editRow, () => {
                    editRow.replaceWith(createDisplayRow(item));
                    });
                }, 0);});
            row.appendChild(td);
        });
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", async () => {
            if (confirm(`Delete this ${config.entityName}?`)) {
                const res = await fetch(
                    `${config.baseURL}/delete/${item.id}`,
                    { method: "DELETE" }
                );
                if (res.ok) row.remove();
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
                    console.log(`[name="${String(col.field)}"]`)
                    newItem[col.field] = col.getValue(
                        row.querySelector(`[name="${String(col.field)}"]`) as HTMLElement
                    );
                } else {
                    const input = row.querySelector(`[name="${String(col.field)}"]`) as HTMLInputElement;
                    newItem[col.field] = input.value;
                }
            });

            const res = await fetch(
                `${config.baseURL}/new`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newItem),
                }
            );
            if (res.ok) {
                const createdItem = await res.json();
                row.replaceWith(createDisplayRow(createdItem));
                table.appendChild(createEntryRow());
            } else {
                alert("Failed to create. Please try again.");
            }
        });

        row.appendChild(addBtn);
        return row;
    }


    const table = document.createElement("table");
    table.appendChild(createHeaderRow(config));
    data.forEach(item => {
        const row = createDisplayRow(item);
        table.appendChild(row);
    });
    table.appendChild(createEntryRow());
    return table;
}