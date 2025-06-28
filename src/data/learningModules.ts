import { LearningModule } from '../types';
import { oopConcepts } from './oopConcepts';

export const learningModules: LearningModule[] = [
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
    concepts: [] // Will be populated later
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
  },
  {
    id: 'system-design-basics',
    title: 'System Design Basics',
    slug: 'system-design-basics',
    description: 'Learn low-level system design concepts for machine coding interviews',
    icon: '🏛️',
    type: 'concepts',
    difficulty: 'advanced',
    estimatedTime: '6+ hours',
    concepts: [] // Will be populated later
  }
]; 