
import { User, Project } from '../types';

export const mockUsers: User[] = [
  {
    id: 'u1',
    name: 'Alex Chen',
    department: 'Computer Science',
    year: 3,
    skills: ['React', 'TypeScript', 'Node.js', 'Python'],
    interests: ['AI', 'Sustainability', 'FinTech'],
    bio: 'Passionate full-stack dev focused on building ethical AI tools.',
    profilePicture: 'https://picsum.photos/seed/alex/200',
    activityScore: 85,
    college: 'Stanford University',
    reputation: { points: 1250, badges: ['Top Contributor', 'Fast Learner'] },
    skillGenome: {
      primaryStrengths: ['Problem Solving', 'Coding'],
      secondaryStrengths: ['UI Design'],
      collaborationStyle: 'Direct & Efficient',
      learningVelocity: 'Fast',
      idealRoles: ['Lead Dev', 'Architect']
    }
  },
  {
    id: 'u2',
    name: 'Sarah Miller',
    department: 'Business Administration',
    year: 4,
    skills: ['Marketing', 'Product Management', 'Figma'],
    interests: ['E-commerce', 'Social Impact'],
    bio: 'Building the next generation of social commerce apps.',
    profilePicture: 'https://picsum.photos/seed/sarah/200',
    activityScore: 92,
    college: 'Stanford University',
    reputation: { points: 2100, badges: ['Visionary', 'Networker'] },
    skillGenome: {
      primaryStrengths: ['Strategy', 'Communication'],
      secondaryStrengths: ['Data Analysis'],
      collaborationStyle: 'Collaborative & Empathetic',
      learningVelocity: 'Adaptive',
      idealRoles: ['Product Manager', 'UX Researcher']
    }
  },
  {
    id: 'u3',
    name: 'David Kumar',
    department: 'Electrical Engineering',
    year: 2,
    skills: ['Python', 'Arduino', 'C++', 'Machine Learning'],
    interests: ['Robotics', 'SpaceX'],
    bio: 'Hardware enthusiast looking to integrate AI into robotics.',
    profilePicture: 'https://picsum.photos/seed/david/200',
    activityScore: 78,
    college: 'Stanford University',
    reputation: { points: 850, badges: ['Tech Guru'] },
    skillGenome: {
      primaryStrengths: ['Hardware Design', 'Embedded Systems'],
      secondaryStrengths: ['PyTorch'],
      collaborationStyle: 'Detail Oriented',
      learningVelocity: 'Steady',
      idealRoles: ['Embedded Engineer', 'Researcher']
    }
  }
];

export const mockProjects: Project[] = [
  {
    id: 'p1',
    name: 'EcoTrack',
    description: 'A mobile app to track individual carbon footprints using real-time spending data.',
    createdBy: 'u2',
    members: ['u1', 'u2'],
    requiredRoles: ['Backend Dev', 'Data Analyst'],
    techStack: ['React Native', 'Node.js', 'PostgreSQL'],
    status: 'Active',
    imageUrl: 'https://picsum.photos/seed/eco/600/400',
    healthScore: 94,
    aiPitch: 'EcoTrack revolutionizes personal climate action by turning financial transparency into carbon accountability.'
  },
  {
    id: 'p2',
    name: 'MediAssist AI',
    description: 'AI-driven diagnosis assistant for rural medical camps.',
    createdBy: 'u1',
    members: ['u1', 'u3'],
    requiredRoles: ['UX Designer', 'Product Lead'],
    techStack: ['Python', 'TensorFlow', 'Flutter'],
    status: 'Ideation',
    imageUrl: 'https://picsum.photos/seed/medi/600/400',
    healthScore: 65,
    aiPitch: 'Bridging the healthcare gap with edge-computing AI that works without internet.'
  }
];
