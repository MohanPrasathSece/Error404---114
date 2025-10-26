// Lightweight Matrix-style Falling Code Background (disabled in favor of neon grid)
const canvas = document.getElementById('matrix-rain');
const ctx = canvas.getContext('2d');
// Offscreen buffer to apply slice glitches without redrawing characters twice
const buffer = document.createElement('canvas');
const bctx = buffer.getContext('2d');

function resizeMatrixCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    buffer.width = canvas.width;
    buffer.height = canvas.height;
    initMatrix();
}

// Disable matrix background and hide canvas (neon grid handles BG)
const disableMatrix = true;
canvas.style.display = 'none';

const chars = '01{}[]<>;:/$#=+-%|\\';
let fontSize = 16;
let columns = 0;
let drops = [];

function initMatrix() {
    columns = Math.floor(canvas.width / fontSize);
    drops = new Array(columns).fill(0).map(() => Math.random() * -50);
}

resizeMatrixCanvas();
window.addEventListener('resize', resizeMatrixCanvas);

let last = 0;
const frameInterval = 1000 / 30; // ~30 FPS for perf
let glitchTimer = 0;
let glitchSlices = [];

function triggerGlitch() {
    glitchSlices = [];
    const count = Math.floor(Math.random() * 2) + 1; // 1-2 slices
    for (let i = 0; i < count; i++) {
        const h = Math.floor(Math.random() * 24) + 8; // 8-32px height
        const y = Math.floor(Math.random() * (canvas.height - h));
        const offset = Math.floor(Math.random() * 26) - 13; // -13..13 px
        glitchSlices.push({ y, h, offset });
    }
    glitchTimer = 6; // frames
}

function drawMatrix(ts) {
    if (disableMatrix) return;
    if (!last) last = ts;
    const delta = ts - last;
    if (delta < frameInterval) {
        requestAnimationFrame(drawMatrix);
        return;
    }
    last = ts;

    // Draw to buffer first
    bctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
    bctx.fillRect(0, 0, canvas.width, canvas.height);

    bctx.fillStyle = '#00ff88';
    bctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < columns; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        // slight per-column jitter when glitch active to simulate breaking
        const jx = glitchTimer > 0 ? (Math.random() * 2 - 1) : 0;
        bctx.fillText(text, x + jx, y);

        if (y > canvas.height && Math.random() > 0.975) {
            drops[i] = Math.random() * -20;
        }
        drops[i] += 1;
    }

    // Blit buffer to visible canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(buffer, 0, 0);

    // Apply a couple of horizontal break slices occasionally
    if (glitchTimer > 0) {
        for (const slice of glitchSlices) {
            ctx.drawImage(
                buffer,
                0, slice.y, canvas.width, slice.h,
                slice.offset, slice.y, canvas.width, slice.h
            );
        }
        glitchTimer--;
    } else if (Math.random() > 0.992) {
        triggerGlitch();
    }

    requestAnimationFrame(drawMatrix);
}

requestAnimationFrame(drawMatrix);
const reduceMotion = true;

// Terminal Animation
const terminalOutput = document.getElementById('terminal-output');
const terminalMessages = [
    { text: '> Initializing system...', delay: 1200, error: false },
    { text: '> Scanning for utilities...', delay: 1400, error: false },
    { text: '> Error: utility.exe not found', delay: 1300, error: true },
    { text: '> Attempting bypass...', delay: 1200, error: false },
    { text: '> Access denied: permission level insufficient', delay: 1400, error: true },
    { text: '> Fetching roadmap...', delay: 1400, error: false },
    { text: '> Error: file missing', delay: 1200, error: true },
    { text: '> Retrying with root access...', delay: 1300, error: false },
    { text: '> Error: firewall breach detected', delay: 1400, error: true },
    { text: '> Loading backup protocol...', delay: 1300, error: false },
    { text: '> Error: memory allocation failed', delay: 1400, error: true },
    { text: '> Searching for alternatives...', delay: 1300, error: false },
    { text: '> Error: connection timeout', delay: 1400, error: true },
    { text: '> Running diagnostic --deep', delay: 1300, error: false },
    { text: '> Error: segmentation fault in module core', delay: 1400, error: true },
    { text: '> Recompiling plan...', delay: 1200, error: false },
    { text: '> Error: invalid opcode executed', delay: 1400, error: true },
    { text: '> Requesting help...', delay: 1200, error: false },
    { text: '> Error: null pointer exception', delay: 1400, error: true },
    { text: '> Terminating session...', delay: 1500, error: false }
];

