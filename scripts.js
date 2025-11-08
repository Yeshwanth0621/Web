// ===== COSMIC CURIOSITY JAVASCRIPT =====

// ===== GLOBAL VARIABLES =====
let orbitAnimation, gravityAnimation, solarAnimation;
let orbitSpeed = 1, gravityStrength = 5, solarZoom = 1;
let pollData = {
  'mars-mission': 0,
  'europa-explorer': 0,
  'interstellar-probe': 0,
  'space-telescope': 0
};
let hasVoted = false;
let scrollTimeout, resizeTimeout;

// ===== SPACE DATA =====
const spaceFacts = [
  "A day on Venus (243 Earth days) is longer than its year (225 Earth days).",
  "The Sun makes up 99.86% of the Solar System's mass.",
  "There are more stars in the universe than grains of sand on all Earth's beaches.",
  "Neutron stars can spin at a rate of 600 rotations per second.",
  "The footprints on the Moon will be there for 100 million years.",
  "Saturn's density is so low it could float in water.",
  "One spoonful of a neutron star would weigh 6 billion tons.",
  "The Milky Way galaxy is 105,700 light-years wide.",
  "The universe is 13.8 billion years old.",
  "There are 88 recognized constellations in our night sky."
];

const dailyWhatIfs = [
  {
    question: "What if Earth had two moons?",
    scenario: "Imagine waking up to see not one, but two moons gracing our night sky. The gravitational dance between Earth and two lunar companions would create dramatic tides, potentially double the height of our current tides, and create a more complex orbital mechanics system that would fascinate astronomers for centuries.",
    effects: [
      "Enhanced tidal forces affecting coastal ecosystems",
      "Brighter nights affecting nocturnal wildlife",
      "Complex orbital mechanics requiring new calculations",
      "Potential for more frequent eclipses"
    ]
  },
  {
    question: "What if Jupiter became a star?",
    scenario: "If Jupiter ignited as a small star, our solar system would become a binary star system. The night sky would be dominated by two bright objects, and the additional light and heat would dramatically alter Earth's climate and potentially make some regions uninhabitable while creating new habitable zones.",
    effects: [
      "Binary star system with two light sources",
      "Dramatic climate changes on Earth",
      "New habitable zones in the solar system",
      "Altered orbital dynamics for all planets"
    ]
  },
  {
    question: "What if Mars had a thick atmosphere?",
    scenario: "With a thick atmosphere, Mars could potentially support liquid water on its surface, making it much more hospitable to human colonization. The red planet might develop weather patterns similar to Earth, complete with clouds, rain, and possibly even primitive life forms.",
    effects: [
      "Liquid water possible on the surface",
      "Earth-like weather patterns",
      "Potential for human colonization",
      "Possibility of primitive life development"
    ]
  }
];

const spaceNews = [
  {
    title: "James Webb Discovers Water Vapor",
    excerpt: "The James Webb Space Telescope has detected water vapor in the atmosphere of a potentially habitable exoplanet...",
    date: "2 days ago",
    category: "Exoplanets",
    isNew: true
  },
  {
    title: "Solar Storm Activity Increases",
    excerpt: "NASA reports increased solar activity as we approach the solar maximum, with several X-class flares detected...",
    date: "5 days ago",
    category: "Solar System",
    isNew: false
  },
  {
    title: "New Moon Mission Announced",
    excerpt: "SpaceX and NASA collaborate on Artemis IV mission, targeting lunar south pole exploration...",
    date: "1 week ago",
    category: "Moon Missions",
    isNew: false
  }
];

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
  initializeAnimations();
  initializeParticleField();
  initializeShootingStars();
  updateCurrentDate();
  loadDailyWhatIf();
  loadSpaceFact();
  initializeSimulations();
  initializePoll();
  loadWeeklyUpdates();
  
  // Add scroll event listener for animations
  window.addEventListener('scroll', handleScrollAnimations);
  
  // Add resize event listener for responsive canvas
  window.addEventListener('resize', handleResize);
});

// ===== ANIMATION FUNCTIONS =====
function initializeAnimations() {
  // Add intersection observer for scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, { threshold: 0.1 });
  
  // Observe all sections
  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });
}

function initializeParticleField() {
  const particleField = document.getElementById('particle-field');
  
  // Reduce particle count on mobile for better performance
  const isMobile = window.innerWidth <= 768;
  const particleCount = isMobile ? 25 : 50;
  
  // Use DocumentFragment for better performance
  const fragment = document.createDocumentFragment();
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 15 + 's';
    particle.style.animationDuration = (15 + Math.random() * 10) + 's';
    fragment.appendChild(particle);
  }
  
  particleField.appendChild(fragment);
}

