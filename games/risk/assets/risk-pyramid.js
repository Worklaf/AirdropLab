/**
 * ============================================
 * RISK PYRAMID - Minesweeper-style Game
 * ============================================
 * Pyramid: 7 cells (bottom) → 6 → 5 → 4 → 3 → 2 cells (top)
 * One mine per row, click to reveal
 */

(function() {
'use strict';

// GAME CONFIG
const PYRAMID_CONFIG = {
  rows: [
    { cells: 7, multiplier: 1.15, riskLevel: 'low' },
    { cells: 6, multiplier: 1.35, riskLevel: 'low-med' },
    { cells: 5, multiplier: 1.65, riskLevel: 'medium' },
    { cells: 4, multiplier: 2.20, riskLevel: 'med-high' },
    { cells: 3, multiplier: 3.50, riskLevel: 'high' },
    { cells: 2, multiplier: 7.00, riskLevel: 'extreme' }
  ]
};

// GAME STATE
let gameState = {
  currentUser: null,
  playerBalance: 0,
  currentBet: 1,
  currentRow: 0,
  gameActive: false,
  potentialWin: 1,
  
  // Pyramid state
  pyramid: [],
  revealedCells: [],
  
  // Session stats
  gamesPlayed: 0,
  wins: 0,
  losses: 0,
  bestRow: 0,
  sessionProfit: 0,
  recentGames: [],
  
  isLoading: false,
};

// DOM ELEMENTS
const UI = {
  playerBalance: document.getElementById('playerBalance'),
  currentBet: document.getElementById('currentBet'),
  currentRow: document.getElementById('currentStep'),
  potentialWin: document.getElementById('potentialWin'),
  
  pyramidContainer: document.getElementById('ladderContainer'),
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
  console.log('🎮 Initializing RISK PYRAMID...');
  renderPyramid();
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
      
      await loadUserBalance();
      await loadRiskGamesHistory();
    } else {
      console.log('❌ User logged out');
      resetGameState();
      showMessage('⚠️ Please login to play', 'info');
    }
    
    updateUI();
    renderPyramid();
  });
}

// LOAD USER BALANCE
async function loadUserBalance() {
  if (!gameState.currentUser || !window.db) return;
  
  try {
    const docRef = window.doc(window.db, 'users', gameState.currentUser.uid);
    const docSnap = await window.getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      gameState.playerBalance = data.reagents || 0;
      console.log('💰 Loaded balance:', gameState.playerBalance);
    }
  } catch (e) {
    console.error('❌ Error loading balance:', e);
  }
}

// LOAD GAMES HISTORY
async function loadRiskGamesHistory() {
  if (!gameState.currentUser || !window.db) return;
  
  try {
    const historyRef = window.collection(window.db, 'users', gameState.currentUser.uid, 'risk_games');
    const q = window.query(historyRef, window.orderBy('timestamp', 'desc'), window.limit(8));
    const querySnapshot = await window.getDocs(q);
    
    gameState.recentGames = [];
    querySnapshot.forEach(doc => {
      gameState.recentGames.push(doc.data());
    });
    
    updateStatsFromHistory();
  } catch (e) {
    console.error('❌ Error loading games history:', e);
  }
}

// UPDATE STATS FROM HISTORY
function updateStatsFromHistory() {
  gameState.gamesPlayed = gameState.recentGames.length;
  gameState.wins = gameState.recentGames.filter(g => g.result === 'win').length;
  gameState.losses = gameState.recentGames.filter(g => g.result === 'loss').length;
  gameState.bestRow = Math.max(...gameState.recentGames.map(g => g.reachedRow || 0), 0);
  gameState.sessionProfit = gameState.recentGames.reduce((sum, g) => {
    if (g.result === 'win') return sum + (g.payout || 0);
    return sum - (g.bet || 0);
  }, 0);
}

