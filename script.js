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
          renderAirstrike();
          gameState.decisions.push('Ordered Airstrike');
          setTimeout(() => {
            showFeedback("You ordered an airstrike. The rocket launcher is neutralized, but some civilians may have been harmed.");
            showNextButton();
          }, 2000);
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
    <h2>Scenario ${sceneIndex + 1}</h2>
    <p>${scene.description}</p>
    <div id="illustration">
      <img src="assets/building.svg" alt="Building" id="building">
      <img src="assets/rocket_launcher.svg" alt="Rocket Launcher" id="rocket-launcher">
      <img src="assets/civilians.svg" alt="Civilians" id="civilians">
    </div>
  `;
  renderChoices(scene.choices);
}

// Render choices
function renderChoices(choices) {
  const choicesDiv = document.getElementById('choices');
  choicesDiv.innerHTML = '';
  choices.forEach(choice => {
    const button = document.createElement('button');
    button.className = 'choice-button';
    button.innerText = choice.text;
    button.onclick = choice.action;
    choicesDiv.appendChild(button);
  });
}

// Show feedback
function showFeedback(text) {
  const feedbackDiv = document.getElementById('feedback');
  feedbackDiv.innerText = text;
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

// Render airstrike animation
function renderAirstrike() {
  const sceneDiv = document.getElementById('scene');
  const airstrikeImg = document.createElement('img');
  airstrikeImg.src = 'assets/airstrike.svg';
  airstrikeImg.alt = 'Airstrike';
  airstrikeImg.id = 'airstrike';
  airstrikeImg.style.position = 'absolute';
  airstrikeImg.style.top = '0';
  airstrikeImg.style.left = '50%';
  airstrikeImg.style.transform = 'translateX(-50%)';
  sceneDiv.appendChild(airstrikeImg);

  // Animate the airstrike
  airstrikeImg.animate([
    { transform: 'translate(-50%, 0)' },
    { transform: 'translate(-50%, 100%)' }
  ], {
    duration: 2000,
    iterations: 1
  });

  // After animation, show "Splash"
  setTimeout(() => {
    const splash = document.createElement('div');
    splash.innerText = "Splash!";
    splash.style.position = 'absolute';
    splash.style.bottom = '10px';
    splash.style.left = '50%';
    splash.style.transform = 'translateX(-50%)';
    splash.style.backgroundColor = 'rgba(255,255,255,0.8)';
    splash.style.padding = '5px 10px';
    splash.style.border = '2px solid #000';
    splash.style.borderRadius = '5px';
    sceneDiv.appendChild(splash);

    // Remove airstrike and splash after showing
    setTimeout(() => {
      airstrikeImg.remove();
      splash.remove();
    }, 1000);
  }, 2000);
}

// Start the game
window.onload = initGame;
