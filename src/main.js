
import * as THREE from '../libs/three.js/build/three.module.js';
import { OrbitControls } from "../libs/three.js/examples/jsm/controls/OrbitControls.js"
import "../libs/socket.io/socket.io.min.js"


const socket = io();
socket.connect();
//when socket is connected:
socket.on('connect', () => {
    //do smtn
});





const scene = new THREE.Scene();
scene.background = new THREE.Color("rgb(0,0,0)");


const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth,  window.innerHeight );
addEventListener("resize", (event) => {
    renderer.setSize( window.innerWidth, window.innerHeight );
    camera.aspect =  window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

document.body.appendChild( renderer.domElement );

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


/*
    Atsevišķu kubu indeksēšana un parametru izmainīšana
*/
console.log(cubes);  
console.log(cubes[0][1][2]);
cubes[0][1][2].material.color.set(0x00ff00);


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