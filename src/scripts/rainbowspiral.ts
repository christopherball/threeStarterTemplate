import * as THREE from "three";
import Stats from "./lib/stats.js";
import { Utilities } from "./lib/utilities.js";
import fragShader from "../shaders/rainbowspiral.frag";
import vertShader from "../shaders/shared.vert";

//! Globals -------------------------------------------------------------------
const stats = new Stats();
let camera: THREE.OrthographicCamera,
  scene: THREE.Scene,
  renderer: THREE.WebGLRenderer,
  uniforms: any,
  clock: THREE.Clock,
  mousePressed = false,
  animationRequestId: number,
  animationLoopState = true;

//! Initialization ------------------------------------------------------------
function init(callback: () => void) {
  scene = new THREE.Scene();
  camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  clock = new THREE.Clock();

  uniforms = {
    uTime: { value: 0 },
    uTimeDelta: { value: 0 },
    uResolution: {
      value: new THREE.Vector3(
        window.innerWidth,
        window.innerHeight,
        window.devicePixelRatio
      ),
    },
    uFrame: {
      value: 0,
    },
    uFrameRate: {
      value: 0,
    },
    uMouse: {
      value: new THREE.Vector4(),
    },
    uMouseSimple: {
      value: new THREE.Vector2(),
    },
  };

  const geometry = new THREE.PlaneGeometry(2, 2);
  const material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: vertShader,
    fragmentShader: fragShader,
    glslVersion: THREE.GLSL3,
  });
  scene.add(new THREE.Mesh(geometry, material));

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById("container").appendChild(renderer.domElement);

  stats.dom.className = "statsOff";
  document.body.appendChild(stats.dom);

  window.addEventListener("resize", onWindowResize);
  window.addEventListener("keypress", onKeypress);
  window.addEventListener("mousedown", onMousePressed);
  window.addEventListener("mouseup", onMouseReleased);
  window.addEventListener("mousemove", onMouseMoved);

  callback();
}

//! Animation Loop ------------------------------------------------------------
function animate() {
  // Updating uniforms for shaders
  uniforms.uTimeDelta.value = clock.getDelta();
  uniforms.uTime.value = clock.getElapsedTime();
  uniforms.uFrame.value = renderer.info.render.frame;
  uniforms.uFrameRate.value = stats.fps;

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

function onMousePressed(e: MouseEvent) {
  mousePressed = true;
  uniforms.uMouse.value.z = e.clientX;
  uniforms.uMouse.value.w = Math.round(
    Utilities.map(0, window.innerHeight, window.innerHeight, 0, e.clientY)
  );
  return false;
}

function onMouseReleased(e: MouseEvent) {
  mousePressed = false;
  uniforms.uMouse.value.x = 0;
  uniforms.uMouse.value.y = 0;
  return false;
}

function onMouseMoved(e: MouseEvent) {
  if (!mousePressed) {
    uniforms.uMouseSimple.value.x = e.clientX;
    uniforms.uMouseSimple.value.y = Math.round(
      Utilities.map(0, window.innerHeight, window.innerHeight, 0, e.clientY)
    );
  } else {
    uniforms.uMouse.value.x = e.clientX;
    uniforms.uMouse.value.y = Math.round(
      Utilities.map(0, window.innerHeight, window.innerHeight, 0, e.clientY)
    );
  }
  return false;
}

init(animate);
