
import React, { useState } from 'react';
import { Page, User } from '../types';
import { logout } from '../services/firebaseService';

interface NavbarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  user: User;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, setCurrentPage, user }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const navItems = [
    { id: Page.Dashboard, label: 'Home', icon: '🏠' },
    { id: Page.Projects, label: 'Projects', icon: '🚀' },
    { id: Page.AIFinder, label: 'Find', icon: '🔍' },
    { id: Page.AITeamBuilder, label: 'Team', icon: '👥' },
    { id: Page.Chat, label: 'Chat', icon: '💬' },
  ];

  const handleLogout = async () => {
    if (confirm("Are you sure you want to log out?")) {
      await logout();
    }
  };

  return (
    <>
      {/* Top Navbar for Desktop */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 px-4 md:px-8 py-3 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => setCurrentPage(Page.Dashboard)}
        >
          <div className="w-8 h-8 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
            C
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            CollabSpace
          </span>
        </div>

        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`text-sm font-medium transition-colors ${
                currentPage === item.id ? 'text-blue-600' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="relative">
          <div 
            className="flex items-center gap-3 cursor-pointer p-1 hover:bg-slate-100 rounded-full transition-colors"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <div className="hidden md:block text-right">
              <p className="text-sm font-semibold truncate max-w-[120px]">{user.name}</p>
              <p className="text-xs text-slate-500">{user.reputation.points} pts</p>
            </div>
            <img 
              src={user.profilePicture} 
              alt={user.name} 
              className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
            />
          </div>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-100 rounded-2xl shadow-xl py-2 z-[60] animate-in slide-in-from-top-2 duration-200">
              <button 
                onClick={() => { setCurrentPage(Page.Profile); setShowDropdown(false); }}
                className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 font-medium"
              >
                My Profile
              </button>
              <button 
                onClick={() => { setCurrentPage(Page.Admin); setShowDropdown(false); }}
                className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 font-medium"
              >
                Campus Admin
              </button>
              <hr className="my-2 border-slate-50" />
              <button 
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-bold"
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around py-2 z-50">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentPage(item.id)}
            className={`flex flex-col items-center gap-1 p-2 ${
              currentPage === item.id ? 'text-blue-600' : 'text-slate-400'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Backdrop for dropdown */}
      {showDropdown && (
        <div 
          className="fixed inset-0 z-40 bg-transparent"
          onClick={() => setShowDropdown(false)}
        ></div>
      )}
    </>
  );
};

export default Navbar;
