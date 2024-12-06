import * as THREE from "three";
import { scene, setupScene } from "./modules/scene.js";
import { createPaintings } from "./modules/paintings.js";
import { createWalls } from "./modules/walls.js";
import { setupLighting } from "./modules/lighting.js";
import { setupFloor } from "./modules/floor.js";
import { createCeiling } from "./modules/ceiling.js";
import { createBoundingBoxes } from "./modules/boundingBox.js";
import { setupRendering } from "./modules/rendering.js";
import { setupEventListeners } from "./modules/eventListeners.js";
import { addObjectsToScene } from "./modules/sceneHelpers.js";
import { setupPlayButton } from "./modules/menu.js";
import { setupAudio } from "./modules/audioGuide.js";
import { clickHandling } from "./modules/clickHandling.js";
import { setupVR } from "./modules/VRSupport.js";
import { loadStatueModel } from "./modules/statue.js";
import { loadBenchModel } from "./modules/bench.js";
import { loadCeilingLampModel } from "./modules/ceilingLamp.js";

let { camera, controls, renderer } = setupScene();

setupAudio(camera);

const textureLoader = new THREE.TextureLoader();

// Create Walls and Floor
const walls = createWalls(scene, textureLoader);
const floor = setupFloor(scene);

// Create Ceiling
const ceiling = createCeiling(scene, textureLoader);

// Create Paintings
const paintings = createPaintings(scene, textureLoader);

// Setup Lighting
setupLighting(scene, paintings);

// Create Bounding Boxes
createBoundingBoxes(walls);
createBoundingBoxes(paintings);

// Add Objects to Scene
addObjectsToScene(scene, paintings);

// Setup Play Button
setupPlayButton(controls);

// Setup Event Listeners
setupEventListeners(controls);

// Click Handling
clickHandling(renderer, camera, paintings);

// Setup Rendering
setupRendering(scene, camera, renderer, paintings, controls, walls);

// Load Models
loadStatueModel(scene);
loadBenchModel(scene);
loadCeilingLampModel(scene);

// Setup VR
setupVR(renderer);

/*
* Center Table And Model Objects Coding 
*/
const geometry = new THREE.TorusKnotGeometry(2.5, 0.75, 100, 16); // Geometriyi daha da küçülttük
const material = new THREE.MeshBasicMaterial({ color: 0x4682B4 }); // Rengi SteelBlue'e çevirdik (hex kodu: #87ceeb)
const torusKnot = new THREE.Mesh(geometry, material);
scene.add(torusKnot);

// Geometri: Daha fazla kıvrım ve daha küçük boyut
const torusGeometry = new THREE.TorusKnotGeometry(2, 0.5, 200, 32);
const torusMaterial = new THREE.MeshBasicMaterial({ color: 0x87ceeb });
// const torusKnot = new THREE.Mesh(torusGeometry, torusMaterial);

// Küp Geometrisi
const cubeGeometry = new THREE.BoxGeometry(5, 3, 3);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x800000 });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.y = - 2; // Küpü biraz yukarıya kaldır

// Torus'u küpün üstüne yerleştirme
torusKnot.position.y = cube.position.y + 6; // Torus'u küpün üstüne yerleştir

// Sahneye ekleme
scene.add(cube);
scene.add(torusKnot);



// Start Rendering Loop
renderer.setAnimationLoop(() => {
  controls.update();
  renderer.render(scene, camera);
});
