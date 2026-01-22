
import React, { useState, useEffect } from 'react';
import { Project } from '../types';
import { getAllProjects, createProject } from '../services/firestoreService';
import { auth } from '../services/firebaseService';

const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getAllProjects();
        setProjects(data);
      } catch (e) {
        console.error("Failed to fetch projects:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleStartProject = async () => {
    const name = prompt("Enter project name:");
    if (!name) return;

    const newProj: Omit<Project, 'id'> = {
      name,
      description: "A brand new initiative created on CollabSpace.",
      createdBy: auth.currentUser?.uid || 'anonymous',
      members: [auth.currentUser?.uid || 'anonymous'],
      requiredRoles: ['Developer', 'Designer'],
      techStack: ['React', 'Firebase'],
      status: 'Ideation',
      imageUrl: `https://picsum.photos/seed/${Date.now()}/600/400`,
      healthScore: 100,
      aiPitch: "Generating AI pitch..."
    };

    try {
      const id = await createProject(newProj);
      setProjects([{ id, ...newProj } as Project, ...projects]);
    } catch (e) {
      alert("Failed to create project. Check console.");
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-800">Active Projects</h1>
          <p className="text-slate-500">Join a team or start your own initiative.</p>
        </div>
        <button 
          onClick={handleStartProject}
          className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-bold hover:bg-black transition-all"
        >
          + Start Project
        </button>
      </div>

      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white h-80 rounded-3xl animate-pulse border border-slate-100"></div>
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-slate-100 text-center">
          <p className="text-slate-500 mb-4">No projects found on your campus yet.</p>
          <button onClick={handleStartProject} className="text-blue-600 font-bold hover:underline">Be the first to create one!</button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <div key={project.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col hover:shadow-xl transition-all group">
              <div className="h-48 relative overflow-hidden">
                <img src={project.imageUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-blue-600 shadow-sm uppercase">
                  {project.status}
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                <p className="text-sm text-slate-500 line-clamp-2 mb-4 flex-1">{project.description}</p>
                
                <div className="space-y-4 pt-4 border-t border-slate-50">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Team Health</p>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full">
                      <div 
                        className={`h-full rounded-full ${project.healthScore > 80 ? 'bg-green-500' : 'bg-orange-500'}`} 
                        style={{ width: `${project.healthScore}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {project.members.slice(0, 3).map((uid, i) => (
                        <img key={i} src={`https://picsum.photos/seed/${uid}/100`} className="w-8 h-8 rounded-full border-2 border-white" />
                      ))}
                      {project.members.length > 3 && (
                        <div className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-400">
                          +{project.members.length - 3}
                        </div>
                      )}
                    </div>
                    <button className="text-blue-600 text-sm font-bold hover:underline">View Details</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;