let messageIndex = 0;

function typeTerminalMessage() {
    if (messageIndex < terminalMessages.length) {
        const message = terminalMessages[messageIndex];
        const line = document.createElement('div');
        line.className = `terminal-line ${message.error ? 'terminal-error' : ''}`;
        line.textContent = message.text;
        terminalOutput.appendChild(line);
        // keep newest visible
        terminalOutput.scrollTop = terminalOutput.scrollHeight;

        // Mirror to browser console as well
        if (message.error) console.error(message.text);
        else console.log(message.text);
        
        messageIndex++;
        
        setTimeout(typeTerminalMessage, message.delay);
    } else {
        // Loop without clearing to keep all messages visible
        setTimeout(() => {
            messageIndex = 0;
            typeTerminalMessage();
        }, 2000);
    }
}

// Start terminal animation when page loads
window.addEventListener('load', () => {
    setTimeout(typeTerminalMessage, 500);
    
    // Initialize game elements
    initializeGameElements();
});

// Buy Token Button
function buyToken() {
    showPopup('> Connecting to Raydium...<br>> Error: wallet not found<br>> Please install a Solana wallet first<br><br>(This is a demo - no real transaction)');
}

// Retry Button
function retryLoad() {
    const hero = document.querySelector('.hero');
    hero.style.opacity = '0';
    
    setTimeout(() => {
        showPopup('> Retrying...<br>> Still nothing found<br>> Error: 404 remains 404<br>> System working as intended');
        hero.style.opacity = '1';
    }, 300);
}

// Whitepaper Button
function openWhitepaper() {
    showPopup('> Loading whitepaper.pdf...<br>> Error: File not found (0kb)<br>> Download failed<br>> Reason: File does not exist<br>> Status: Intentionally missing');
}

// Popup Functions
function showPopup(message) {
    const popup = document.getElementById('error-popup');
    const popupMessage = document.getElementById('popup-message');
    popupMessage.innerHTML = message;
    popup.classList.add('active');
}

function closePopup() {
    const popup = document.getElementById('error-popup');
    popup.classList.remove('active');
}

// Close popup on background click
document.getElementById('error-popup').addEventListener('click', (e) => {
    if (e.target.id === 'error-popup') {
        closePopup();
    }
});

// Close popup on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closePopup();
    }
});

// Easter Egg: Help Command
let keyBuffer = '';
const helpCommand = 'help';

document.addEventListener('keypress', (e) => {
    keyBuffer += e.key.toLowerCase();
    
    // Keep buffer limited to command length
    if (keyBuffer.length > helpCommand.length) {
        keyBuffer = keyBuffer.slice(-helpCommand.length);
    }
    
    // Check if help command was typed
    if (keyBuffer === helpCommand) {
        showPopup('> help command not recognized<br>> Available commands: none<br>> Error: help.exe missing<br>> Suggestion: give up');
        keyBuffer = '';
    }
});

// Random Glitch Effect
function randomGlitch() {
    const glitchElements = document.querySelectorAll('.glitch');
    const randomElement = glitchElements[Math.floor(Math.random() * glitchElements.length)];
    
    if (randomElement) {
        randomElement.style.animation = 'none';
        setTimeout(() => {
            randomElement.style.animation = '';
        }, 10);
    }
}

// Trigger random glitches
if (!reduceMotion) {
    setInterval(randomGlitch, 5000);
}

// Social Link Interactions
const socialLinks = document.querySelectorAll('.social-link');
socialLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const errorMsg = link.getAttribute('data-error');
        showPopup(`> Attempting to connect...<br>> ${errorMsg}<br>> Connection failed<br>> Please try again never`);
    });
});

// Cursor Flicker Effect
function flickerCursor() {
    const cursors = document.querySelectorAll('.cursor');
    cursors.forEach(cursor => {
        if (Math.random() > 0.95) {
            cursor.style.opacity = '0';
            setTimeout(() => {
                cursor.style.opacity = '1';
            }, 50);
        }
    });
}

if (!reduceMotion) {
    setInterval(flickerCursor, 100);
}

// Screen Flicker Effect (rare)
function screenFlicker() {
    if (Math.random() > 0.98) {
        document.body.style.opacity = '0.8';
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 50);
    }
}

if (!reduceMotion) {
    setInterval(screenFlicker, 1000);
}

