/**
 * ============================================
 * RISK LADDER - Game Logic
 * ============================================
 */

(function() {
'use strict';

// GAME CONFIG
const LADDER_CONFIG = {
  steps: [
    { step: 1, multiplier: 2,    chance: 90, riskLevel: 'low' },
    { step: 2, multiplier: 4,    chance: 75, riskLevel: 'medium' },
    { step: 3, multiplier: 8,    chance: 55, riskLevel: 'high' },
    { step: 4, multiplier: 16,   chance: 35, riskLevel: 'vhigh' },
    { step: 5, multiplier: 32,   chance: 15, riskLevel: 'extreme' },
    { step: 6, multiplier: 64,   chance: 5,  riskLevel: 'extreme' },
  ],
  initialBalance: 100,
};

// GAME STATE
let gameState = {
  playerBalance: LADDER_CONFIG.initialBalance,
  currentBet: 1,
  currentStep: 0,
  gameActive: false,
  potentialWin: 2,
  
  // Session stats
  gamesPlayed: 0,
  wins: 0,
  losses: 0,
  bestStep: 0,
  sessionProfit: 0,
  recentGames: [],
};

// DOM ELEMENTS
const UI = {
  playerBalance: document.getElementById('playerBalance'),
  currentBet: document.getElementById('currentBet'),
  currentStep: document.getElementById('currentStep'),
  potentialWin: document.getElementById('potentialWin'),
  
  ladderContainer: document.getElementById('ladderContainer'),
  gameMessage: document.getElementById('gameMessage'),
  
  btnRiskNext: document.getElementById('btnRiskNext'),
  btnCashOut: document.getElementById('btnCashOut'),
  betInput: document.getElementById('betInput'),
  
  statsGamesPlayed: document.getElementById('statsGamesPlayed'),
  statsWins: document.getElementById('statsWins'),
  statsLosses: document.getElementById('statsLosses'),
  statsBestStep: document.getElementById('statsBestStep'),
  statsProfit: document.getElementById('statsProfit'),
  
  recentGamesContainer: document.getElementById('recentGamesContainer'),
};

// INITIALIZE GAME
function initGame() {
  renderLadder();
  setupEventListeners();
  updateUI();
  console.log('🎮 RISK LADDER initialized');
}

// RENDER LADDER
function renderLadder() {
  UI.ladderContainer.innerHTML = '';
  
  LADDER_CONFIG.steps.forEach(({ step, multiplier, chance, riskLevel }) => {
    const isAvailable = gameState.currentStep === 0;
    const isCurrent = gameState.currentStep === step;
    const isWon = gameState.currentStep > step && gameState.gameActive === false;
    const isLost = gameState.currentStep > 0 && gameState.currentStep < step && gameState.gameActive === false;
    
    const stepEl = document.createElement('div');
    stepEl.className = 'ladder-step';
    
    if (isCurrent) stepEl.classList.add('current');
    if (isWon && isAvailable === false) stepEl.classList.add('won');
    if (isLost) stepEl.classList.add('lost');
    if (isAvailable) stepEl.classList.add('available');
    
    const riskEmoji = {
      low: '🟢',
      medium: '🟡',
      high: '🟠',
      vhigh: '🔴',
      extreme: '⚡'
    }[riskLevel] || '•';
    
    const chancePercent = Math.round(chance);
    const chanceFill = Math.round(chance);
    
    stepEl.innerHTML = `
      <div class="step-number">STEP ${step}</div>
      <div class="step-info">
        <div class="step-multiplier">×${multiplier}</div>
        <div class="step-chance">
          <span>${chancePercent}%</span>
          <div class="chance-bar">
            <div class="chance-fill" style="width: ${chanceFill}%"></div>
          </div>
        </div>
      </div>
      <div class="risk-badge risk-${riskLevel}">${riskEmoji} ${riskLevel.toUpperCase()}</div>
    `;
    
    UI.ladderContainer.appendChild(stepEl);
  });
}

// SETUP EVENT LISTENERS
function setupEventListeners() {
  UI.btnRiskNext.addEventListener('click', riskNext);
  UI.btnCashOut.addEventListener('click', cashOut);
  
  // Bet quick buttons
  document.querySelectorAll('.bet-quick-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const amount = parseInt(e.target.dataset.amount);
      UI.betInput.value = amount;
      updateBetAmount();
    });
  });
  
  // Bet input change
  UI.betInput.addEventListener('change', updateBetAmount);
  UI.betInput.addEventListener('input', updateBetAmount);
}

