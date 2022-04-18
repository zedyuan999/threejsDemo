import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// Scene
const scene = new THREE.Scene();

// const img = new Image()
// const texture = new THREE.Texture(img)
// img.onload = () => {
//   texture.needsUpdate = true
// }
// img.src = require('../assets/images/color.jpg')
const textureLoader = new THREE.TextureLoader()
const texture = textureLoader.load(require('../assets/images/color.jpg'))

// Cube
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ map: texture });
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

renderer.render(scene, camera);
const cursor = {
  x: 0,
  y: 0
}
window.addEventListener('mousemove', (event) => {
  cursor.x = event.clientX / sizes.width - 0.5
  cursor.y = -(event.clientY / sizes.height - 0.5)
})
const controls = new OrbitControls(camera, canvas)
// 启用阻尼感
controls.enableDamping = true

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
  controls.update()
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick)
}
tick()
