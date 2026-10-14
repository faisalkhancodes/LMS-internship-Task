import React, { useState } from "react";
import {
  X,
  User,
  ShieldCheck,
  Award,
  Sparkles,
  Flame,
  Target,
  Code2,
  BrainCircuit,
  Lock,
  RotateCcw,
  Check,
} from "lucide-react";
import { useLearning } from "../context/LearningContext";

export default function ProfileModal({ isOpen, onClose }) {
  const {
    userProfile,
    updateProfile,
    stats,
    unlockedBadges,
    resetAllProgress,
  } = useLearning();

  const [name, setName] = useState(userProfile.name);
  const [role, setRole] = useState(userProfile.role);
  const [targetRole, setTargetRole] = useState(userProfile.title || "Senior Security Architect");
  const [weeklyGoal, setWeeklyGoal] = useState(userProfile.weeklyGoalTarget || 5);
  const [confirmReset, setConfirmReset] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    const initials = name
      .trim()
      .split(/\s+/)
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

    updateProfile({
      name,
      role,
      title: targetRole,
      avatar: initials || "US",
      weeklyGoalTarget: Number(weeklyGoal),
    });
    onClose();
  };

  const handleReset = () => {
    if (!confirmReset) {
      setConfirmReset(true);
      return;
    }
    resetAllProgress();
    setConfirmReset(false);
    onClose();
  };

  const getBadgeIcon = (iconName) => {
    switch (iconName) {
      case "Flame":
        return <Flame size={20} />;
      case "ShieldCheck":
        return <ShieldCheck size={20} />;
      case "Code2":
        return <Code2 size={20} />;
      case "Award":
        return <Award size={20} />;
      case "BrainCircuit":
        return <BrainCircuit size={20} />;
      default:
        return <Target size={20} />;
    }
  };

  return (
    <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-panel profile-modal-panel" role="dialog" aria-modal="true">
        <button className="icon-button modal-close" onClick={onClose} aria-label="Close profile modal">
          <X size={20} />
        </button>

        <div className="profile-modal-header">
          <div className="profile-modal-avatar-lg">{userProfile.avatar || "FK"}</div>
          <div className="profile-modal-identity">
            <h2>{userProfile.name}</h2>
            <p>{stats.userRank.title}</p>
            <div className="profile-rank-pills">
              <span className="profile-pill-level">LEVEL {stats.userRank.level}</span>
              <span className="profile-pill-xp">
                <Sparkles size={12} /> {stats.totalXp} Total XP
              </span>
            </div>
          </div>
        </div>

        <div className="profile-modal-body">
          {/* Edit Form */}
          <form onSubmit={handleSave} className="profile-edit-form">
            <h3 className="section-subheading">Personal Profile Details</h3>
            <div className="form-grid">
              <label className="form-group">
                <span>Full Name</span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </label>

              <label className="form-group">
                <span>Current Role</span>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                />
              </label>

              <label className="form-group">
                <span>Specialization / Title</span>
                <input
                  type="text"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                />
              </label>

              <label className="form-group">
                <span>Weekly Goal (Lessons / Week)</span>
                <select
                  value={weeklyGoal}
                  onChange={(e) => setWeeklyGoal(Number(e.target.value))}
                >
                  <option value={3}>3 lessons / week (Casual)</option>
                  <option value={5}>5 lessons / week (Dedicated)</option>
                  <option value={8}>8 lessons / week (Intensive)</option>
                  <option value={12}>12 lessons / week (Hardcore)</option>
                </select>
              </label>
            </div>

            <div className="form-actions">
              <button type="submit" className="button button-primary">
                Save Profile Changes <Check size={16} />
              </button>
            </div>
          </form>

          {/* Badges & Achievements Grid */}
          <div className="profile-badges-section">
            <div className="badges-header">
              <h3 className="section-subheading">Earned Badges & Cyber Credentials</h3>
              <span>
                {unlockedBadges.filter((b) => b.unlocked).length} of {unlockedBadges.length} unlocked
              </span>
            </div>

            <div className="badges-grid">
              {unlockedBadges.map((badge) => (
                <div
                  key={badge.id}
                  className={`badge-card ${badge.unlocked ? "badge-unlocked" : "badge-locked"}`}
                >
                  <div className="badge-icon-wrap">
                    {badge.unlocked ? getBadgeIcon(badge.icon) : <Lock size={18} />}
                  </div>
                  <div className="badge-text">
                    <strong>{badge.title}</strong>
                    <p>{badge.description}</p>
                    <span className="badge-xp-tag">+{badge.xp} XP</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Danger Zone: Reset Progress */}
          <div className="profile-danger-zone">
            <div>
              <strong>Reset Academy Progress</strong>
              <p>Restore all enrolled courses and labs to initial baseline.</p>
            </div>
            <button
              type="button"
              className={`button ${confirmReset ? "button-danger" : "button-secondary"}`}
              onClick={handleReset}
            >
              <RotateCcw size={15} />
              {confirmReset ? "Click again to confirm reset" : "Reset Data"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
