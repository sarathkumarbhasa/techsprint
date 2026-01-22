
import React, { useState, useEffect } from 'react';
import { User } from '../types';
import { gemini } from '../services/geminiService';

interface CareerNavigatorProps {
  user: User;
}

const CareerNavigator: React.FC<CareerNavigatorProps> = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchPath = async () => {
      setLoading(true);
      const res = await gemini.navigateCareer(user.skills);
      setData(res);
      setLoading(false);
    };
    fetchPath();
  }, [user.skills]);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">AI Career Navigator</h1>
        <p className="text-slate-500">Your personalized roadmap from student to industry leader.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Skill Genome */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 h-fit">
          <h2 className="font-bold mb-4 flex items-center gap-2">
            🧬 Skill Genome
          </h2>
          <div className="space-y-4">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Learning Velocity</p>
              <div className="flex gap-1">
                {['Fast', 'Steady', 'Adaptive'].map(v => (
                  <span key={v} className={`px-2 py-1 rounded-md text-[10px] font-bold flex-1 text-center ${user.skillGenome.learningVelocity === v ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                    {v}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Primary Strengths</p>
              <div className="flex flex-wrap gap-1">
                {user.skillGenome.primaryStrengths.map(s => (
                  <span key={s} className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded">
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Collaboration</p>
              <p className="text-sm text-slate-700 font-medium">{user.skillGenome.collaborationStyle}</p>
            </div>
          </div>
        </div>

        {/* Career Path */}
        <div className="md:col-span-2 space-y-6">
          {loading ? (
            <div className="p-12 flex flex-col items-center justify-center bg-white rounded-3xl border border-slate-100">
              <div className="w-10 h-10 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mb-4"></div>
              <p className="text-slate-400">Charting your professional horizon...</p>
            </div>
          ) : data && (
            <>
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                <h3 className="text-[10px] font-bold text-blue-600 uppercase mb-2">Recommended Path</h3>
                <h2 className="text-2xl font-black text-slate-800 mb-4">{data.path}</h2>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden mb-6">
                  <div className="h-full bg-blue-600 w-3/4 rounded-full"></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-2xl">
                    <p className="text-xs font-bold text-slate-400 mb-2">Bridge the Gap</p>
                    <div className="flex flex-wrap gap-2">
                      {data.missingSkills.map((s: string) => (
                        <span key={s} className="bg-white border border-slate-200 px-2 py-1 rounded-lg text-xs font-medium">
                          + {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl">
                    <p className="text-xs font-bold text-slate-400 mb-2">Project Focus</p>
                    <ul className="text-xs space-y-1 text-slate-600">
                      {data.recommendedProjects.map((p: string) => (
                        <li key={p}>• {p}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-blue-600 p-6 rounded-3xl text-white shadow-xl relative overflow-hidden group">
                <div className="relative z-10">
                  <h3 className="font-bold mb-2">Find a Senior Mentor</h3>
                  <p className="text-sm text-blue-100 mb-4">Connect with students who have walked this path before you.</p>
                  <button className="bg-white text-blue-600 px-6 py-2 rounded-xl text-sm font-bold">Search Mentors</button>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 group-hover:scale-110 transition-transform"></div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CareerNavigator;
