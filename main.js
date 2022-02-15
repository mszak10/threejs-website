import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';  
//import * as dat from 'dat.gui'


// Setup
const raycaster = new THREE.Raycaster();

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(50);
camera.position.setX(-3);

renderer.render(scene, camera);

// Setting up a Plane
const geometry = new THREE.PlaneGeometry( 400, 400, 50, 50 );
const material = new THREE.MeshPhongMaterial({ 
  //color: 0xCF1400,
  side: THREE.DoubleSide,
  flatShading: THREE.FlatShading,
  vertexColors: true});
const plane = new THREE.Mesh(geometry, material);

scene.add(plane);

const { array } = plane.geometry.attributes.position
for (let i=0; i < array.length; i += 3){
  const x = array[i]
  const y = array[i + 1]
  const z = array[i + 2]
  
  array[i + 2] = z + Math.random()
}

const colors = [];

for (let i = 0; i < plane.geometry.attributes.position.count; i++){
  colors.push(1, 0, 0);
}

plane.geometry.setAttribute('color', new THREE.BufferAttribute(new 
  Float32Array(colors), 3) 
  );

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

const spaceBackground = new THREE.TextureLoader().load( 'space.jpg' );
scene.background = spaceBackground;

function moveCamera(){
  const t = document.body.getBoundingClientRect().top;

  camera.position.x = (t - 3) * -0.0002;
  camera.position.y = t * -0.0002;
  camera.position.z = (t - 1000) * -0.03;
}

document.body.onscroll = moveCamera;

// Normalized mouse coordinates
const mouse = {
  x: undefined,
  y: undefined
}

function animate() {
  requestAnimationFrame( animate );

  controls.update();

  renderer.render( scene, camera );

  raycaster.setFromCamera(mouse, camera);
  const intersect = raycaster.intersectObject(plane);

  if (intersect.length > 0){
    intersect[0].object.geometry.attributes.color.setX[intersect[0].face.a, 0]

    //intersect[0].object.geometry.attributes.color. = true; doesn't work yet
  }
}

animate();

addEventListener('mousemove', (event) => {
  mouse.x = (event.clientX / innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / innerHeight) * 2 + 1;
})
