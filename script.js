// Define game states
const gameState = {
  currentScene: 0,
  decisions: []
};

// Define scenarios
const scenarios = [
  {
    id: 0,
    description: "You receive intelligence that a rocket launcher is actively firing from the roof of a building. However, there are civilians inside. Do you order an airstrike?",
    choices: [
      {
        text: "Order the Airstrike",
        action: () => {
          triggerAirstrike();
          gameState.decisions.push('Ordered Airstrike');
        }
      },
      {
        text: "Do Not Order the Airstrike",
        action: () => {
          showFeedback("You chose not to order an airstrike. The civilians are safe for now, but the rocket launcher remains a threat.");
          gameState.decisions.push('Did Not Order Airstrike');
          showNextButton();
        }
      }
    ]
  },
  // Future scenarios can be added here
];

// Initialize the game
function initGame() {
  renderScene(gameState.currentScene);
}

// Render the current scene
function renderScene(sceneIndex) {
  const scene = scenarios[sceneIndex];
  const sceneDiv = document.getElementById('scene');
  sceneDiv.innerHTML = `
    <div id="illustration">
      <!-- Building -->
      <img src="assets/building.svg" alt="Building" id="building" />

      <!-- Rocket Launcher -->
      <img src="assets/rocket_launcher.svg" alt="Rocket Launcher" id="rocket-launcher" />

      <!-- Airstrike (Initially Hidden) -->
      <img src="assets/airstrike.svg" alt="Airstrike" id="airstrike" />
    </div>
    <div id="scenario-text">
      <h2>Scenario ${sceneIndex + 1}</h2>
      <p>${scene.description}</p>
    </div>
  `;
  renderChoices(scene.choices);
}

// Render choices
function renderChoices(choices) {
  const choicesDiv = document.getElementById('choices');
  choicesDiv.innerHTML = '';
  choices.forEach((choice, index) => {
    const button = document.createElement('button');
    button.className = 'choice-button';
    button.innerText = choice.text;
    button.onclick = choice.action;
    choicesDiv.appendChild(button);
  });
}

// Show feedback with fade-in effect
function showFeedback(text) {
  const feedbackDiv = document.getElementById('feedback');
  feedbackDiv.innerText = text;
  feedbackDiv.classList.remove('hidden');
  // Trigger reflow to restart the animation
  void feedbackDiv.offsetWidth;
  feedbackDiv.classList.add('visible');
}

// Show next button (for future expansion)
function showNextButton() {
  const choicesDiv = document.getElementById('choices');
  choicesDiv.innerHTML = '';
  const nextButton = document.createElement('button');
  nextButton.className = 'choice-button';
  nextButton.innerText = 'Next';
  nextButton.onclick = () => {
    // Proceed to next scenario or end game
    alert('End of current scenario.');
  };
  choicesDiv.appendChild(nextButton);
}

// Trigger Airstrike Animation
function triggerAirstrike() {
  const airstrikeImg = document.getElementById('airstrike');
  airstrikeImg.style.display = 'block';

  // Animate the airstrike moving down to the building's roof
  airstrikeImg.animate([
    { transform: 'translate(-50%, -200px)' }, // Starting above the scene
    { transform: 'translate(-50%, 0)' } // Landing on the roof
  ], {
    duration: 2000,
    fill: 'forwards'
  });

  // After animation, show "Splash" and feedback
  setTimeout(() => {
    showSplash();
    showFeedback("You ordered an airstrike. The rocket launcher is neutralized, but some civilians may have been harmed.");
    showNextButton();
  }, 2000);
}

// Show Splash Effect
function showSplash() {
  const sceneDiv = document.getElementById('scene');
  const splashImg = document.createElement('img');
  splashImg.src = 'assets/splash.svg';
  splashImg.alt = 'Splash';
  splashImg.style.position = 'absolute';
  splashImg.style.top = '30px'; // Adjust to align with airstrike impact
  splashImg.style.left = '50%';
  splashImg.style.transform = 'translateX(-50%)';
  splashImg.style.zIndex = '4';
  splashImg.style.width = '100px';
  sceneDiv.appendChild(splashImg);

  // Remove splash after showing
  setTimeout(() => {
    splashImg.remove();
    // Hide airstrike after impact
    const airstrikeImg = document.getElementById('airstrike');
    airstrikeImg.style.display = 'none';
  }, 1000);
}

// Start the game
window.onload = initGame;
