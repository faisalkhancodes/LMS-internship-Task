import React, { useState, useMemo } from "react";
import { Search, Filter, Bookmark, Sparkles, BookOpen } from "lucide-react";
import { useLearning } from "../context/LearningContext";
import CourseCard from "../components/CourseCard";
import EmptyState from "../components/EmptyState";

export default function CatalogPage({ onOpenCourse, initialQuery = "" }) {
  const { courses } = useLearning();

  const [category, setCategory] = useState("All");
  const [level, setLevel] = useState("All");
  const [onlyBookmarked, setOnlyBookmarked] = useState(false);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [sortBy, setSortBy] = useState("recommended");

  const categories = ["All", "Security", "Software", "AI & Data", "Cloud", "Design"];
  const levels = ["All", "Beginner", "Intermediate", "Advanced"];

  const filteredCourses = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    const list = courses.filter((course) => {
      const matchCat = category === "All" || course.category === category;
      const matchLevel = level === "All" || course.level === level;
      const matchBookmark = !onlyBookmarked || course.bookmarked;
      const matchSearch =
        !q ||
        `${course.title} ${course.description} ${course.instructor} ${course.skills?.join(" ")}`
          .toLowerCase()
          .includes(q);

      return matchCat && matchLevel && matchBookmark && matchSearch;
    });

    if (sortBy === "popular") {
      return [...list].sort((a, b) => {
        const parseStudents = (str) => {
          const num = parseFloat(str);
          return str.toLowerCase().endsWith("k") ? num * 1000 : num;
        };
        return parseStudents(b.students) - parseStudents(a.students);
      });
    }

    if (sortBy === "rating") {
      return [...list].sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
    }

    if (sortBy === "shortest") {
      return [...list].sort((a, b) => parseInt(a.duration, 10) - parseInt(b.duration, 10));
    }

    return list;
  }, [courses, category, level, onlyBookmarked, searchQuery, sortBy]);

  const clearFilters = () => {
    setCategory("All");
    setLevel("All");
    setOnlyBookmarked(false);
    setSearchQuery("");
  };

  return (
    <div className="catalog-page">
      <div className="catalog-toolbar-panel">
        {/* Category Tabs */}
        <div className="category-tabs">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`category-tab ${category === cat ? "category-tab-active" : ""}`}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Filter Controls Row */}
        <div className="catalog-controls-row">
          <div className="catalog-filter-group">
            <span className="control-label">Level:</span>
            <div className="level-pills">
              {levels.map((lvl) => (
                <button
                  key={lvl}
                  className={`level-pill-btn ${level === lvl ? "active" : ""}`}
                  onClick={() => setLevel(lvl)}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          <div className="catalog-actions-right">
            <button
              className={`button button-secondary bookmark-toggle-btn ${
                onlyBookmarked ? "active" : ""
              }`}
              onClick={() => setOnlyBookmarked(!onlyBookmarked)}
            >
              <Bookmark size={15} fill={onlyBookmarked ? "currentColor" : "none"} />
              <span>Saved Only</span>
            </button>

            <label className="sort-select">
              <span>Sort by:</span>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="recommended">Recommended</option>
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="shortest">Shortest Duration</option>
              </select>
            </label>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="catalog-results-header">
        <div className="results-count">
          <strong>{filteredCourses.length}</strong> paths found
          {category !== "All" && <span> in {category}</span>}
          {level !== "All" && <span> · {level}</span>}
          {onlyBookmarked && <span> · Saved paths only</span>}
        </div>

        {(category !== "All" || level !== "All" || onlyBookmarked || searchQuery) && (
          <button className="clear-filters-btn" onClick={clearFilters}>
            Clear all filters
          </button>
        )}
      </div>

      {/* Course Grid */}
      {filteredCourses.length > 0 ? (
        <div className="course-grid">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} onOpen={onOpenCourse} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Search}
          title="No engineering courses found"
          description="Try broadening your search query or reset your level and category filters."
          action="Reset all filters"
          onAction={clearFilters}
        />
      )}
    </div>
  );
}
