# 🎓 Machine Coding Learning Platform

An interactive web application for mastering machine coding interviews through comprehensive modules on Object-Oriented Programming, SOLID principles, design patterns, and practice problems.

## 🌟 Live Demo

🚀 **[Visit Live Platform](https://dharmveerjakhar.github.io/interactive-learning)**

## ✨ Features

### 📚 **Learning Modules**
- **🏗️ OOP Fundamentals** - Classes, Objects, Encapsulation, Inheritance, Polymorphism
- **⚡ SOLID Principles** - Single Responsibility, Open-Closed, Liskov Substitution, Interface Segregation, Dependency Inversion *(Coming Soon)*
- **🎨 Design Patterns** - Singleton, Factory, Observer, Strategy patterns *(Coming Soon)*
- **💻 Practice Problems** - Real interview questions and challenges *(Coming Soon)*
- **🏛️ System Design Basics** - Low-level design concepts *(Coming Soon)*

### 🎯 **Interactive Learning Experience**
- **Progressive Content**: Step-by-step learning with visual explanations
- **Code Examples**: Syntax-highlighted, copyable code snippets
- **Interactive Quizzes**: Immediate feedback with detailed explanations
- **Progress Tracking**: Visual progress bars and completion tracking
- **Responsive Design**: Works seamlessly on desktop and mobile

### 🏷️ **Module Organization**
- **Difficulty Levels**: Beginner, Intermediate, Advanced
- **Type Categories**: Concepts, Principles, Practice, Design Patterns
- **Time Estimates**: Know how long each module takes
- **Topic Counts**: See what's included in each module

## 🚀 Quick Start

### For Users
1. Visit the [live platform](https://dharmveerjakhar.github.io/interactive-learning)
2. Start with **OOP Fundamentals** module
3. Progress through concepts at your own pace
4. Take quizzes to test your understanding

### For Developers

```bash
# Clone the repository
git clone https://github.com/dharmveerjakhar/interactive-learning.git
cd interactive-learning/oop-learning-platform

# Install dependencies
npm install

# Start development server
npm start

# Open http://localhost:3000
```

## 📦 Deploy to GitHub Pages

This platform is designed for **free hosting on GitHub Pages**. Follow these steps:

### 1. Update Configuration
Edit `package.json` and update the homepage:
```json
"homepage": "https://your-github-username.github.io/your-repository-name"
```

### 2. Deploy
```bash
# Build and deploy to GitHub Pages
npm run deploy
```

### 3. Enable GitHub Pages
- Go to repository **Settings** → **Pages**
- Select **gh-pages** branch as source
- Your site will be live at `https://your-username.github.io/repository-name`

📖 **[Complete Deployment Guide](./DEPLOYMENT.md)**

## 🛠️ Technology Stack

- **Frontend**: React 19 with TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router (HashRouter for static hosting)
- **Animations**: Framer Motion
- **Code Highlighting**: Prism.js
- **Icons**: Lucide React
- **Deployment**: GitHub Pages

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── CodeExample.tsx  # Code snippet display
│   ├── Layout.tsx       # Main layout
│   └── QuizSection.tsx  # Interactive quiz
├── data/               # Content and module data
│   ├── learningModules.ts  # Module configuration
│   └── oopConcepts.ts     # OOP content
├── pages/              # Page components
│   ├── HomePage.tsx       # Module flashcards
│   ├── ModulePage.tsx     # Module overview
│   └── ConceptPage.tsx    # Individual concept learning
├── types/              # TypeScript interfaces
├── utils/              # Helper functions
└── App.tsx             # Main app with routing
```

## 🎨 Current Content

### 🏗️ **OOP Fundamentals** (Complete)
1. **Classes & Objects** - Understanding blueprints and instances
2. **Encapsulation** - Data hiding and controlled access
3. **Inheritance** - Code reusability and hierarchies  
4. **Polymorphism** - Multiple forms and behaviors

Each concept includes:
- 📖 **Theory** with real-world analogies
- 💻 **Code Examples** with syntax highlighting
- 🧪 **Interactive Quizzes** with explanations
- 📊 **Progress Tracking**

## 🔮 Roadmap

- [ ] **SOLID Principles** module with 5 principles
- [ ] **Design Patterns** module with common patterns
- [ ] **Practice Problems** with real interview questions
- [ ] **System Design Basics** for architecture concepts
- [ ] **Video explanations** and interactive diagrams
- [ ] **Community features** and discussion forums
- [ ] **Certification system** and achievements

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Content**: Add new concepts, improve explanations
2. **Features**: Enhance UI/UX, add interactivity
3. **Bug Fixes**: Report and fix issues
4. **Translations**: Make it accessible globally

```bash
# Fork the repository
# Create a feature branch
git checkout -b feature/new-concept

# Make your changes
# Commit and push
git commit -m "Add: New SOLID principle explanation"
git push origin feature/new-concept

# Create a Pull Request
```

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Inspired by the need for better machine coding interview preparation
- Built with modern web technologies for optimal learning experience
- Designed for free, accessible education worldwide

---

**Star ⭐ this repository if you find it helpful for your machine coding interview preparation!**

*Made with ❤️ for the developer community*
