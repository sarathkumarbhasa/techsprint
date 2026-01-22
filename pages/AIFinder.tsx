
import React, { useState } from 'react';
import { gemini } from '../services/geminiService';
import { getAllUsers } from '../services/firestoreService';
import { User } from '../types';

interface MatchResult {
  userId: string;
  matchPercentage: number;
  friendlyIntro: string;
}

const AIFinder: React.FC = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<MatchResult[]>([]);
  const [pool, setPool] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    setResults([]);

    try {
      // Get live user pool
      const users = await getAllUsers();
      setPool(users);
      
      const matches = await gemini.findCollaborators(query, users);
      setResults(matches || []);
      
      if (matches?.length === 0) {
        setError("No exact matches found. Try broadening your search terms.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">AI Collaborator Finder</h1>
        <p className="text-slate-500">Describe what you're looking for, and Gemini will scan the live student database for the perfect fit.</p>
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-md border border-slate-100">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="e.g., I need a Python developer for a sustainability app..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-700 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : '✨ Find Matches'}
          </button>
        </div>
      </div>

      {loading && (
        <div className="flex flex-col items-center py-12">
          <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mb-4"></div>
          <p className="text-slate-500 font-medium animate-pulse-slow">Gemini AI is analyzing skillsets across the global campus network...</p>
        </div>
      )}

      {error && !loading && (
        <div className="bg-orange-50 border border-orange-200 p-6 rounded-3xl text-orange-700 text-center">
          <p className="font-medium">{error}</p>
        </div>
      )}

      {results.length > 0 && !loading && (
        <div className="grid gap-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-bold">Top Recommendations</h2>
            <span className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full uppercase tracking-tighter">Live Database Analysis</span>
          </div>
          {results.map((result) => {
            const user = pool.find(u => u.id === result.userId);
            if (!user) return null;
            return (
              <div key={user.id} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <img src={user.profilePicture} className="w-24 h-24 rounded-2xl object-cover shadow-sm" />
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-slate-800">{user.name}</h3>
                      <p className="text-sm text-slate-500">{user.department} • Year {user.year}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-black text-blue-600 leading-none">{result.matchPercentage}%</div>
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Match</p>
                    </div>
                  </div>
                  <div className="relative mb-4">
                    <div className="absolute -left-2 top-0 bottom-0 w-1 bg-blue-500 rounded-full opacity-30"></div>
                    <p className="text-slate-700 pl-4 italic text-sm leading-relaxed">
                      "{result.friendlyIntro}"
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {user.skills.map(s => (
                      <span key={s} className="text-[10px] bg-slate-50 text-slate-600 px-3 py-1 rounded-full font-bold border border-slate-100">
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <button className="flex-1 bg-blue-600 text-white py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
                      Send Invite
                    </button>
                    <button className="flex-1 bg-slate-50 text-slate-600 py-2.5 rounded-xl font-bold hover:bg-slate-100 transition-all border border-slate-100">
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AIFinder;