// UPDATE BET AMOUNT
function updateBetAmount() {
  let bet = parseInt(UI.betInput.value) || 1;
  
  // Validate
  if (bet < 1) bet = 1;
  if (bet > gameState.playerBalance) bet = gameState.playerBalance;
  
  gameState.currentBet = bet;
  updateUI();
}

// RISK NEXT STEP
async function riskNext() {
  if (gameState.gameActive === false && gameState.currentStep === 0) {
    // Start new game
    startGame();
  } else if (gameState.gameActive === true) {
    // Climb to next step
    climbStep();
  }
}

// START NEW GAME
function startGame() {
  // Validate balance
  if (gameState.playerBalance < gameState.currentBet) {
    showMessage('❌ Not enough balance!', 'error');
    return;
  }
  
  // Deduct bet
  gameState.playerBalance -= gameState.currentBet;
  gameState.currentStep = 1;
  gameState.gameActive = true;
  gameState.gamesPlayed++;
  
  updateUI();
  showMessage('🎮 Game started! Step 1 complete. Risk next?', 'info');
  renderLadder();
}

// CLIMB NEXT STEP
async function climbStep() {
  if (!gameState.gameActive || gameState.currentStep === 0) return;
  
  const nextStep = gameState.currentStep + 1;
  if (nextStep > LADDER_CONFIG.steps.length) {
    showMessage('🏆 You reached the top!', 'success');
    cashOut();
    return;
  }
  
  const stepData = LADDER_CONFIG.steps[nextStep - 1];
  const random = Math.random() * 100;
  const success = random < stepData.chance;
  
  if (success) {
    // ✅ SUCCESS
    gameState.currentStep = nextStep;
    updateUI();
    showMessage(`✅ Step ${nextStep} complete!`, 'success');
    animateStepSuccess();
    renderLadder();
  } else {
    // ❌ LOSS
    gameState.gameActive = false;
    gameState.losses++;
    gameState.currentStep = nextStep;
    
    const winAmount = gameState.currentBet * LADDER_CONFIG.steps[gameState.currentStep - 2].multiplier;
    
    showMessage(`💥 Failed at Step ${nextStep}! Lost ${gameState.currentBet} RGT`, 'error');
    animateStepFailure();
    renderLadder();
    
    // Record game
    recordGame(false, gameState.currentStep - 1, -gameState.currentBet);
    
    // Reset
    setTimeout(() => {
      gameState.currentStep = 0;
      gameState.gameActive = false;
      updateUI();
      renderLadder();
    }, 2000);
  }
}

// CASH OUT
function cashOut() {
  if (gameState.currentStep === 0) {
    showMessage('No active game to cash out', 'info');
    return;
  }
  
  const stepData = LADDER_CONFIG.steps[gameState.currentStep - 1];
  const winAmount = gameState.currentBet * stepData.multiplier;
  
  gameState.playerBalance += winAmount;
  gameState.wins++;
  gameState.gameActive = false;
  gameState.bestStep = Math.max(gameState.bestStep, gameState.currentStep);
  gameState.sessionProfit += (winAmount - gameState.currentBet);
  
  // Record game
  recordGame(true, gameState.currentStep, winAmount - gameState.currentBet);
  
  showMessage(`🎉 Cashed out! Won ${winAmount} RGT at Step ${gameState.currentStep}!`, 'success');
  animateCashOut(winAmount);
  
  // Reset
  gameState.currentStep = 0;
  gameState.currentBet = 1;
  updateUI();
  renderLadder();
}

// RECORD GAME
function recordGame(isWin, step, profit) {
  const game = {
    id: Date.now(),
    timestamp: new Date().toLocaleTimeString(),
    isWin,
    step,
    bet: gameState.currentBet,
    profit,
  };
  
  gameState.recentGames.unshift(game);
  if (gameState.recentGames.length > 8) gameState.recentGames.pop();
  
  renderRecentGames();
}

