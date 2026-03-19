import * as THREE from "three";
import { CONFIG, TITLES } from "./config.js";
import vertexShader from "../shaders/vertexShader.glsl";
import fragmentShader from "../shaders/fragmentShader.glsl";

export function createSpiral(scene, renderer, cameraPositionUniform) {
  const textureLoader = new THREE.TextureLoader();
  const textures = Array.from({ length: CONFIG.totalImages }, (_, i) =>
    textureLoader.load(`/images/img${i + 1}.webp`, (t) => {
      t.minFilter = THREE.LinearMipmapLinearFilter;
      t.anisotropy = renderer.capabilities.getMaxAnisotropy();
    }),
  );

  const totalTiles = Math.floor(CONFIG.tilesPerRevolution * CONFIG.revolutions);
  const angleStep = (Math.PI * 2) / CONFIG.tilesPerRevolution;
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
    mesh.userData = { 
      title: titles[i % titles.length], 
      originalY: centerY,
      currentZ: 0,
      targetZ: 0
    };

    const tile = new THREE.Group();
    tile.rotation.y = i * angleStep;
    tile.add(mesh);
    spiral.add(tile);
    meshes.push(mesh);
  }

  const spiralHeight = Math.abs(tileEdgesY[totalTiles]);

  return { spiral, meshes, spiralHeight, angleStep };
}
