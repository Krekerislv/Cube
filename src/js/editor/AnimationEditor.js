/*
    class variables:
        rows - contains all rows
        editorPanel - parent element of editor

    AddNewRow() add new row to editor
    createDeleteButton() - adds delete button next to row
    deleteRow(rowID) - deletes row with rowID
    mouseDownColor() - colors cells
    clearWindow() - deletes everything
    loadFromArray(anim_arr) - loads animation frames from array
    rgbToHex() - converts rgb value to hex
    */
export class AnimationEditor {
    rows = [];

    constructor(editorPanel, addNewRowBtn) {
        this.editorPanel = editorPanel;
        this.addNewRowBtn = addNewRowBtn;
        this.addNewRow = this.addNewRow.bind(this);
        this.createLayer = this.createLayer.bind(this);
        this.createDeleteButton = this.createDeleteButton.bind(this);
        this.deleteRow = this.deleteRow.bind(this);
        this.mouseDownColor = this.mouseDownColor.bind(this);
        this.clearWindow = this.clearWindow.bind(this);
        this.loadFromArray = this.loadFromArray.bind(this);
        this.rgbToHex = this.rgbToHex.bind(this);
        this.getArray = this.getArray.bind(this);
        this.colorCell = this.colorCell.bind(this);
        this.getTimeout = this.getTimeout.bind(this);

        this.addNewRowBtn.addEventListener("click", () => {
            this.addNewRow();
        });
    };

    addNewRow() {
        let newRow = document.createElement('div');
        newRow.classList.add('flex', 'justify-center');

        for (let i = 0; i < 8; i++) {
            const layer = this.createLayer();
            newRow.appendChild(layer);
        }
        const rowId = Math.random().toString(36).substring(2, 18);
        newRow.id = rowId;

        const deleteButton = this.createDeleteButton();
        deleteButton.setAttribute('row-id', rowId);

        deleteButton.addEventListener('click', () => {
            this.deleteRow(newRow);
        });
        newRow.appendChild(deleteButton);

        this.editorPanel.appendChild(newRow);

        this.mouseDownColor();
        this.rows.push(newRow);

        return newRow;
    }

    createLayer() {
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
    createDeleteButton() {
        let deleteButton = document.createElement('i');
        deleteButton.classList.add('bi', 'bi-trash3-fill', 'text-2xl', 'font-semibold', 'mt-8', 'text-primary-white');

        return deleteButton;
    }

    deleteRow(row) {
        row.remove();
        //remove from rows
        this.rows.splice(this.rows.indexOf(row),1);
    }

    mouseDownColor () {
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

    clearWindow() {
        for (let row of this.rows) {
           row.remove();
        }
        this.rows.length = 0;
    }

    loadFromArray(anim_arr) {
        this.clearWindow();

        for(let i = 0; i < anim_arr.length; i++) {
            let newRow = this.addNewRow();
            let tables = newRow.querySelectorAll('table');

            // go through each table in a row
            for(let j = 0; j < tables.length; j++) {
                let tableRows = tables[j].querySelectorAll('tr');

                // go through each row in a table
                for (let k = 0; k <  tableRows.length ; k++) {
                    let cells = tableRows[tableRows.length-1-k].querySelectorAll('td');

                    // go through each cell in row
                    for(let n = 0; n < cells.length; n++) {

                        cells[n].style.backgroundColor = anim_arr[i][j][k][n];
                    }
                }
            }
        }
    }

    rgbToHex(rgb) {
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

    // Return a 4D array that represents each cell of 3D cube in time
    getArray() {

        let tableArray = [];

        // go through all of the rows added in the editor
        for(let i = 0; i < this.rows.length; i++) {
            let tableRowArray = [];
            let tables = this.rows[i].querySelectorAll('table');

            // go through each table in a row
            for(let j = 0; j < tables.length; j++) {
                let tableArray2D = [];
                let tableRows = tables[j].querySelectorAll('tr');

                // go through each row in a table
                for (let k = tableRows.length-1; k >= 0; k--) {
                    let tableArray3D = [];
                    let cells = tableRows[k].querySelectorAll('td');

                    // go through each cell in row
                    for(let n = 0; n < cells.length; n++) {
                        let clrHex = this.rgbToHex(cells[n].style.backgroundColor);
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

    colorCell(cell) {
        const colorPicker = document.getElementById('color-picker');

        const color = colorPicker.value;

        cell.style.backgroundColor = color;
    }
    getTimeout() {
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
};
