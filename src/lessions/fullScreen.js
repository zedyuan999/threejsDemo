import * as THREE from 'three'
// Scene
const scene = new THREE.Scene();

// Cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const sizes = {
  width: document.documentElement.clientWidth,
  height: document.documentElement.clientHeight
}

// Axes
const axesHelper = new THREE.AxesHelper(2)
scene.add(axesHelper)

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// Renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
const tick = () => {
  renderer.render(scene, camera)
  window.requestAnimationFrame(tick)
}
tick()