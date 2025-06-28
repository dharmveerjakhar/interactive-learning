export interface CodeExample {
  id: string;
  title: string;
  code: string;
  language: string;
  explanation: string;
  highlightLines?: number[];
}

export interface Quiz {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface ConceptSection {
  id: string;
  title: string;
  content: string;
  visualType?: 'diagram' | 'animation' | 'interactive';
  codeExample?: CodeExample;
}

export interface OOPConcept {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
  sections: ConceptSection[];
  quiz: Quiz[];
  completed?: boolean;
  progress?: number;
}

export interface LearningPath {
  concepts: OOPConcept[];
  currentConcept: number;
  overallProgress: number;
}

export interface LearningModule {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
  type: 'concepts' | 'principles' | 'practice' | 'design-patterns';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  concepts: OOPConcept[];
  completed?: boolean;
  progress?: number;
} 