//Solar System Data
const PLANETS = [
    { name: "Mercury", color: 0xb1b1b1, size: 0.38, distance: 6, speed: 4.8 },
    { name: "Venus",   color: 0xeccc9a, size: 0.95, distance: 8, speed: 3.5 },
    { name: "Earth",   color: 0x2a5cdd, size: 1,    distance: 10, speed: 2.98 },
    { name: "Mars",    color: 0xc1440e, size: 0.53, distance: 12, speed: 2.41 },
    { name: "Jupiter", color: 0xe0c38a, size: 11.2, distance: 16, speed: 1.31 },
    { name: "Saturn",  color: 0xf7e7b6, size: 9.45, distance: 20, speed: 0.97 },
    { name: "Uranus",  color: 0x7ad7f0, size: 4,    distance: 24, speed: 0.68 },
    { name: "Neptune", color: 0x4062c7, size: 3.88, distance: 28, speed: 0.54 }
  ];
  
  // Three.js Setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / (window.innerHeight * 0.6), 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight * 0.6);
  document.getElementById('container').appendChild(renderer.domElement);
  
  // Lighting
  const sunLight = new THREE.PointLight(0xffffff, 2, 1000);
  scene.add(sunLight);
  
  // Sun
  const sunGeometry = new THREE.SphereGeometry(2, 32, 32);
  const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffcc00 });
  const sun = new THREE.Mesh(sunGeometry, sunMaterial);
  scene.add(sun);
  
  // Planets
  const planetMeshes = [];
  const planetSpeeds = [];
  const planetAngles = [];
  PLANETS.forEach((planet, i) => {
    const geometry = new THREE.SphereGeometry(planet.size * 0.7, 32, 32);
    const material = new THREE.MeshStandardMaterial({ color: planet.color });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    planetMeshes.push(mesh);
    planetSpeeds.push(planet.speed * 0.01); // scale for animation
    planetAngles.push(Math.random() * Math.PI * 2); // random start
  });
  
  // Camera position
  camera.position.set(0, 20, 40);
  camera.lookAt(0, 0, 0);
  
  // Controls
  const slidersDiv = document.getElementById('sliders');
  PLANETS.forEach((planet, i) => {
    const label = document.createElement('label');
    label.innerHTML = `
      <span>${planet.name}</span>
      <input type="range" min="0.001" max="0.1" step="0.001" value="${planetSpeeds[i]}" data-index="${i}">
    `;
    slidersDiv.appendChild(label);
  });
  slidersDiv.addEventListener('input', (e) => {
    if (e.target.type === 'range') {
      const idx = e.target.dataset.index;
      planetSpeeds[idx] = parseFloat(e.target.value);
    }
  });
  
  // Pause/Resume
  let paused = false;
  document.getElementById('pauseBtn').onclick = () => {
    paused = !paused;
    document.getElementById('pauseBtn').textContent = paused ? 'Resume' : 'Pause';
  };
  
  // Animation 
  function animate() {
    requestAnimationFrame(animate);
    if (!paused) {
      planetMeshes.forEach((mesh, i) => {
        planetAngles[i] += planetSpeeds[i];
        const d = PLANETS[i].distance;
        mesh.position.set(
          Math.cos(planetAngles[i]) * d,
          0,
          Math.sin(planetAngles[i]) * d
        );
        mesh.rotation.y += 0.01; 
      });
    }
    renderer.render(scene, camera);
  }
  animate();
  
  // Responsive Resize 
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / (window.innerHeight * 0.6);
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight * 0.6);
  });