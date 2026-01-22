
import React, { useState } from 'react';
import { gemini } from '../services/geminiService';
import { mockUsers } from '../data/mockData';

const AITeamBuilder: React.FC = () => {
  const [desc, setDesc] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleBuild = async () => {
    if (!desc.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await gemini.buildTeam(desc, mockUsers);
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while building your team.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">AI Squad Builder</h1>
          <p className="text-orange-50/80">Input your goals, and Gemini will perform deep reasoning to select the most synergistic team.</p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-2xl"></div>
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
        <textarea
          placeholder="e.g., Build me a 4-member team for an AI healthcare hackathon focused on accessibility. I need a mix of technical and clinical expertise..."
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          rows={3}
          className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all mb-4"
        />
        <button
          onClick={handleBuild}
          disabled={loading}
          className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-black transition-all disabled:opacity-50 flex items-center justify-center gap-3"
        >
          {loading ? (
            <>
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              Performing Deep Synergy Analysis...
            </>
          ) : 'Construct Dream Team'}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 p-6 rounded-3xl text-red-700 text-center">
          <p className="font-bold">⚠️ Oops!</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {result && (
        <div className="space-y-6 animate-in slide-in-from-top-4 duration-700">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-md">
              <h2 className="text-2xl font-bold mb-1">Squad Synergy Profile</h2>
              <p className="text-slate-500 text-sm leading-relaxed">
                Gemini analyzed skills, department backgrounds, and project roles to determine this team's optimal performance rating.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {result.roles.map((r: string) => (
                  <span key={r} className="text-[10px] font-bold bg-slate-100 text-slate-500 px-3 py-1 rounded-full uppercase">
                    {r}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative w-36 h-36 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="72" cy="72" r="64" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-slate-100" />
                <circle cx="72" cy="72" r="64" stroke="currentColor" strokeWidth="10" fill="transparent" strokeDasharray={402} strokeDashoffset={402 * (1 - result.predictedSuccessScore / 100)} className="text-orange-500 transition-all duration-1000 ease-out" />
              </svg>
              <div className="absolute text-center">
                <span className="text-4xl font-black text-slate-800">{result.predictedSuccessScore}%</span>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Success Score</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {result.team.map((member: any, i: number) => {
              const user = mockUsers.find(u => u.id === member.userId);
              return (
                <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all group flex flex-col">
                  <div className="mb-4 relative">
                    <img src={user?.profilePicture} className="w-20 h-20 rounded-2xl mx-auto mb-3 shadow-md group-hover:scale-105 transition-transform" />
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-orange-600 text-white text-[9px] font-black px-3 py-1 rounded-full shadow-lg uppercase whitespace-nowrap">
                      {member.role}
                    </div>
                  </div>
                  <h3 className="font-bold text-center text-slate-800 mb-4">{user?.name}</h3>
                  <div className="bg-slate-50 p-4 rounded-2xl flex-1 border border-slate-100">
                    <p className="text-xs text-slate-600 text-center leading-relaxed italic">
                      "{member.reason}"
                    </p>
                  </div>
                  <button className="mt-4 w-full py-2 text-xs font-bold text-slate-400 hover:text-slate-800 transition-colors">
                    View Portfolio
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default AITeamBuilder;
