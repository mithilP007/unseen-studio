import * as THREE from "three";
import { CONFIG } from "./config.js";
import { isMobile } from "./mobile.js";

export function initRenderer(heroSection) {
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

  const cameraPositionUniform = {
    value: new THREE.Vector3(0, 0, CONFIG.cameraZ),
  };

  const handleResize = () => {
    camera.aspect = heroSection.clientWidth / heroSection.clientHeight;
    camera.position.z = isMobile ? 15 : CONFIG.cameraZ;
    camera.updateProjectionMatrix();
    renderer.setSize(heroSection.clientWidth, heroSection.clientHeight);
    return renderer.domElement.getBoundingClientRect();
  };

  window.addEventListener("resize", handleResize);

  return { scene, camera, renderer, cameraPositionUniform, handleResize };
}