// Console Easter Eggs
console.log('%c> System initialized', 'color: #00ff88; font-family: monospace;');
console.log('%c> Warning: Nothing works here', 'color: #ff0055; font-family: monospace;');
console.log('%c> Error: Purpose not found', 'color: #ff3333; font-family: monospace;');
console.log('%c> $404 - The only coin that failed on purpose', 'color: #8800ff; font-family: monospace; font-weight: bold;');

// Add loading message
window.addEventListener('DOMContentLoaded', () => {
    console.log('%c> DOM loaded successfully (surprisingly)', 'color: #00ff88; font-family: monospace;');
});

// Konami Code Easter Egg (up, up, down, down, left, right, left, right, b, a)
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
        showPopup('> Konami code detected<br>> Unlocking secret utility...<br>> Error: Still no utility found<br>> Nice try though<br>> Achievement unlocked: Wasted time');
        konamiCode = [];
        
        // Add extra glitch effect
        document.body.style.animation = 'glitchText 0.3s';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 300);
    }
});

// Prevent right-click (optional - adds to the mysterious vibe)
// Uncomment if you want this feature
/*
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    showPopup('> Right-click disabled<br>> Error: Context menu not found<br>> This is intentional');
});
*/

// Random error messages in console
const randomErrors = [
    'Warning: Utility module failed to load',
    'Error: Purpose.js not found',
    'Critical: Roadmap.exe has stopped working',
    'Alert: Team members have left the chat',
    'Notice: Whitepaper.pdf is corrupted',
    'Error: Success rate: 0%'
];

function logRandomError() {
    const error = randomErrors[Math.floor(Math.random() * randomErrors.length)];
    console.error(`%c> ${error}`, 'color: #ff3333; font-family: monospace;');
}

// Log random errors every 10-30 seconds
setInterval(logRandomError, Math.random() * 20000 + 10000);

// Smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Static scroll handler - only minimal effects as per original brief
// Original brief: "Static feel - no scrolling effects"
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // No scroll effects as per original brief
    lastScrollTop = scrollTop;
}, { passive: true });

// Functions removed for static feel as per original brief

// Intense RGB Split Effect on random elements
function createRGBSplit() {
    const elements = document.querySelectorAll('.section-title, .logo, .stat-value');
    const randomElement = elements[Math.floor(Math.random() * elements.length)];
    
    if (randomElement) {
        randomElement.style.textShadow = `
            -2px 0 0 #ff0055,
            2px 0 0 #00ff88,
            0 0 20px rgba(0, 255, 136, 0.5)
        `;
        
        setTimeout(() => {
            randomElement.style.textShadow = '';
        }, 100);
    }
}

if (!reduceMotion) {
    setInterval(createRGBSplit, 3000);
}

// Random chromatic aberration effect
function chromaticAberration() {
    const sections = document.querySelectorAll('section');
    const randomSection = sections[Math.floor(Math.random() * sections.length)];
    
    if (randomSection && Math.random() > 0.95) {
        randomSection.style.filter = 'hue-rotate(90deg) saturate(1.5)';
        setTimeout(() => {
            randomSection.style.filter = '';
        }, 50);
    }
}

if (!reduceMotion) {
    setInterval(chromaticAberration, 500);
}

// Create floating glitch particles
function createGlitchParticle() {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.width = Math.random() * 100 + 50 + 'px';
    particle.style.height = '2px';
    particle.style.background = Math.random() > 0.5 ? '#00ff88' : '#ff0055';
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = Math.random() * window.innerHeight + 'px';
    particle.style.opacity = '0.5';
    particle.style.zIndex = '0';
    particle.style.pointerEvents = 'none';
    particle.style.boxShadow = `0 0 10px ${particle.style.background}`;
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
        particle.style.transition = 'all 0.5s';
        particle.style.opacity = '0';
        particle.style.transform = 'translateY(' + (Math.random() * 200 - 100) + 'px)';
    }, 10);
    
    setTimeout(() => {
        particle.remove();
    }, 600);
}

// Create glitch particles occasionally
if (!reduceMotion) {
    setInterval(() => {
        if (Math.random() > 0.7) {
            createGlitchParticle();
        }
    }, 2000);
}

// Intense screen shake on specific intervals
function screenShake() {
    if (Math.random() > 0.98) {
        document.body.style.transform = 'translate(' + (Math.random() * 4 - 2) + 'px, ' + (Math.random() * 4 - 2) + 'px)';
        setTimeout(() => {
            document.body.style.transform = '';
        }, 50);
    }
}

if (!reduceMotion) {
    setInterval(screenShake, 100);
}

