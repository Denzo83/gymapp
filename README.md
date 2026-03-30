# 🌸 Gym Planner

A mobile-first gym planner. Data saves to your phone's browser.

## Features
- 🌸 **Today** — check off exercises as you go, log the session
- 📅 **Plan** — drag & drop weekly schedule, adjust sets/reps/weight per exercise
- 🏋️ **Exercises** — 77 pre-loaded, add/edit your own
- 📖 **History** — calendar + list of every logged session
- 💾 Saves to phone localStorage — no login, no server needed

---

## Deploy to GitHub Pages (free)

### 1. Update homepage in package.json
Change this line to match your GitHub username and repo name:
```json
"homepage": "https://YOUR-USERNAME.github.io/YOUR-REPO-NAME"
```

### 2. Push to GitHub
```bash
git init
git add .
git commit -m "initial commit"
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
git push -u origin main
```

### 3. Deploy
```bash
npm install
npm run deploy
```

This builds the app and pushes to the `gh-pages` branch automatically.

### 4. Enable GitHub Pages
- Go to your repo → Settings → Pages
- Set source to **gh-pages** branch
- Your app will be live at `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME`

---

## Run locally
```bash
npm install
npm start
```

---

## How data works
- Everything saves to the phone's **localStorage**
- Her phone = her data. Your phone = your data. Completely separate ✨
- If she clears her browser data, it'll reset (remind her not to do that!)
- For backup, you could export data later — let me know if you want that added