// RENDER PYRAMID
function renderPyramid() {
  if (!UI.pyramidContainer) return;
  
  const isLoggedIn = gameState.currentUser !== null;
  
  let html = `<div class="flex flex-col gap-4 items-center">`;
  
  if (!isLoggedIn) {
    html += `<div class="text-center text-slate-400 p-8">
      <p class="text-lg mb-2">🔐 Please login to play</p>
      <button onclick="typeof openLoginModal==='function'&&openLoginModal()" 
              class="px-6 py-2 bg-cyan-500/20 border border-cyan-400/50 rounded text-cyan-400 hover:bg-cyan-500/30">
        Login to Play
      </button>
    </div>`;
  } else if (!gameState.gameActive) {
    html += `<div class="text-center text-slate-300 mb-4">
      <p class="text-sm text-slate-400 mb-3">Set your bet and click "Start Game"</p>
      <div class="flex gap-2 items-center justify-center mb-4">
        <label class="text-sm">Bet:</label>
        <input type="number" id="betInput" min="1" value="10" 
               class="w-20 px-2 py-1 bg-slate-800 border border-slate-600 rounded text-white"
               onchange="gameState.currentBet = Math.max(1, parseInt(this.value) || 1)">
        <span class="text-yellow-400">RGT</span>
      </div>
      <button onclick="startNewGame()" 
              class="px-6 py-2 bg-emerald-500/30 border border-emerald-400/50 rounded text-emerald-400 hover:bg-emerald-500/40 font-bold">
        🎮 Start Game
      </button>
    </div>`;
  } else {
    // Render pyramid rows
    for (let row = 0; row < PYRAMID_CONFIG.rows.length; row++) {
      const rowConfig = PYRAMID_CONFIG.rows[row];
      html += `<div class="flex gap-2 justify-center">`;
      
      for (let col = 0; col < rowConfig.cells; col++) {
        const cellId = `cell-${row}-${col}`;
        const isRevealed = gameState.revealedCells.some(c => c.row === row && c.col === col);
        const isMine = gameState.pyramid[row]?.mines?.includes(col);
        const isCurrentRow = row === gameState.currentRow;
        
        let cellClass = 'w-12 h-12 rounded cursor-pointer font-bold text-sm transition-all ';
        let cellStyle = '';
        let cellContent = '?';
        
        if (isRevealed) {
          if (isMine) {
            cellClass += 'bg-red-500 text-white scale-105';
            cellContent = '💣';
          } else {
            cellClass += 'bg-emerald-500/70 text-white';
            cellContent = '✓';
          }
        } else if (isCurrentRow) {
          cellClass += 'bg-cyan-500/40 border-2 border-cyan-400 hover:bg-cyan-500/60';
        } else {
          cellClass += 'bg-slate-700 border border-slate-600 opacity-50';
        }
        
        const clickHandler = isCurrentRow && !isRevealed ? `onclick="revealCell(${row}, ${col})"` : '';
        
        html += `<button ${clickHandler} class="${cellClass}" style="${cellStyle}" id="${cellId}">
          ${cellContent}
        </button>`;
      }
      
      html += `</div>`;
    }
  }
  
  html += `</div>`;
  UI.pyramidContainer.innerHTML = html;
}

// START NEW GAME
function startNewGame() {
  if (!gameState.currentUser) {
    alert('Please login first');
    return;
  }
  
  gameState.currentBet = parseInt(document.getElementById('betInput')?.value || 10);
  
  if (gameState.currentBet > gameState.playerBalance) {
    alert('Insufficient balance!');
    return;
  }
  
  // Initialize pyramid with random mines
  gameState.pyramid = [];
  gameState.revealedCells = [];
  gameState.currentRow = 0;
  gameState.gameActive = true;
  gameState.potentialWin = gameState.currentBet;
  
  for (let row = 0; row < PYRAMID_CONFIG.rows.length; row++) {
    const cellCount = PYRAMID_CONFIG.rows[row].cells;
    const minePos = Math.floor(Math.random() * cellCount);
    gameState.pyramid[row] = { mines: [minePos] };
  }
  
  console.log('🎮 Game started! Pyramid initialized');
  renderPyramid();
  updateUI();
}

// REVEAL CELL
function revealCell(row, col) {
  if (!gameState.gameActive || row !== gameState.currentRow) return;
  
  gameState.revealedCells.push({ row, col });
  
  const isMine = gameState.pyramid[row]?.mines?.includes(col);
  
  if (isMine) {
    // HIT MINE - LOSE
    endGame(false, row);
  } else {
    // SAFE - CONTINUE
    const nextMultiplier = PYRAMID_CONFIG.rows[row].multiplier;
    gameState.potentialWin = gameState.currentBet * nextMultiplier;
    
    // Move to next row if this row is complete
    const revealedInRow = gameState.revealedCells.filter(c => c.row === row).length;
    const totalInRow = PYRAMID_CONFIG.rows[row].cells;
    
    if (revealedInRow < totalInRow) {
      showMessage(`✅ Safe! +${(nextMultiplier - 1).toFixed(2)}x multiplier`, 'success');
    } else {
      // Row complete - move to next
      if (gameState.currentRow < PYRAMID_CONFIG.rows.length - 1) {
        gameState.currentRow++;
        gameState.revealedCells = [];
        showMessage(`🎉 Row complete! Moving to next...`, 'success');
      } else {
        // ALL ROWS COMPLETE - WIN
        endGame(true, PYRAMID_CONFIG.rows.length - 1);
        return;
      }
    }
  }
  
  renderPyramid();
  updateUI();
}