// Add neon glow pulse to random elements
function neonPulse() {
    const cards = document.querySelectorAll('.stat-card, .team-card, .legend-item');
    const randomCard = cards[Math.floor(Math.random() * cards.length)];
    
    if (randomCard && Math.random() > 0.9) {
        const originalShadow = randomCard.style.boxShadow;
        randomCard.style.boxShadow = '0 0 40px rgba(0, 255, 136, 0.8), 0 0 80px rgba(0, 255, 136, 0.4)';
        
        setTimeout(() => {
            randomCard.style.boxShadow = originalShadow;
        }, 200);
    }
}

if (!reduceMotion) {
    setInterval(neonPulse, 1500);
}

// Terminal Hover Effects (disabled)
const terminal = document.querySelector('.terminal');

// === Global error mirroring into terminal and browser console ===
function appendTerminal(text, isError = false) {
    if (!terminalOutput) return;
    const line = document.createElement('div');
    line.className = `terminal-line ${isError ? 'terminal-error' : ''}`;
    line.textContent = text;
    terminalOutput.appendChild(line);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

// Capture runtime JS errors
window.addEventListener('error', (e) => {
    const msg = e?.message || 'Unknown error';
    appendTerminal(`> JS Error: ${msg}`, true);
    // let default console still show full stack
});

// Capture unhandled promise rejections
window.addEventListener('unhandledrejection', (e) => {
    const reason = (e && (e.reason?.message || e.reason)) || 'Unhandled rejection';
    appendTerminal(`> Promise Rejection: ${reason}`, true);
});

// Mirror console.error to terminal as well
const __origConsoleError = console.error.bind(console);
console.error = (...args) => {
    appendTerminal('> ' + args.map(String).join(' '), true);
    __origConsoleError(...args);
};

// === 404 MINI GAME: SYSTEM COLLAPSE (ENHANCED) ===
let gameState = {
    running: false,
    score: 0,
    health: 100,
    playerPos: 50, // percentage
    errors: [],
    powerUps: [],
    gameSpeed: 1,
    spawnRate: 0.02,
    combo: 0,
    maxCombo: 0,
    shield: 0,
    doublePoints: 0,
    wave: 1,
    bossActive: false
};

const errorTypes = [
    { text: '404', points: 10, color: '#ff0055', size: 'normal' },
    { text: 'NULL', points: 15, color: '#ff3333', size: 'normal' },
    { text: 'SEGV', points: 20, color: '#ff6600', size: 'normal' },
    { text: 'OOM', points: 25, color: '#ff9900', size: 'normal' },
    { text: 'FAIL', points: 12, color: '#cc0044', size: 'normal' },
    { text: 'ERR', points: 8, color: '#990033', size: 'small' },
    { text: 'BUG', points: 30, color: '#ff0088', size: 'large' }
];

const powerUpTypes = [
    { text: 'SHIELD', color: '#00ff88', effect: 'shield' },
    { text: '2X', color: '#ffaa00', effect: 'double' },
    { text: 'HEAL', color: '#0088ff', effect: 'heal' },
    { text: 'SLOW', color: '#8800ff', effect: 'slow' }
];

const bossErrors = [
    { text: 'KERNEL PANIC', health: 3, points: 100, color: '#ff0000' },
    { text: 'STACK OVERFLOW', health: 4, points: 150, color: '#ff4400' },
    { text: 'SYSTEM CRASH', health: 5, points: 200, color: '#ff0088' }
];
// Wait for DOM to be ready before getting elements
let gameArea, player, scoreEl, healthEl, statusEl, instructions;

function initializeGameElements() {
    gameArea = document.getElementById('gameArea');
    player = document.getElementById('player');
    scoreEl = document.getElementById('score');
    healthEl = document.getElementById('health');
    statusEl = document.getElementById('status');
    instructions = document.getElementById('instructions');
    
    console.log('Game elements initialized:', {
        gameArea: !!gameArea,
        player: !!player,
        scoreEl: !!scoreEl,
        healthEl: !!healthEl,
        statusEl: !!statusEl,
        instructions: !!instructions
    });
    
    // Set initial status
    if (statusEl) statusEl.textContent = 'READY';
}

// Game controls
const keys = {};
document.addEventListener('keydown', (e) => {
    keys[e.key.toLowerCase()] = true;
    if (e.key === ' ' && !gameState.running) {
        e.preventDefault();
        startGame();
    }
});
document.addEventListener('keyup', (e) => {
    keys[e.key.toLowerCase()] = false;
});

function startGame() {
    if (gameState.running) return;
    
    // Initialize elements if not already done
    if (!gameArea) initializeGameElements();
    
    // Check if all elements exist
    if (!gameArea || !player || !scoreEl || !healthEl || !statusEl) {
        console.error('Game elements not found!');
        appendTerminal('> Error: Game elements not found', true);
        return;
    }
    
    gameState = {
        running: true,
        score: 0,
        health: 100,
        playerPos: 50,
        errors: [],
        powerUps: [],
        gameSpeed: 1,
        spawnRate: 0.02,
        combo: 0,
        maxCombo: 0,
        shield: 0,
        doublePoints: 0,
        wave: 1,
        bossActive: false
    };
    
    if (instructions) instructions.style.display = 'none';
    statusEl.textContent = 'ACTIVE';
    statusEl.style.color = 'var(--accent-green)';
    
    // Remove any existing game over screen
    const gameOver = gameArea.querySelector('.game-over');
    if (gameOver) gameOver.remove();
    
    appendTerminal('> Game started successfully', false);
    gameLoop();
}

function resetGame() {
    gameState.running = false;
    gameState.errors.forEach(error => error.element.remove());
    gameState.powerUps.forEach(powerUp => powerUp.element.remove());
    gameState.errors = [];
    gameState.powerUps = [];
    gameState.score = 0;
    gameState.health = 100;
    gameState.playerPos = 50;
    gameState.combo = 0;
    gameState.maxCombo = 0;
    gameState.shield = 0;
    gameState.doublePoints = 0;
    gameState.wave = 1;
    gameState.bossActive = false;
    
    updateUI();
    instructions.style.display = 'block';
    statusEl.textContent = 'READY';
    statusEl.style.color = 'var(--text-secondary)';
    
    const gameOver = gameArea.querySelector('.game-over');
    if (gameOver) gameOver.remove();
    
    // Reset player position and remove any effects
    player.style.left = '50%';
    player.style.boxShadow = '';
    gameArea.classList.remove('system-collapse');
}

function spawnError() {
    const errorType = errorTypes[Math.floor(Math.random() * errorTypes.length)];
    const errorEl = document.createElement('div');
    errorEl.className = 'falling-error';
    errorEl.textContent = errorType.text;
    errorEl.style.left = Math.random() * (gameArea.offsetWidth - 80) + 'px';
    errorEl.style.backgroundColor = errorType.color;
    errorEl.style.animation = `errorFall ${3 - gameState.gameSpeed * 0.5}s linear forwards`;
    
    if (errorType.size === 'small') {
        errorEl.style.width = '60px';
        errorEl.style.fontSize = '0.7rem';
    } else if (errorType.size === 'large') {
        errorEl.style.width = '100px';
        errorEl.style.fontSize = '0.9rem';
        errorEl.style.fontWeight = 'bold';
    }
    
    gameArea.appendChild(errorEl);
    
    gameState.errors.push({
        element: errorEl,
        type: errorType,
        x: parseFloat(errorEl.style.left),
        y: -30,
        speed: 2 + gameState.gameSpeed
    });
}

function spawnPowerUp() {
    if (Math.random() > 0.15) return; // 15% chance
    
    const powerUp = powerUpTypes[Math.floor(Math.random() * powerUpTypes.length)];
    const powerUpEl = document.createElement('div');
    powerUpEl.className = 'falling-powerup';
    powerUpEl.textContent = powerUp.text;
    powerUpEl.style.left = Math.random() * (gameArea.offsetWidth - 80) + 'px';
    powerUpEl.style.backgroundColor = powerUp.color;
    powerUpEl.style.animation = `errorFall ${4}s linear forwards`;
    
    gameArea.appendChild(powerUpEl);
    
    gameState.powerUps.push({
        element: powerUpEl,
        type: powerUp,
        x: parseFloat(powerUpEl.style.left),
        y: -30
    });
}

function spawnBoss() {
    if (gameState.bossActive) return;
    
    const boss = bossErrors[Math.floor(Math.random() * bossErrors.length)];
    const bossEl = document.createElement('div');
    bossEl.className = 'falling-error boss-error';
    bossEl.textContent = boss.text;
    bossEl.style.left = '50%';
    bossEl.style.transform = 'translateX(-50%)';
    bossEl.style.backgroundColor = boss.color;
    bossEl.style.width = '200px';
    bossEl.style.height = '60px';
    bossEl.style.fontSize = '1rem';
    bossEl.style.fontWeight = 'bold';
    bossEl.style.animation = `errorFall 8s linear forwards`;
    
    gameArea.appendChild(bossEl);
    
    gameState.errors.push({
        element: bossEl,
        type: { ...boss, isBoss: true, currentHealth: boss.health },
        x: parseFloat(bossEl.style.left),
        y: -60,
        speed: 1
    });
    
    gameState.bossActive = true;
    appendTerminal(`> BOSS ERROR DETECTED: ${boss.text}`, true);
}

function activatePowerUp(powerUp) {
    switch (powerUp.effect) {
        case 'shield':
            gameState.shield += 3;
            appendTerminal('> SHIELD ACTIVATED - 3 hits protected', false);
            break;
        case 'double':
            gameState.doublePoints = 300; // 5 seconds at 60fps
            appendTerminal('> DOUBLE POINTS ACTIVATED', false);
            break;
        case 'heal':
            gameState.health = Math.min(100, gameState.health + 30);
            appendTerminal('> SYSTEM REPAIRED +30 health', false);
            break;
        case 'slow':
            gameState.gameSpeed = Math.max(0.5, gameState.gameSpeed - 0.5);
            appendTerminal('> TIME DILATION ACTIVATED', false);
            break;
    }
    
    // Visual effect
    player.style.boxShadow = `0 0 20px ${powerUp.color}`;
    setTimeout(() => player.style.boxShadow = '', 500);
}

function createComboEffect(combo) {
    const comboEl = document.createElement('div');
    comboEl.className = 'combo-effect';
    comboEl.textContent = `${combo}x COMBO!`;
    comboEl.style.position = 'absolute';
    comboEl.style.top = '20px';
    comboEl.style.left = '50%';
    comboEl.style.transform = 'translateX(-50%)';
    comboEl.style.color = '#ffaa00';
    comboEl.style.fontSize = '1.5rem';
    comboEl.style.fontWeight = 'bold';
    comboEl.style.textShadow = '0 0 10px #ffaa00';
    comboEl.style.animation = 'comboFloat 2s ease-out forwards';
    comboEl.style.zIndex = '20';
    
    gameArea.appendChild(comboEl);
    setTimeout(() => comboEl.remove(), 2000);
}

function updatePlayer() {
    // Handle movement
    if (keys['a'] || keys['arrowleft']) {
        gameState.playerPos = Math.max(0, gameState.playerPos - 2);
    }
    if (keys['d'] || keys['arrowright']) {
        gameState.playerPos = Math.min(100, gameState.playerPos + 2);
    }
    
    player.style.left = gameState.playerPos + '%';
}

function updateErrors() {
    const playerRect = player.getBoundingClientRect();
    const gameAreaRect = gameArea.getBoundingClientRect();
    
    gameState.errors = gameState.errors.filter(error => {
        const errorRect = error.element.getBoundingClientRect();
        
        // Check collision with player
        if (errorRect.bottom >= playerRect.top &&
            errorRect.top <= playerRect.bottom &&
            errorRect.right >= playerRect.left &&
            errorRect.left <= playerRect.right) {
            
            if (error.type.isBoss) {
                // Boss hit - reduce health
                error.type.currentHealth--;
                if (error.type.currentHealth <= 0) {
                    gameState.score += error.type.points * (gameState.doublePoints > 0 ? 2 : 1);
                    gameState.combo += 5;
                    error.element.remove();
                    gameState.bossActive = false;
                    appendTerminal(`> BOSS DEFEATED! +${error.type.points} points`, false);
                    return false;
                } else {
                    // Boss still alive, just flash
                    error.element.style.filter = 'brightness(2)';
                    setTimeout(() => error.element.style.filter = '', 100);
                }
                return true;
            } else {
                // Regular error caught
                const points = error.type.points * (gameState.doublePoints > 0 ? 2 : 1);
                gameState.score += points;
                gameState.combo++;
                if (gameState.combo > gameState.maxCombo) gameState.maxCombo = gameState.combo;
                
                error.element.remove();
                
                // Combo effects
                if (gameState.combo >= 10) {
                    createComboEffect(gameState.combo);
                }
                
                // Screen shake effect
                document.body.classList.add('shake-burst');
                setTimeout(() => document.body.classList.remove('shake-burst'), 200);
                
                return false;
            }
        }
        
        // Check if error hit bottom
        if (errorRect.top > gameAreaRect.bottom) {
            if (gameState.shield > 0) {
                gameState.shield--;
            } else {
                gameState.health -= error.type.isBoss ? 30 : 10;
            }
            gameState.combo = 0; // Break combo
            error.element.remove();
            
            if (error.type.isBoss) gameState.bossActive = false;
            
            // Add system damage effect
            if (gameState.health <= 30) {
                gameArea.classList.add('system-collapse');
            }
            
            return false;
        }
        
        return true;
    });
    
    // Update power-ups
    gameState.powerUps = gameState.powerUps.filter(powerUp => {
        const powerUpRect = powerUp.element.getBoundingClientRect();
        
        // Check collision with player
        if (powerUpRect.bottom >= playerRect.top &&
            powerUpRect.top <= playerRect.bottom &&
            powerUpRect.right >= playerRect.left &&
            powerUpRect.left <= playerRect.right) {
            
            // Activate power-up
            activatePowerUp(powerUp.type);
            powerUp.element.remove();
            return false;
        }
        
        // Remove if off screen
        if (powerUpRect.top > gameAreaRect.bottom) {
            powerUp.element.remove();
            return false;
        }
        
        return true;
    });
}

function gameOver() {
    gameState.running = false;
    gameArea.classList.remove('system-collapse');
    
    const gameOverEl = document.createElement('div');
    gameOverEl.className = 'game-over';
    gameOverEl.innerHTML = `
        <h3>SYSTEM COLLAPSED</h3>
        <p>Final Score: ${gameState.score}</p>
        <p>Max Combo: ${gameState.maxCombo}x</p>
        <p>Wave Reached: ${gameState.wave}</p>
        <p>Final Health: ${gameState.health}%</p>
        <p>Press REBOOT to try again</p>
    `;
    
    gameArea.appendChild(gameOverEl);
    
    // Log to terminal
    appendTerminal(`> Game Over - Score: ${gameState.score}, Max Combo: ${gameState.maxCombo}x, Wave: ${gameState.wave}`, true);
}

function gameLoop() {
    if (!gameState.running) return;
    
    if (gameState.health <= 0) {
        gameOver();
        return;
    }
    
    // Spawn errors
    if (Math.random() < gameState.spawnRate) {
        spawnError();
    }
    
    // Spawn power-ups occasionally
    if (Math.random() < 0.005) {
        spawnPowerUp();
    }
    
    // Spawn boss every 500 points (with a flag to prevent multiple spawns)
    if (gameState.score >= 500 && Math.floor(gameState.score / 500) > Math.floor((gameState.score - 10) / 500) && !gameState.bossActive) {
        spawnBoss();
    }
    
    updatePlayer();
    updateErrors();
    updateUI();
    
    // Wave progression
    const newWave = Math.floor(gameState.score / 200) + 1;
    if (newWave > gameState.wave) {
        gameState.wave = newWave;
        appendTerminal(`> WAVE ${gameState.wave} - Difficulty increased`, false);
    }
    
    // Increase difficulty over time
    gameState.gameSpeed += 0.001;
    gameState.spawnRate = Math.min(0.08, gameState.spawnRate + 0.0001);
    
    requestAnimationFrame(gameLoop);
}

// Enhanced breaking effects for sections
const tokenomicsSection = document.querySelector('.tokenomics');
const teamSection = document.querySelector('.team');
const pieChart = document.querySelector('.pie-chart');
const teamCards = document.querySelectorAll('.team-card');
const legendItems = document.querySelectorAll('.legend-item');
const hoverShakeTargets = document.querySelectorAll('.team-image, img');

// Scroll-triggered full-site shake (throttled)
let lastScrollShake = 0;
let scrollShakeScheduled = false;
const SCROLL_SHAKE_COOLDOWN = 250; // ms

window.addEventListener('scroll', () => {
    const now = performance.now();
    if (now - lastScrollShake < SCROLL_SHAKE_COOLDOWN || scrollShakeScheduled) return;
    lastScrollShake = now;
    scrollShakeScheduled = true;
    requestAnimationFrame(() => {
        document.body.classList.remove('shake-burst');
        void document.body.offsetWidth;
        document.body.classList.add('shake-burst');
        setTimeout(() => {
            document.body.classList.remove('shake-burst');
            scrollShakeScheduled = false;
        }, 320);
    });
}, { passive: true });

// Full-screen shake on image hover (short burst)
let shakeTimeoutId;
hoverShakeTargets.forEach(el => {
    el.addEventListener('mouseenter', () => {
        document.body.classList.remove('shake-burst');
        // restart animation by reflow
        // eslint-disable-next-line no-unused-expressions
        void document.body.offsetWidth;
        document.body.classList.add('shake-burst');
        clearTimeout(shakeTimeoutId);
        shakeTimeoutId = setTimeout(() => {
            document.body.classList.remove('shake-burst');
        }, 320);
    });
});

// Tokenomics hover effects
if (tokenomicsSection) {
    tokenomicsSection.addEventListener('mouseenter', () => {
        if (reduceMotion) return;
        document.body.style.animation = 'glitchText 0.5s infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 500);
        for (let i = 0; i < 5; i++) {
            setTimeout(() => createBreakParticle(), i * 100);
        }
    });
}

// Pie chart hover effects
if (pieChart) {
    pieChart.addEventListener('mouseenter', () => {
        if (!reduceMotion) {
            document.body.style.transform = 'translate(' + (Math.random() * 6 - 3) + 'px, ' + (Math.random() * 6 - 3) + 'px)';
            setTimeout(() => {
                document.body.style.transform = '';
            }, 200);
        }
        showPopup('> ERROR: Tokenomics data corrupted<br>> Chart integrity compromised<br>> Displaying emergency values');
    });
}

// Legend items hover effects
legendItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        if (!reduceMotion) {
            item.style.animation = 'legendBreak 0.3s ease-in-out infinite';
            setTimeout(() => {
                item.style.animation = '';
            }, 1000);
        }
        if (!reduceMotion) {
            const rect = item.getBoundingClientRect();
            createBreakParticle(rect.left + rect.width/2, rect.top + rect.height/2);
        }
    });
});

