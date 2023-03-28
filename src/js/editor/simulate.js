
import * as THREE from '../../../libs/three.js/build/three.module.js';
import { OrbitControls } from "../../../libs/three.js/examples/jsm/controls/OrbitControls.js";
import "../../../libs/socket.io/socket.io.min.js";

const socket = io();
socket.connect();
//when socket is connected:
socket.on('connect', () => {
    console.log(`Connected to server. Your id: ${socket.id}`);
});

const popupWidth = window.innerWidth / 2;
const popupHeight = window.innerHeight / 2;

const scene = new THREE.Scene();
scene.background = new THREE.Color("rgb(0,0,0)");


const camera = new THREE.PerspectiveCamera( 75, popupWidth / popupHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( popupWidth,  popupHeight );

addEventListener("resize", (event) => {
    renderer.setSize( popupWidth, popupHeight );
    camera.aspect =  popupWidth / popupHeight;
    camera.updateProjectionMatrix();
});

const simulationSection = document.getElementById('simulation');
simulationSection.appendChild( renderer.domElement );

//setup orbit camera
const controls = new OrbitControls( camera, renderer.domElement );


const geometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5 );

var R = 31;
var G = 31;
var B = 31;
var x = 0;
var y = 0;
var z = 0;



const cubeSize = 8;
const spacing = 2;
var cubes = new Array(); //3D array containing all cubes for easy access
var cubeGroup = new THREE.Group();




for (let i =0; i < cubeSize; i++) {
    let tmpJ = [];
    for (let j =0; j < cubeSize; j++) {
        let tmpK = [];
        for (let k =0; k < cubeSize; k++) {
            let clr = new THREE.Color();
            clr.r = R;
            clr.g = G;
            clr.b = B;

            let material = new THREE.MeshBasicMaterial({ color: clr.getHex(), transparent: true, opacity: 0.7  });
            let cube = new THREE.Mesh( geometry, material );

            cube.position.set(x,y,z);
            cube.location = [i, j, k];
            tmpK.push(cube);
            cubeGroup.add(cube);

            x += spacing;
        }
        x = 0;
        y += spacing;
        tmpJ.push(tmpK);
    }
    cubes.push(tmpJ);
    y = 0;
    z += spacing;

    R += 15;
    G += 31;
    if (i < 3) {
        R += 10;
        G += 20;
        B += 25;
    } else {
        R -= 10;
        G -= 15;
    }
}
scene.add(cubeGroup);

//boundingBox contains all cubes as a single object
const boundingBox = new THREE.Box3().setFromObject(cubeGroup);


camera.position.y = 10;
camera.position.x = -10;
//set initial camera direction
camera.lookAt(cubeSize * spacing /2, cubeSize * spacing /2, cubeSize * spacing /2)


function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
    boundingBox.getCenter(controls.target);
}

animate();

const popupButton = document.getElementById('open-popup');
let simulationPopupOpen = true;

popupButton.addEventListener('click', openPopup);

function openPopup() {
    // toggle popup
    if(simulationPopupOpen) {
        const simulationPopup = document.getElementById('simulation-popup');
        simulationPopup.classList.remove('hidden');
        simulationPopupOpen = false;
    } else {
        const simulationPopup = document.getElementById('simulation-popup');
        simulationPopup.classList.add('hidden');
        simulationPopupOpen = true;
    }
}

const startSimulationButton = document.getElementById('simulate-action');
startSimulationButton.addEventListener('click', startSimulation);

function startSimulation() {
    //contains all rgb values for each frame
    let animArr = getArray();

    let i = 0;
    function drawSimulation() {
        
        for (let n = 0; n < cubeSize; n++) {
            for (let l = 0; l < cubeSize; l++) {
                for (let o = 0; o < cubeSize; o++) {
                    let ledColor = animArr[i][n][l][o]; //color for specific led
                    cubes[n][l][o].material.color.set(ledColor);  
                }   
            }
        }
        
        i++;
        if (i != animArr.length) {
            setTimeout(drawSimulation, getTimeout());
        }
    }
    drawSimulation();
}

const btn_export = document.getElementById("export_anim");
btn_export.addEventListener('click', (e) => {

    let arr2export = JSON.stringify(getArray());
    let blob_obj = new Blob([arr2export], {type: "application/json"});

    let url = URL.createObjectURL(blob_obj)
    let a = document.createElement('a')
    a.setAttribute('href', url)
    //perhaps ask user to name animation? If blank then animation.lcaf
    //lcaf = led cube animation file (which is actually just array in text format)
    let fileName = "Anim_" + new Date().toISOString() + ".lcaf";
    a.setAttribute('download', fileName);
    a.click();
    console.log(getArray());
});


const input_import_anim = document.getElementById("lcaf_upload");
input_import_anim.addEventListener('change', (e) => {
    let file = e.target.files[0];

    const reader = new FileReader();
  
    reader.addEventListener('load', (event) => {
        const fileContent = event.target.result;
        let loadedArr = JSON.parse(fileContent) 
        loadFromArray(loadedArr);
    });
  
   reader.readAsText(file);

   

});