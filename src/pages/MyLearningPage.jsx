import React, { useState } from "react";
import {
  GraduationCap,
  BookOpen,
  CheckCircle2,
  Bookmark,
  Award,
  ArrowRight,
} from "lucide-react";
import { useLearning } from "../context/LearningContext";
import CourseCard from "../components/CourseCard";
import EmptyState from "../components/EmptyState";

export default function MyLearningPage({ onOpenCourse, onOpenCertificate, onNavigate }) {
  const {
    activeCourses,
    completedCourses,
    bookmarkedCourses,
    stats,
  } = useLearning();

  const [activeTab, setActiveTab] = useState("in-progress"); // 'in-progress' | 'saved' | 'completed'

  return (
    <div className="my-learning-page">
      {/* Learning Status Pill Bar */}
      <div className="learning-nav-tabs">
        <button
          className={`learning-tab ${activeTab === "in-progress" ? "active" : ""}`}
          onClick={() => setActiveTab("in-progress")}
        >
          <GraduationCap size={16} />
          <span>In Progress</span>
          <span className="tab-badge">{activeCourses.length}</span>
        </button>

        <button
          className={`learning-tab ${activeTab === "saved" ? "active" : ""}`}
          onClick={() => setActiveTab("saved")}
        >
          <Bookmark size={16} />
          <span>Saved Paths</span>
          <span className="tab-badge">{bookmarkedCourses.length}</span>
        </button>

        <button
          className={`learning-tab ${activeTab === "completed" ? "active" : ""}`}
          onClick={() => setActiveTab("completed")}
        >
          <CheckCircle2 size={16} />
          <span>Completed</span>
          <span className="tab-badge">{completedCourses.length}</span>
        </button>
      </div>

      {/* Tab: In Progress */}
      {activeTab === "in-progress" && (
        <section className="learning-tab-content">
          <div className="section-heading">
            <div>
              <span className="eyebrow">YOUR ACTIVE CURRICULUMS</span>
              <h2>Continue Your Training</h2>
            </div>
            <span className="count-pill">{activeCourses.length} active</span>
          </div>

          {activeCourses.length > 0 ? (
            <div className="course-grid">
              {activeCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onOpen={onOpenCourse}
                  compact
                />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={GraduationCap}
              title="No courses currently in progress"
              description="Explore the catalog to enroll in offensive cybersecurity, system architecture, or cloud infrastructure."
              action="Explore Catalog"
              onAction={() => onNavigate("catalog")}
            />
          )}
        </section>
      )}

      {/* Tab: Saved / Bookmarked */}
      {activeTab === "saved" && (
        <section className="learning-tab-content">
          <div className="section-heading">
            <div>
              <span className="eyebrow">SAVED FOR LATER</span>
              <h2>Bookmarked Curriculums</h2>
            </div>
            <span className="count-pill">{bookmarkedCourses.length} saved</span>
          </div>

          {bookmarkedCourses.length > 0 ? (
            <div className="course-grid">
              {bookmarkedCourses.map((course) => (
                <CourseCard key={course.id} course={course} onOpen={onOpenCourse} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={Bookmark}
              title="No saved courses yet"
              description="Click the bookmark icon on any course card in the catalog to save it for future study."
              action="Browse Courses"
              onAction={() => onNavigate("catalog")}
            />
          )}
        </section>
      )}

      {/* Tab: Completed */}
      {activeTab === "completed" && (
        <section className="learning-tab-content">
          <div className="section-heading">
            <div>
              <span className="eyebrow">COMPLETED SPECIALIZATIONS</span>
              <h2>Mastered Curriculums</h2>
            </div>
            <span className="count-pill">{completedCourses.length} finished</span>
          </div>

          {completedCourses.length > 0 ? (
            <div className="course-grid">
              {completedCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onOpen={onOpenCourse}
                  compact
                />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={Award}
              title="Your first certificate awaits"
              description="Complete all lesson modules and knowledge checks in an active path to claim your verified credential."
              action="Continue Training"
              onAction={() => setActiveTab("in-progress")}
            />
          )}
        </section>
      )}
    </div>
  );
}
