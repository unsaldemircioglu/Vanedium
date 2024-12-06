import * as THREE from 'three';

export const setupLighting = (scene, paintings) => {
  // Ambient Light
  const ambientLight = new THREE.AmbientLight(0xffffe0, 1); // Increased intensity
  scene.add(ambientLight);

  // Hemisphere Light
  const hemisphereLight = new THREE.HemisphereLight(0xffffe0, 0x444444);
  hemisphereLight.position.set(0, 20, 30);
  scene.add(hemisphereLight);

  // RectArea Light
  const rectLight = new THREE.RectAreaLight(0xffffe0, 2, 10, 10); // Increased intensity
  rectLight.position.set(5, 5, 5);
  scene.add(rectLight);

  // Directional Light
  const directionalLight = new THREE.DirectionalLight(0xffffe0, 2); // Increased intensity
  directionalLight.position.set(10, 10, 10);
  scene.add(directionalLight);

  function createSpotlight(x, y, z, intensity, targetPosition) {
    const spotlight = new THREE.SpotLight(0xffffe0, intensity);
    spotlight.position.set(x, y, z);
    spotlight.target.position.copy(targetPosition);
    spotlight.castShadow = true;
    spotlight.angle = 1.57079;
    spotlight.penumbra = 0.2;
    spotlight.decay = 1;
    spotlight.distance = 40;
    spotlight.shadow.mapSize.width = 1024;
    spotlight.shadow.mapSize.height = 1024;
    // Add spotlight and its target to the scene
    scene.add(spotlight);
    scene.add(spotlight.target);
    return spotlight;
  }

  const frontWallSpotlight = createSpotlight(0, 6.7, -13, 1.5, new THREE.Vector3(0, 0, -20)); // Increased intensity
  const backWallSpotlight = createSpotlight(0, 6.7, 13, 1.5, new THREE.Vector3(0, 0, 20)); // Increased intensity
  const leftWallSpotlight = createSpotlight(-13, 6.7, 0, 1.5, new THREE.Vector3(-20, 0, 0)); // Increased intensity
  const rightWallSpotlight = createSpotlight(13, 6.7, 0, 1.5, new THREE.Vector3(20, 0, 0)); // Increased intensity
  const statueSpotlight = createSpotlight(0, 10, 0, 1.5, new THREE.Vector3(0, -4.2, 0)); // Increased intensity
  statueSpotlight.angle = 0.75084;
  statueSpotlight.decay = 1;
  statueSpotlight.penumbra = 1;
  statueSpotlight.distance = 0;
};
