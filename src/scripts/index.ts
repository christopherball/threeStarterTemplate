import * as THREE from "three";
import Stats from "three/examples/jsm/libs/stats.module";
import { GUI } from "dat.gui";

//! Globals -------------------------------------------------------------------
const stats = new Stats();
const gui = new GUI();
let camera: THREE.PerspectiveCamera,
  scene: THREE.Scene,
  renderer: THREE.WebGLRenderer,
  cube: THREE.Mesh,
  animationRequestId: number,
  animationLoopState = true,
  controls = null;

//! Initialization ------------------------------------------------------------
function init(callback: () => void) {
  scene = new THREE.Scene();
  let aspect = window.innerWidth / window.innerHeight;
  camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
  camera.position.z = 5;

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  gui.width = 300;
  const cubeFolder = gui.addFolder("Cube");
  controls = {
    rotationSpeed: 0.01,
  };
  cubeFolder
    .add(controls, "rotationSpeed", 0.001, 0.1, 0.001)
    .name("Rotational Speed");
  (<HTMLElement>gui.domElement.parentNode).classList.add("controlsOff");

  stats.dom.className = "statsOff";
  document.body.appendChild(stats.dom);

  window.addEventListener("resize", onWindowResize);
  window.addEventListener("keypress", onKeypress);

  callback();
}

//! Animation Loop ------------------------------------------------------------
function animate() {
  cube.rotation.x += controls.rotationSpeed;
  cube.rotation.y += controls.rotationSpeed;

  renderer.render(scene, camera);
  stats.update();

  animationRequestId = requestAnimationFrame(animate);
}

//! Event Handling ------------------------------------------------------------
function onWindowResize(e: Event) {
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onKeypress(e: KeyboardEvent) {
  if (e.code == "KeyD") {
    stats.dom.className =
      stats.dom.className == "statsOn" ? "statsOff" : "statsOn";
    if (
      (<HTMLElement>gui.domElement.parentNode).classList.contains("controlsOff")
    ) {
      (<HTMLElement>gui.domElement.parentNode).classList.remove("controlsOff");
      (<HTMLElement>gui.domElement.parentNode).classList.add("controlsOn");
    } else {
      (<HTMLElement>gui.domElement.parentNode).classList.remove("controlsOn");
      (<HTMLElement>gui.domElement.parentNode).classList.add("controlsOff");
    }
  } else if (e.code == "Space") {
    if (animationLoopState) {
      animationLoopState = false;
      cancelAnimationFrame(animationRequestId);
    } else {
      animationLoopState = true;
      animationRequestId = requestAnimationFrame(animate);
    }
  }
}

init(animate);
