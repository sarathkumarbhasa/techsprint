
import {
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  query,
  orderBy,
  serverTimestamp,
  arrayUnion,
  increment
} from "firebase/firestore";
import { db } from "./firebaseService";
import { User as AppUser, Project, ChatMessage } from "../types";
import { mockUsers, mockProjects } from "../data/mockData";

// Helper to check if we are in "Mock/Demo Mode" (either forced or fallback)
const isDemoMode = () => localStorage.getItem('collabspace_demo_mode') === 'true';

export const upsertUser = async (user: AppUser) => {
  try {
    if (isDemoMode()) throw new Error("Demo Mode");
    const userRef = doc(db, "users", user.id);
    await setDoc(userRef, {
      ...user,
      updatedAt: serverTimestamp()
    }, { merge: true });
  } catch (err) {
    console.warn("Firestore upsertUser failed (using mock):", err);
    // In demo mode, we just log it. Real persistence requires backend.
  }
};

export const getUser = async (userId: string): Promise<AppUser | null> => {
  try {
    if (isDemoMode()) throw new Error("Demo Mode");
    const userRef = doc(db, "users", userId);
    const snap = await getDoc(userRef);
    return snap.exists() ? (snap.data() as AppUser) : null;
  } catch (err) {
    console.warn(`Firestore getUser failed for ${userId} (using mock):`, err);
    return mockUsers.find(u => u.id === userId) || mockUsers[0];
  }
};

export const getAllUsers = async (): Promise<AppUser[]> => {
  try {
    if (isDemoMode()) throw new Error("Demo Mode");
    const usersRef = collection(db, "users");
    const snap = await getDocs(usersRef);
    return snap.docs.map(doc => ({ ...doc.data() } as AppUser));
  } catch (err) {
    console.warn("Firestore getAllUsers failed (using mock):", err);
    return mockUsers;
  }
};

export const createProject = async (project: Omit<Project, 'id'>) => {
  try {
    if (isDemoMode()) throw new Error("Demo Mode");
    const projectsRef = collection(db, "projects");
    const docRef = await addDoc(projectsRef, {
      ...project,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (err) {
    console.warn("Firestore createProject failed (using mock):", err);
    return `mock_proj_${Date.now()}`;
  }
};

export const getAllProjects = async (): Promise<Project[]> => {
  try {
    if (isDemoMode()) throw new Error("Demo Mode");
    const projectsRef = collection(db, "projects");
    const q = query(projectsRef, orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    return snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
  } catch (err) {
    console.warn("Firestore getAllProjects failed (using mock):", err);
    return mockProjects;
  }
};

export const joinProject = async (projectId: string, userId: string) => {
  try {
    if (isDemoMode()) throw new Error("Demo Mode");
    const projectRef = doc(db, "projects", projectId);
    await updateDoc(projectRef, {
      members: arrayUnion(userId)
    });
  } catch (err) {
    console.warn("Firestore joinProject failed (using mock):", err);
  }
};

export const saveChatMessage = async (roomId: string, message: Omit<ChatMessage, 'id' | 'timestamp'>) => {
  try {
    if (isDemoMode()) throw new Error("Demo Mode");
    const messagesRef = collection(db, "chatRooms", roomId, "messages");
    await addDoc(messagesRef, {
      ...message,
      timestamp: serverTimestamp()
    });
  } catch (err) {
    console.warn("Firestore saveChatMessage failed (using mock):", err);
  }
};

export const awardPoints = async (userId: string, points: number, badge?: string) => {
  try {
    if (isDemoMode()) throw new Error("Demo Mode");
    const userRef = doc(db, "users", userId);
    const updateData: any = {
      "reputation.points": increment(points),
      activityScore: increment(2)
    };
    if (badge) {
      updateData["reputation.badges"] = arrayUnion(badge);
    }
    await updateDoc(userRef, updateData);
  } catch (err) {
    console.warn("Firestore awardPoints failed (using mock):", err);
  }
};
