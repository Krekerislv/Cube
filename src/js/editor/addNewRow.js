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

}

function createLayer() {
    const table = document.createElement('table');

    table.classList.add('table', 'border', 'border-collapse', 'm-1');

    for (let i = 0; i < 8; i++) {
        const row = document.createElement('tr');

        for (let j = 0; j < 8; j++) {
            const cell = document.createElement('td');

            cell.classList.add('h-3', 'w-3', 'border', 'border-black', 'bg-primary-white');

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
