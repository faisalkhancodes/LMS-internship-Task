import React from "react";
import { Search, Sun, Moon, Menu, ChevronRight, Bell, Sparkles } from "lucide-react";
import { useLearning } from "../context/LearningContext";

export default function Topbar({
  pageTitle,
  searchQuery,
  onSearchChange,
  onOpenMenu,
  onOpenCommandPalette,
  onOpenProfile,
}) {
  const { theme, setTheme, stats, userProfile } = useLearning();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button
          className="icon-button mobile-menu-button"
          onClick={onOpenMenu}
          aria-label="Open mobile navigation"
        >
          <Menu size={21} />
        </button>

        <div className="breadcrumb">
          <span>Academy</span>
          <ChevronRight size={14} />
          <strong>{pageTitle}</strong>
        </div>
      </div>

      <div className="topbar-actions">
        {/* Search input with Command Palette shortcut */}
        <div className="global-search" onClick={onOpenCommandPalette} role="search">
          <Search size={16} />
          <input
            aria-label="Search courses, skills, and resources"
            placeholder="Search courses, labs, skills... (⌘K)"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <kbd onClick={(e) => { e.stopPropagation(); onOpenCommandPalette(); }}>
            ⌘ K
          </kbd>
        </div>

        {/* Theme Toggle */}
        <button
          className="icon-button theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* User Level Pill */}
        <div className="topbar-level-pill" onClick={onOpenProfile} role="button" tabIndex={0}>
          <Sparkles size={14} />
          <span>{stats.totalXp} XP</span>
        </div>

        {/* Profile Avatar */}
        <div
          className="topbar-avatar"
          onClick={onOpenProfile}
          role="button"
          tabIndex={0}
          title={`Signed in as ${userProfile.name}`}
        >
          {userProfile.avatar || "FK"}
        </div>
      </div>
    </header>
  );
}
