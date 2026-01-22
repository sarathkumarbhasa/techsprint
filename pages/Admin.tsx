
import React from 'react';

const Admin: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <h1 className="text-3xl font-black">Campus Admin Control</h1>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <h3 className="text-slate-400 text-xs font-bold uppercase mb-1">Total Users</h3>
          <p className="text-4xl font-black">12,402</p>
          <p className="text-green-500 text-xs font-bold mt-2">+12% this week</p>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <h3 className="text-slate-400 text-xs font-bold uppercase mb-1">Active Projects</h3>
          <p className="text-4xl font-black">482</p>
          <p className="text-blue-500 text-xs font-bold mt-2">84 pending approval</p>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <h3 className="text-slate-400 text-xs font-bold uppercase mb-1">AI Invocations</h3>
          <p className="text-4xl font-black">89.2k</p>
          <p className="text-purple-500 text-xs font-bold mt-2">99.8% success rate</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold">Recent Flagged Activity</h3>
          <button className="text-xs text-blue-600 font-bold">Clear All</button>
        </div>
        <div className="divide-y divide-slate-50">
          {[1,2,3,4].map(i => (
            <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-200"></div>
                <div>
                  <p className="text-sm font-bold">User #{1000 + i} flagged</p>
                  <p className="text-[10px] text-slate-400">Reason: Potential spam in Project ID #892</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-red-50 text-red-600 rounded-lg text-xs font-bold">Review</button>
                <button className="px-3 py-1 bg-slate-100 text-slate-400 rounded-lg text-xs font-bold">Dismiss</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;
