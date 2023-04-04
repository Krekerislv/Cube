import { LEDCube } from '../cube.js';
import { AnimationEditor } from './AnimationEditor.js';

const ledSize = 1;
const cubeDim = 8;
const spacing = 4;

const popupWidth = window.innerWidth / 2;
const popupHeight = window.innerHeight / 2;

// html objects:
const startSimulationButton = document.getElementById('simulate-action');
const stopSimulationButton = document.getElementById("stop-simulation");
const btn_export = document.getElementById("export_anim");
const input_import_anim = document.getElementById("lcaf_upload"); //import
const simulationSection = document.getElementById('simulation');
const popupButton = document.getElementById('open-popup');
const simulationPopup = document.getElementById('simulation-popup');

const addNewRowBtn = document.getElementById("btn_addNewRow");
const editorPanel = document.getElementById("row-section");

var animationEditor = new AnimationEditor(editorPanel, addNewRowBtn);

var ledCube = new LEDCube(cubeDim,ledSize,spacing,popupWidth,popupHeight);

simulationSection.appendChild( ledCube.renderer.domElement );

popupButton.addEventListener('click', () => {
    if (simulationPopup.classList.contains("hidden")) {
        simulationPopup.classList.remove('hidden');
    } else {
        simulationPopup.classList.add('hidden');
    }
});

startSimulationButton.addEventListener('click', () => {
    ledCube.startSimulation( animationEditor.getArray(), animationEditor.getTimeout());
});

stopSimulationButton.addEventListener("click", (e) => {
    ledCube.stopSimulation();
});

btn_export.addEventListener('click', (e) => {

    let arr2export = JSON.stringify(animationEditor.getArray());
    let blob_obj = new Blob([arr2export], {type: "application/json"});

    let url = URL.createObjectURL(blob_obj)
    let a = document.createElement('a')
    a.setAttribute('href', url)

    let fileName = "Anim_" + new Date().toISOString() + ".lcaf";
    a.setAttribute('download', fileName);
    a.click();
});

input_import_anim.addEventListener("click", () => {
    input_import_anim.value = null;
});
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
