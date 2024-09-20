// Define game states
const gameState = {
  currentScene: 0,
  decisions: []
};

// Define scenarios
const scenarios = [
  {
    id: 0,
    title: "Scenario 1",
    description: "You receive intelligence that a rocket launcher is actively firing from the roof of a building. However, there are civilians inside. Do you order an airstrike?",
    illustration: "building.svg", // Illustration for Scenario 1
    choices: [
      {
        text: "Order the Airstrike",
        action: () => {
          triggerAirstrike();
          gameState.decisions.push('Ordered Airstrike in Scenario 1');
        }
      },
      {
        text: "Do Not Order the Airstrike",
        action: () => {
          showFeedback("You chose not to order an airstrike. The civilians are safe for now, but the rocket launcher remains a threat.");
          gameState.decisions.push('Did Not Order Airstrike in Scenario 1');
          showNextButton();
        }
      }
    ]
  },
  {
    id: 1,
    title: "Scenario 2",
    description: "An enemy leader planning a large-scale attack that could cost hundreds of lives is hiding in a house rigged with explosives. His entire family of 20 is present. Do you conduct an airstrike?",
    illustration: "house.svg", // Illustration for Scenario 2
    choices: [
      {
        text: "Conduct the Airstrike",
        action: () => {
          triggerAirstrike();
          gameState.decisions.push('Conducted Airstrike in Scenario 2');
        }
      },
      {
        text: "Do Not Conduct the Airstrike",
        action: () => {
          showFeedback("You chose not to conduct an airstrike. The civilians are safe, but the enemy leader remains a threat.");
          gameState.decisions.push('Did Not Conduct Airstrike in Scenario 2');
          showNextButton();
        }
      }
    ]
  }
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
      <img src="assets/${scene.illustration}" alt="${scene.title} Illustration" id="illustration-img" />
      <!-- Airstrike (Initially Hidden) -->
      <img src="assets/airstrike.svg" alt="Airstrike" id="airstrike" />
    </div>
    <div id="scenario-text">
      <h2>${scene.title}</h2>
      <p>${scene.description}</p>
    </div>
  `;
  renderChoices(scene.choices);
}

// Render choices
function renderChoices(choices) {
  const choicesDiv = document.getElementById('choices');
  choicesDiv.innerHTML = '';
  choices.forEach((choice) => {
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

// Show next button (for navigating to the next scenario or ending the game)
function showNextButton() {
  const choicesDiv = document.getElementById('choices');
  choicesDiv.innerHTML = '';
  const nextButton = document.createElement('button');
  nextButton.className = 'choice-button';
  nextButton.innerText = 'Next';
  nextButton.onclick = () => {
    if (gameState.currentScene < scenarios.length - 1) {
      gameState.currentScene += 1;
      renderScene(gameState.currentScene);
      hideFeedback();
    } else {
      endGame();
    }
  };
  choicesDiv.appendChild(nextButton);
}

// Hide feedback when moving to the next scenario
function hideFeedback() {
  const feedbackDiv = document.getElementById('feedback');
  feedbackDiv.classList.remove('visible');
  feedbackDiv.classList.add('hidden');
}

// End the game after all scenarios are completed
function endGame() {
  const sceneDiv = document.getElementById('scene');
  const choicesDiv = document.getElementById('choices');
  sceneDiv.innerHTML = `
    <div id="scenario-text">
      <h2>Game Over</h2>
      <p>Thank you for playing "Ethics of Warfare." Your decisions have been recorded.</p>
    </div>
  `;
  choicesDiv.innerHTML = '';
  showFinalFeedback();
}

// Show final feedback based on all decisions
function showFinalFeedback() {
  const feedbackDiv = document.getElementById('feedback');
  const totalDecisions = gameState.decisions.length;
  const airstrikes = gameState.decisions.filter(decision => decision.includes('Airstrike')).length;
  const noAirstrikes = totalDecisions - airstrikes;

  let summary = `You made ${totalDecisions} decision(s). `;
  summary += `Airstrikes conducted: ${airstrikes}. `;
  summary += `Airstrikes not conducted: ${noAirstrikes}.`;

  feedbackDiv.innerText = summary;
  feedbackDiv.classList.remove('hidden');
  // Trigger reflow to restart the animation
  void feedbackDiv.offsetWidth;
  feedbackDiv.classList.add('visible');
}

// Trigger Airstrike Animation
function triggerAirstrike() {
  const airstrikeImg = document.getElementById('airstrike');
  airstrikeImg.style.display = 'block';

  // Animate the airstrike moving down to the illustration
  airstrikeImg.animate([
    { transform: 'translate(-50%, -200px)' }, // Starting above the scene
    { transform: 'translate(-50%, 0)' } // Landing on the illustration
  ], {
    duration: 2000,
    fill: 'forwards'
  });

  // After animation, show "Splash" and feedback
  setTimeout(() => {
    showSplash();
    const currentScene = scenarios[gameState.currentScene];
    if (currentScene.id === 0) {
      showFeedback("You ordered an airstrike. The rocket launcher is neutralized, but some civilians may have been harmed.");
    } else if (currentScene.id === 1) {
      showFeedback("You conducted an airstrike. The enemy leader is eliminated, but many civilians have been harmed.");
    }
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