// Team section hover effects (only on hover, not scroll)
if (teamSection) {
    teamSection.addEventListener('mouseenter', () => {
        if (reduceMotion) return;
        document.body.style.filter = 'contrast(1.2) brightness(0.9) blur(0.5px)';
        setTimeout(() => {
            document.body.style.filter = '';
        }, 400);
        for (let i = 0; i < 8; i++) {
            setTimeout(() => createBreakParticle(), i * 80);
        }
    });
}

// Team cards hover effects (only on hover, not scroll)
teamCards.forEach((card, index) => {
    card.addEventListener('mouseenter', () => {
        if (reduceMotion) return;
        setTimeout(() => {
            const rect = card.getBoundingClientRect();
            for (let i = 0; i < 3; i++) {
                setTimeout(() => {
                    createBreakParticle(
                        rect.left + Math.random() * rect.width,
                        rect.top + Math.random() * rect.height
                    );
                }, i * 120);
            }
        }, index * 120);
    });
});

// Create breaking particle effect
function createBreakParticle(x = Math.random() * window.innerWidth, y = Math.random() * window.innerHeight) {
    if (reduceMotion) return;
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.width = Math.random() * 15 + 8 + 'px';
    particle.style.height = Math.random() * 15 + 8 + 'px';
    
    // Make particles look like debris/shards
    const isRed = Math.random() > 0.5;
    particle.style.background = isRed ? '#2a2a2a' : '#1a1a1a';
    particle.style.border = '1px solid ' + (isRed ? '#ff3333' : '#666666');
    
    // Random shard-like shapes
    const shapes = ['polygon(50% 0%, 0% 100%, 100% 100%)', 'polygon(0% 0%, 100% 50%, 0% 100%)', 'polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)'];
    particle.style.clipPath = shapes[Math.floor(Math.random() * shapes.length)];
    
    particle.style.zIndex = '0';
    particle.style.pointerEvents = 'none';
    particle.style.boxShadow = '0 0 8px rgba(255, 51, 51, 0.3)';
    particle.style.opacity = '0.9';
    
    document.body.appendChild(particle);
    
    // Animate breaking particle with gravity
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 300 + 150;
    const vx = Math.cos(angle) * speed;
    const vy = Math.sin(angle) * speed + Math.random() * 100;
    
    let currentX = x;
    let currentY = y;
    let gravity = 0;
    
    function animate() {
        gravity += 0.5;
        currentX += vx * 0.015;
        currentY += (vy + gravity) * 0.015;
        
        particle.style.left = currentX + 'px';
        particle.style.top = currentY + 'px';
        particle.style.opacity = Math.max(0, parseFloat(particle.style.opacity) - 0.015);
        particle.style.transform = `scale(${Math.max(0.3, 1 - (currentY - y) / 800)}) rotate(${currentY * 2}deg)`;
        
        if (parseFloat(particle.style.opacity) > 0 && currentY < window.innerHeight + 100) {
            requestAnimationFrame(animate);
        } else {
            particle.remove();
        }
    }
    
    requestAnimationFrame(animate);
}
