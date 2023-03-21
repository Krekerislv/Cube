function addNewRow() {
    let editorPanel = document.getElementById('row-section');

    let newRow = document.createElement('div');
    newRow.classList.add('flex', 'justify-center');
    for (let i = 0; i < 8; i++) {
        const layer = createLayer();
        newRow.appendChild(layer);
    }
    const rowId = Math.random().toString(36).substring(2, 18);
    newRow.id = rowId;

    const deleteButton = createDeleteButton();
    deleteButton.setAttribute('row-id', rowId);

    deleteButton.addEventListener('click', function () {
        deleteRow(rowId);
    });
    newRow.appendChild(deleteButton);

    editorPanel.appendChild(newRow);

    test();

}

function createLayer() {
    const table = document.createElement('table');

    table.classList.add('table', 'border', 'border-collapse', 'm-1');

    for (let i = 0; i < 8; i++) {
        const row = document.createElement('tr');

        for (let j = 0; j < 8; j++) {
            const cell = document.createElement('td');

            cell.classList.add('h-3', 'w-3', 'border', 'border-black', 'bg-primary-white');

            // cell.addEventListener('click', function() {
            //     colorCell(cell);
            // });

            row.appendChild(cell);
        }

        table.appendChild(row);
    }

    return table;
}

function createDeleteButton() {
    let deleteButton = document.createElement('i');
    deleteButton.classList.add('bi', 'bi-trash3-fill', 'text-2xl', 'font-semibold', 'mt-8', 'text-primary-white');
    return deleteButton;
}

function deleteRow(rowId) {
    const rowToDelete = document.getElementById(rowId);

    rowToDelete.parentNode.removeChild(rowToDelete);
}

function colorCell(cell) {
    const colorPicker = document.getElementById('color-picker');

    const color = colorPicker.value;

    cell.style.backgroundColor = color;
}

function test () {
    const tables = document.querySelectorAll("table");
    tables.forEach((table) => {
        const cells = table.querySelectorAll("td");
        const colorPicker = document.getElementById("color-picker");
        let isMouseDown = false;
        let currentColor = colorPicker.value ? colorPicker.value : "#FF0000";

        colorPicker.addEventListener("input", (event) => {
            currentColor = event.target.value;
        });

        cells.forEach((cell) => {
            console.log('test');
            cell.addEventListener("mousedown", () => {
                isMouseDown = true;
                cell.style.backgroundColor = currentColor;
                console.log('test');
            });
            cell.addEventListener("mouseover", () => {
                if (isMouseDown) {
                    cell.style.backgroundColor = currentColor;
                }
            });
        });

        table.addEventListener("mouseup", () => {

            isMouseDown = false;
        });
    })
}
