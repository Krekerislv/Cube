import { LEDCube } from "./js/cube.js";

/**
 * LED size
 *
 * @type {number}
 */
const ledSize = 1;

/**
 * Cube dimensions
 *
 * @type {number}
 */
const cubeDim = 8;

/**
 * Spacing between each LED
 *
 * @type {number}
 */
const spacing = 4;

let ledCube = new LEDCube(cubeDim, ledSize, spacing, window.innerWidth, window.innerHeight);
let uploadedFileContents = localStorage.getItem('uploaded_file_contents');
let timeout = localStorage.getItem('timeout');

/**
 * Default timeout value
 *
 * @type {number}
 */
const defaultTimeout = 250;

// Reads default animation file from the assets/default.lcaf file
fetch(window.location.href + 'assets/default.lcaf')
    .then(response => response.text())
    .then(data => {
        uploadedFileContents = uploadedFileContents && JSON.parse(uploadedFileContents).length > 0 ? JSON.parse(uploadedFileContents) : JSON.parse(data);
        timeout = timeout ? timeout : defaultTimeout;
        ledCube.startSimulation(uploadedFileContents, timeout);
        })
    .catch(error => console.log(error));

/**
 * Simulation section element
 *
 * @type {HTMLElement}
 */
const simulationSection = document.getElementById('simulation');

simulationSection.appendChild( ledCube.renderer.domElement );
