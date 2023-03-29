var rowIDs = [];
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
    rowIDs.push(newRow.id);

    const deleteButton = createDeleteButton();
    deleteButton.setAttribute('row-id', rowId);

    deleteButton.addEventListener('click', function () {
        deleteRow(rowId);
    });
    newRow.appendChild(deleteButton);

    editorPanel.appendChild(newRow);

    mouseDownColor();

    return newRow;
}

// Create a layer for the cube AKA 8x8 array or a table
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

// Create a delete button
function createDeleteButton() {
    let deleteButton = document.createElement('i');
    deleteButton.classList.add('bi', 'bi-trash3-fill', 'text-2xl', 'font-semibold', 'mt-8', 'text-primary-white');
    return deleteButton;
}

// Delete row
function deleteRow(rowId) {
    const rowToDelete = document.getElementById(rowId);

    rowToDelete.parentNode.removeChild(rowToDelete);
}

// set a background color to a cell passed to colorCell() function
function colorCell(cell) {
    const colorPicker = document.getElementById('color-picker');

    const color = colorPicker.value;

    cell.style.backgroundColor = color;
}

function mouseDownColor () {
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
            cell.addEventListener("mousedown", () => {
                isMouseDown = true;
                cell.style.backgroundColor = currentColor;
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

// Return a 4D array that represents each cell of 3D cube in time
function getArray() {
    let container = document.getElementById('row-section');

    let tableArray = [];

    let rows = container.querySelectorAll('div');

    // go through all of the rows added in the editor
    for(let i = 0; i < rows.length; i++) {
        let tableRowArray = [];
        let tables = rows[i].querySelectorAll('table');

        // go through each table in a row
        for(let j = 0; j < tables.length; j++) {
            let tableArray2D = [];
            let tableRows = tables[j].querySelectorAll('tr');

            // go through each row in a table
            for (let k = 0; k < tableRows.length; k++) {
                let tableArray3D = [];
                let cells = tableRows[k].querySelectorAll('td');

                // go through each cell in row
                for(let n = 0; n < cells.length; n++) {
                    let clrHex = cells[n].style.backgroundColor;
                    tableArray3D.push(clrHex); 
                }
                tableArray2D.push(tableArray3D);
            }

            tableRowArray.push(tableArray2D);
        }

        tableArray.push(tableRowArray);
    }

    return tableArray;
}

// convert RGB to hex
function rgbToHex(rgb) {
    let rgbValues = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    if (rgbValues) {
        let r = parseInt(rgbValues[1]);
        let g = parseInt(rgbValues[2]);
        let b = parseInt(rgbValues[3]);
        let hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        return hex;
    } else {
        return "";
    }
}

function getTimeout() {
    let timeoutElement = document.getElementById('timeout-picker');
    let timeout = timeoutElement.value;

    if(timeout < 1) {
        timeout = 1;
    } else if (timeout > 10000) {
        timeout = 10000;
    }

    timeoutElement.value = timeout;

    return timeout;
}

function clearWindow() {
    if (rowIDs.length == 0) return;
    for (let rowID of rowIDs) {
        deleteRow(rowID);
    }
    rowIDs.length = 0;
}

function loadFromArray(anim_arr) {
    clearWindow();

    for(let i = 0; i < anim_arr.length; i++) {
        let newRow = addNewRow();
        let tables = newRow.querySelectorAll('table');

        // go through each table in a row
        for(let j = 0; j < tables.length; j++) {
            let tableRows = tables[j].querySelectorAll('tr');

            // go through each row in a table
            for (let k = 0; k < tableRows.length; k++) {
                let cells = tableRows[k].querySelectorAll('td');

                // go through each cell in row
                for(let n = 0; n < cells.length; n++) {
                    
                    cells[n].style.backgroundColor = anim_arr[i][j][k][n];
                }
            }
        }
    }


}