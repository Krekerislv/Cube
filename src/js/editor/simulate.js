import { LEDCube } from '../cube.js';
import { AnimationEditor } from './AnimationEditor.js';
import { PixelCubeToBinary } from '../converter/PixelCubeToBinary.js';

/**
 * Single LED size
 *
 * @type {number}
 */
const ledSize = 1;

/**
 * LED count in a row or column
 *
 * @type {number}
 */
const cubeDim = 8;

/**
 * Spacing between the LEDs
 *
 * @type {number}
 */
const spacing = 4;

/**
 * Popup width
 *
 * @type {number}
 */
const popupWidth = window.innerWidth / 2;

/**
 * Popup height
 *
 * @type {number}
 */
const popupHeight = window.innerHeight / 2;

/**
 * Start simulation button element
 *
 * @type {HTMLElement}
 */
const startSimulationButton = document.getElementById('simulate-action');

/**
 * Stop simulation button element
 * @type {HTMLElement}
 */
const stopSimulationButton = document.getElementById("stop-simulation");

/**
 * Export button element
 *
 * @type {HTMLElement}
 */
const btn_export = document.getElementById("export_anim");

/**
 * Save button element
 *
 * @type {HTMLElement}
 */
const btn_save_anim = document.getElementById("save_anim");

/**
 * Import button element
 *
 * @type {HTMLElement}
 */
const input_import_anim = document.getElementById("lcaf_upload");

/**
 * Simulation section element
 *
 * @type {HTMLElement}
 */
const simulationSection = document.getElementById('simulation');

/**
 * Popup button element
 *
 * @type {HTMLElement}
 */
const popupButton = document.getElementById('open-popup');

/**
 * Simulation popup element
 *
 * @type {HTMLElement}
 */
const simulationPopup = document.getElementById('simulation-popup');

/**
 * Add new row button element
 *
 * @type {HTMLElement}
 */
const addNewRowBtn = document.getElementById("btn_addNewRow");

/**
 * Editor panel element
 *
 * @type {HTMLElement}
 */
const editorPanel = document.getElementById("row-section");

var animationEditor = new AnimationEditor(editorPanel, addNewRowBtn);
var ledCube = new LEDCube(cubeDim, ledSize, spacing, popupWidth, popupHeight);
simulationSection.appendChild( ledCube.renderer.domElement );

// Toggle popup
popupButton.addEventListener('click', () => {
    if (simulationPopup.classList.contains("hidden")) {
        simulationPopup.classList.remove('hidden');
    } else {
        simulationPopup.classList.add('hidden');
    }
});

// Start simulation
startSimulationButton.addEventListener('click', () => {
    ledCube.startSimulation( animationEditor.getArray(), animationEditor.getTimeout());
});

// Stop simulation
stopSimulationButton.addEventListener("click", (e) => {
    ledCube.stopSimulation();
});

// Export simulation file with .lcaf extension
btn_export.addEventListener('click', (e) => {
    let animation = new PixelCubeToBinary(animationEditor.getArray());
    animation.saveBinaryFile('animation.gc', animationEditor.getTimeout());
});

btn_save_anim.addEventListener('click', (e) => {
    let arr2export = JSON.stringify(animationEditor.getArray());

    let blob_obj = new Blob([arr2export], {type: "application/json"});

    let url = URL.createObjectURL(blob_obj)
    let a = document.createElement('a')
    a.setAttribute('href', url)

    let fileName = "Anim_" + new Date().toISOString() + ".lcaf";
    a.setAttribute('download', fileName);
    a.click();
});

// Import animation
input_import_anim.addEventListener("click", () => {
    input_import_anim.value = null;
});

// When imported animation changes, read the uploaded file and update the local storage
input_import_anim.addEventListener('change', (e) => {
    let file = e.target.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event) => {
        const fileContent = event.target.result;
        let loadedArr = JSON.parse(fileContent);
        window.localStorage.setItem('uploaded_file_contents', fileContent);
        window.localStorage.setItem('timeout', animationEditor.getTimeout())
        animationEditor.loadFromArray(loadedArr);
    });

   reader.readAsText(file);
});
