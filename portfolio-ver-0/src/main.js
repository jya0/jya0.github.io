import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const canvas = document.querySelector('#index-canvas');

const renderer = new THREE.WebGLRenderer({
	antialias: true,
	canvas: canvas,
	alpha: true,
});

camera.position.setZ(30);
camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);


// Resize dynamically depending on windows size

/* function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false); */

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

const pointLight = new THREE.PointLight(0xFFFFFF, 1, 0, 0);
pointLight.position.set(0, 100, 0);

const ambientLight = new THREE.AmbientLight(0xFFFFFF, 1);
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

// Avatar

const jyaoTexture = new THREE.TextureLoader().load("../assets/images/jyao-pp.jpg")

const jyaoCube = new THREE.Mesh(
	new THREE.BoxGeometry(3, 3, 3),
	new THREE.MeshBasicMaterial({
		map: jyaoTexture,
	}),
);

scene.add(jyaoCube);

// Earth

const earth = new THREE.Mesh(
	new THREE.SphereGeometry(5, 64, 64),
	new THREE.MeshPhongMaterial({
		map: new THREE.TextureLoader().load("../assets/images/earth/earth-day.png"),
		normalMap: new THREE.TextureLoader().load("../assets/images/earth/earth-normal-map.png"),
		specularMap: new THREE.TextureLoader().load("../assets/images/earth/earth-specular-map.png"),
		specular: 0x0000F0,
	}),
);

const earthCloud = new THREE.Mesh(
	new THREE.SphereGeometry(5.1, 64, 64),
	new THREE.MeshStandardMaterial({
		map: new THREE.TextureLoader().load("../assets/images/earth/earth-cloud.png"),
		alphaMap: new THREE.TextureLoader().load("../assets/images/earth/earth-cloud.png"),
		transparent: true,
	}),
);

scene.add(earth, earthCloud);

// Background

// const bgTexture = new THREE.TextureLoader().load("../assets/images/landscape-grass.png");
// bgTexture.minFilter = THREE.LinearFilter;
// scene.background = bgTexture;

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

  rotateMesh(jyaoCube, 0.01, 0.01, 0.01);
  rotateMesh(torus, 0.01, 0.005, 0.01);
  rotateMesh(earth, 0.0001, 0, 0);
  rotateMesh(earthCloud, 0.0005, 0.0005, 0.0005);

  controls.update();

  renderer.render(scene, camera);
}

animate();