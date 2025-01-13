import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);


const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#index-bg'),
});

camera.position.setZ(30);

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// Torus

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);

// const material = new THREE.MeshBasicMaterial({
// 	color: 0xFF6347,
// 	wireframe: true,
// });

const material = new THREE.MeshStandardMaterial({
	color: 0xFF6347,
});

const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

// Light sources

const pointLight = new THREE.PointLight(0xFFFFFF, 1, 0, 0.01);
pointLight.position.set(10, 10, 10);

const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.1);
scene.add(pointLight, ambientLight);

// Add stars

function addStar() {
	const geometry = new THREE.SphereGeometry(0.25, 24, 24);
	const material = new THREE.MeshStandardMaterial({
		color: 0xFFFFFF,
	});
	const star = new THREE.Mesh(geometry, material);

	const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

	star.position.set(x, y, z);
	scene.add(star);
}

for (let count = 0; count < 200; count++) {
	addStar();
}

// Background

 const bgTexture = new THREE.TextureLoader().load("../assets/images/")

// Helpers

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

// Controls

const controls = new OrbitControls(camera, renderer.domElement);

function rotateMesh(mesh, x, y, z) {
	mesh.rotation.x += x;
	mesh.rotation.y += y;
	mesh.rotation.z += z;
}

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  rotateMesh(torus, 0.01, 0.005, 0.01)

  controls.update();

  renderer.render(scene, camera);
}

animate();