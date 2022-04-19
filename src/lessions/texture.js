import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as lil from 'lil-gui'
const gui = new lil.GUI()
// Scene
const scene = new THREE.Scene();

// 利用Image对象加载
// const img = new Image()
// const texture = new THREE.Texture(img)
// img.onload = () => {
//   texture.needsUpdate = true
// }
// img.src = require('@/assets/images/door/color.jpg')

// 利用纹理加载器加载
// const textureLoader = new THREE.TextureLoader()
// const texture = textureLoader.load(require('@/assets/images/door/color.jpg'))

// 纹理加载器还能监听纹理加载情况
// const textureLoader = new THREE.TextureLoader()
// const texture = textureLoader.load(
//   require('@/assets/images/door/color.jpg'),
//   () => {
//     console.log('loading finished')
//   },
//   () => {
//     console.log('loading progressing')
//   },
//   () => {
//     console.log('loading error')
//   }
// )

// 如果每加载一次纹理都需要监听一遍，那效率太低了。利用加载管理器进行管理所有纹理的加载。
const loadingManager = new THREE.LoadingManager()
loadingManager.onStart = () => {
  console.log('loading started')
}
loadingManager.onLoad = () => {
  console.log('loading finished')
}
loadingManager.onProgress = () => {
  console.log('loading progressing')
}
loadingManager.onError = () => {
  console.log('loading error')
}
const textureLoader = new THREE.TextureLoader(loadingManager)
const colorTexture = textureLoader.load(require('@/assets/images/checkerboard-8x8.png'))
// const alphaTexture = textureLoader.load(require('@/assets/images/door/alpha.jpg'))
// const heightTexture = textureLoader.load(require('@/assets/images/door/height.png'))
// const normalTexture = textureLoader.load(require('@/assets/images/door/normal.jpg'))
// const ambientOcclusionTexture = textureLoader.load(require('@/assets/images/door/ambientOcclusion.jpg'))
// const metalnessTexture = textureLoader.load(require('@/assets/images/door/metalness.jpg'))
// const roughness = textureLoader.load(require('@/assets/images/door/roughness.jpg'))
// colorTexture.repeat.x = 2
// colorTexture.repeat.y = 3
// colorTexture.wrapS = THREE.RepeatWrapping
// colorTexture.wrapT = THREE.RepeatWrapping
colorTexture.rotation = Math.PI * 0.25
colorTexture.center.x = 0.5
colorTexture.center.y = 0.5
colorTexture.magFilter = THREE.NearestFilter
const texture = colorTexture

// Cube
const geometry = new THREE.BoxGeometry(1, 1, 1)
// const geometry = new THREE.SphereGeometry(1, 32, 32)
// const geometry = new THREE.ConeGeometry(1, 1, 32)
// const geometry = new THREE.TorusGeometry(1, 0.35, 32, 100)

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