function initializeShootingStars() {
  const shootingStarsContainer = document.getElementById('shooting-stars');
  
  function createShootingStar() {
    const shootingStar = document.createElement('div');
    shootingStar.className = 'shooting-star';
    shootingStar.style.left = Math.random() * 100 + '%';
    shootingStar.style.top = Math.random() * 50 + '%';
    shootingStar.style.animationDuration = (1 + Math.random() * 2) + 's';
    shootingStar.style.animationDelay = Math.random() * 5 + 's';
    
    shootingStarsContainer.appendChild(shootingStar);
    
    // Remove after animation
    setTimeout(() => {
      if (shootingStar.parentNode) {
        shootingStar.parentNode.removeChild(shootingStar);
      }
    }, 4000);
  }
  
  // Use requestAnimationFrame for better performance
  let shootingStarInterval;
  
  function startShootingStars() {
    // Create shooting stars at random intervals
    shootingStarInterval = setInterval(createShootingStar, 3000 + Math.random() * 5000);
    
    // Create initial shooting stars
    for (let i = 0; i < 3; i++) {
      setTimeout(createShootingStar, i * 2000);
    }
  }
  
  // Start shooting stars after page load for better performance
  setTimeout(startShootingStars, 2000);
  
  // Stop shooting stars when page is hidden (battery optimization)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      clearInterval(shootingStarInterval);
    } else {
      startShootingStars();
    }
  });
}

// ===== UTILITY FUNCTIONS =====
function updateCurrentDate() {
  const dateElement = document.getElementById('current-date');
  const now = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  dateElement.textContent = now.toLocaleDateString('en-US', options);
}

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

function handleScrollAnimations() {
  // Debounced scroll handler for better performance
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    // Add parallax effect to background elements
    const scrolled = window.pageYOffset;
    const parallax = document.getElementById('nebula-background');
    if (parallax) {
      parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
  }, 10);
}

function handleResize() {
  // Debounced resize handler for better performance
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    // Resize canvas elements when window is resized
    const canvases = document.querySelectorAll('canvas');
    canvases.forEach(canvas => {
      if (canvas.id === 'scenario-canvas') {
        drawScenarioVisualization();
      } else if (canvas.id === 'orbit-canvas') {
        drawOrbitSimulation();
      } else if (canvas.id === 'gravity-canvas') {
        drawGravitySimulation();
      } else if (canvas.id === 'solar-canvas') {
        drawSolarSimulation();
      }
    });
  }, 250);
}

// ===== DAILY WHAT IF FUNCTIONS =====
function loadDailyWhatIf() {
  const today = new Date().getDay();
  const whatIf = dailyWhatIfs[today % dailyWhatIfs.length];
  
  document.getElementById('daily-question').textContent = whatIf.question;
  document.getElementById('daily-scenario').textContent = whatIf.scenario;
  
  const effectsList = document.getElementById('effects-list');
  effectsList.innerHTML = '';
  whatIf.effects.forEach(effect => {
    const li = document.createElement('li');
    li.textContent = effect;
    effectsList.appendChild(li);
  });
  
  // Draw scenario visualization
  setTimeout(() => drawScenarioVisualization(), 100);
}

