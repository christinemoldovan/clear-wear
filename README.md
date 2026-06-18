# Clear Wear 🦷

A lightweight web app for tracking aligner (clear braces) wear time, tray schedule, and daily compliance — built as a single-page HTML app with optional Firebase sync.

## Features

- **Live wear tracker** — tap once when you take your aligner out, tap again when it's back in. A radial progress ring shows today's worn time against your daily goal.
- **Out-of-mouth budget** — calculates how much time you're allowed to be out per day to still hit your wear goal, and warns you when you're close to or over budget.
- **Weekly & calendar view** — a 7-day strip on the home screen, plus a full monthly calendar with color-coded days (goal met / under goal / no data). Tap any past day to correct logged time.
- **Tray schedule** — tracks which tray you're currently on, days remaining before the next switch, and a full list of upcoming tray dates.
- **Streak counter** — consecutive days of meeting your wear goal.
- **Cloud sync (optional)** — when Firebase is configured, data syncs across devices via email/password login. Without configuration, the app runs entirely offline using `localStorage`.
- **Data export** — download all tracked data as JSON at any time.

## Project structure

```
clear-wear/
├── index.html                   # Full application (HTML + CSS + JS)
├── firebase-config.js            # Real Firebase config (NOT committed to Git)
├── .gitignore
└── firebase.json                 # Firebase Hosting configuration
```

## Local setup

1. Clone this repository:
   ```bash
   git clone https://github.com/christinemoldovan/clear-wear.git
   cd clear-wear
   ```

2. Create config:
   ```bash
   firebase-config.js
   ```

3. Fill in `firebase-config.js` with real values from [Firebase Console](https://console.firebase.google.com) → Project Settings → Your apps:
   ```js
   var firebaseConfig = {
     apiKey: "...",
     authDomain: "...",
     databaseURL: "...",
     projectId: "...",
     storageBucket: "...",
     messagingSenderId: "...",
     appId: "..."
   };
   ```

   To run the app fully offline (no login, no sync), leave the values as `"PASTE..."` placeholders — the app automatically detects this and falls back to local-only mode using `localStorage`.

4. Open `index.html` directly in a browser to test locally.

## Deploy to Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
firebase deploy
```

The app will be available at `https://<project-id>.web.app`.

## How sync works

When a valid Firebase config is detected, the app requires email/password login (via Firebase Authentication) and stores all data under `users/<uid>/` in Realtime Database — settings, open/closed wear sessions, and per-day history. Each signed-in user only sees their own data; this is not a shared team database like the Capsula Timpului project.

If no real config is provided, the app skips the login screen entirely and stores everything locally in the browser via `localStorage`, scoped to that one device.

## Configuration

- **Daily wear goal**, **tray count**, **days per tray**, **current tray**, and **tray start date** are all editable from the in-app Settings tab — no code changes needed for day-to-day use.
- **Erase all data** and **Export my data (JSON)** are also available from Settings.
