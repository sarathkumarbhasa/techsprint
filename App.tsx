
import React, { useState, useEffect } from 'react';
import { Page, User as AppUser } from './types';
import { mockUsers } from './data/mockData';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import ProjectsPage from './pages/ProjectsPage';
import AIFinder from './pages/AIFinder';
import AITeamBuilder from './pages/AITeamBuilder';
import CareerNavigator from './pages/CareerNavigator';
import Chat from './pages/Chat';
import Profile from './pages/Profile';
import Showcase from './pages/Showcase';
import Admin from './pages/Admin';
import Login from './pages/Login';
import { auth, onAuthStateChanged } from './services/firebaseService';
import { getUser, upsertUser } from './services/firestoreService';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Dashboard);
  const [appUser, setAppUser] = useState<AppUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [isGlobalMode, setIsGlobalMode] = useState(false);

  useEffect(() => {
    // Check for dev mode bypass
    const devUserStr = localStorage.getItem('collabspace_dev_user');
    if (devUserStr) {
      const devUser = JSON.parse(devUserStr);
      // Simulate fetching profile for dev user
      const initDevUser = async () => {
        try {
          // We'll just use a mock profile based on mockUsers[0] for the Dev User
          const profile = {
            ...mockUsers[0],
            id: devUser.uid,
            name: devUser.displayName,
            profilePicture: devUser.photoURL,
          };
          setAppUser(profile);
        } catch (e) {
          console.error(e);
        }
        setAuthLoading(false);
      };
      initDevUser();
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        try {
          let profile = await getUser(fbUser.uid);

          if (!profile) {
            profile = {
              id: fbUser.uid,
              name: fbUser.displayName || 'New Explorer',
              department: 'Undeclared',
              year: 1,
              skills: ['Learning'],
              interests: [],
              bio: 'I just joined CollabSpace!',
              profilePicture: fbUser.photoURL || `https://picsum.photos/seed/${fbUser.uid}/200`,
              activityScore: 10,
              reputation: { points: 50, badges: ['New Member'] },
              college: 'Campus Network',
              skillGenome: mockUsers[0].skillGenome
            };
            await upsertUser(profile);
          }
          setAppUser(profile);
        } catch (error) {
          console.error("Error fetching/creating profile:", error);
        }
      } else {
        setAppUser(null);
      }
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="text-slate-400 font-medium animate-pulse">Initializing Secure Session...</p>
        </div>
      </div>
    );
  }

  if (!appUser) {
    return <Login />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case Page.Dashboard:
        return <Dashboard setCurrentPage={setCurrentPage} isGlobalMode={isGlobalMode} setIsGlobalMode={setIsGlobalMode} />;
      case Page.Projects:
        return <ProjectsPage />;
      case Page.AIFinder:
        return <AIFinder />;
      case Page.AITeamBuilder:
        return <AITeamBuilder />;
      case Page.CareerNavigator:
        return <CareerNavigator user={appUser} />;
      case Page.Chat:
        return <Chat />;
      case Page.Profile:
        return <Profile user={appUser} />;
      case Page.Showcase:
        return <Showcase />;
      case Page.Admin:
        return <Admin />;
      default:
        return <Dashboard setCurrentPage={setCurrentPage} isGlobalMode={isGlobalMode} setIsGlobalMode={setIsGlobalMode} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        user={appUser}
      />
      <main className="flex-1 container mx-auto px-4 py-6 pb-24 md:pb-6">
        {renderPage()}
      </main>
    </div>
  );
};

export default App;
