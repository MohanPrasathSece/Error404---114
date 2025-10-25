// Matrix Rain Effect
const canvas = document.getElementById('matrix-rain');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const characters = '01$404ERRORUTILITYNOTFOUND><';
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = [];

for (let i = 0; i < columns; i++) {
    drops[i] = Math.random() * -100;
}

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#00ff88';
    ctx.font = fontSize + 'px monospace';
    
    for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawMatrix, 50);

// Resize canvas on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Terminal Animation
const terminalOutput = document.getElementById('terminal-output');
const terminalMessages = [
    { text: '> Connecting to Solana...', delay: 1000, error: false },
    { text: '> Fetching roadmap...', delay: 2000, error: false },
    { text: '> Error: file missing', delay: 1500, error: true },
    { text: '> Retrying...', delay: 1000, error: false },
    { text: '> Error: same result', delay: 1500, error: true },
    { text: '> Please wait...', delay: 2000, error: false },
    { text: '> Nevermind.', delay: 1500, error: true }
];

let messageIndex = 0;

function typeTerminalMessage() {
    if (messageIndex < terminalMessages.length) {
        const message = terminalMessages[messageIndex];
        const line = document.createElement('div');
        line.className = `terminal-line ${message.error ? 'terminal-error' : ''}`;
        line.textContent = message.text;
        terminalOutput.appendChild(line);
        
        messageIndex++;
        
        setTimeout(typeTerminalMessage, message.delay);
    } else {
        // Loop the terminal animation
        setTimeout(() => {
            terminalOutput.innerHTML = '';
            messageIndex = 0;
            typeTerminalMessage();
        }, 3000);
    }
}

// Start terminal animation when page loads
window.addEventListener('load', () => {
    setTimeout(typeTerminalMessage, 500);
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
setInterval(randomGlitch, 5000);

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

setInterval(flickerCursor, 100);

// Screen Flicker Effect (rare)
function screenFlicker() {
    if (Math.random() > 0.98) {
        document.body.style.opacity = '0.8';
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 50);
    }
}

setInterval(screenFlicker, 1000);

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

setInterval(createRGBSplit, 3000);

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

setInterval(chromaticAberration, 500);

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
    particle.style.zIndex = '9998';
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
setInterval(() => {
    if (Math.random() > 0.7) {
        createGlitchParticle();
    }
}, 2000);

// Intense screen shake on specific intervals
function screenShake() {
    if (Math.random() > 0.98) {
        document.body.style.transform = 'translate(' + (Math.random() * 4 - 2) + 'px, ' + (Math.random() * 4 - 2) + 'px)';
        setTimeout(() => {
            document.body.style.transform = '';
        }, 50);
    }
}

setInterval(screenShake, 100);

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

setInterval(neonPulse, 1500);

// Terminal Hover Effects
const terminal = document.querySelector('.terminal');

terminal.addEventListener('mouseenter', () => {
    // Add typing cursor visual effect
    terminal.style.cursor = 'text';
    
    // Add a subtle typing sound simulation (visual feedback)
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'terminal-line typing-indicator';
    typingIndicator.textContent = '> ';
    typingIndicator.style.color = '#00ff88';
    typingIndicator.style.animation = 'typingPulse 0.5s ease-in-out infinite';
    
    terminalOutput.appendChild(typingIndicator);
    
    // Add blinking cursor after the indicator
    setTimeout(() => {
        const cursor = document.createElement('span');
        cursor.className = 'typing-cursor';
        cursor.textContent = '_';
        cursor.style.animation = 'blink 0.8s infinite';
        typingIndicator.appendChild(cursor);
    }, 100);
});

terminal.addEventListener('mouseleave', () => {
    // Remove typing indicator when leaving
    const typingIndicators = document.querySelectorAll('.typing-indicator');
    typingIndicators.forEach(indicator => indicator.remove());
    
    const typingCursors = document.querySelectorAll('.typing-cursor');
    typingCursors.forEach(cursor => cursor.remove());
});

// Add typing pulse animation
const style = document.createElement('style');
style.textContent = `
    @keyframes typingPulse {
        0%, 100% { opacity: 0.7; }
        50% { opacity: 1; }
    }
    
    .typing-indicator {
        display: inline-block;
        margin-left: 10px;
    }
    
    .typing-cursor {
        animation: blink 0.8s infinite !important;
        color: #00ff88 !important;
    }
`;
document.head.appendChild(style);

// Enhanced breaking effects for sections
const tokenomicsSection = document.querySelector('.tokenomics');
const teamSection = document.querySelector('.team');
const pieChart = document.querySelector('.pie-chart');
const teamCards = document.querySelectorAll('.team-card');
const legendItems = document.querySelectorAll('.legend-item');

// Tokenomics hover effects
if (tokenomicsSection) {
    tokenomicsSection.addEventListener('mouseenter', () => {
        // Add intense screen distortion
        document.body.style.animation = 'glitchText 0.5s infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 500);
        
        // Create breaking particles
        for (let i = 0; i < 5; i++) {
            setTimeout(() => createBreakParticle(), i * 100);
        }
    });
}

// Pie chart hover effects
if (pieChart) {
    pieChart.addEventListener('mouseenter', () => {
        // Add screen shake
        document.body.style.transform = 'translate(' + (Math.random() * 6 - 3) + 'px, ' + (Math.random() * 6 - 3) + 'px)';
        setTimeout(() => {
            document.body.style.transform = '';
        }, 200);
        
        // Show breaking popup
        showPopup('> ERROR: Tokenomics data corrupted<br>> Chart integrity compromised<br>> Displaying emergency values');
    });
}

// Legend items hover effects
legendItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        // Add glitch to the specific legend item
        item.style.animation = 'legendBreak 0.3s ease-in-out infinite';
        setTimeout(() => {
            item.style.animation = '';
        }, 1000);
        
        // Create small breaking effect
        const rect = item.getBoundingClientRect();
        createBreakParticle(rect.left + rect.width/2, rect.top + rect.height/2);
    });
});

// Team section hover effects (only on hover, not scroll)
if (teamSection) {
    teamSection.addEventListener('mouseenter', () => {
        // Add screen distortion instead of color changes
        document.body.style.filter = 'contrast(1.2) brightness(0.9) blur(0.5px)';
        setTimeout(() => {
            document.body.style.filter = '';
        }, 400);

        // Create shattering particles
        for (let i = 0; i < 8; i++) {
            setTimeout(() => createBreakParticle(), i * 80);
        }
    });
}

// Team cards hover effects (only on hover, not scroll)
teamCards.forEach((card, index) => {
    card.addEventListener('mouseenter', () => {
        // Staggered breaking effect
        setTimeout(() => {
            // Add screen distortion
            document.body.style.transform = 'scale(0.98) translate(' + (Math.random() * 8 - 4) + 'px, ' + (Math.random() * 8 - 4) + 'px)';
            setTimeout(() => {
                document.body.style.transform = '';
            }, 150);

            // Create breaking particles around the card
            const rect = card.getBoundingClientRect();
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    createBreakParticle(
                        rect.left + Math.random() * rect.width,
                        rect.top + Math.random() * rect.height
                    );
                }, i * 100);
            }

            // Add glitch effect to card
            card.style.filter = 'contrast(1.5) brightness(0.7) blur(1px)';
            setTimeout(() => {
                card.style.filter = '';
            }, 300);
        }, index * 150);
    });
});

// Create breaking particle effect
function createBreakParticle(x = Math.random() * window.innerWidth, y = Math.random() * window.innerHeight) {
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
    
    particle.style.zIndex = '9999';
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
