/**
 * ============================================
 * RISK LADDER - Game Logic with Firebase
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
};

// GAME STATE
let gameState = {
  currentUser: null,
  playerBalance: 0,
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
  
  isLoading: false,
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
  console.log('🎮 Initializing RISK LADDER...');
  
  renderLadder();
  setupEventListeners();
  setupAuthListener();
  
  updateUI();
}

// AUTH LISTENER
function setupAuthListener() {
  if (typeof window.onAuthStateChanged !== 'function') {
    console.warn('⚠️ Firebase auth not available');
    showMessage('⚠️ Waiting for Firebase...', 'info');
    return;
  }
  
  window.onAuthStateChanged(window.auth, async (user) => {
    gameState.currentUser = user;
    
    if (user) {
      console.log('✅ User logged in:', user.uid);
      showMessage('✅ Logged in!', 'success');
      
      // Load user balance from Firebase
      await loadUserBalance();
      
      // Load user's risk games history
      await loadRiskGamesHistory();
    } else {
      console.log('❌ User logged out');
      gameState.playerBalance = 0;
      gameState.gamesPlayed = 0;
      gameState.wins = 0;
      gameState.losses = 0;
      gameState.bestStep = 0;
      gameState.sessionProfit = 0;
      gameState.recentGames = [];
      showMessage('⚠️ Please login to play', 'info');
    }
    
    updateUI();
    renderLadder();
  });
}

// LOAD USER BALANCE FROM FIREBASE
async function loadUserBalance() {
  if (!gameState.currentUser || !window.db || !window.getDoc) {
    console.warn('⚠️ Cannot load balance: Firebase not ready or user not logged in');
    return;
  }
  
  try {
    const userRef = window.doc(window.db, 'users', gameState.currentUser.uid);
    const userSnap = await window.getDoc(userRef);
    
    if (userSnap.exists()) {
      const userData = userSnap.data();
      gameState.playerBalance = userData.reagents || 0;
      console.log('💰 Loaded balance:', gameState.playerBalance);
    } else {
      console.log('📝 Creating new user doc');
      gameState.playerBalance = 0;
    }
  } catch (err) {
    console.error('❌ Error loading balance:', err);
    showMessage('❌ Failed to load balance', 'error');
  }
}

// LOAD RISK GAMES HISTORY
async function loadRiskGamesHistory() {
  if (!gameState.currentUser || !window.db) return;
  
  try {
    const gamesRef = window.collection(window.db, `users/${gameState.currentUser.uid}/risk_games`);
    const q = window.query(gamesRef, window.orderBy('timestamp', 'desc'), window.limit(8));
    const snapshot = await window.getDocs(q);
    
    gameState.recentGames = [];
    snapshot.forEach(doc => {
      gameState.recentGames.push({ id: doc.id, ...doc.data() });
    });
    
    renderRecentGames();
  } catch (err) {
    console.error('❌ Error loading games history:', err);
  }
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
  if (!gameState.currentUser) {
    showMessage('⚠️ Please login first', 'info');
    return;
  }
  
  if (gameState.isLoading) {
    showMessage('⏳ Loading...', 'info');
    return;
  }
  
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
    showMessage('❌ Not enough RGT!', 'error');
    return;
  }
  
  // Deduct bet from balance
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
    
    const currentStepData = LADDER_CONFIG.steps[gameState.currentStep - 1];
    const earnedAmount = gameState.currentBet * currentStepData.multiplier;
    
    showMessage(`💥 Failed at Step ${nextStep}! Lost ${gameState.currentBet} RGT`, 'error');
    animateStepFailure();
    renderLadder();
    
    // Record game
    recordGame(false, gameState.currentStep, -gameState.currentBet, earnedAmount);
    
    // Reset after animation
    setTimeout(() => {
      gameState.currentStep = 0;
      gameState.gameActive = false;
      updateUI();
      renderLadder();
    }, 2000);
  }
}

// CASH OUT
async function cashOut() {
  if (gameState.currentStep === 0) {
    showMessage('No active game to cash out', 'info');
    return;
  }
  
  if (!gameState.currentUser) {
    showMessage('⚠️ Please login to save progress', 'info');
    return;
  }
  
  gameState.isLoading = true;
  
  try {
    const stepData = LADDER_CONFIG.steps[gameState.currentStep - 1];
    const winAmount = gameState.currentBet * stepData.multiplier;
    const profit = winAmount - gameState.currentBet;
    
    // Update balance
    gameState.playerBalance += winAmount;
    gameState.wins++;
    gameState.gameActive = false;
    gameState.bestStep = Math.max(gameState.bestStep, gameState.currentStep);
    gameState.sessionProfit += profit;
    
    // Save to Firebase
    await saveGameToFirebase(true, gameState.currentStep, winAmount, profit);
    
    showMessage(`🎉 Cashed out! Won ${winAmount} RGT at Step ${gameState.currentStep}!`, 'success');
    animateCashOut(winAmount);
    
    // Reset
    gameState.currentStep = 0;
    gameState.currentBet = 1;
    updateUI();
    renderLadder();
    
  } catch (err) {
    console.error('❌ Error cashing out:', err);
    showMessage('❌ Failed to save game', 'error');
  } finally {
    gameState.isLoading = false;
  }
}

// SAVE GAME TO FIREBASE
async function saveGameToFirebase(isWin, step, amount, profit) {
  if (!gameState.currentUser || !window.db) return;
  
  try {
    // Save game result
    const gamesRef = window.collection(window.db, `users/${gameState.currentUser.uid}/risk_games`);
    await window.addDoc(gamesRef, {
      timestamp: window.serverTimestamp(),
      isWin,
      step,
      bet: gameState.currentBet,
      amount,
      profit,
    });
    
    // Update user balance
    const userRef = window.doc(window.db, 'users', gameState.currentUser.uid);
    await window.updateDoc(userRef, {
      reagents: window.increment(isWin ? amount : -gameState.currentBet),
      riskGamesPlayed: window.increment(1),
      riskBestStep: gameState.bestStep,
    });
    
    console.log('💾 Game saved to Firebase');
  } catch (err) {
    console.error('❌ Error saving to Firebase:', err);
    throw err;
  }
}

// RECORD GAME (LOCAL)
function recordGame(isWin, step, profit, earnedAmount) {
  const game = {
    id: Date.now(),
    timestamp: new Date().toLocaleTimeString(),
    isWin,
    step,
    bet: gameState.currentBet,
    profit,
    earnedAmount: earnedAmount || profit,
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
  const isLoggedIn = gameState.currentUser !== null;
  
  UI.btnRiskNext.disabled = !isLoggedIn || (gameState.currentStep === 0 ? !hasBalance : false) || gameState.isLoading;
  UI.btnCashOut.disabled = !isLoggedIn || gameState.currentStep === 0 || gameState.gameActive === false || gameState.isLoading;
  
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

// INIT ON LOAD
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGame);
} else {
  setTimeout(initGame, 500); // Wait for Firebase to init
}

// Expose to global
window.RiskLadderGame = {
  gameState,
  riskNext,
  cashOut,
};

console.log('🔥 RISK LADDER game logic loaded with Firebase integration');

})();
