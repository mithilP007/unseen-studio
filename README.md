# Studio Dialect 3D Spiral Image Gallery

![Website Preview](./public/website%20preview%20img.png)

A mesmerizing, high-fidelity 3D spiral image gallery built with WebGL. This project creates an immersive, interactive experience featuring custom procedural geometry, real-time shaders, and advanced physics-based interactions.

> [!NOTE]
> **Inspiration Credit:** This project is a technical recreation and exploration inspired by the exceptional design work at [Studio Dialect](https://studiodialect.com/).

## ✨ Features

- **Endless 3D Spiral:** Custom-calculated geometry that dynamically arranges images in a beautiful, infinite vertical spiral.
- **Bespoke GLSL Shaders:** High-performance custom shaders for texture rendering, featuring aesthetic color grading and depth-aware falloffs.
- **Smart High-Contrast Cursor:** A custom JavaScript-driven cursor system that intelligently inverts color (Black/White) based on both 3D objects and DOM elements.
- **Touch Interaction Engine:** Dedicated mobile module featuring horizontal touch-swipe gestures with inertia for a native-app feel on smartphones.
- **Butter-Smooth Scrolling:** Integrated with [Lenis](https://github.com/darkroomengineering/lenis) for a premium, synchronized scroll-and-spin experience.
- **Modular Architecture:** Fully decoupled codebase separating configuration, mobile logic, and core rendering engines.
- **Vite Powered:** Blazing fast development and optimized production builds.

## 🚀 Technologies Used

- **Three.js** - Advanced WebGL rendering.
- **Vanilla JavaScript (ES6 Modules)** - Clean, modular project logic.
- **GLSL** - Low-level GPU shading for premium visuals.
- **Lenis** - Smooth scrolling framework.
- **Vite** - Modern frontend bundling.

## 🛠️ Getting Started

### Prerequisites

You will need [Node.js](https://nodejs.org/) (v16+) installed.

### Installation

1. Clone the repository.
2. Install dependencies:

   ```bash
   npm install
   ```

### Development

Start the Vite development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## 📁 Project Structure

```text
├── public/              # Static assets
│   ├── images/          # Gallery .webp files
│   ├── svg/             # Branding & Icons
│   └── fonts/           # Premium typography
├── js/                  # Application Logic
│   ├── config.js        # Global metadata & settings
│   ├── mobile.js        # Touch gesture engine
│   └── script.js        # Core WebGL renderer
├── shaders/             # GPU Shader files
│   ├── fragmentShader.glsl
│   └── vertexShader.glsl
├── index.html           # Entry point
├── styles.css           # Global design system
└── vite.config.js       # Vite build configuration
```

## 📝 Configuration & Customization

- **Artistic Metadata:** Edit `js/config.js` to update image titles or tweak technical parameters like spiral radius and rotation speed.
- **Visuals:** Modify the GLSL files in the `shaders/` directory to change the image rendering aesthetics.
- **Assets:** Simply drop new `.webp` images into `public/images/` and update the `totalImages` count in `js/config.js`.

## 📄 License

This project is licensed under the MIT License.
