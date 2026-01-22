
import React from 'react';
import { User } from '../types';

interface ProfileProps {
  user: User;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="bg-white rounded-3xl shadow-md border border-slate-100 overflow-hidden">
        <div className="h-48 bg-gradient-to-r from-blue-600 to-purple-600"></div>
        <div className="px-8 pb-8 -mt-16 relative">
          <img 
            src={user.profilePicture} 
            className="w-32 h-32 rounded-3xl border-4 border-white shadow-lg mb-4"
          />
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black text-slate-800">{user.name}</h1>
              <p className="text-slate-500 font-medium">{user.department} • {user.college}</p>
            </div>
            <div className="flex gap-2">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold text-sm shadow-lg shadow-blue-200">Edit Profile</button>
              <button className="bg-slate-100 text-slate-600 px-6 py-2 rounded-xl font-bold text-sm">Share</button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <h3 className="font-bold mb-4">Reputation</h3>
            <div className="flex items-center gap-4 mb-4">
              <div className="text-4xl font-black text-blue-600">{user.reputation.points}</div>
              <p className="text-xs text-slate-400 font-bold uppercase">Community Points</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {user.reputation.badges.map(b => (
                <span key={b} className="bg-orange-50 text-orange-600 text-[10px] font-bold px-3 py-1 rounded-full border border-orange-100">
                  🏆 {b}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <h3 className="font-bold mb-4">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {user.skills.map(s => (
                <span key={s} className="bg-slate-100 text-slate-600 text-xs font-bold px-3 py-1 rounded-lg">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <h3 className="font-bold mb-2">About</h3>
            <p className="text-slate-600 leading-relaxed italic">"{user.bio}"</p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <h3 className="font-bold mb-4">Project History</h3>
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-2xl flex items-center justify-between border border-slate-100">
                <div>
                  <h4 className="font-bold">EcoTrack</h4>
                  <p className="text-xs text-slate-500">Lead Fullstack Developer • 2024</p>
                </div>
                <span className="text-[10px] bg-green-100 text-green-600 px-2 py-1 rounded-full font-bold">COMPLETED</span>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl flex items-center justify-between border border-slate-100">
                <div>
                  <h4 className="font-bold">MediAssist AI</h4>
                  <p className="text-xs text-slate-500">ML Researcher • 2024</p>
                </div>
                <span className="text-[10px] bg-blue-100 text-blue-600 px-2 py-1 rounded-full font-bold">IN PROGRESS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
