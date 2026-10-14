import React from "react";
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Flame,
  TrendingUp,
  Target,
  BrainCircuit,
  Zap,
} from "lucide-react";
import { useLearning } from "../context/LearningContext";
import CourseCard from "../components/CourseCard";

export default function DashboardPage({ onOpenCourse, onNavigate }) {
  const {
    courses,
    activeCourses,
    enrolledCourses,
    completedCourses,
    stats,
  } = useLearning();

  const handleStartOrContinue = () => {
    if (activeCourses.length > 0) {
      onOpenCourse(activeCourses[0]);
    } else {
      onNavigate("catalog");
    }
  };

  const weeklyDone = stats.completedLessonsCount;
  const weeklyTarget = stats.weeklyGoalTarget || 5;
  const weeklyPct = Math.min(100, Math.round((weeklyDone / weeklyTarget) * 100));

  return (
    <div className="dashboard-page">
      {/* Welcome Hero Banner */}
      <section className="welcome-banner">
        <div className="welcome-copy">
          <span className="welcome-kicker">
            <Sparkles size={14} /> CYBERSNOVA ADVANCED ENGINEERING ACADEMY
          </span>
          <h2>
            Learn today.
            <br />
            <span>Lead tomorrow.</span>
          </h2>
          <p>
            Architect modern distributed systems, defend against zero-day vulnerabilities, and engineer enterprise AI pipelines.
          </p>
          <div className="banner-buttons">
            <button className="button button-light" onClick={handleStartOrContinue}>
              {activeCourses.length > 0 ? "Continue active path" : "Explore learning paths"}
              <ArrowRight size={16} />
            </button>
            <button className="button button-ghost-light" onClick={() => onNavigate("catalog")}>
              Browse catalog
            </button>
          </div>
        </div>

        <div className="banner-art" aria-hidden="true">
          <div className="banner-glow" />
          <div className="banner-orbit orbit-large" />
          <div className="banner-orbit orbit-small" />
          <div className="banner-core">
            <BrainCircuit size={48} />
          </div>
          <div className="floating-card floating-card-one">
            <Zap size={16} />
            <span>
              Real-world labs
              <br />
              <strong>Interactive sandbox</strong>
            </span>
          </div>
          <div className="floating-card floating-card-two">
            <Target size={17} />
            <span>
              Verified credentials
              <br />
              <strong>Global certificates</strong>
            </span>
          </div>
        </div>
        <div className="banner-decoration">
          CS<span>.</span>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="stats-grid" aria-label="Learning statistics">
        <div className="stat-card">
          <span className="stat-icon stat-purple">
            <BookOpen size={19} />
          </span>
          <span className="stat-label">Enrolled paths</span>
          <strong>{enrolledCourses.length.toString().padStart(2, "0")}</strong>
          <span className="stat-foot">{activeCourses.length} currently in progress</span>
        </div>

        <div className="stat-card">
          <span className="stat-icon stat-green">
            <CheckCircle2 size={19} />
          </span>
          <span className="stat-label">Completed credentials</span>
          <strong>{completedCourses.length.toString().padStart(2, "0")}</strong>
          <span className="stat-foot">
            {completedCourses.length
              ? "Official certificates unlocked"
              : "Complete a course to certify"}
          </span>
        </div>

        <div className="stat-card">
          <span className="stat-icon stat-orange">
            <Flame size={19} />
          </span>
          <span className="stat-label">Learning streak</span>
          <strong>
            {stats.streak.toString().padStart(2, "0")} <small>days</small>
          </strong>
          <span className="stat-foot">Daily momentum unlocked</span>
        </div>

        <div className="stat-card">
          <span className="stat-icon stat-blue">
            <TrendingUp size={19} />
          </span>
          <span className="stat-label">Overall mastery</span>
          <strong>
            {stats.overallProgress}
            <small>%</small>
          </strong>
          <span className="stat-foot">Across all active curriculums</span>
        </div>
      </section>

      {/* Lower Dashboard: In Progress + Weekly Goal */}
      <section className="dashboard-lower">
        <div className="section-block">
          <div className="section-heading">
            <div>
              <span className="eyebrow">PICK UP WHERE YOU LEFT OFF</span>
              <h2>{activeCourses.length ? "Continue learning" : "Recommended for your stack"}</h2>
            </div>
            <button
              className="text-link"
              onClick={() => onNavigate(activeCourses.length ? "learning" : "catalog")}
            >
              View all <ArrowRight size={15} />
            </button>
          </div>

          <div className="course-grid dashboard-course-grid">
            {(activeCourses.length ? activeCourses.slice(0, 2) : courses.slice(0, 2)).map(
              (course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onOpen={onOpenCourse}
                  compact={activeCourses.length > 0}
                />
              )
            )}
          </div>
        </div>

        {/* Weekly Goal Widget */}
        <aside className="weekly-card">
          <div className="weekly-top">
            <span className="weekly-icon">
              <Target size={20} />
            </span>
            <span className="weekly-badge">THIS WEEK</span>
          </div>
          <h3>
            Weekly goal,
            <br />
            within reach.
          </h3>
          <p>
            Consistent practice turns complex system design into natural intuition.
          </p>

          <div className="weekly-progress-label">
            <span>Progress towards goal</span>
            <strong>
              {weeklyDone} / {weeklyTarget} lessons
            </strong>
          </div>

          <div className="progress-track weekly-track">
            <span style={{ width: `${weeklyPct}%` }} />
          </div>

          <div className="weekly-footer-meta">
            <span>{weeklyPct}% achieved</span>
            <button className="weekly-link" onClick={handleStartOrContinue}>
              Continue lab <ArrowRight size={14} />
            </button>
          </div>
        </aside>
      </section>

      {/* Curated Recommendations */}
      <section className="section-block recommendation-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">CURATED FOR YOU</span>
            <h2>Explore leading technical specializations</h2>
          </div>
          <button className="text-link" onClick={() => onNavigate("catalog")}>
            Browse full catalog <ArrowRight size={15} />
          </button>
        </div>

        <div className="course-grid">
          {courses.slice(2, 5).map((course) => (
            <CourseCard key={course.id} course={course} onOpen={onOpenCourse} />
          ))}
        </div>
      </section>
    </div>
  );
}
