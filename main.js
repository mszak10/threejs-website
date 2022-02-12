import './style.css';
import * as THREE from 'three';
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';  


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

// Setting up TorusKnot
const geometry = new THREE.TorusKnotGeometry( 10, 3, 100, 16 );
const material = new THREE.MeshStandardMaterial({ color: 0x005ECF });
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);
torus.position.x = 22;
torus.position.z = -10;

// Lightning
const pointLight = new THREE.PointLight(0xffffff);
//pointLight.position.set(5, 5, 5);
pointLight.position.set(20, 50, 500);

//const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight/*, ambientLight*/);

// Helpers
const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50);
//scene.add(lightHelper)
//scene.add(gridHelper);

//const controls = new OrbitControls(camera, renderer.domElement);

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

const earthTexture = new THREE.TextureLoader().load( 'earthmap.jpg' );
const earthNormal = new THREE.TextureLoader().load( 'earthbump.jpg' );

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial( {
    map: earthTexture,
    bumpMap: earthNormal
  } )
);

scene.add(earth);

earth.position.z = 45;
earth.position.x = 25;

// Mars
const marsTexture = new THREE.TextureLoader().load( 'mars_1k_color.jpg' );
const marsNormal = new THREE.TextureLoader().load( 'mars_1k_normal.jpg' );

const mars = new THREE.Mesh(
  new THREE.SphereGeometry(3.5, 32, 32),
  new THREE.MeshStandardMaterial( {
    map: marsTexture,
    normalMap: marsNormal
  } )
);

scene.add(mars);

mars.position.z = 70;
mars.position.x = 25;

function moveCamera(){
  const t = document.body.getBoundingClientRect().top;
  earth.rotation.y = t * 0.005
  mars.rotation.y = t * 0.003

  camera.position.x = (t - 3) * -0.0002;
  camera.position.y = t * -0.0002;
  camera.position.z = (t - 1000) * -0.03;
}

document.body.onscroll = moveCamera;

function animate() {
  requestAnimationFrame( animate );

  //controls.update();

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  renderer.render( scene, camera );
}

animate();