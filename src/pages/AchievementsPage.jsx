import React from "react";
import {
  ShieldCheck,
  Award,
  Sparkles,
  Flame,
  Target,
  CheckCircle2,
  Lock,
  Code2,
  BrainCircuit,
  Zap,
} from "lucide-react";
import { useLearning } from "../context/LearningContext";

export default function AchievementsPage({ onOpenProfile }) {
  const { stats, unlockedBadges, userProfile } = useLearning();

  const getBadgeIcon = (iconName) => {
    switch (iconName) {
      case "Flame":
        return <Flame size={24} />;
      case "ShieldCheck":
        return <ShieldCheck size={24} />;
      case "Code2":
        return <Code2 size={24} />;
      case "Award":
        return <Award size={24} />;
      case "BrainCircuit":
        return <BrainCircuit size={24} />;
      default:
        return <Target size={24} />;
    }
  };

  const unlockedCount = unlockedBadges.filter((b) => b.unlocked).length;

  return (
    <div className="achievements-page">
      {/* Rank Progression Hero */}
      <section className="achievements-hero">
        <div className="hero-rank-badge">
          <div className="rank-crest">
            <span>LVL</span>
            <strong>{stats.userRank.level}</strong>
          </div>
        </div>

        <div className="hero-rank-details">
          <span className="eyebrow">ENGINEERING RANK & CREDENTIALS</span>
          <h2>{stats.userRank.title}</h2>
          <p>
            Earn XP by completing architectural lessons, running lab commands in the sandbox, and acing knowledge checks.
          </p>

          <div className="rank-progress-container">
            <div className="rank-progress-labels">
              <span>Current: {stats.totalXp} XP</span>
              <span>Next Rank Goal: {stats.userRank.nextTier}</span>
            </div>
            <div className="progress-track rank-track">
              <span style={{ width: `${stats.userRank.pct}%` }} />
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Row */}
      <section className="achievements-metrics-grid">
        <div className="metric-box">
          <div className="metric-icon-wrap icon-purple">
            <Sparkles size={20} />
          </div>
          <div className="metric-info">
            <span className="metric-label">Total Experience</span>
            <strong>{stats.totalXp} XP</strong>
          </div>
        </div>

        <div className="metric-box">
          <div className="metric-icon-wrap icon-orange">
            <Flame size={20} />
          </div>
          <div className="metric-info">
            <span className="metric-label">Streak Record</span>
            <strong>{stats.streak} Days Active</strong>
          </div>
        </div>

        <div className="metric-box">
          <div className="metric-icon-wrap icon-green">
            <CheckCircle2 size={20} />
          </div>
          <div className="metric-info">
            <span className="metric-label">Modules Finished</span>
            <strong>{stats.completedLessonsCount} Lessons</strong>
          </div>
        </div>

        <div className="metric-box">
          <div className="metric-icon-wrap icon-blue">
            <Award size={20} />
          </div>
          <div className="metric-info">
            <span className="metric-label">Badges Unlocked</span>
            <strong>
              {unlockedCount} / {unlockedBadges.length}
            </strong>
          </div>
        </div>
      </section>

      {/* Badges Grid */}
      <section className="section-block">
        <div className="section-heading">
          <div>
            <span className="eyebrow">CREDENTIAL REGISTRY</span>
            <h2>Cyber Badges & Achievements</h2>
          </div>
          <button className="button button-secondary" onClick={onOpenProfile}>
            Edit Profile
          </button>
        </div>

        <div className="badges-page-grid">
          {unlockedBadges.map((badge) => (
            <div
              key={badge.id}
              className={`achieve-card ${badge.unlocked ? "unlocked" : "locked"}`}
            >
              <div className="achieve-card-icon">
                {badge.unlocked ? getBadgeIcon(badge.icon) : <Lock size={22} />}
              </div>
              <div className="achieve-card-body">
                <div className="achieve-card-top">
                  <span className="achieve-category">{badge.category}</span>
                  <span className="achieve-xp">+{badge.xp} XP</span>
                </div>
                <h3>{badge.title}</h3>
                <p>{badge.description}</p>
                <div className="achieve-card-status">
                  {badge.unlocked ? (
                    <span className="status-unlocked">
                      <CheckCircle2 size={14} /> Unlocked
                    </span>
                  ) : (
                    <span className="status-locked">
                      <Lock size={13} /> Locked
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
