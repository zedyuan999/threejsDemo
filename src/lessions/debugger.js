import * as THREE from 'three'
import * as lil from 'lil-gui'
import gsap from 'gsap'
// Scene
const scene = new THREE.Scene();
const gui = new lil.GUI()
// Cube
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
// mesh.rotation.x = Math.PI * 0.1
// mesh.rotation.y = Math.PI * 0.1
scene.add(mesh);


const sizes = {
  width: document.documentElement.clientWidth,
  height: document.documentElement.clientHeight,
};

// Axes
const axesHelper = new THREE.AxesHelper(2)
// scene.add(axesHelper)

// Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 1000);
camera.position.z = 3;
scene.add(camera);

// Renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
window.addEventListener('resize', () => {
  sizes.width = document.documentElement.clientWidth
  sizes.height = document.documentElement.clientHeight
  // 修改相机的宽高比
  camera.aspect = sizes.width / sizes.height
  // 更改相机属性后，需要通过这个API更新
  camera.updateProjectionMatrix()
  // 重新渲染
  renderer.setSize(sizes.width, sizes.height)
})
const tick = () => {
  renderer.render(scene, camera)
  window.requestAnimationFrame(tick)
}
tick()



// gui.add(mesh.position, 'y')
// gui.add(mesh.position, 'y', -3, 3, 0.01)
gui.add(mesh.position, 'y').min(-3).max(3).step(0.01)
const parameters = {
  color: 0xff0000,
  spin: () => {
    gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI * 2 })
  }
}
gui.addColor(parameters, 'color').onChange(() => {
  material.color.set(parameters.color)
})
gui.add(parameters, 'spin')
gui.add(document, 'title');
// gui.add(mesh, 'visible')