function drawScenarioVisualization() {
  const canvas = document.getElementById('scenario-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw Earth
  ctx.beginPath();
  ctx.arc(centerX, centerY, 30, 0, 2 * Math.PI);
  ctx.fillStyle = '#4d79ff';
  ctx.fill();
  ctx.strokeStyle = '#6b8cff';
  ctx.lineWidth = 2;
  ctx.stroke();
  
  // Draw two moons
  const moon1X = centerX + 60 * Math.cos(Date.now() * 0.001);
  const moon1Y = centerY + 60 * Math.sin(Date.now() * 0.001);
  const moon2X = centerX + 80 * Math.cos(Date.now() * 0.0008 + Math.PI);
  const moon2Y = centerY + 80 * Math.sin(Date.now() * 0.0008 + Math.PI);
  
  // Moon 1
  ctx.beginPath();
  ctx.arc(moon1X, moon1Y, 15, 0, 2 * Math.PI);
  ctx.fillStyle = '#a855f7';
  ctx.fill();
  ctx.strokeStyle = '#c084fc';
  ctx.stroke();
  
  // Moon 2
  ctx.beginPath();
  ctx.arc(moon2X, moon2Y, 12, 0, 2 * Math.PI);
  ctx.fillStyle = '#a855f7';
  ctx.fill();
  ctx.strokeStyle = '#c084fc';
  ctx.stroke();
  
  // Draw orbital paths
  ctx.beginPath();
  ctx.arc(centerX, centerY, 60, 0, 2 * Math.PI);
  ctx.strokeStyle = 'rgba(168, 85, 247, 0.3)';
  ctx.lineWidth = 1;
  ctx.setLineDash([5, 5]);
  ctx.stroke();
  ctx.setLineDash([]);
  
  ctx.beginPath();
  ctx.arc(centerX, centerY, 80, 0, 2 * Math.PI);
  ctx.strokeStyle = 'rgba(168, 85, 247, 0.2)';
  ctx.stroke();
  
  // Animation loop
  requestAnimationFrame(drawScenarioVisualization);
}

// ===== SPACE FACT FUNCTIONS =====
function loadSpaceFact() {
  const today = new Date().getDay();
  const fact = spaceFacts[today % spaceFacts.length];
  document.getElementById('daily-fact').textContent = fact;
  
  // Initialize drag functionality
  initializeFactDraggable();
}

function refreshSpaceFact() {
  const randomFact = spaceFacts[Math.floor(Math.random() * spaceFacts.length)];
  const factElement = document.getElementById('daily-fact');
  
  // Add fade out effect
  factElement.style.opacity = '0';
  
  setTimeout(() => {
    factElement.textContent = randomFact;
    factElement.style.opacity = '1';
  }, 300);
}

function initializeFactDraggable() {
  const factCard = document.querySelector('.space-fact-sidebar');
  if (!factCard) return;
  
  let isDragging = false;
  let currentX;
  let currentY;
  let initialX;
  let initialY;
  let xOffset = 0;
  let yOffset = 0;
  
  const dragHandle = factCard.querySelector('.drag-handle');
  const closeBtn = factCard.querySelector('.close-fact');
  const refreshBtn = factCard.querySelector('.refresh-fact');
  
  // Close button functionality
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      factCard.classList.add('hidden');
      // Store preference in localStorage
      localStorage.setItem('spaceFactHidden', 'true');
    });
  }
  
  // Refresh button functionality
  if (refreshBtn) {
    refreshBtn.addEventListener('click', refreshSpaceFact);
  }
  
  // Check if user previously closed the fact card
  if (localStorage.getItem('spaceFactHidden') === 'true') {
    factCard.classList.add('hidden');
  }
  
  // Drag functionality
  if (dragHandle) {
    dragHandle.addEventListener('mousedown', dragStart);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', dragEnd);
    
    // Touch events for mobile
    dragHandle.addEventListener('touchstart', dragStart);
    document.addEventListener('touchmove', drag);
    document.addEventListener('touchend', dragEnd);
  }
  
  function dragStart(e) {
    if (e.type === 'touchstart') {
      initialX = e.touches[0].clientX - xOffset;
      initialY = e.touches[0].clientY - yOffset;
    } else {
      initialX = e.clientX - xOffset;
      initialY = e.clientY - yOffset;
    }
    
    if (e.target === dragHandle || dragHandle.contains(e.target)) {
      isDragging = true;
      factCard.classList.add('dragging');
    }
  }
  
  function drag(e) {
    if (isDragging) {
      e.preventDefault();
      
      if (e.type === 'touchmove') {
        currentX = e.touches[0].clientX - initialX;
        currentY = e.touches[0].clientY - initialY;
      } else {
        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;
      }
      
      xOffset = currentX;
      yOffset = currentY;
      
      factCard.style.transform = `translate(${currentX}px, ${currentY}px)`;
    }
  }
  
  function dragEnd(e) {
    initialX = currentX;
    initialY = currentY;
    isDragging = false;
    factCard.classList.remove('dragging');
    
    // Save position to localStorage
    localStorage.setItem('spaceFactPosition', JSON.stringify({ x: currentX, y: currentY }));
  }
  
  // Load saved position
  const savedPosition = localStorage.getItem('spaceFactPosition');
  if (savedPosition) {
    const pos = JSON.parse(savedPosition);
    xOffset = pos.x;
    yOffset = pos.y;
    currentX = pos.x;
    currentY = pos.y;
    factCard.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
  }
}

