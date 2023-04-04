import * as THREE from '../../libs/three.js/build/three.module.js';
import { OrbitControls } from "../../libs/three.js/examples/jsm/controls/OrbitControls.js";


export class LEDCube {
    /*
        class variables:
            scene - a three js scene
            ledSize - size of each LED (cube's edge) simulated
            cubeDim - cube dimensions. Total led count = cubeDim^3
            spacing - spacing between each led. If value is too small, cubes can overlap

            windowWidth - renerer's width
            windowHeight - renerer's height

        class methods:
            init() - creates cube and sets default values
            stopSimulation() - stops simulation
            startSimulation() - starts infinite simulation loop with given timeout and 4D array
    */
    
    constructor(cubeDim, ledSize, spacing, windowWidth, windowHeight) {
        this.scene = new THREE.Scene();
        this.renderer = new THREE.WebGLRenderer(); //create a renderer
        


        this.cubeDim = cubeDim;
        this.ledSize = ledSize;
        this.spacing = spacing;

        this.windowHeight = windowHeight;
        this.windowWidth = windowWidth;
        this.init();
    }

    init() {
        //set bacground color to sky blue
        this.scene.background = new THREE.Color("#87ceeb");

        //initialize perspective camera
        this.camera = new THREE.PerspectiveCamera( 75, this.windowWidth / this.windowHeight, 0.1, 1000 );

        //set camera init position
        //this.camera.position.x = -(this.spacing * (this.cubeDim-1));
        //this.camera.position.y = this.spacing * (this.cubeDim-1) /2;
        //this.camera.position.z = this.spacing * (this.cubeDim-1) /2;

        this.camera.position.x = -10;
        this.camera.position.y = 35;
        this.camera.position.z = 40;
        

        //apply updated values to camera
        this.camera.updateProjectionMatrix(); 

        //add camera to scene
        this.scene.add(this.camera);


        this.renderer.setSize( this.windowWidth,  this.windowHeight );

        const widthCoef = window.innerWidth / this.windowWidth; //these coeficients allow
        const heightCoef = window.innerHeight / this.windowHeight; //smooth scaling if renderer's parent is some element with size <= window
        addEventListener("resize", (event) => {

            this.renderer.setSize( window.innerWidth / widthCoef, window.innerHeight / heightCoef );
            this.camera.aspect =  window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
        });

        //setup camera controls
        this.controls = new OrbitControls( this.camera, this.renderer.domElement );
        
        //focus camera on center of LED cube
        this.controls.target.set(this.spacing * (this.cubeDim-1) /2, this.spacing * (this.cubeDim-1) /2, this.spacing * (this.cubeDim-1) /2);
        this.controls.update();

        //create and add led cube to the scene
        this.ledGeometry = new THREE.BoxGeometry( this.ledSize, this.ledSize, this.ledSize );
        this.cubes = new Array(); //3D array containing all cubes for easy access
        var cubeGroup = new THREE.Group();

        var x = 0;
        var y = 0;
        var z = 0;

        for (let i =0; i < this.cubeDim; i++) {
            let tmpJ = [];
            for (let j =0; j < this.cubeDim; j++) {
                let tmpK = [];
                for (let k =0; k < this.cubeDim; k++) {
                    let clr = new THREE.Color("#ffffff");

                    let material = new THREE.MeshBasicMaterial({ color: clr.getHex(), transparent: true, opacity: 0.7  });
                    let cube = new THREE.Mesh(  this.ledGeometry, material );

                    cube.position.set(x,y,z);
                    cube.location = [i, j, k];
                    tmpK.push(cube);
                    cubeGroup.add(cube);
                    /*
                    if (x== 0 && y==0 &z== this.spacing) {
                        cube.material.color.set(new THREE.Color("#ff0000"));
                    }
                    if (x== 0 && y==this.spacing &z== 0) {
                        cube.material.color.set(new THREE.Color("#00ff00"));
                    }
                    if (x== this.spacing && y==0 & z== 0) {
                        cube.material.color.set(new THREE.Color("#0000ff"));
                    }
                    */

                    x += this.spacing;
                }
                x = 0;
                y += this.spacing;
                tmpJ.push(tmpK);
            }
            this.cubes.push(tmpJ);
            y = 0;
            z += this.spacing;
        }
        this.scene.add(cubeGroup);

        this.renderer.setAnimationLoop( () => {
            this.renderer.render( this.scene, this.camera );
        });
    }

    startSimulation(animArr, timeout) {
        if (this.generalInterval) {
            clearInterval(this.generalInterval);
        }

        
        let i = 0;
        let drawSimulation = () => {
            for (let n = 0; n < this.cubeDim; n++) {
                for (let l = 0; l < this.cubeDim; l++) {
                    for (let o = 0; o < this.cubeDim; o++) {
                        let ledColor = animArr[i][n][l][o]; //color for specific led
                        
                        if (ledColor == "") {
                            this.cubes[n][l][o].material.color.set("#ffffff");
                            this.cubes[n][l][o].material.opacity = 0.5;
                        } else {
                            this.cubes[n][l][o].material.color.set(ledColor);
                            this.cubes[n][l][o].material.opacity = 0.7;
                        }
                        
                    }   
                }
            }
        
            i++;
            if (i == animArr.length) i=0;// clearInterval(this.generalInterval)//i=0;
        }
        drawSimulation.apply(); //lets drawsimulation use same variables as startSimulation()
        drawSimulation();

        this.generalInterval = setInterval(drawSimulation, timeout); //loop
    }

    stopSimulation() {
        if (this.generalInterval) clearInterval(this.generalInterval);
    }
};