const API_BASE = "http://localhost:5000"; // our backend

export class GeminiService {
  async findCollaborators(query: string, availableUsers: any[]) {
    try {
      if (typeof window !== 'undefined' && localStorage.getItem('collabspace_demo_mode') === 'true') {
        throw new Error("Demo Mode Override");
      }

      const res = await fetch(`${API_BASE}/ai/find-collaborators`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, availableUsers }),
      });

      if (!res.ok) throw new Error("AI request failed");
      return res.json();
    } catch (error) {
      console.warn("Gemini AI failed (using smart mock):", error);

      const lowerQuery = query.toLowerCase();
      const matches = availableUsers.filter(u => {
        const searchSpace = `${u.name} ${u.department} ${u.skills.join(' ')} ${u.interests.join(' ')}`.toLowerCase();
        return lowerQuery.split(' ').some(term => term.length > 2 && searchSpace.includes(term));
      }).map(u => ({
        userId: u.id,
        matchPercentage: Math.floor(Math.random() * (99 - 85) + 85),
        friendlyIntro: `[Demo AI] I found ${u.name} because they match your search for "${query}".`
      })).slice(0, 3);

      if (matches.length === 0) {
        return availableUsers.slice(0, 2).map(u => ({
          userId: u.id,
          matchPercentage: Math.floor(Math.random() * (85 - 70) + 70),
          friendlyIntro: `[Demo AI] While not an exact match, ${u.name} has great potential.`
        }));
      }
      return matches;
    }
  }

  async buildTeam(projectDesc: string, availableUsers: any[]) {
    try {
      if (typeof window !== 'undefined' && localStorage.getItem('collabspace_demo_mode') === 'true') throw new Error("Demo Mode");
      const res = await fetch(`${API_BASE}/ai/build-team`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectDesc, availableUsers }),
      });

      if (!res.ok) throw new Error("AI request failed");
      return res.json();
    } catch (error) {
      console.warn("Backend failed, using mock data for QA:", error);
      return {
        team: availableUsers.slice(0, 3).map((u, i) => ({
          userId: u.id,
          role: u.skills[0] || 'Contributor',
          fit: "High",
          reason: `[Demo AI] ${u.name} is a strong candidate.`
        })),
        roles: ["Lead Developer", "UX Designer", "Data Scientist"],
        predictedSuccessScore: 92
      };
    }
  }

  async navigateCareer(skills: string[]) {
    try {
      if (typeof window !== 'undefined' && localStorage.getItem('collabspace_demo_mode') === 'true') throw new Error("Demo Mode");
      const res = await fetch(`${API_BASE}/ai/navigate-career`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skills }),
      });

      if (!res.ok) throw new Error("AI request failed");
      return res.json();
    } catch (error) {
      return {
        recommendedRoles: ["Product Manager", "Full Stack Developer", "AI Researcher"],
        missingSkills: ["Leadership", "Cloud Architecture"],
        learningPath: ["1. Build a portfolio project", "2. Contribute to open source", "3. Network with alumni"]
      };
    }
  }

  async getMentorAdvice(message: string) {
    try {
      if (typeof window !== 'undefined' && localStorage.getItem('collabspace_demo_mode') === 'true') throw new Error("Demo Mode");
      const res = await fetch(`${API_BASE}/ai/mentor`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (!res.ok) throw new Error("AI request failed");
      const data = await res.json();
      return data.text;
    } catch (error) {
      return `[Demo Mentor] That's a great question about "${message}". I'd recommend focusing on your strengths and connecting with peers in the Team Builder.`;
    }
  }
}

export const gemini = new GeminiService();
