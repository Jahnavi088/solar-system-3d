#3D Solar System – Three.js Welcome to the interactive 3D Solar System simulation! This project demonstrates 3D rendering, animation, and user interaction using Three.js. You can explore the solar system, control planet speeds, and enjoy a humanized, engaging UI.

Features

Sun & 8 Planets:Realistic 3D spheres, correct order, and relative sizes.
Animated Orbits:Each planet orbits the Sun at adjustable speeds.
Speed Controls: Sliders to change each planet's orbital speed in real time.
Pause/Resume:Button to pause or resume the animation.
Responsive Design:Works on desktop and mobile browsers.
Interactivity:
Hover over a planet to see its name and a fun fact.
Click a planet to zoom in and focus the camera.
Dark/Light mode toggle for user comfort
Setup & Running Locally

Clone or Download this repository (or unzip the provided folder).
Open index.htmldirectly in your browser.
File Structure (project root) ├── index.html # Main HTML file ├── style.css # Styles for layout and UI ├── main.js # Three.js logic and interactivity └── README.md # This file

How It Works:

-The Sun is created at the center using a glowing sphere and a PointLight.

-Each planet is constructed with its own size, color, orbit radius, and speed.

-Planets move around the Sun in circular orbits using cosine and sine functions.

-A slider for each planet lets you adjust its orbital speed in real-time.

-The “Pause” button freezes or resumes the animation loop.
