
export interface SkillGenome {
  primaryStrengths: string[];
  secondaryStrengths: string[];
  collaborationStyle: string;
  learningVelocity: 'Fast' | 'Steady' | 'Adaptive';
  idealRoles: string[];
}

export interface Reputation {
  points: number;
  badges: string[];
}

export interface User {
  id: string;
  name: string;
  department: string;
  year: number;
  skills: string[];
  interests: string[];
  bio: string;
  portfolioLink?: string;
  profilePicture: string;
  activityScore: number;
  skillGenome: SkillGenome;
  reputation: Reputation;
  college: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  createdBy: string;
  members: string[]; // User IDs
  requiredRoles: string[];
  techStack: string[];
  status: 'Active' | 'Completed' | 'Ideation';
  imageUrl: string;
  healthScore: number;
  aiPitch: string;
}

export enum Page {
  Dashboard = 'dashboard',
  Projects = 'projects',
  AIFinder = 'ai-finder',
  AITeamBuilder = 'ai-team-builder',
  CareerNavigator = 'career-navigator',
  Chat = 'chat',
  Profile = 'profile',
  Showcase = 'showcase',
  Admin = 'admin'
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'mentor' | string;
  text: string;
  timestamp: Date;
}
