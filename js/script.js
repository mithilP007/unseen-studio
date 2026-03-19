import * as THREE from "three";
import Lenis from "lenis";
import vertexShader from "../shaders/vertexShader.glsl";
import fragmentShader from "../shaders/fragmentShader.glsl";
import { isMobile, initMobileControls } from "./mobile.js";
import { CONFIG, TITLES } from "./config.js";
const lenis = new Lenis({ autoRaf: true });

const heroSection = document.querySelector(".hero");

const totalTiles = Math.floor(CONFIG.tilesPerRevolution * CONFIG.revolutions);
const angleStep = (Math.PI * 2) / CONFIG.tilesPerRevolution;

// User requested to disable WebGL temporarily for UI work
const ENABLE_WEBGL = true;

// Variable declarations moved to top for safety and consistency
// isMobile now imported from mobile.js helper
const xHero = document.getElementById('x-coord-hero');
const yHero = document.getElementById('y-coord-hero');
const xAbout = document.getElementById('x-coord-about');
const yAbout = document.getElementById('y-coord-about');
const cursorV = document.querySelector('.cursor-line-v');
const cursorH = document.querySelector('.cursor-line-h');
const cursorCross = document.querySelector('.cursor-crosshair');
const tooltip = document.getElementById('spiral-tooltip');
const tooltipText = tooltip ? tooltip.querySelector('.tooltip-text') : null;

// Initialize Raycasting tools
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

