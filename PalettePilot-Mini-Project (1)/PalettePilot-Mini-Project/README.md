# PalettePilot — Creative Workspace

A responsive React mini project for managing design projects, tracking tasks, and exploring color palettes. Built with Vite, React, Lucide icons, and custom CSS.

## Features
- Dashboard with project and task summaries
- Create new projects with a modal form
- Search projects and filter by status
- Check off tasks and track completion
- Moodboard with four color palettes and copyable hex codes
- Local storage persistence (your projects and task status remain after refresh on the same browser)
- Responsive desktop, tablet, and mobile layout

## Requirements
- Node.js 18+ (recommended: current LTS)
- npm

## Run locally
1. Extract the ZIP.
2. Open a terminal in the `PalettePilot-Mini-Project` folder.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open the local URL printed by Vite (usually `http://localhost:5173`).

## Production build
```bash
npm run build
npm run preview
```
Vite creates the production site in the `dist` folder.

## Deploy to Vercel
1. Create a public GitHub repository and upload these project files (do not upload `node_modules`).
2. Sign in to Vercel and import the repository.
3. Framework preset: **Vite**.
4. Build command: `npm run build`.
5. Output directory: `dist`.
6. Click Deploy, then add the generated live URL to your assignment submission.

## Deploy to Netlify
1. Import the public GitHub repository in Netlify.
2. Build command: `npm run build`.
3. Publish directory: `dist`.
4. Deploy the site and copy its live URL.

## Push to GitHub from a terminal
Create an empty public repository on GitHub first, then run these commands from this project folder:
```bash
git init
git add .
git commit -m "Build PalettePilot creative workspace"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/PalettePilot-Mini-Project.git
git push -u origin main
```
Replace `YOUR-USERNAME` with your GitHub username and use the exact repository URL GitHub gives you.

## Assignment hand-in checklist
- [ ] Project name and description included
- [ ] App runs locally with `npm install` and `npm run dev`
- [ ] Production build succeeds with `npm run build`
- [ ] Public GitHub repository URL added
- [ ] Deployed Vercel or Netlify URL added
- [ ] Test the deployed version on mobile and desktop

## Suggested capstone upgrade
Add user authentication, editable project details, project-specific tasks, due-date reminders, and a backend database (for example, Supabase or Firebase).

## Notes
- This is a frontend-only mini project. The included demo data is stored in the browser's local storage; it is not synced between devices or users.
- Google Fonts are loaded from Google Fonts when internet access is available.
