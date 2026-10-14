export const allBadges = [
  {
    id: "badge-first-lesson",
    title: "First Blood",
    description: "Completed your first lesson module on CyberSNova.",
    icon: "Target",
    category: "Learning",
    xp: 50,
    unlockedAtCondition: (stats) => stats.completedLessonsCount >= 1,
  },
  {
    id: "badge-streak-3",
    title: "Streak Ignition",
    description: "Maintained a 3-day continuous learning streak.",
    icon: "Flame",
    category: "Consistency",
    xp: 100,
    unlockedAtCondition: (stats) => stats.streak >= 3,
  },
  {
    id: "badge-cyber-sentinel",
    title: "Cyber Sentinel",
    description: "Complete the Enterprise Cybersecurity & Penetration Testing path.",
    icon: "ShieldCheck",
    category: "Mastery",
    xp: 300,
    unlockedAtCondition: (stats, courses) => {
      const secCourse = courses.find((c) => c.id === 1);
      return Boolean(secCourse?.completed);
    },
  },
  {
    id: "badge-architect",
    title: "System Architect",
    description: "Complete Full Stack Software Architecture course.",
    icon: "Code2",
    category: "Mastery",
    xp: 300,
    unlockedAtCondition: (stats, courses) => {
      const archCourse = courses.find((c) => c.id === 2);
      return Boolean(archCourse?.completed);
    },
  },
  {
    id: "badge-certified",
    title: "Certified Vanguard",
    description: "Earn your first official CyberSNova verified certificate.",
    icon: "Award",
    category: "Credentials",
    xp: 250,
    unlockedAtCondition: (stats) => stats.completedCoursesCount >= 1,
  },
  {
    id: "badge-quiz-ace",
    title: "Neural Ace",
    description: "Answer 3 interactive knowledge checks correctly.",
    icon: "BrainCircuit",
    category: "Skill",
    xp: 150,
    unlockedAtCondition: (stats) => stats.quizCorrectCount >= 3,
  },
];
