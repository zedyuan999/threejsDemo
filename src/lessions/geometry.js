import * as THREE from 'three'
// Scene
const scene = new THREE.Scene();

// Cube
const geometry = new THREE.SphereGeometry(1, 32, 32)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
const mesh = new THREE.Mesh(geometry, material);
mesh.rotation.x = Math.PI * 0.1
mesh.rotation.y = Math.PI * 0.1
scene.add(mesh);

// // 创建一个空的几何图形
// const geometry = new THREE.BufferGeometry()
// // 定义几何图形的顶点
// // const positionsArray = new Float32Array([
// //   0, 0, 0, // 第一个顶点
// //   0, 1, 0, // 第二个顶点
// //   1, 0, 0  // 第三个顶点
// // ])

// const count = 50
// const positionsArray = new Float32Array(count * 3 * 3)
// for (let i = 0; i < count * 3 * 3; i++) {
//   positionsArray[i] = (Math.random() - 0.5) * 4
// }
// // 将顶点数组传给几何图形前要将它转换成几何图形属性的格式
// // 第一个参数是类数组，第二个参数是用多少个数决定一个顶点。例子里写的3，就是每3个数值决定一个顶点，它们分别对应x,y,z。
// const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)
// // 将几何图形的position属性设置为将转换后的顶点数组
// geometry.setAttribute('position', positionsAttribute)
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);

const sizes = {
  width: 800,
  height: 600,
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

