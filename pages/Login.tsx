
import React, { useState } from 'react';
import { signInWithGoogle } from '../services/firebaseService';

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
    } catch (error) {
      alert("Failed to sign in with Google. Check your Firebase config.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 relative overflow-hidden px-4">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-slate-900 to-purple-900"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] -ml-20 -mb-20"></div>

      <div className="relative z-10 max-w-md w-full text-center">
        <div className="w-20 h-20 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-3xl mx-auto flex items-center justify-center text-white text-4xl font-black shadow-2xl mb-8 animate-bounce duration-[3000ms]">
          C
        </div>

        <h1 className="text-4xl font-black text-white mb-4 tracking-tight">
          CollabSpace
        </h1>
        <p className="text-slate-400 text-lg mb-10 leading-relaxed">
          The AI-native network for the next generation of campus innovators.
        </p>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-white hover:bg-slate-50 text-slate-900 font-bold py-4 px-6 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-3 group active:scale-95 disabled:opacity-50"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-slate-300 border-t-slate-900 rounded-full animate-spin"></div>
          ) : (
            <>
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span>Continue with Google</span>
            </>
          )}
        </button>

        {/* Demo Mode Button */}
        <div className="mt-8 pt-6 border-t border-slate-700/50">
          <p className="text-slate-400 text-xs mb-3">No account? Try the interactive demo.</p>
          <button
            onClick={() => {
              const mockUser = {
                uid: 'demo-user-id',
                displayName: 'Demo User',
                photoURL: 'https://ui-avatars.com/api/?name=Demo+User&background=0D8ABC&color=fff',
                email: 'demo@collabspace.app'
              };
              localStorage.setItem('collabspace_dev_user', JSON.stringify(mockUser));
              localStorage.setItem('collabspace_demo_mode', 'true');
              window.location.reload();
            }}
            className="w-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-bold py-3 px-6 rounded-2xl transition-all flex items-center justify-center gap-2 group"
          >
            <span>🚀</span>
            <span>Enter Demo Mode</span>
          </button>
        </div>

        <p className="mt-8 text-slate-500 text-xs">
          By joining, you agree to our Terms of Service <br /> and the Campus Collaboration Ethos.
        </p>
      </div>
    </div>
  );
};

export default Login;
