# 🚀 Deploy to GitHub Pages

This guide will help you deploy your Machine Coding Learning Platform to GitHub Pages for free hosting.

## 📋 Prerequisites

1. A GitHub account
2. Git installed on your computer
3. Node.js and npm installed

## 🛠️ Setup Steps

### 1. Create GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository
2. Name it `interactive-learning` (or your preferred name)
3. Make it **public** (required for free GitHub Pages)
4. Don't initialize with README since you already have code

### 2. Update Homepage URL

Edit `package.json` and update the homepage field:

```json
"homepage": "https://your-github-username.github.io/your-repository-name"
```

**Example:**
```json
"homepage": "https://dharmveerjakhar.github.io/interactive-learning"
```

### 3. Initialize Git and Push Code

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit files
git commit -m "Initial commit: Machine Coding Learning Platform"

# Add GitHub repository as remote
git remote add origin https://github.com/your-username/your-repository-name.git

# Push to GitHub
git push -u origin main
```

### 4. Deploy to GitHub Pages

```bash
# Install dependencies (if not already done)
npm install

# Deploy to GitHub Pages
npm run deploy
```

This command will:
- Build the production version (`npm run build`)
- Create a `gh-pages` branch
- Deploy the built files to GitHub Pages

### 5. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select **Deploy from a branch**
5. Select **gh-pages** branch and **/ (root)** folder
6. Click **Save**

### 6. Access Your Site

Your site will be available at:
```
https://your-github-username.github.io/your-repository-name
```

## 🔄 Updating Your Site

To update your deployed site:

```bash
# Make your changes to the code

# Commit changes
git add .
git commit -m "Update: describe your changes"
git push origin main

# Redeploy to GitHub Pages
npm run deploy
```

## 🎯 Example URLs

If your GitHub username is `dharmveerjakhar` and repository is `interactive-learning`:

- **Repository**: https://github.com/dharmveerjakhar/interactive-learning
- **Live Site**: https://dharmveerjakhar.github.io/interactive-learning

## 🔧 Troubleshooting

### Site Not Loading
- Wait 5-10 minutes after first deployment
- Check that GitHub Pages is enabled in repository settings
- Ensure `gh-pages` branch exists

### Routing Issues
- The app uses HashRouter for static hosting compatibility
- URLs will have `#` in them (e.g., `#/module/oop-fundamentals`)
- This is normal for GitHub Pages deployment

### Build Errors
- Run `npm run build` locally to test
- Check console for any errors
- Ensure all dependencies are installed

## 🆓 Free Hosting Benefits

✅ **Completely Free** hosting from GitHub  
✅ **Automatic HTTPS** certificate  
✅ **Custom domain** support (optional)  
✅ **Global CDN** for fast loading  
✅ **Version control** integrated with deployment  

Your Machine Coding Learning Platform is now live and accessible to anyone worldwide! 🌍 