if (ENABLE_WEBGL) {
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    75,
    heroSection.clientWidth / heroSection.clientHeight,
    0.1,
    1000,
  );
  camera.position.z = CONFIG.cameraZ;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(heroSection.clientWidth, heroSection.clientHeight);
  heroSection.appendChild(renderer.domElement);

  const textureLoader = new THREE.TextureLoader();
  const textures = Array.from({ length: CONFIG.totalImages }, (_, i) =>
    textureLoader.load(`/images/img${i + 1}.webp`, (t) => {
      t.minFilter = THREE.LinearMipmapLinearFilter;
      t.anisotropy = renderer.capabilities.getMaxAnisotropy();
    }),
  );

  const cameraPositionUniform = {
    value: new THREE.Vector3(0, 0, CONFIG.cameraZ),
  };

  const tileEdgesY = [0];

  for (let i = 0; i < totalTiles; i++) {
    const progress = i / totalTiles;
    const radius =
      CONFIG.startRadius + (CONFIG.endRadius - CONFIG.startRadius) * progress;

    const arcWidth = (2 * Math.PI * radius) / CONFIG.tilesPerRevolution;
    const tileHeight = arcWidth * CONFIG.tileHeightRatio;

    tileEdgesY.push(
      tileEdgesY[i] - (tileHeight + CONFIG.spiralGap) / CONFIG.tilesPerRevolution,
    );
  }

  const spiral = new THREE.Group();
  scene.add(spiral);

  const meshes = [];
  const titles = TITLES;

  for (let i = 0; i < totalTiles; i++) {
    const progress = i / totalTiles;
    const radius =
      CONFIG.startRadius + (CONFIG.endRadius - CONFIG.startRadius) * progress;
    const arcWidth = (2 * Math.PI * radius) / CONFIG.tilesPerRevolution;
    const tileHeight = arcWidth * CONFIG.tileHeightRatio;
    const tileAngle = arcWidth / radius + CONFIG.tileOverlap;

    const centerY = (tileEdgesY[i] + tileEdgesY[i + 1]) / 2;
    const slope = tileEdgesY[i + 1] - tileEdgesY[i];

    const positions = [];
    const uvCoords = [];
    const indices = [];
    const segments = CONFIG.tileSegments;

    for (let row = 0; row <= 1; row++) {
      for (let col = 0; col <= segments; col++) {
        const angle = (col / segments - 0.5) * tileAngle;
        positions.push(
          Math.sin(angle) * radius,
          (row - 0.5) * tileHeight + (col / segments - 0.5) * slope,
          Math.cos(angle) * radius,
        );
        uvCoords.push(col / segments, row);
      }
    }

    for (let col = 0; col < segments; col++) {
      const current = col;
      const below = current + segments + 1;
      indices.push(current, below, current + 1, below, below + 1, current + 1);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3),
    );
    geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvCoords, 2));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uMap: { value: textures[i % CONFIG.totalImages] },
        uCameraPosition: cameraPositionUniform,
      },
      side: THREE.DoubleSide,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.y = centerY;
    mesh.userData = { title: titles[i % titles.length], originalY: centerY };

    const tile = new THREE.Group();
    tile.rotation.y = i * angleStep;
    tile.add(mesh);
    spiral.add(tile);
    meshes.push(mesh);
  }

  // Mobile Swipe Controls
  const mobileHandler = initMobileControls(spiral, CONFIG);

  const spiralHeight = Math.abs(tileEdgesY[totalTiles]);

  let scrollY = 0;
  let spinVelocity = 0;

  lenis.on("scroll", (e) => {
    scrollY = window.pageYOffset;
    spinVelocity = e.velocity * CONFIG.scrollRotationMultiplier;
  });

  let mouseX = 0,
    mouseY = 0,
    mouseXPos = 0,
    mouseYPos = 0,
    smoothX = 0,
    smoothY = 0;

  let canvasRect = renderer.domElement.getBoundingClientRect();
  
  window.addEventListener("mousemove", (e) => {
    // 1. Raycaster NDC calculation (Relative to Cached Canvas client rect for performance)
    mouse.x = ((e.clientX - canvasRect.left) / canvasRect.width) * 2 - 1;
    mouse.y = -((e.clientY - canvasRect.top) / canvasRect.height) * 2 + 1;

    // 2. Parallax Smooth values
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    
    // Exact Pixel storage for animate() logic
    mouseXPos = e.clientX;
    mouseYPos = e.clientY;

    // 3. UI Elements
    if (xHero && yHero) {
      xHero.innerHTML = e.clientX;
      yHero.innerHTML = e.clientY;
    }
    if (xAbout && yAbout) {
      xAbout.innerHTML = e.clientX;
      yAbout.innerHTML = e.clientY;
    }
    if (cursorV) cursorV.style.left = `${e.clientX}px`;
    if (cursorH) cursorH.style.top = `${e.clientY}px`;
    if (cursorCross) {
      cursorCross.style.left = `${e.clientX}px`;
      cursorCross.style.top = `${e.clientY}px`;
      cursorCross.style.transform = 'translate(-50%, -50%)';
    }
  });

  let hoveredMesh = null;

  // Add target properties for smooth lerping
  meshes.forEach(m => {
    m.userData.currentZ = 0;
    m.userData.targetZ = 0;
  });

  function animate() {
    requestAnimationFrame(animate);

    const progress = Math.min(
      scrollY / (window.innerHeight * CONFIG.scrollMultiplier),
      1,
    );

    camera.position.y +=
      (-(progress * spiralHeight * CONFIG.cameraYMultiplier) -
        camera.position.y) *
      CONFIG.cameraSmoothing;

    if (!isMobile) {
      smoothX += (mouseX - smoothX) * 0.02;
      smoothY += (mouseY - smoothY) * 0.02;
      spiral.rotation.x = smoothY * CONFIG.parallaxStrength;
      spiral.rotation.z = -smoothX * CONFIG.parallaxStrength * 0.3;

      // --- Raycasting Interactivity ---
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(meshes);

      if (intersects.length > 0) {
        const first = intersects[0].object;
        if (hoveredMesh !== first) {
          // Reset EVERY OTHER mesh just in case
          meshes.forEach(m => m.userData.targetZ = 0);

          hoveredMesh = first;
          tooltipText.innerText = hoveredMesh.userData.title;
          tooltip.style.opacity = '1';
          tooltip.classList.add('active'); // Trigger reveal animation
        }
        hoveredMesh.userData.targetZ = 0.8;
      } else {
        if (hoveredMesh) {
          hoveredMesh.userData.targetZ = 0;
          hoveredMesh = null;
        }
        tooltip.style.opacity = '0';
        tooltip.classList.remove('active');
      }

      // --- Global Cursor Color Logic (Improved for 3D + DOM) ---
      const elementUnderCursor = document.elementFromPoint(mouseXPos, mouseYPos);
      const isOverLightDOM = elementUnderCursor && (
        elementUnderCursor.closest('.about') ||
        elementUnderCursor.closest('.image-showcase') ||
        elementUnderCursor.classList.contains('menu-btn') ||
        elementUnderCursor.classList.contains('logo') ||
        elementUnderCursor.classList.contains('coords') ||
        elementUnderCursor.tagName === 'IFRAME' ||
        elementUnderCursor.tagName === 'IMG'
      );
      
      const isOverImage = intersects.length > 0;
      const finalIsOverLight = isOverLightDOM || isOverImage;

      document.documentElement.style.setProperty('--cursor-color', finalIsOverLight ? 'black' : 'white');

      // Smoothly Lerp positions for all meshes (so they reset smoothly too)
      meshes.forEach(m => {
        m.userData.currentZ += (m.userData.targetZ - m.userData.currentZ) * 0.1;
        m.position.z = m.userData.currentZ;
        m.scale.setScalar(1 + m.userData.currentZ * 0.05);
      });

      // Position Tooltip based on Hovered Mesh's Screen Projection
      if (hoveredMesh) {
        const vector = new THREE.Vector3();
        hoveredMesh.getWorldPosition(vector);
        vector.project(camera);

        const x = (vector.x * 0.5 + 0.5) * window.innerWidth;
        const y = -(vector.y * 0.5 - 0.5) * window.innerHeight;

        tooltip.style.left = `${x}px`;
        tooltip.style.top = `${y}px`;
        tooltip.style.transform = `translate(-50%, -50%)`;
      }
    }

    cameraPositionUniform.value.copy(camera.position);

    // Combination of scroll-spin + mobile touch-swipe velocity
    const touchVelocity = mobileHandler ? mobileHandler.getVelocity() : 0;
    spiral.rotation.y += CONFIG.baseRotationSpeed + spinVelocity + touchVelocity;
    spinVelocity *= CONFIG.rotationDecay;

    renderer.render(scene, camera);
  }

  animate();

  window.addEventListener("resize", () => {
    // Note: isMobile remains a constant export in this current simple version, 
    // but we can make it a function if we need reactive checking
    canvasRect = renderer.domElement.getBoundingClientRect();
    camera.aspect = heroSection.clientWidth / heroSection.clientHeight;
    camera.position.z = isMobile ? 15 : CONFIG.cameraZ;
    camera.updateProjectionMatrix();
    renderer.setSize(heroSection.clientWidth, heroSection.clientHeight);
  });

  window.addEventListener("scroll", () => {
    canvasRect = renderer.domElement.getBoundingClientRect();
  });
} // END if(ENABLE_WEBGL)





