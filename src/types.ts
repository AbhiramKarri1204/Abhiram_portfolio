export type SkillCategory = 'ai_ml' | 'languages' | 'engineering' | 'soft_skills';

export interface Skill {
  name: string;
  value: number;
}

export interface SkillGroup {
  id: SkillCategory;
  name: string;
  iconName: string; // lucide icon name
  description: string;
  skills: Skill[];
}

export interface Project {
  title: string;
  description: string;
  longDescription?: string;
  duration?: string;
  association?: string;
  bullets?: string[];
  keyFeatures?: { title: string; description: string }[];
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  status: 'completed' | 'ongoing' | 'upcoming';
  imageUrl?: string;
}

export interface Experience {
  role: string;
  company: string;
  duration: string;
  location: string;
  description: string[];
  tags: string[];
}

export interface Education {
  institution: string;
  degree: string;
  duration: string;
  grade?: string;
  description?: string;
}

export interface Credential {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  verificationCode: string;
  sha256: string;
  category: string;
}

export interface ApexFitExercise {
  name: string;
  sets: number;
  reps: string;
  rest: string;
  instructions: string;
}

export interface ApexFitDay {
  day: string;
  focus: string;
  exercises: ApexFitExercise[];
}

export interface ApexFitMeal {
  meal: string;
  description: string;
  calories: number;
  macros: {
    protein: number;
    carbs: number;
    fats: number;
  };
  ingredients: string[];
}

export interface ApexFitPlan {
  planName: string;
  caloriesTarget: number;
  macrosTarget: {
    protein: number;
    carbs: number;
    fats: number;
  };
  workoutSplit: ApexFitDay[];
  nutritionPlan: ApexFitMeal[];
  apexCoachingCues: string[];
}

export interface ApexFitStats {
  age: string;
  weight: string;
  height: string;
  gender: string;
  activityLevel: string;
  goal: string;
  fitnessLevel: string;
  diet: string;
  equipment: string;
  days: string;
  extraPrompts: string;
}

