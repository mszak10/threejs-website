import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';  


// Setup
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Setting up a Plane
const geometry = new THREE.PlaneGeometry( 10, 10, 10, 10 );
const material = new THREE.MeshPhongMaterial({ 
  color: 0xCF1400,
side: THREE.DoubleSide,
flatShading: THREE.FlatShading });
const plane = new THREE.Mesh(geometry, material);

const { array } = plane.geometry.attributes.position
for (let i=0; i < array.length; i += 3){
  const x = array[i]
  const y = array[i + 1]
  const z = array[i + 2]
  
  array[i + 2] = z + Math.random()
}

scene.add(plane);

// Lightning
const directionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.position.set(0, 0, 1);
scene.add(directionalLight);

// Helpers
const lightHelper = new THREE.PointLightHelper(directionalLight)
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper)
scene.add(gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

// Stars
const star_geometry = new THREE.SphereGeometry(0.25, 24, 24);
const star_material = new THREE.MeshStandardMaterial( {color: 0xffffff} );

function addStar() {
  const star = new THREE.Mesh( star_geometry, star_material );
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 250 ));

  star.position.set(x, y, z);
  scene.add(star)
}

Array(800).fill().forEach(addStar);

const spaceBackground = new THREE.TextureLoader().load( 'space.jpg' );
scene.background = spaceBackground;

function moveCamera(){
  const t = document.body.getBoundingClientRect().top;

  camera.position.x = (t - 3) * -0.0002;
  camera.position.y = t * -0.0002;
  camera.position.z = (t - 1000) * -0.03;
}

document.body.onscroll = moveCamera;

function animate() {
  requestAnimationFrame( animate );

  controls.update();

  renderer.render( scene, camera );
}

animate();
