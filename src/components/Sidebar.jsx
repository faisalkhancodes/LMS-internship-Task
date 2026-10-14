import React from "react";
import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  Library,
  Award,
  ShieldCheck,
  Flame,
  Sparkles,
  X,
  TrendingUp,
} from "lucide-react";
import { useLearning } from "../context/LearningContext";

const navItems = [
  { id: "dashboard", label: "Overview", icon: LayoutDashboard },
  { id: "catalog", label: "Course Catalog", icon: BookOpen },
  { id: "learning", label: "My Learning", icon: GraduationCap },
  { id: "resources", label: "Study Resources", icon: Library },
  { id: "certificates", label: "Certificates", icon: Award },
  { id: "achievements", label: "Cyber Badges & XP", icon: ShieldCheck },
];

export default function Sidebar({ currentPage, onSelectPage, menuOpen, onCloseMenu, onOpenProfile }) {
  const { activeCourses, stats, userProfile } = useLearning();

  return (
    <>
      <aside className={`sidebar ${menuOpen ? "sidebar-open" : ""}`}>
        <div>
          <div className="brand-lockup">
            <div className="brand-mark">
              <span>C</span>
              <i />
            </div>
            <div className="brand-text">
              <span className="brand-name">
                Cyber<span>SNova</span>
              </span>
              <span className="brand-edition">ACADEMY · 2026</span>
            </div>
            <button
              className="icon-button mobile-menu-close"
              onClick={onCloseMenu}
              aria-label="Close navigation"
            >
              <X size={20} />
            </button>
          </div>

          <div className="workspace-label">LEARNING PLATFORM</div>

          <nav className="sidebar-nav" aria-label="Main navigation">
            {navItems.map(({ id, label, icon: Icon }) => {
              const isActive = currentPage === id;
              return (
                <button
                  key={id}
                  className={`nav-link ${isActive ? "nav-link-active" : ""}`}
                  onClick={() => {
                    onSelectPage(id);
                    onCloseMenu();
                  }}
                >
                  <Icon size={19} strokeWidth={isActive ? 2.2 : 1.8} />
                  <span>{label}</span>
                  {id === "learning" && activeCourses.length > 0 && (
                    <span className="nav-count">{activeCourses.length}</span>
                  )}
                  {id === "certificates" && stats.completedCoursesCount > 0 && (
                    <span className="nav-count nav-count-green">{stats.completedCoursesCount}</span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="sidebar-bottom">
          {/* XP & Level Status Widget */}
          <div className="sidebar-xp-card" onClick={onOpenProfile} role="button" tabIndex={0}>
            <div className="xp-card-top">
              <span className="xp-rank-pill">LVL {stats.userRank.level}</span>
              <span className="xp-points">{stats.totalXp} XP</span>
            </div>
            <div className="xp-rank-title">{stats.userRank.title}</div>
            <div className="xp-progress-bar">
              <div
                className="xp-progress-fill"
                style={{ width: `${stats.userRank.pct}%` }}
              />
            </div>
            <div className="xp-next-label">
              <span>Next tier: {stats.userRank.nextTier}</span>
              <span>{stats.userRank.pct}%</span>
            </div>
          </div>

          {/* Daily Streak Card */}
          <div className="sidebar-tip">
            <div className="tip-icon">
              <Sparkles size={16} />
            </div>
            <strong>Daily Streak Tracker</strong>
            <p>Consistency compounds into world-class engineering mastery.</p>
            <div className="streak-row">
              <Flame size={15} />
              <span>{stats.streak} day streak</span>
              <span className="streak-dots">● ● ● ○ ○ ○ ○</span>
            </div>
          </div>

          {/* User Profile Mini-Card */}
          <div className="profile-card" onClick={onOpenProfile} role="button" tabIndex={0}>
            <div className="profile-avatar">{userProfile.avatar || "FK"}</div>
            <div className="profile-info">
              <strong>{userProfile.name}</strong>
              <span>{userProfile.role}</span>
            </div>
            <button
              className="profile-more"
              aria-label="Open profile settings"
              onClick={(e) => {
                e.stopPropagation();
                onOpenProfile();
              }}
            >
              ⚙
            </button>
          </div>
        </div>
      </aside>

      {menuOpen && (
        <button
          className="mobile-scrim"
          onClick={onCloseMenu}
          aria-label="Close navigation overlay"
        />
      )}
    </>
  );
}
