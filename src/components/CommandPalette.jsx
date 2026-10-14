import React, { useState, useEffect, useMemo } from "react";
import {
  Search,
  BookOpen,
  Library,
  Award,
  ShieldCheck,
  Moon,
  Sun,
  X,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useLearning } from "../context/LearningContext";

export default function CommandPalette({ isOpen, onClose, onSelectCourse, onSelectPage, onSelectResource }) {
  const { courses, resources, theme, setTheme } = useLearning();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onClose(true); // Toggle
      } else if (e.key === "Escape" && isOpen) {
        onClose(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return {
        courses: courses.slice(0, 3),
        resources: resources.slice(0, 2),
        actions: [
          { id: "action-theme", label: `Toggle ${theme === "dark" ? "Light" : "Dark"} Mode`, icon: theme === "dark" ? Sun : Moon, handler: () => setTheme(theme === "dark" ? "light" : "dark") },
          { id: "action-catalog", label: "Browse All Courses in Catalog", icon: BookOpen, handler: () => onSelectPage("catalog") },
          { id: "action-certs", label: "View Earned Certificates", icon: Award, handler: () => onSelectPage("certificates") },
          { id: "action-badges", label: "Check Cyber Badges & XP", icon: ShieldCheck, handler: () => onSelectPage("achievements") },
        ],
      };
    }

    const matchedCourses = courses.filter((c) =>
      `${c.title} ${c.category} ${c.instructor} ${c.skills?.join(" ")}`.toLowerCase().includes(q)
    );

    const matchedResources = resources.filter((r) =>
      `${r.title} ${r.category} ${r.type}`.toLowerCase().includes(q)
    );

    const matchedActions = [
      { id: "nav-dash", label: "Go to Dashboard Overview", icon: BookOpen, handler: () => onSelectPage("dashboard") },
      { id: "nav-cat", label: "Go to Course Catalog", icon: BookOpen, handler: () => onSelectPage("catalog") },
      { id: "nav-learn", label: "Go to My Learning", icon: BookOpen, handler: () => onSelectPage("learning") },
      { id: "nav-res", label: "Go to Resources Library", icon: Library, handler: () => onSelectPage("resources") },
      { id: "nav-certs", label: "Go to Certificates", icon: Award, handler: () => onSelectPage("certificates") },
      { id: "nav-achieve", label: "Go to Cyber Badges & XP", icon: ShieldCheck, handler: () => onSelectPage("achievements") },
      { id: "action-theme", label: `Toggle ${theme === "dark" ? "Light" : "Dark"} Mode`, icon: theme === "dark" ? Sun : Moon, handler: () => setTheme(theme === "dark" ? "light" : "dark") },
    ].filter((a) => a.label.toLowerCase().includes(q));

    return {
      courses: matchedCourses,
      resources: matchedResources,
      actions: matchedActions,
    };
  }, [query, courses, resources, theme, setTheme, onSelectPage]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop command-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose(false)}>
      <div className="command-palette-panel">
        <div className="command-input-wrapper">
          <Search size={18} className="command-search-icon" />
          <input
            autoFocus
            className="command-input"
            placeholder="Type a command or search courses, labs, and guides..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="command-close-btn" onClick={() => onClose(false)} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className="command-results">
          {searchResults.courses.length > 0 && (
            <div className="command-group">
              <span className="command-group-title">Courses & Labs</span>
              {searchResults.courses.map((course) => (
                <div
                  key={course.id}
                  className="command-item"
                  onClick={() => {
                    onSelectCourse(course);
                    onClose(false);
                  }}
                >
                  <div className="command-item-icon">
                    <BookOpen size={16} />
                  </div>
                  <div className="command-item-body">
                    <strong>{course.title}</strong>
                    <span>{course.category} · {course.level} · {course.duration}</span>
                  </div>
                  <ArrowRight size={15} className="command-item-arrow" />
                </div>
              ))}
            </div>
          )}

          {searchResults.resources.length > 0 && (
            <div className="command-group">
              <span className="command-group-title">Study Resources & Guides</span>
              {searchResults.resources.map((res) => (
                <div
                  key={res.id}
                  className="command-item"
                  onClick={() => {
                    onSelectResource(res);
                    onClose(false);
                  }}
                >
                  <div className="command-item-icon icon-cyan">
                    <Library size={16} />
                  </div>
                  <div className="command-item-body">
                    <strong>{res.title}</strong>
                    <span>{res.type} · {res.category}</span>
                  </div>
                  <ArrowRight size={15} className="command-item-arrow" />
                </div>
              ))}
            </div>
          )}

          {searchResults.actions.length > 0 && (
            <div className="command-group">
              <span className="command-group-title">Quick Actions</span>
              {searchResults.actions.map((action) => {
                const Icon = action.icon;
                return (
                  <div
                    key={action.id}
                    className="command-item"
                    onClick={() => {
                      action.handler();
                      onClose(false);
                    }}
                  >
                    <div className="command-item-icon icon-purple">
                      <Icon size={16} />
                    </div>
                    <div className="command-item-body">
                      <strong>{action.label}</strong>
                    </div>
                    <ArrowRight size={15} className="command-item-arrow" />
                  </div>
                );
              })}
            </div>
          )}

          {searchResults.courses.length === 0 &&
            searchResults.resources.length === 0 &&
            searchResults.actions.length === 0 && (
              <div className="command-empty">
                <Sparkles size={22} />
                <p>No results found for "{query}". Try another search keyword.</p>
              </div>
            )}
        </div>

        <div className="command-footer">
          <span>Use <strong>↑</strong> <strong>↓</strong> to navigate</span>
          <span><strong>ESC</strong> to close</span>
        </div>
      </div>
    </div>
  );
}
