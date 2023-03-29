
import "../libs/socket.io/socket.io.min.js";
import { LEDCube } from "./js/cube.js";


const socket = io();
socket.connect();
//when socket is connected:
socket.on('connect', () => {
    //do smtn
});



const ledSize = 1;
const cubeDim = 8;
const spacing = 4;

var ledCube = new LEDCube(cubeDim,ledSize,spacing,window.innerWidth,window.innerHeight);

const simulationSection = document.getElementById('simulation');
simulationSection.appendChild( ledCube.renderer.domElement );
