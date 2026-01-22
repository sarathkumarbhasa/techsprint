
import React from 'react';
import { Page, User } from '../types';
import { mockUsers, mockProjects } from '../data/mockData';

interface DashboardProps {
  setCurrentPage: (page: Page) => void;
  isGlobalMode: boolean;
  setIsGlobalMode: (val: boolean) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setCurrentPage, isGlobalMode, setIsGlobalMode }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white shadow-xl">
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Build the future, <br />
            one collaborator at a time.
          </h1>
          <p className="text-blue-100 text-lg mb-8">
            CollabSpace uses AI to match you with the perfect teammates across your campus and the world.
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => setCurrentPage(Page.AIFinder)}
              className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-lg"
            >
              🚀 Find Collaborators
            </button>
            <button 
              onClick={() => setCurrentPage(Page.Projects)}
              className="bg-blue-700/40 backdrop-blur-md border border-white/20 px-6 py-3 rounded-xl font-bold hover:bg-blue-700/60 transition-colors"
            >
              Explore Projects
            </button>
          </div>
        </div>
        
        {/* Decorative Circles */}
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-purple-400/20 rounded-full blur-2xl"></div>
      </section>

      {/* Global/Campus Toggle */}
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h3 className="font-bold text-slate-800">Campus Visibility</h3>
          <p className="text-sm text-slate-500">
            {isGlobalMode ? 'Global Network Active' : 'Restricted to Stanford University'}
          </p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input 
            type="checkbox" 
            checked={isGlobalMode} 
            onChange={() => setIsGlobalMode(!isGlobalMode)} 
            className="sr-only peer" 
          />
          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Build Team', icon: '👥', color: 'bg-orange-100 text-orange-600', page: Page.AITeamBuilder },
          { label: 'Career Map', icon: '🗺️', color: 'bg-green-100 text-green-600', page: Page.CareerNavigator },
          { label: 'AI Mentor', icon: '🤖', color: 'bg-purple-100 text-purple-600', page: Page.Chat },
          { label: 'Showcase', icon: '🏆', color: 'bg-pink-100 text-pink-600', page: Page.Showcase },
        ].map((action, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(action.page)}
            className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
          >
            <span className={`text-3xl mb-2 p-3 rounded-xl ${action.color}`}>{action.icon}</span>
            <span className="font-bold text-slate-700 text-sm">{action.label}</span>
          </button>
        ))}
      </div>

      {/* Content Columns */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-800">Trending Projects</h2>
            <button onClick={() => setCurrentPage(Page.Projects)} className="text-blue-600 text-sm font-medium">View all</button>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {mockProjects.map(project => (
              <div key={project.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden group">
                <div className="h-32 bg-slate-200 overflow-hidden">
                  <img src={project.imageUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold">{project.name}</h3>
                    <span className="text-xs px-2 py-1 bg-green-50 text-green-600 rounded-full font-bold">
                      {project.healthScore}% Healthy
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-2 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {project.techStack.map(s => (
                      <span key={s} className="text-[10px] bg-slate-100 px-2 py-0.5 rounded-md">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold text-slate-800">Campus Leaderboard</h2>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 space-y-4">
            {mockUsers.sort((a,b) => b.reputation.points - a.reputation.points).map((user, i) => (
              <div key={user.id} className="flex items-center gap-3">
                <span className="font-bold text-slate-300 w-4">{i + 1}</span>
                <img src={user.profilePicture} className="w-10 h-10 rounded-full" />
                <div className="flex-1">
                  <p className="text-sm font-bold">{user.name}</p>
                  <p className="text-xs text-slate-400">{user.department}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-blue-600">{user.reputation.points}</p>
                  <p className="text-[10px] text-slate-400 uppercase tracking-tighter">points</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
