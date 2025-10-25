# $404 - Utility Not Found

The only coin that failed on purpose.

## Overview

An intentionally broken, mysterious, and cryptic meme coin website that looks like a malfunctioning blockchain terminal. Everything appears to be failing to load - but it's actually working perfectly as intended. **Built exactly to the original specifications with static feel and no scrolling effects.**

## Features

### 🎭 Intentionally Broken Design
- **Dark Terminal Aesthetic**: Black background with monospace fonts (IBM Plex Mono, Space Mono)
- **Matrix Rain Background**: Animated falling characters with $404 and ERROR text
- **Glitch Effects**: RGB split, chromatic aberration, and visual corruption
- **Static Feel**: No scrolling effects as per original specifications
- **Broken Elements**: Cards, images, and text that appear corrupted or missing

### 🎬 Interactive Elements

#### Hero Section
- Animated logo with glitch effect
- **Buy $404** button (shows "wallet not found" error)
- **Retry** button (confirms "still nothing found")

#### Terminal Animation
- Looping terminal output showing connection attempts
- Fake loading messages that always fail
- Color-coded errors in red

#### Broken Utility Section
- **Broken Stats**: utility: 0%, purpose: corrupted, status: undefined
- **Access Whitepaper**: Shows "0kb file not found" error popup

#### Tokenomics
- **Pie Chart**: 50% Lost Forever, 25% Error Handling, 15% Developer Tears, 10% Undefined
- **Legend Items**: Color-coded breakdown with hover effects

#### Team Section
- **Three Team Members**: All with [REDACTED] names and missing images
- **Consistent Errors**: Role: Unknown, Bio: Failed to load for all members

#### Footer
- **Social Links**: twitter | telegram | dex | docs with error popups
- **End Transmission**: Classic terminal closing message

### 🎮 Easter Eggs

1. **Type "help"** anywhere on the page → "help command not recognized"
2. **Konami Code** (↑↑↓↓←→←→BA) → Secret message about still no utility
3. **Console Messages** → Random error messages appear in browser console
4. **Random Glitches** → Periodic visual glitches every few seconds

## How to Use

### Option 1: Direct File Opening
Simply double-click `index.html` to open in your default browser.

### Option 2: Local Server (Recommended)
If you have Python installed:
```bash
python -m http.server 8000
```

If you have Node.js installed:
```bash
npx http-server -p 8000
```

Then visit: `http://localhost:8000`

## File Structure

```
404-Error/
├── index.html      # Main HTML structure
├── styles.css      # Dark terminal styling with glitch effects
├── script.js       # Interactive animations and broken functionality
└── README.md       # This file
```

## Technical Details

- **Pure HTML/CSS/JS** - No frameworks required
- **Responsive Design** - Works on mobile and desktop
- **Lightweight** - Fast loading with minimal dependencies
- **Google Fonts** - IBM Plex Mono & Space Mono for authentic terminal feel

## Color Palette

- Background: `#000000` (Pure Black)
- Secondary BG: `#0B0B0B` (Deep Charcoal)
- Primary Text: `#e0e0e0` (Off-white)
- Accent Green: `#00ff88` (Neon Green)
- Accent Violet: `#8800ff` (Purple)
- Error Red: `#ff0055` (Bright Red)
- Warning Yellow: `#ffaa00` (Amber)

## Animations

- **Matrix Rain**: Continuous falling characters background
- **Cursor Blink**: 1s infinite
- **Logo Flicker**: 3s infinite with neon glow
- **Glitch Effect**: 2.5s infinite with RGB split
- **Terminal Typing**: Sequential with delays
- **Pie Chart Rotation**: 20s infinite with color glitch
- **Scanning Lines**: Moving CRT-style scan effect
- **Card Glitch**: 5-7s intervals with position shift
- **Button Pulse**: Neon green glow animation
- **Text Flicker**: Section titles with red glow
- **Legend Sweep**: Light sweep across tokenomics legend

## Browser Compatibility

- ✅ Chrome/Edge (Recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Opera

## Customization

### Change Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --bg-black: #000000;
    --accent-green: #00ff88;
    /* ... */
}
```

### Modify Terminal Messages
Edit the `terminalMessages` array in `script.js`:
```javascript
const terminalMessages = [
    { text: '> Your message here...', delay: 1000, error: false },
    // ...
];
```

### Add More Glitches
Adjust glitch frequency in `script.js`:
```javascript
setInterval(randomGlitch, 5000); // Change 5000 to desired milliseconds
```

## Credits

Design Concept: Intentionally broken meme coin aesthetic  
Typography: IBM Plex Mono, Space Mono (Google Fonts)  
Theme: Dark terminal / Hacker / Underground

## Tagline

**$404 - Utility Not Found. The only coin that failed on purpose.**

---

> end of transmission_