// RENDER RECENT GAMES
function renderRecentGames() {
  UI.recentGamesContainer.innerHTML = '';
  
  if (gameState.recentGames.length === 0) {
    UI.recentGamesContainer.innerHTML = '<div class="text-center text-slate-400 col-span-full">No games yet</div>';
    return;
  }
  
  gameState.recentGames.forEach(game => {
    const card = document.createElement('div');
    card.className = `game-card ${game.isWin ? 'win' : 'loss'}`;
    
    const result = game.isWin ? '✅ WIN' : '❌ LOSS';
    const resultColor = game.isWin ? 'text-emerald-400' : 'text-red-400';
    
    card.innerHTML = `
      <div class="game-card-result ${resultColor}">${result}</div>
      <div class="game-card-detail">
        <strong>Step ${game.step}</strong> • Bet: ${game.bet} RGT<br>
        <span>${game.isWin ? '+' : ''}${game.profit} RGT</span> • ${game.timestamp}
      </div>
    `;
    
    UI.recentGamesContainer.appendChild(card);
  });
}

// UPDATE UI
function updateUI() {
  // Main stats
  UI.playerBalance.textContent = Math.floor(gameState.playerBalance);
  UI.currentBet.textContent = gameState.currentBet;
  UI.currentStep.textContent = gameState.currentStep === 0 ? '—' : gameState.currentStep;
  
  // Potential win calculation
  if (gameState.currentStep === 0) {
    UI.potentialWin.textContent = gameState.currentBet * 2;
  } else {
    const nextStep = gameState.currentStep + 1;
    if (nextStep <= LADDER_CONFIG.steps.length) {
      UI.potentialWin.textContent = gameState.currentBet * LADDER_CONFIG.steps[nextStep - 1].multiplier;
    } else {
      UI.potentialWin.textContent = '—';
    }
  }
  
  // Session stats
  UI.statsGamesPlayed.textContent = gameState.gamesPlayed;
  UI.statsWins.textContent = gameState.wins;
  UI.statsLosses.textContent = gameState.losses;
  UI.statsBestStep.textContent = gameState.bestStep === 0 ? '—' : gameState.bestStep;
  
  const profitColor = gameState.sessionProfit >= 0 ? 'text-emerald-400' : 'text-red-400';
  UI.statsProfit.textContent = (gameState.sessionProfit >= 0 ? '+' : '') + gameState.sessionProfit;
  UI.statsProfit.className = profitColor;
  
  // Button states
  const hasBalance = gameState.playerBalance >= gameState.currentBet;
  UI.btnRiskNext.disabled = gameState.currentStep === 0 ? !hasBalance : false;
  UI.btnCashOut.disabled = gameState.currentStep === 0 || gameState.gameActive === false;
  
  // Button labels
  if (gameState.currentStep === 0) {
    UI.btnRiskNext.textContent = '🎲 START GAME';
  } else {
    UI.btnRiskNext.textContent = '🎲 RISK NEXT';
  }
}

// SHOW MESSAGE
function showMessage(msg, type = 'info') {
  UI.gameMessage.textContent = msg;
  UI.gameMessage.className = `text-center min-h-5 text-sm transition ${
    type === 'success' ? 'text-emerald-400' :
    type === 'error' ? 'text-red-400' :
    'text-slate-400'
  }`;
}

// ANIMATIONS
function animateStepSuccess() {
  const particles = [];
  for (let i = 0; i < 8; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle success';
    particle.textContent = '✨';
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = '50%';
    document.body.appendChild(particle);
    particles.push(particle);
  }
  
  setTimeout(() => particles.forEach(p => p.remove()), 800);
}

function animateStepFailure() {
  const ladder = UI.ladderContainer;
  ladder.classList.add('animate-shake');
  setTimeout(() => ladder.classList.remove('animate-shake'), 400);
}

function animateCashOut(amount) {
  const particles = [];
  for (let i = 0; i < 15; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle coin';
    particle.textContent = '💰';
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = '50%';
    document.body.appendChild(particle);
    particles.push(particle);
  }
  
  setTimeout(() => particles.forEach(p => p.remove()), 800);
}

// LOAD GAME DATA FROM FIREBASE (когда будет реализовано)
function loadGameData() {
  // TODO: Load from Firebase
  console.log('📂 Loading game data from Firebase...');
}

// SAVE GAME DATA TO FIREBASE (когда будет реализовано)
function saveGameData() {
  // TODO: Save to Firebase
  console.log('💾 Saving game data to Firebase...');
}

// INIT ON LOAD
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGame);
} else {
  initGame();
}

// Expose to global
window.RiskLadderGame = {
  gameState,
  riskNext,
  cashOut,
  loadGameData,
  saveGameData,
};

console.log('🔥 RISK LADDER game logic loaded');

})();