// END GAME
async function endGame(isWin, reachedRow) {
  gameState.gameActive = false;
  
  const result = isWin ? 'win' : 'loss';
  const payout = isWin ? gameState.potentialWin : 0;
  const loss = !isWin ? gameState.currentBet : 0;
  
  if (isWin) {
    showMessage(`🎉 YOU WIN! +${payout} RGT`, 'success');
    gameState.playerBalance += payout;
    gameState.wins++;
  } else {
    showMessage(`💣 GAME OVER! -${gameState.currentBet} RGT`, 'error');
    gameState.playerBalance -= gameState.currentBet;
    gameState.losses++;
  }
  
  gameState.gamesPlayed++;
  gameState.bestRow = Math.max(gameState.bestRow, reachedRow);
  gameState.sessionProfit += (payout - loss);
  
  // Save to Firebase
  if (gameState.currentUser) {
    await saveGameToFirebase(result, reachedRow, payout, loss);
    await updateUserBalance();
  }
  
  renderPyramid();
  updateUI();
}

// SAVE GAME TO FIREBASE
async function saveGameToFirebase(result, reachedRow, payout, loss) {
  if (!gameState.currentUser || !window.db) return;
  
  try {
    const gamesRef = window.collection(window.db, 'users', gameState.currentUser.uid, 'risk_games');
    await window.addDoc(gamesRef, {
      gameType: 'pyramid',
      timestamp: window.serverTimestamp(),
      bet: gameState.currentBet,
      result: result,
      reachedRow: reachedRow,
      payout: payout,
      loss: loss,
      finalBalance: gameState.playerBalance,
    });
    
    console.log('✅ Game saved to Firebase');
  } catch (e) {
    console.error('❌ Error saving game:', e);
  }
}

// UPDATE USER BALANCE IN FIREBASE
async function updateUserBalance() {
  if (!gameState.currentUser || !window.db) return;
  
  try {
    const userRef = window.doc(window.db, 'users', gameState.currentUser.uid);
    await window.updateDoc(userRef, {
      reagents: gameState.playerBalance
    });
    
    console.log('✅ Balance updated');
  } catch (e) {
    console.error('❌ Error updating balance:', e);
  }
}

// CASH OUT (exit current game)
function cashOut() {
  if (!gameState.gameActive) return;
  
  showMessage(`💰 Cashed out: ${gameState.potentialWin} RGT`, 'success');
  gameState.playerBalance += gameState.potentialWin;
  endGame(true, gameState.currentRow);
}

// RESET GAME STATE
function resetGameState() {
  gameState.playerBalance = 0;
  gameState.currentBet = 1;
  gameState.currentRow = 0;
  gameState.gameActive = false;
  gameState.potentialWin = 0;
  gameState.gamesPlayed = 0;
  gameState.wins = 0;
  gameState.losses = 0;
  gameState.bestRow = 0;
  gameState.sessionProfit = 0;
  gameState.recentGames = [];
  gameState.pyramid = [];
  gameState.revealedCells = [];
}

// UPDATE UI
function updateUI() {
  if (UI.playerBalance) UI.playerBalance.textContent = gameState.playerBalance.toFixed(2);
  if (UI.currentBet) UI.currentBet.textContent = gameState.currentBet;
  if (UI.currentRow) UI.currentRow.textContent = gameState.currentRow + 1;
  if (UI.potentialWin) UI.potentialWin.textContent = gameState.potentialWin.toFixed(2);
  
  if (UI.statsGamesPlayed) UI.statsGamesPlayed.textContent = gameState.gamesPlayed;
  if (UI.statsWins) UI.statsWins.textContent = gameState.wins;
  if (UI.statsLosses) UI.statsLosses.textContent = gameState.losses;
  if (UI.statsBestStep) UI.statsBestStep.textContent = gameState.bestRow + 1;
  if (UI.statsProfit) {
    UI.statsProfit.textContent = gameState.sessionProfit.toFixed(2);
    UI.statsProfit.className = gameState.sessionProfit >= 0 ? 'text-emerald-400' : 'text-red-400';
  }
}

// SHOW MESSAGE
function showMessage(msg, type = 'info') {
  if (!UI.gameMessage) return;
  
  UI.gameMessage.textContent = msg;
  UI.gameMessage.className = `text-center p-3 rounded mb-4 ${
    type === 'success' ? 'bg-emerald-500/20 text-emerald-400' :
    type === 'error' ? 'bg-red-500/20 text-red-400' :
    'bg-cyan-500/20 text-cyan-400'
  }`;
  
  setTimeout(() => {
    UI.gameMessage.textContent = '';
    UI.gameMessage.className = '';
  }, 4000);
}

// SETUP EVENT LISTENERS
function setupEventListeners() {
  if (UI.btnRiskNext) {
    UI.btnRiskNext.onclick = () => {
      if (gameState.gameActive) {
        showMessage('Click a cell to continue!', 'info');
      }
    };
  }
  
  if (UI.btnCashOut) {
    UI.btnCashOut.onclick = cashOut;
  }
}

// INITIALIZE ON LOAD
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGame);
} else {
  initGame();
}

// EXPORT GLOBAL FUNCTIONS
window.initGame = initGame;
window.startNewGame = startNewGame;
window.revealCell = revealCell;
window.cashOut = cashOut;

console.log('🔥 RISK PYRAMID game logic loaded with Firebase integration');

})();