// ===== SIMULATION FUNCTIONS =====
function initializeSimulations() {
  drawOrbitSimulation();
  drawGravitySimulation();
  drawSolarSimulation();
}

function drawOrbitSimulation() {
  const canvas = document.getElementById('orbit-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw star
  ctx.beginPath();
  ctx.arc(centerX, centerY, 20, 0, 2 * Math.PI);
  ctx.fillStyle = '#ffff00';
  ctx.fill();
  ctx.strokeStyle = '#ffeb3b';
  ctx.stroke();
  
  // Draw orbiting planet
  const time = Date.now() * 0.001 * orbitSpeed;
  const planetX = centerX + 80 * Math.cos(time);
  const planetY = centerY + 80 * Math.sin(time);
  
  ctx.beginPath();
  ctx.arc(planetX, planetY, 10, 0, 2 * Math.PI);
  ctx.fillStyle = '#4d79ff';
  ctx.fill();
  ctx.strokeStyle = '#6b8cff';
  ctx.stroke();
  
  // Draw orbital path
  ctx.beginPath();
  ctx.arc(centerX, centerY, 80, 0, 2 * Math.PI);
  ctx.strokeStyle = 'rgba(77, 121, 255, 0.3)';
  ctx.setLineDash([5, 5]);
  ctx.stroke();
  ctx.setLineDash([]);
  
  if (orbitAnimation) {
    requestAnimationFrame(drawOrbitSimulation);
  }
}

function drawGravitySimulation() {
  const canvas = document.getElementById('gravity-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw gravity well visualization
  const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 100);
  gradient.addColorStop(0, 'rgba(77, 121, 255, 0.8)');
  gradient.addColorStop(0.5, 'rgba(77, 121, 255, 0.4)');
  gradient.addColorStop(1, 'rgba(77, 121, 255, 0.1)');
  
  ctx.beginPath();
  ctx.arc(centerX, centerY, 100, 0, 2 * Math.PI);
  ctx.fillStyle = gradient;
  ctx.fill();
  
  // Draw test particles
  for (let i = 0; i < 5; i++) {
    const angle = (Date.now() * 0.001 + i * Math.PI / 2.5) * gravityStrength * 0.2;
    const radius = 60 + 20 * Math.sin(Date.now() * 0.002 + i);
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, 2 * Math.PI);
    ctx.fillStyle = '#a855f7';
    ctx.fill();
  }
  
  if (gravityAnimation) {
    requestAnimationFrame(drawGravitySimulation);
  }
}

