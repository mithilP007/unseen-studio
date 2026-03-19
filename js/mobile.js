/**
 * Mobile-specific interaction logic for Studio Dialect
 * Handles touch gestures for the WebGL spiral
 */

export const isMobile = window.innerWidth < 1000;

export function initMobileControls(spiral, config) {
    let isTouching = false;
    let startX = 0;
    let currentX = 0;
    let lastX = 0;
    let touchVelocity = 0;

    const spiralContainer = document.querySelector('.hero');
    if (!spiralContainer) return;

    spiralContainer.addEventListener('touchstart', (e) => {
        isTouching = true;
        startX = e.touches[0].clientX;
        lastX = startX;
        touchVelocity = 0;
    }, { passive: true });

    spiralContainer.addEventListener('touchmove', (e) => {
        if (!isTouching) return;

        currentX = e.touches[0].clientX;
        const deltaX = currentX - lastX;
        
        // Directly affect spiral rotation for immediate feedback
        // 0.005 is a sensitivity multiplier
        spiral.rotation.y += deltaX * 0.005;
        
        // Track velocity for inertia
        touchVelocity = deltaX * 0.01;
        
        lastX = currentX;
    }, { passive: true });

    spiralContainer.addEventListener('touchend', () => {
        isTouching = false;
    }, { passive: true });

    // Return the calculated velocity so script.js can add it to the main loop
    return {
        getVelocity: () => {
            const v = touchVelocity;
            touchVelocity *= 0.95; // Simple decay
            return v;
        }
    };
}
