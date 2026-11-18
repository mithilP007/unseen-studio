import * as THREE from "three";

export function initUIControls() {
  const elements = {
    xHero: document.getElementById('x-coord-hero'),
    yHero: document.getElementById('y-coord-hero'),
    xAbout: document.getElementById('x-coord-about'),
    yAbout: document.getElementById('y-coord-about'),
    cursorV: document.querySelector('.cursor-line-v'),
    cursorH: document.querySelector('.cursor-line-h'),
    cursorCross: document.querySelector('.cursor-crosshair'),
    tooltip: document.getElementById('spiral-tooltip'),
    tooltipText: document.getElementById('spiral-tooltip')?.querySelector('.tooltip-text'),
  };

  const updateTooltipPosition = (hoveredMesh, camera) => {
    if (!hoveredMesh) return;
    const vector = new THREE.Vector3();
    hoveredMesh.getWorldPosition(vector);
    vector.project(camera);

    const x = (vector.x * 0.5 + 0.5) * window.innerWidth;
    const y = -(vector.y * 0.5 - 0.5) * window.innerHeight;

    elements.tooltip.style.left = `${x}px`;
    elements.tooltip.style.top = `${y}px`;
    elements.tooltip.style.transform = `translate(-50%, -50%)`;
  };

  const handleCursorDOM = (e, canvasRect) => {
    // Exact Pixel storage for animate() logic
    const mouseXPos = e.clientX;
    const mouseYPos = e.clientY;

    if (elements.xHero && elements.yHero) {
      elements.xHero.innerHTML = mouseXPos;
      elements.yHero.innerHTML = mouseYPos;
    }
    if (elements.cursorV) elements.cursorV.style.left = `${mouseXPos}px`;
    if (elements.cursorH) elements.cursorH.style.top = `${mouseYPos}px`;
    if (elements.cursorCross) {
      elements.cursorCross.style.left = `${mouseXPos}px`;
      elements.cursorCross.style.top = `${mouseYPos}px`;
      elements.cursorCross.style.transform = 'translate(-50%, -50%)';
    }

    return { mouseXPos, mouseYPos };
  };

  return { elements, updateTooltipPosition, handleCursorDOM };
}