function drawSolarSimulation() {
  const canvas = document.getElementById('solar-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Sun
  ctx.beginPath();
  ctx.arc(centerX, centerY, 25 * solarZoom, 0, 2 * Math.PI);
  ctx.fillStyle = '#ffff00';
  ctx.fill();
  
  // Planets with different orbital speeds
  const planets = [
    { radius: 50, size: 5, speed: 2, color: '#8c7853' },    // Mercury
    { radius: 70, size: 7, speed: 1.5, color: '#ffc649' }, // Venus
    { radius: 90, size: 8, speed: 1, color: '#4d79ff' },   // Earth
    { radius: 110, size: 6, speed: 0.8, color: '#cd5c5c' } // Mars
  ];
  
  planets.forEach((planet, index) => {
    const time = Date.now() * 0.001 * planet.speed;
    const x = centerX + planet.radius * solarZoom * Math.cos(time);
    const y = centerY + planet.radius * solarZoom * Math.sin(time);
    
    ctx.beginPath();
    ctx.arc(x, y, planet.size * solarZoom, 0, 2 * Math.PI);
    ctx.fillStyle = planet.color;
    ctx.fill();
  });
  
  if (solarAnimation) {
    requestAnimationFrame(drawSolarSimulation);
  }
}

// Simulation control functions
function startOrbitSimulation() {
  orbitAnimation = true;
  drawOrbitSimulation();
}

function pauseOrbitSimulation() {
  orbitAnimation = false;
}

function resetOrbitSimulation() {
  orbitAnimation = false;
  drawOrbitSimulation();
}

function updateOrbitSpeed(value) {
  orbitSpeed = parseFloat(value);
}

function startGravitySimulation() {
  gravityAnimation = true;
  drawGravitySimulation();
}

function pauseGravitySimulation() {
  gravityAnimation = false;
}

function resetGravitySimulation() {
  gravityAnimation = false;
  drawGravitySimulation();
}

function updateGravityStrength(value) {
  gravityStrength = parseInt(value);
}

function startSolarSimulation() {
  solarAnimation = true;
  drawSolarSimulation();
}

function pauseSolarSimulation() {
  solarAnimation = false;
}

function resetSolarSimulation() {
  solarAnimation = false;
  drawSolarSimulation();
}

function updateSolarZoom(value) {
  solarZoom = parseFloat(value);
}

// ===== POLL FUNCTIONS =====
function initializePoll() {
  // Load poll data from localStorage if available
  const savedData = localStorage.getItem('pollData');
  if (savedData) {
    pollData = JSON.parse(savedData);
    updatePollDisplay();
  }
  
  // Check if user has already voted in this session
  const sessionVoted = sessionStorage.getItem('hasVoted');
  if (sessionVoted === 'true') {
    hasVoted = true;
    disablePollVoting();
    showPollResults();
  }
}

function submitPoll() {
  if (hasVoted) {
    alert('You have already voted in this session!');
    return;
  }
  
  const selectedOption = document.querySelector('input[name="poll"]:checked');
  if (!selectedOption) {
    alert('Please select an option before voting!');
    return;
  }
  
  // Increment vote count
  pollData[selectedOption.value]++;
  
  // Save to localStorage (persistent across sessions)
  localStorage.setItem('pollData', JSON.stringify(pollData));
  
  // Mark as voted in session storage
  hasVoted = true;
  sessionStorage.setItem('hasVoted', 'true');
  
  // Update display
  updatePollDisplay();
  
  // Show results
  showPollResults();
  
  // Disable voting
  disablePollVoting();
  
  // Announce to screen readers
  if (window.announceToScreenReader) {
    window.announceToScreenReader('Vote submitted successfully!');
  }
}

function disablePollVoting() {
  const submitButton = document.getElementById('poll-submit');
  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = 'Vote Submitted';
    submitButton.classList.add('voted');
  }
  
  document.querySelectorAll('.poll-input').forEach(input => {
    input.disabled = true;
  });
  
  document.querySelectorAll('.poll-label').forEach(label => {
    label.style.cursor = 'not-allowed';
    label.style.opacity = '0.7';
  });
}

function updatePollDisplay() {
  const totalVotes = Object.values(pollData).reduce((a, b) => a + b, 0);
  
  for (let i = 1; i <= 4; i++) {
    const optionKey = ['mars-mission', 'europa-explorer', 'interstellar-probe', 'space-telescope'][i-1];
    const countElement = document.getElementById(`count-${i}`);
    if (countElement) {
      countElement.textContent = `${pollData[optionKey]} vote${pollData[optionKey] !== 1 ? 's' : ''}`;
    }
  }
  
  // Update total votes display
  const totalElement = document.querySelector('.poll-total-votes');
  if (totalElement) {
    totalElement.textContent = `${totalVotes} total vote${totalVotes !== 1 ? 's' : ''}`;
  }
}

function showPollResults() {
  const resultsContainer = document.getElementById('poll-results');
  const chartContainer = document.getElementById('results-chart');
  const totalVotes = Object.values(pollData).reduce((a, b) => a + b, 0);
  
  if (totalVotes === 0) return;
  
  const options = [
    { key: 'mars-mission', label: 'Mars Colony Mission' },
    { key: 'europa-explorer', label: 'Europa Ocean Explorer' },
    { key: 'interstellar-probe', label: 'Interstellar Probe' },
    { key: 'space-telescope', label: 'Next-Gen Space Telescope' }
  ];
  
  chartContainer.innerHTML = '';
  
  options.forEach(option => {
    const percentage = totalVotes > 0 ? Math.round((pollData[option.key] / totalVotes) * 100) : 0;
    
    const resultBar = document.createElement('div');
    resultBar.className = 'result-bar';
    resultBar.innerHTML = `
      <span class="result-label">${option.label}</span>
      <div class="result-progress">
        <div class="result-fill" style="width: ${percentage}%"></div>
      </div>
      <span class="result-percentage">${percentage}%</span>
    `;
    
    chartContainer.appendChild(resultBar);
  });
  
  resultsContainer.style.display = 'block';
}

