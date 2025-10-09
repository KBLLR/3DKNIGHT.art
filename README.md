# 3DKNIGHT

### David Caballero Portfolio
UI Generalist // Designer // Front End Developer // 3D Computational Graphics

## Purpose

This repository contains the source code for David Caballero's portfolio website. It is designed to be an interactive and engaging showcase of his skills in design, front-end development, and 3D graphics. The site features a unique user interface with custom animations powered by Theatre.js and a dynamic mouse trail effect created with PIXI.js.

## Usage

The website is a single-page experience. Users can interact with various elements on the page to trigger animations and explore content.

- **Interactive Eye:** The central "G.O.D" eye animation is interactive. Click on it to trigger a predefined animation sequence.
- **Mouse Trail:** A smooth, generative trail follows the mouse cursor, adding a dynamic visual element to the user experience.

## Development

To run the project locally, first install the dependencies and then start the Vite development server.

```bash
npm install
npm run dev
```

This will start a local server, and you can view the website in your browser at the provided URL (usually `http://localhost:5173`).

### Building for Production

To create a production-ready build, run:

```bash
npm run build
```
This command bundles the application and outputs the static files to the `dist/` directory. You can preview the production build locally with `npm run preview`.

## Project Structure

The project follows a standard web application structure, organized for clarity and maintainability.

```
public/
├── assets/         # Static assets like images, fonts, etc.
│   └── bitmap/
│       └── trail.png
└── ...
src/
├── css/            # Stylesheets for the application.
└── js/             # JavaScript modules.
    ├── app.js      # Main application logic, handles Theatre.js animations.
    └── mouse-trail.js # Implements the PIXI.js mouse trail effect.
index.html          # Main HTML entry point.
anjaProject.html    # Additional HTML page.
vite.config.js      # Vite configuration file.
package.json        # Project dependencies and scripts.
```

- **`public/`**: This directory contains static assets that are served as-is without being processed by the build tool.
- **`src/`**: This directory holds all the source code that needs to be processed, including JavaScript and CSS files.
- **`index.html` / `anjaProject.html`**: These are the main HTML entry points. They load the necessary CSS and JavaScript modules from the `src/` directory.
- **`vite.config.js`**: This file configures the Vite development server and build process.
- **`package.json`**: This file lists the project's dependencies (like `vite`, `@theatre/core`, and `pixi.js`) and defines the scripts for development, building, and previewing the application.