// 2. Pixelated SVG Clip-Path Reveal Animation Logic
const revealContent = document.querySelector('.pixelated-image-reveal__content');
const playBtn = document.querySelector('.video-container__play-fullscreen');

function animatePixelReveal() {
  if (!revealContent) return;

  // Get accurate dimensions of the video container
  const rect = revealContent.getBoundingClientRect();
  const w = rect.width || revealContent.offsetWidth;
  const h = rect.height || revealContent.offsetHeight;

  // Create a dynamic grid of squares (around 40px each)
  const gridSize = 40;
  const cols = Math.ceil(w / gridSize);
  const rows = Math.ceil(h / gridSize);
  const cellW = w / cols;
  const cellH = h / rows;
  const totalCells = cols * rows;

  // Generate a random delay for each square to create that digital "pixelated" effect
  const delays = Array.from({ length: totalCells }, () => Math.random() * 0.45);
  const duration = 0.5; // Growth duration for individual square

  let startTime = null;

  function renderFrame(time) {
    if (!startTime) startTime = time;
    const elapsed = (time - startTime) / 1000; // in seconds

    let pathString = '';
    let isComplete = true;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const idx = r * cols + c;

        // Calculate specific progress of this cell based on its delay
        let progress = (elapsed - delays[idx]) / duration;
        progress = Math.max(0, Math.min(1, progress));

        if (progress < 1) isComplete = false;

        // Ease Out Cubic for that snappy pop-in feel!
        const easedProgress = 1 - Math.pow(1 - progress, 3);

        if (easedProgress > 0) {
          // Find center point of cell
          const cx = c * cellW + cellW / 2;
          const cy = r * cellH + cellH / 2;

          // Calculate current size (add 1px overlap to prevent any gaps)
          const halfW = (cellW / 2) * easedProgress + 1;
          const halfH = (cellH / 2) * easedProgress + 1;

          // Construct SVG path rect using Move and Lines
          pathString += `M ${cx - halfW} ${cy - halfH} L ${cx + halfW} ${cy - halfH} L ${cx + halfW} ${cy + halfH} L ${cx - halfW} ${cy + halfH} Z `;
        }
      }
    }

    if (pathString) {
      revealContent.style.clipPath = `path("${pathString.trim()}")`;
      revealContent.style.webkitClipPath = `path("${pathString.trim()}")`;
    } else {
      revealContent.style.clipPath = `path("M 0 0 Z")`;
      revealContent.style.webkitClipPath = `path("M 0 0 Z")`;
    }

    if (!isComplete) {
      requestAnimationFrame(renderFrame);
    } else {
      // Cleanup when done so layout resets to 100% visible
      revealContent.style.clipPath = 'none';
      revealContent.style.webkitClipPath = 'none';
      revealContent.classList.add('complete');
    }
  }

  // Remove 'complete' status and kick off animation loop!
  revealContent.classList.remove('complete');
  requestAnimationFrame(renderFrame);
}

// Loop triggering
if (playBtn) {
  playBtn.addEventListener('click', () => {
    animatePixelReveal();
  });
}

// Launch initially after slight timeout for WOW effect on page load!
setTimeout(animatePixelReveal, 800);