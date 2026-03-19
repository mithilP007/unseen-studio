import * as THREE from "three";
import Lenis from "lenis";
import { isMobile, initMobileControls } from "./mobile.js";
import { CONFIG } from "./config.js";
import { initRenderer } from "./renderer.js";
import { createSpiral } from "./spiral.js";
import { initUIControls } from "./ui.js";

// 1. Load HTML Partials using Vite's ?raw import
import heroHTML from "../partials/hero.html?raw";
import aboutHTML from "../partials/about.html?raw";

const appContainer = document.getElementById("app");
if (appContainer) {
  appContainer.innerHTML = heroHTML + aboutHTML;
}

const heroSection = document.querySelector(".hero");
const lenis = new Lenis({ autoRaf: true });

// 2. State & UI Initialization
const { renderer, scene, camera, cameraPositionUniform, handleResize } = initRenderer(heroSection);
const { spiral, meshes, spiralHeight } = createSpiral(scene, renderer, cameraPositionUniform);
const { elements, handleCursorDOM, updateTooltipPosition } = initUIControls();
const mobileHandler = initMobileControls(spiral, CONFIG);

// Local State
let scrollY = 0, spinVelocity = 0;
let mouseX = 0, mouseY = 0, mouseXPos = 0, mouseYPos = 0, smoothX = 0, smoothY = 0;
let canvasRect = renderer.domElement.getBoundingClientRect();
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let hoveredMesh = null;

// 3. Handlers
lenis.on("scroll", (e) => {
  scrollY = window.pageYOffset;
  spinVelocity = e.velocity * CONFIG.scrollRotationMultiplier;
});

window.addEventListener("mousemove", (e) => {
  mouse.x = ((e.clientX - canvasRect.left) / canvasRect.width) * 2 - 1;
  mouse.y = -((e.clientY - canvasRect.top) / canvasRect.height) * 2 + 1;
  mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
  mouseY = (e.clientY / window.innerHeight - 0.5) * 2;

  const res = handleCursorDOM(e, canvasRect);
  mouseXPos = res.mouseXPos;
  mouseYPos = res.mouseYPos;
});

window.addEventListener("scroll", () => {
    canvasRect = renderer.domElement.getBoundingClientRect();
});

// 4. Animation Loop
function animate() {
  requestAnimationFrame(animate);

  const scrollProgress = Math.min(
    scrollY / (window.innerHeight * CONFIG.scrollMultiplier),
    1,
  );

  camera.position.y +=
    (-(scrollProgress * spiralHeight * CONFIG.cameraYMultiplier) -
      camera.position.y) *
    CONFIG.cameraSmoothing;

  if (!isMobile) {
    smoothX += (mouseX - smoothX) * 0.02;
    smoothY += (mouseY - smoothY) * 0.02;
    spiral.rotation.x = smoothY * CONFIG.parallaxStrength;
    spiral.rotation.z = -smoothX * CONFIG.parallaxStrength * 0.3;

    // Raycasting
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(meshes);

    if (intersects.length > 0) {
      const first = intersects[0].object;
      if (hoveredMesh !== first) {
        meshes.forEach(m => m.userData.targetZ = 0);
        hoveredMesh = first;
        elements.tooltipText.innerText = hoveredMesh.userData.title;
        elements.tooltip.style.opacity = '1';
        elements.tooltip.classList.add('active');
      }
      hoveredMesh.userData.targetZ = 0.8;
    } else {
      if (hoveredMesh) {
        hoveredMesh.userData.targetZ = 0;
        hoveredMesh = null;
      }
      elements.tooltip.style.opacity = '0';
      elements.tooltip.classList.remove('active');
    }

    // Cursor Color Logic
    const el = document.elementFromPoint(mouseXPos, mouseYPos);
    const isOverLight = el && (
      el.closest('.about') ||
      el.classList.contains('menu-btn') ||
      el.classList.contains('logo') ||
      el.tagName === 'IFRAME' ||
      el.tagName === 'IMG' ||
      intersects.length > 0
    );
    document.documentElement.style.setProperty('--cursor-color', isOverLight ? 'black' : 'white');

    // Smooth lerp positions
    meshes.forEach(m => {
      m.userData.currentZ += (m.userData.targetZ - m.userData.currentZ) * 0.1;
      m.position.z = m.userData.currentZ;
      m.scale.setScalar(1 + m.userData.currentZ * 0.05);
    });

    updateTooltipPosition(hoveredMesh, camera);
  }

  cameraPositionUniform.value.copy(camera.position);

  const touchVelocity = mobileHandler ? mobileHandler.getVelocity() : 0;
  spiral.rotation.y += CONFIG.baseRotationSpeed + spinVelocity + touchVelocity;
  spinVelocity *= CONFIG.rotationDecay;

  renderer.render(scene, camera);
}

// 5. Run it!
animate();