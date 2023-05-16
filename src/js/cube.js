import * as THREE from '../../libs/three.js/build/three.module.js';
import { OrbitControls } from "../../libs/three.js/examples/jsm/controls/OrbitControls.js";

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
export class LEDCube {
    /**
     * Initialize parameters and functions
     *
     * @param cubeDim - cube dimensions. Total led count = cubeDim^3
     * @param ledSize - size of each LED (cube's edge) simulated
     * @param spacing - spacing between each led. If value is too small, cubes can overlap
     * @param windowWidth - renderer's width
     * @param windowHeight - renderer's height
     */
    constructor(cubeDim, ledSize, spacing, windowWidth, windowHeight) {
        this.scene = new THREE.Scene();
        this.renderer = new THREE.WebGLRenderer();
        this.cubeDim = cubeDim;
        this.ledSize = ledSize;
        this.spacing = spacing;
        this.windowHeight = windowHeight;
        this.windowWidth = windowWidth;
        this.cubes = [];
        this.init();
    }

    /**
     * Creates cube and sets default values
     */
    init() {
        // Set background color to sky blue
        this.scene.background = new THREE.Color("#87ceeb");

        // Initialize perspective camera
        this.camera = new THREE.PerspectiveCamera( 75, this.windowWidth / this.windowHeight, 0.1, 1000 );

        this.camera.position.x = -10;
        this.camera.position.y = 35;
        this.camera.position.z = 40;

        // Apply updated values to camera
        this.camera.updateProjectionMatrix();

        // Add camera to scene
        this.scene.add(this.camera);

        this.renderer.setSize( this.windowWidth, this.windowHeight);

        // These coefficients allow
        const widthCoef = window.innerWidth / this.windowWidth;

        // Smooth scaling if renderer's parent is some element with size <= window
        const heightCoef = window.innerHeight / this.windowHeight;

        addEventListener("resize", (event) => {
            this.renderer.setSize( window.innerWidth / widthCoef, window.innerHeight / heightCoef );
            this.camera.aspect =  window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
        });

        // Setup camera controls
        this.controls = new OrbitControls( this.camera, this.renderer.domElement );

        // Focus camera on center of LED cube
        this.controls.target.set(this.spacing * (this.cubeDim - 1) / 2, this.spacing * (this.cubeDim - 1) / 2, this.spacing * (this.cubeDim - 1) / 2);
        this.controls.update();

        // Create and add led cube to the scene
        this.ledGeometry = new THREE.BoxGeometry( this.ledSize, this.ledSize, this.ledSize);
        let cubeGroup = new THREE.Group();

        let x = 0;
        let y = 0;
        let z = 0;

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

    /**
     * Start simulation
     *
     * @param animArr - animation array
     * @param timeout - timeout
     */
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
                        if (ledColor === "") {
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
            if (i === animArr.length) i = 0;
        }

        // Lets drawSimulation use same variables as startSimulation()
        drawSimulation.apply();
        drawSimulation();

        this.generalInterval = setInterval(drawSimulation, timeout); // Loop
    }

    /**
     * Stop simulation
     */
    stopSimulation() {
        if (this.generalInterval) clearInterval(this.generalInterval);
    }
}
