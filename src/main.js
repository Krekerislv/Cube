import { LEDCube } from "./js/cube.js";

const ledSize = 1;
const cubeDim = 8;
const spacing = 4;

var ledCube = new LEDCube(cubeDim, ledSize, spacing, window.innerWidth, window.innerHeight);
var uploadedFileContents = localStorage.getItem('uploaded_file_contents');
var timeout = localStorage.getItem('timeout');
const defaultTimeout = 250;

fetch(window.location.href + 'assets/default.lcaf')
    .then(response => response.text())
    .then(data => {
        uploadedFileContents = uploadedFileContents && JSON.parse(uploadedFileContents).length > 0 ? JSON.parse(uploadedFileContents) : JSON.parse(data);
        timeout = timeout ? timeout : defaultTimeout;
        ledCube.startSimulation(uploadedFileContents, timeout);
        })
    .catch(error => console.log(error));

const simulationSection = document.getElementById('simulation');
simulationSection.appendChild( ledCube.renderer.domElement );
