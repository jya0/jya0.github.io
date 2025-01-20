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

camera.position.set(-3, 0, 30);
// camera.aspect = window.innerWidth / window.innerHeight;
// camera.updateProjectionMatrix();

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);


// Resize dynamically depending on windows size

// Handle window resize
function onWindowResize() {
    // Update camera aspect ratio
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener("resize", onWindowResize);

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

const pointLight = new THREE.PointLight(0xFFFFFF, 5, 0, 0);
pointLight.position.set(0, 100, 80);

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

const jyaoTexture = new THREE.TextureLoader().load("assets/images/jyao-pp.webp")

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
		map: new THREE.TextureLoader().load("assets/images/earth/earth-day.webp"),
		normalMap: new THREE.TextureLoader().load("assets/images/earth/earth-normal-map.webp"),
		specularMap: new THREE.TextureLoader().load("assets/images/earth/earth-specular-map.webp"),
		specular: 0x000040,
	}),
);

const earthCloud = new THREE.Mesh(
	new THREE.SphereGeometry(5.1, 64, 64),
	new THREE.MeshStandardMaterial({
		map: new THREE.TextureLoader().load("assets/images/earth/earth-cloud.webp"),
		alphaMap: new THREE.TextureLoader().load("assets/images/earth/earth-cloud.webp"),
		transparent: true,
	}),
);


earth.position.set(-10, 0, 30);
earthCloud.position.set(-10, 0, 30);

scene.add(earth, earthCloud);

// Background

// const bgTexture = new THREE.TextureLoader().load("../assets/images/landscape-grass.webp");
// bgTexture.minFilter = THREE.LinearFilter;
// scene.background = bgTexture;

// Helpers

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

// Controls

const controls = new OrbitControls(camera, renderer.domElement);

function rotateMesh(mesh, x, y, z) {
	mesh.rotateX(x);
	mesh.rotateY(y);
	mesh.rotateZ(z);
}


const initCamPos = new THREE.Vector3(
	camera.position.x,
	camera.position.y,
	camera.position.z
);

function moveCamera() {
	const tScroll = document.body.getBoundingClientRect().top;
	rotateMesh(jyaoCube, 0, 0.1, 0.1);
	rotateMesh(earth, 0, 0.075, 0);
	rotateMesh(earthCloud, 0, 0.075, 0);

	camera.position.set(
		initCamPos.x + tScroll * 0.02,
		initCamPos.y + tScroll * -0.0002,
		initCamPos.z + tScroll * -0.05,
	);
	// console.log(`Scroll position: ${tScroll}, Camera position:`, camera.position);
}

document.addEventListener('scroll', moveCamera);

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