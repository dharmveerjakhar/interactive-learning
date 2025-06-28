import { LearningModule, LearningCategory } from '../types';
import { oopConcepts } from './oopConcepts';
import { solidConcepts } from './solidConcepts';

// Individual modules that will be under Machine Coding category
export const machineCodingModules: LearningModule[] = [
  {
    id: 'oop-fundamentals',
    title: 'OOP Fundamentals',
    slug: 'oop-fundamentals',
    description: 'Master the four core pillars of Object-Oriented Programming with interactive examples and quizzes',
    icon: '🏗️',
    type: 'concepts',
    difficulty: 'beginner',
    estimatedTime: '2-3 hours',
    concepts: oopConcepts
  },
  {
    id: 'solid-principles',
    title: 'SOLID Principles',
    slug: 'solid-principles', 
    description: 'Learn the 5 SOLID principles for writing maintainable and extensible object-oriented code',
    icon: '⚡',
    type: 'principles',
    difficulty: 'intermediate',
    estimatedTime: '3-4 hours',
    concepts: solidConcepts
  },
  {
    id: 'design-patterns',
    title: 'Design Patterns',
    slug: 'design-patterns',
    description: 'Explore common design patterns like Singleton, Factory, Observer, and Strategy patterns',
    icon: '🎨',
    type: 'design-patterns',
    difficulty: 'intermediate', 
    estimatedTime: '4-5 hours',
    concepts: [] // Will be populated later
  },
  {
    id: 'practice-problems',
    title: 'Practice Problems',
    slug: 'practice-problems',
    description: 'Apply your knowledge with hands-on machine coding challenges and real interview questions',
    icon: '💻',
    type: 'practice',
    difficulty: 'intermediate',
    estimatedTime: '5+ hours',
    concepts: [] // Will be populated later
  }
];

// Main categories for the homepage
export const learningCategories: LearningCategory[] = [
  {
    id: 'machine-coding',
    title: 'Machine Coding',
    slug: 'machine-coding',
    description: 'Master machine coding interviews with OOP fundamentals, SOLID principles, design patterns, and practice problems',
    icon: '💻',
    type: 'category',
    difficulty: 'beginner',
    estimatedTime: '15+ hours',
    modules: machineCodingModules
  }
];

// For backward compatibility, export existing modules array
export const learningModules = machineCodingModules; 