// ===== WEEKLY UPDATES FUNCTIONS =====
function loadWeeklyUpdates() {
  const updatesGrid = document.getElementById('updates-grid');
  if (!updatesGrid) return;
  
  updatesGrid.innerHTML = '';
  
  spaceNews.forEach((news, index) => {
    const updateCard = document.createElement('article');
    updateCard.className = `update-card ${news.isNew ? 'new' : ''}`;
    
    if (news.isNew) {
      updateCard.innerHTML = '<div class="update-badge">NEW</div>';
    }
    
    updateCard.innerHTML += `
      <div class="update-image">
        <canvas width="300" height="200"></canvas>
      </div>
      <div class="update-content">
        <h3 class="update-title">${news.title}</h3>
        <p class="update-excerpt">${news.excerpt}</p>
        <div class="update-meta">
          <span class="update-date">${news.date}</span>
          <span class="update-category">${news.category}</span>
        </div>
      </div>
    `;
    
    updatesGrid.appendChild(updateCard);
    
    // Draw placeholder image on canvas
    setTimeout(() => drawUpdateImage(updateCard.querySelector('canvas'), index), 100);
  });
}

function drawUpdateImage(canvas, index) {
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  const colors = ['#4d79ff', '#a855f7', '#00d4ff', '#ff6b6b', '#4ecdc4'];
  
  // Create gradient background
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, colors[index % colors.length]);
  gradient.addColorStop(1, colors[(index + 1) % colors.length]);
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Add some geometric shapes
  ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
  for (let i = 0; i < 5; i++) {
    ctx.beginPath();
    ctx.arc(
      Math.random() * canvas.width,
      Math.random() * canvas.height,
      Math.random() * 50 + 10,
      0,
      2 * Math.PI
    );
    ctx.fill();
  }
}

function loadMoreUpdates() {
  // Simulate loading more updates
  const button = event.target;
  button.textContent = 'Loading...';
  button.disabled = true;
  
  setTimeout(() => {
    // Add more dummy updates
    const updatesGrid = document.getElementById('updates-grid');
    const additionalNews = [
      {
        title: "Asteroid Mining Initiative",
        excerpt: "Private companies announce plans to begin asteroid mining operations within the next decade...",
        date: "2 weeks ago",
        category: "Space Economy",
        isNew: false
      },
      {
        title: "Quantum Communication Breakthrough",
        excerpt: "Scientists achieve quantum entanglement communication over unprecedented distances...",
        date: "3 weeks ago",
        category: "Space Technology",
        isNew: false
      }
    ];
    
    additionalNews.forEach((news, index) => {
      const updateCard = document.createElement('article');
      updateCard.className = 'update-card';
      updateCard.innerHTML = `
        <div class="update-image">
          <canvas width="300" height="200"></canvas>
        </div>
        <div class="update-content">
          <h3 class="update-title">${news.title}</h3>
          <p class="update-excerpt">${news.excerpt}</p>
          <div class="update-meta">
            <span class="update-date">${news.date}</span>
            <span class="update-category">${news.category}</span>
          </div>
        </div>
      `;
      
      updatesGrid.appendChild(updateCard);
      setTimeout(() => drawUpdateImage(updateCard.querySelector('canvas'), index + 3), 100);
    });
    
    button.textContent = 'All Updates Loaded';
  }, 1500);
}

// ===== MOBILE MENU FUNCTIONS =====
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !isExpanded);
      navLinks.classList.toggle('active');
    });
  }
});

// ===== ACCESSIBILITY FUNCTIONS =====
function enhanceAccessibility() {
  // Add keyboard navigation for custom elements
  document.querySelectorAll('.poll-label').forEach(label => {
    label.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const input = this.previousElementSibling;
        if (input) {
          input.checked = true;
        }
      }
    });
  });
  
  // Add ARIA live regions for dynamic content
  const liveRegion = document.createElement('div');
  liveRegion.setAttribute('aria-live', 'polite');
  liveRegion.setAttribute('aria-atomic', 'true');
  liveRegion.style.position = 'absolute';
  liveRegion.style.left = '-10000px';
  liveRegion.style.width = '1px';
  liveRegion.style.height = '1px';
  liveRegion.style.overflow = 'hidden';
  document.body.appendChild(liveRegion);
  
  // Function to announce changes to screen readers
  window.announceToScreenReader = function(message) {
    liveRegion.textContent = message;
    setTimeout(() => {
      liveRegion.textContent = '';
    }, 1000);
  };
}

// Initialize accessibility features
enhanceAccessibility();

// ===== PERFORMANCE OPTIMIZATIONS =====
// Debounce function for performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Debounced resize handler
const debouncedResize = debounce(handleResize, 250);
window.addEventListener('resize', debouncedResize);

// Lazy loading for images (if any are added)
function initializeLazyLoading() {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', initializeLazyLoading);