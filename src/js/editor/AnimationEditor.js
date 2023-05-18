/**
 * Animation editor class
 */

const FRAME_LIMIT = 150;
import {LEDCube} from "../cube.js";

export class AnimationEditor {
    // Contains all rows
    rows = [];

    /**
     * @param editorPanel - editor panel
     * @param addNewRowBtn - add new row button
     */
    constructor(editorPanel, addNewRowBtn, dupl_last_row_btn) {
        this.editorPanel = editorPanel;
        this.addNewRowBtn = addNewRowBtn;
        this.dupl_last_row_btn = dupl_last_row_btn;
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
        this.addedRows = document.getElementById('row-section').childElementCount;
        this.frameSimulationSectionWidth = document.getElementById('right-sidebar').clientWidth * 0.9;
        this.frameSimulationSectionHeight = this.frameSimulationSectionWidth * 0.75;
        this.ledCubeFrame = new LEDCube(8, 1, 4, this.frameSimulationSectionWidth, this.frameSimulationSectionHeight);

        this.addNewRowBtn.addEventListener("click", () => {
            this.addedRows = document.getElementById('row-section').childElementCount;
            if(this.addedRows < FRAME_LIMIT) {
                this.addNewRow();
            } else {
                alert(`You can only add up to ${FRAME_LIMIT} frames`);
            }

        });

        this.dupl_last_row_btn.addEventListener("click", () => {
            console.log(`getting row with id: ${this.rows[this.rows.length-1].id}`)
            let lastRowArray = this.getArray(this.rows[this.rows.length-1].id);
            console.log(lastRowArray);
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
                        
                        cells[n].style.backgroundColor = lastRowArray[j][k][n];
                    }
                }
            }
            
        });

        // Add animation data to the local storage when the user exits or reloads the page
        addEventListener("beforeunload", (event) => {
            window.localStorage.setItem('timeout', this.getTimeout());
            window.localStorage.setItem('uploaded_file_contents', JSON.stringify(this.getArray(null)));
        });

        // If animation is present in local storage
        var uploadedFileContents = localStorage.getItem('uploaded_file_contents');
        var storageTimeout = localStorage.getItem('timeout');
        var animation_name = localStorage.getItem('animation_name');
        if (storageTimeout) document.getElementById('timeout-picker').value = storageTimeout;
        if (uploadedFileContents) this.loadFromArray(JSON.parse(uploadedFileContents));
        if (animation_name) document.getElementById("animation_name").value = animation_name;
    };

    /**
     * Add new frame in the editor after "+" icon press
     *
     * @returns {HTMLDivElement}
     */
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
        let framePlayButton = this.framePlaySection(rowId)

        let actionContainer = document.createElement('div');
        actionContainer.classList.add('flex', 'flex-col');
        actionContainer.appendChild(framePlayButton);
        actionContainer.appendChild(deleteButton);

        newRow.appendChild(actionContainer);

        this.editorPanel.appendChild(newRow);

        this.mouseDownColor();
        this.rows.push(newRow);

        return newRow;
    }

    framePlaySection(rowId) {
        const frameSimulation = document.getElementById('frame-simulation');
        const framePlayButton = this.createFramePlayButton();
        framePlayButton.setAttribute('row-id', rowId);
        frameSimulation.appendChild(this.ledCubeFrame.renderer.domElement)

        framePlayButton.addEventListener('click', () => {
            let animationModification = this.getArray(framePlayButton.getAttribute('row-id')).filter(item => Array.isArray(item) && item.length > 0);
            this.ledCubeFrame.startSimulation([animationModification], this.getTimeout());
        });

        return framePlayButton;

    }

    /**
     * Creates a single layer of the frame for the animation
     *
     * @returns {HTMLTableElement}
     */
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

    /**
     * Creates a delete button
     *
     * @returns {HTMLElement}
     */
    createDeleteButton() {
        let deleteButton = document.createElement('i');
        deleteButton.classList.add('bi', 'bi-trash3-fill', 'text-2xl', 'font-semibold', 'mt-1', 'text-primary-white');

        return deleteButton;
    }

    /**
     * Creates a frame play buton
     *
     * @returns {HTMLElement}
     */
    createFramePlayButton() {
        let playButton = document.createElement('i');
        playButton.classList.add('bi', 'bi-play-fill', 'text-2xl', 'font-semibold', 'mt-4', 'text-primary-white');

        return playButton;
    }

    /**
     * Deletes the selected row
     *
     * @param row - row DOM element
     */
    deleteRow(row) {
        row.remove();
        //remove from rows
        this.rows.splice(this.rows.indexOf(row),1);
    }

    /**
     * Adds color to the table cells on the mouse down
     */
    mouseDownColor () {
        const tables = document.querySelectorAll("table");
        tables.forEach((table) => {
            const cells = table.querySelectorAll("td");
            const colorPicker = document.getElementById("color-picker");
            let isMouseDown = false;
            let isRightClickDown = false;
            let currentColor = colorPicker.value ? colorPicker.value : "#FF0000";

            colorPicker.addEventListener("input", (event) => {
                currentColor = event.target.value;
            });

            cells.forEach((cell) => {
                cell.addEventListener("mousedown", () => {
                    if (event.button === 2) { // Right mouse button
                        isRightClickDown = true;
                        cell.style.backgroundColor = "";
                    } else {
                        isMouseDown = true;
                        cell.style.backgroundColor = currentColor;
                    }
                });
                cell.addEventListener("mouseover", () => {
                    if (isMouseDown) {
                        cell.style.backgroundColor = currentColor;
                    } else if(isRightClickDown) {
                        cell.style.backgroundColor = "";
                    }
                });
                cell.addEventListener("contextmenu", (event) => {
                    event.preventDefault(); // Prevent the default context menu
                });
            });

            table.addEventListener("mouseup", () => {
                isMouseDown = false;
                isRightClickDown = false;
            });
        })
    }

    /**
     * Removes all of the frames in the animation
     */
    clearWindow() {
        for (let row of this.rows) {
           row.remove();
        }
        this.rows.length = 0;
    }

    /**
     * Loads an animation from array. Used to load data from a file or local storage
     *
     * @param anim_arr - animation array
     */
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

    /**
     * Convert RGB value to HEX
     *
     * @param rgb - RGB color
     * @returns {string} - return empty string or hex value
     */
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

    /**
     * Creates the 4D animation array
     *
     * @returns {*[]} - Return a 4D array that represents each cell of 3D cube in time
     */
    getArray(rowId) {

        let tableArray = [];

        const skipRowCheck = !rowId;

        // go through all of the rows added in the editor
        for(let i = 0; i < this.rows.length; i++) {
            let tableRowArray = [];
            let tables = this.rows[i].querySelectorAll('table');
            if(this.rows[i].id === rowId || skipRowCheck) {

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

                
                if (this.rows[i].id === rowId){
                    return tableRowArray;
                } 

            }

            tableArray.push(tableRowArray);
        }

        return tableArray;
    }

    /**
     * Color a cell
     *
     * @param cell - layer cell (represent a LED)
     */
    colorCell(cell) {
        const colorPicker = document.getElementById('color-picker');

        const color = colorPicker.value;

        cell.style.backgroundColor = color;
    }

    /**
     * Get timeout for the frame duration
     *
     * @returns {number} - timeout value
     */
    getTimeout() {
        
        let timeoutElement = document.getElementById('timeout-picker');
        let timeout = timeoutElement.value;

        if(timeout < 10) {
            timeout = 10;
        } else if (timeout > 1000) {
            timeout = 1000;
        }

        timeoutElement.value = timeout;

        return timeout;
        
    }
};
