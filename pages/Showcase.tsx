
import React from 'react';

const Showcase: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in duration-700">
      <header className="text-center space-y-4">
        <h1 className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
          The Gallery of Greatness
        </h1>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
          Highlighting the most impactful student projects that went from ideation to world-changing products.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="bg-white rounded-[40px] p-8 shadow-2xl shadow-blue-100 border border-slate-100 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8">
            <span className="bg-blue-600 text-white text-[10px] font-bold px-4 py-1.5 rounded-full shadow-lg">WINNER: HACK MIT 2024</span>
          </div>
          <img src="https://picsum.photos/seed/show1/800/600" className="w-full h-64 object-cover rounded-[30px] mb-8 group-hover:scale-[1.02] transition-transform duration-500" />
          <h2 className="text-3xl font-black mb-4">NeuroVision</h2>
          <p className="text-slate-600 leading-relaxed mb-8">
            A VR-based rehabilitation tool for stroke patients using brain-computer interfaces. Developed by a cross-campus team of neuroscientists and game devs.
          </p>
          <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100">
            <p className="text-xs font-bold text-blue-600 uppercase mb-2">AI Pitch Generator</p>
            <p className="text-sm text-blue-800 italic">"NeuroVision isn't just a game; it's a neuroplasticity engine that gamifies the hardest journey a human can take: learning to move again."</p>
          </div>
        </div>

        <div className="bg-white rounded-[40px] p-8 shadow-2xl shadow-purple-100 border border-slate-100 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8">
            <span className="bg-purple-600 text-white text-[10px] font-bold px-4 py-1.5 rounded-full shadow-lg">FEATURED BY DEAN</span>
          </div>
          <img src="https://picsum.photos/seed/show2/800/600" className="w-full h-64 object-cover rounded-[30px] mb-8 group-hover:scale-[1.02] transition-transform duration-500" />
          <h2 className="text-3xl font-black mb-4">AquaGuard</h2>
          <p className="text-slate-600 leading-relaxed mb-8">
            IoT sensors deployed in local lakes to monitor toxicity in real-time, feeding a community-owned data ledger.
          </p>
          <div className="bg-purple-50 p-6 rounded-3xl border border-purple-100">
            <p className="text-xs font-bold text-purple-600 uppercase mb-2">Professor Feedback</p>
            <p className="text-sm text-purple-800 italic">"Exceptional integration of hardware and distributed systems. This should be a startup." - Dr. Elena Rodriguez</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Showcase;
