import React from "react";
import {
  ShieldCheck,
  BrainCircuit,
  Zap,
  Sparkles,
  Code2,
  Clock3,
  GraduationCap,
  ArrowRight,
  ArrowUpRight,
  Bookmark,
  CheckCircle2,
} from "lucide-react";
import { useLearning } from "../context/LearningContext";

export default function CourseCard({ course, onOpen, compact = false }) {
  const { toggleBookmark } = useLearning();

  const categoryClass = course.category.toLowerCase().replace(/[^a-z]+/g, "-");

  const progress = course.completed
    ? 100
    : course.lessons?.length
    ? Math.round(((course.completedLessons?.length || 0) / course.lessons.length) * 100)
    : 0;

  const getCategoryIcon = () => {
    switch (course.category) {
      case "Security":
        return <ShieldCheck />;
      case "AI & Data":
        return <BrainCircuit />;
      case "Cloud":
        return <Zap />;
      case "Design":
        return <Sparkles />;
      default:
        return <Code2 />;
    }
  };

  const instructorInitial = course.instructor
    ? course.instructor.split(" ").slice(-1)[0].slice(0, 1)
    : "I";

  return (
    <article className={`course-card ${compact ? "course-card-compact" : ""}`}>
      <div className={`course-art course-art-${categoryClass}`} aria-hidden="true">
        <span className="art-orbit art-orbit-one" />
        <span className="art-orbit art-orbit-two" />
        <span className="art-icon">{getCategoryIcon()}</span>
        <span className="art-label">{course.category}</span>
        {course.completed && (
          <span className="completed-badge">
            <CheckCircle2 size={13} /> Completed
          </span>
        )}
      </div>

      <div className="course-card-body">
        <div className="course-meta">
          <span className="level-label">{course.level}</span>
          <button
            className={`bookmark-btn ${course.bookmarked ? "bookmarked" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              toggleBookmark(course.id);
            }}
            title={course.bookmarked ? "Remove from saved" : "Save course"}
            aria-label="Save course"
          >
            <Bookmark size={15} fill={course.bookmarked ? "currentColor" : "none"} />
          </button>
          <span className="rating">
            <span aria-hidden="true">★</span> {course.rating}
          </span>
        </div>

        <h3 onClick={() => onOpen(course)} className="course-card-title">
          {course.title}
        </h3>
        <p className="course-description">{course.description}</p>

        {course.skills && course.skills.length > 0 && !compact && (
          <div className="course-skills-pills">
            {course.skills.slice(0, 3).map((skill) => (
              <span key={skill} className="skill-pill">
                {skill}
              </span>
            ))}
            {course.skills.length > 3 && (
              <span className="skill-pill-more">+{course.skills.length - 3}</span>
            )}
          </div>
        )}

        <div className="course-details">
          <span>
            <Clock3 size={15} /> {course.duration}
          </span>
          <span>
            <GraduationCap size={16} /> {course.students} learners
          </span>
        </div>

        {(course.enrolled || compact) && (
          <div className="course-progress">
            <div className="progress-copy">
              <span>{course.completed ? "Mastered" : "Your progress"}</span>
              <strong>{progress}%</strong>
            </div>
            <div className="progress-track">
              <span
                style={{
                  width: `${progress}%`,
                  background: course.completed
                    ? "linear-gradient(90deg, #1ca681, #34d399)"
                    : "linear-gradient(90deg, #6758e8, #8175ed)",
                }}
              />
            </div>
          </div>
        )}

        <div className="course-card-footer">
          <div className="instructor-avatar">{instructorInitial}</div>
          <div className="instructor-meta">
            <span className="instructor-name">{course.instructor}</span>
            {course.role && <span className="instructor-role">{course.role}</span>}
          </div>
          <button
            className="icon-button card-arrow"
            onClick={() => onOpen(course)}
            aria-label={`${course.enrolled ? "Continue" : "Explore"} ${course.title}`}
          >
            <ArrowUpRight size={19} />
          </button>
        </div>
      </div>

      <button className="course-action" onClick={() => onOpen(course)}>
        {course.completed
          ? "Review course & Certificate"
          : course.enrolled
          ? "Continue learning"
          : "Enroll & Explore"}
        <ArrowRight size={16} />
      </button>
    </article>
  );
}
