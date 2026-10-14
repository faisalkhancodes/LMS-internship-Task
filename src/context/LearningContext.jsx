import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import confetti from "canvas-confetti";
import { initialCourses } from "../data/coursesData";
import { initialResources } from "../data/resourcesData";
import { allBadges } from "../data/badgesData";

const LearningContext = createContext(null);

export function LearningProvider({ children }) {
  // Load courses from localStorage or default
  const [courses, setCourses] = useState(() => {
    try {
      const saved = window.localStorage.getItem("cybersnova-courses");
      if (!saved) return initialCourses;
      const parsed = JSON.parse(saved);
      if (!Array.isArray(parsed)) return initialCourses;
      return initialCourses.map((c) => {
        const stored = parsed.find((item) => item.id === c.id);
        if (!stored) return c;
        return {
          ...c,
          enrolled: Boolean(stored.enrolled),
          completed: Boolean(stored.completed),
          completedLessons: Array.isArray(stored.completedLessons) ? stored.completedLessons : [],
          bookmarked: Boolean(stored.bookmarked),
        };
      });
    } catch {
      return initialCourses;
    }
  });

  // User Profile
  const [userProfile, setUserProfile] = useState(() => {
    try {
      const saved = window.localStorage.getItem("cybersnova-profile");
      if (saved) return JSON.parse(saved);
    } catch {}
    return {
      name: "Faisal Khan",
      title: "Senior Security & Systems Engineer",
      role: "Security Engineer",
      avatar: "FK",
      email: "faisal.khan@cybersnova.internal",
      weeklyGoalTarget: 5,
      streak: 3,
    };
  });

  // Theme
  const [theme, setTheme] = useState(() => {
    try {
      return window.localStorage.getItem("cybersnova-theme") || "dark";
    } catch {
      return "dark";
    }
  });

  // Lesson notes storage
  const [notes, setNotes] = useState(() => {
    try {
      const saved = window.localStorage.getItem("cybersnova-notes");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Interactive Quiz records
  const [quizAnswers, setQuizAnswers] = useState(() => {
    try {
      const saved = window.localStorage.getItem("cybersnova-quizzes");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Toast notifications
  const [toasts, setToasts] = useState([]);

  // Persist courses
  useEffect(() => {
    try {
      window.localStorage.setItem("cybersnova-courses", JSON.stringify(courses));
    } catch (e) {
      console.error("Storage error:", e);
    }
  }, [courses]);

  // Persist profile
  useEffect(() => {
    try {
      window.localStorage.setItem("cybersnova-profile", JSON.stringify(userProfile));
    } catch (e) {
      console.error("Storage error:", e);
    }
  }, [userProfile]);

  // Persist theme
  useEffect(() => {
    try {
      window.localStorage.setItem("cybersnova-theme", theme);
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } catch (e) {
      console.error("Theme storage error:", e);
    }
  }, [theme]);

  // Persist notes
  useEffect(() => {
    try {
      window.localStorage.setItem("cybersnova-notes", JSON.stringify(notes));
    } catch {}
  }, [notes]);

  // Persist quiz answers
  useEffect(() => {
    try {
      window.localStorage.setItem("cybersnova-quizzes", JSON.stringify(quizAnswers));
    } catch {}
  }, [quizAnswers]);

  // Toast helper
  const addToast = (title, message, type = "success") => {
    const id = Date.now() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const dismissToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Celebration trigger
  const fireCelebration = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#6758e8", "#38bdf8", "#34d399", "#f59e0b", "#ec4899"],
      });
    } catch {}
  };

  // Actions
  const enrollCourse = (courseId) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === courseId ? { ...c, enrolled: true } : c))
    );
    const target = courses.find((c) => c.id === courseId);
    if (target) {
      addToast("Enrolled in Path", `You are now enrolled in ${target.title}!`, "info");
    }
  };

  const toggleBookmark = (courseId) => {
    setCourses((prev) =>
      prev.map((c) =>
        c.id === courseId ? { ...c, bookmarked: !c.bookmarked } : c
      )
    );
    const target = courses.find((c) => c.id === courseId);
    if (target) {
      const willBookmark = !target.bookmarked;
      addToast(
        willBookmark ? "Course Saved" : "Course Removed",
        willBookmark
          ? `Added "${target.title}" to saved paths.`
          : `Removed from saved paths.`,
        "info"
      );
    }
  };

  const completeLesson = (courseId, lessonIndex) => {
    let justCompletedCourse = false;
    let courseTitle = "";

    setCourses((prev) =>
      prev.map((course) => {
        if (course.id !== courseId) return course;
        courseTitle = course.title;
        const currentCompleted = course.completedLessons || [];
        const nextCompleted = Array.from(new Set([...currentCompleted, lessonIndex]));
        const isAllDone = nextCompleted.length === course.lessons.length;
        if (isAllDone && !course.completed) {
          justCompletedCourse = true;
        }
        return {
          ...course,
          enrolled: true,
          completedLessons: nextCompleted,
          completed: isAllDone,
        };
      })
    );

    addToast("Module Finished", `Completed Module ${lessonIndex + 1}! (+50 XP)`, "success");

    if (justCompletedCourse) {
      fireCelebration();
      addToast(
        "Course Mastered! 🏆",
        `Congratulations! You completed ${courseTitle}. Your official certificate is ready! (+250 XP)`,
        "success"
      );
    }
  };

  const completeCourse = (courseId) => {
    let courseTitle = "";
    setCourses((prev) =>
      prev.map((course) => {
        if (course.id !== courseId) return course;
        courseTitle = course.title;
        return {
          ...course,
          enrolled: true,
          completed: true,
          completedLessons: course.lessons.map((_, i) => i),
        };
      })
    );
    fireCelebration();
    addToast(
      "Certification Unlocked! 📜",
      `Full course completed: ${courseTitle}. Certificate verified! (+250 XP)`,
      "success"
    );
  };

  const saveNote = (courseId, lessonIndex, text) => {
    const key = `${courseId}-${lessonIndex}`;
    setNotes((prev) => ({ ...prev, [key]: text }));
  };

  const recordQuizAnswer = (courseId, lessonIndex, isCorrect) => {
    const key = `${courseId}-${lessonIndex}`;
    setQuizAnswers((prev) => ({ ...prev, [key]: isCorrect }));
    if (isCorrect) {
      addToast("Quiz Answer Correct!", "Great analysis! +25 XP awarded.", "success");
    }
  };

  const updateProfile = (fields) => {
    setUserProfile((prev) => ({ ...prev, ...fields }));
    addToast("Profile Updated", "Your changes have been saved.", "info");
  };

  const resetAllProgress = () => {
    setCourses(initialCourses);
    setNotes({});
    setQuizAnswers({});
    window.localStorage.removeItem("cybersnova-courses");
    window.localStorage.removeItem("cybersnova-notes");
    window.localStorage.removeItem("cybersnova-quizzes");
    addToast("Progress Reset", "All course progress restored to defaults.", "info");
  };

  // Derived Statistics
  const enrolledCourses = useMemo(() => courses.filter((c) => c.enrolled), [courses]);
  const completedCourses = useMemo(() => courses.filter((c) => c.completed), [courses]);
  const activeCourses = useMemo(
    () => courses.filter((c) => c.enrolled && !c.completed),
    [courses]
  );
  const bookmarkedCourses = useMemo(() => courses.filter((c) => c.bookmarked), [courses]);

  const totalLessonsCompleted = useMemo(() => {
    return courses.reduce((sum, c) => sum + (c.completedLessons?.length || 0), 0);
  }, [courses]);

  const quizCorrectCount = useMemo(() => {
    return Object.values(quizAnswers).filter(Boolean).length;
  }, [quizAnswers]);

  // Overall XP calculation
  const totalXp = useMemo(() => {
    const lessonXp = totalLessonsCompleted * 50;
    const courseXp = completedCourses.length * 250;
    const quizXp = quizCorrectCount * 25;
    return lessonXp + courseXp + quizXp;
  }, [totalLessonsCompleted, completedCourses.length, quizCorrectCount]);

  // Level & Rank
  const userRank = useMemo(() => {
    if (totalXp >= 1500) return { level: 5, title: "CyberSNova Elite Fellow", nextTier: "Max Level", pct: 100 };
    if (totalXp >= 1000) return { level: 4, title: "Principal Architect", nextTier: "1,500 XP", pct: Math.round(((totalXp - 1000) / 500) * 100) };
    if (totalXp >= 500) return { level: 3, title: "Senior Cyber Specialist", nextTier: "1,000 XP", pct: Math.round(((totalXp - 500) / 500) * 100) };
    if (totalXp >= 150) return { level: 2, title: "Security & Cloud Operator", nextTier: "500 XP", pct: Math.round(((totalXp - 150) / 350) * 100) };
    return { level: 1, title: "Cyber Vanguard Cadet", nextTier: "150 XP", pct: Math.min(100, Math.round((totalXp / 150) * 100)) };
  }, [totalXp]);

  const overallProgress = useMemo(() => {
    if (!enrolledCourses.length) return 0;
    const sum = enrolledCourses.reduce((acc, c) => {
      const pct = c.completed
        ? 100
        : Math.round(((c.completedLessons?.length || 0) / (c.lessons?.length || 1)) * 100);
      return acc + pct;
    }, 0);
    return Math.round(sum / enrolledCourses.length);
  }, [enrolledCourses]);

  const stats = useMemo(() => ({
    enrolledCount: enrolledCourses.length,
    completedCoursesCount: completedCourses.length,
    completedLessonsCount: totalLessonsCompleted,
    quizCorrectCount,
    streak: userProfile.streak || 3,
    weeklyGoalTarget: userProfile.weeklyGoalTarget || 5,
    totalXp,
    userRank,
    overallProgress,
  }), [
    enrolledCourses.length,
    completedCourses.length,
    totalLessonsCompleted,
    quizCorrectCount,
    userProfile.streak,
    userProfile.weeklyGoalTarget,
    totalXp,
    userRank,
    overallProgress,
  ]);

  // Unlocked badges
  const unlockedBadges = useMemo(() => {
    return allBadges.map((badge) => ({
      ...badge,
      unlocked: badge.unlockedAtCondition(stats, courses),
    }));
  }, [stats, courses]);

  return (
    <LearningContext.Provider
      value={{
        courses,
        resources: initialResources,
        userProfile,
        theme,
        notes,
        quizAnswers,
        toasts,
        stats,
        unlockedBadges,
        enrolledCourses,
        completedCourses,
        activeCourses,
        bookmarkedCourses,
        enrollCourse,
        toggleBookmark,
        completeLesson,
        completeCourse,
        saveNote,
        recordQuizAnswer,
        updateProfile,
        setTheme,
        addToast,
        dismissToast,
        fireCelebration,
        resetAllProgress,
      }}
    >
      {children}
    </LearningContext.Provider>
  );
}

export function useLearning() {
  const context = useContext(LearningContext);
  if (!context) {
    throw new Error("useLearning must be used within a LearningProvider");
  }
  return context;
}
