import React, { useState, useEffect } from "react";
import {
  X,
  Play,
  Check,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Terminal as TerminalIcon,
  HelpCircle,
  BookOpen,
  FileText,
  Award,
  Sparkles,
  Clock3,
  Copy,
} from "lucide-react";
import { useLearning } from "../context/LearningContext";
import InteractiveTerminal from "./InteractiveTerminal";
import InteractiveQuiz from "./InteractiveQuiz";

export default function CourseModal({ course, onClose, onOpenCertificate }) {
  const {
    completeLesson,
    completeCourse,
    notes,
    saveNote,
    addToast,
  } = useLearning();

  // Find first uncompleted lesson
  const initialLessonIdx = Math.max(
    0,
    course.lessons?.findIndex((_, idx) => !course.completedLessons?.includes(idx)) || 0
  );

  const [activeTab, setActiveTab] = useState("overview"); // 'overview' | 'terminal' | 'quiz' | 'notes'
  const [currentLessonIdx, setCurrentLessonIdx] = useState(initialLessonIdx >= 0 ? initialLessonIdx : 0);
  const [copiedCode, setCopiedCode] = useState(false);

  // Lesson note state
  const noteKey = `${course.id}-${currentLessonIdx}`;
  const [currentNote, setCurrentNote] = useState(notes[noteKey] || "");

  useEffect(() => {
    setCurrentNote(notes[noteKey] || "");
  }, [noteKey, notes]);

  const currentLesson = course.lessons?.[currentLessonIdx] || course.lessons?.[0];
  const isLessonDone = course.completedLessons?.includes(currentLessonIdx);
  const progressPct = course.completed
    ? 100
    : course.lessons?.length
    ? Math.round(((course.completedLessons?.length || 0) / course.lessons.length) * 100)
    : 0;

  // Escape key handler
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleSaveNote = () => {
    saveNote(course.id, currentLessonIdx, currentNote);
    addToast("Note Saved", "Your module notes have been saved.", "info");
  };

  const handleCopyCode = (snippet) => {
    if (snippet) {
      navigator.clipboard?.writeText(snippet);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const handleCompleteCurrentLesson = () => {
    completeLesson(course.id, currentLessonIdx);
    // If not last lesson, auto-advance
    if (currentLessonIdx < course.lessons.length - 1) {
      setCurrentLessonIdx((prev) => prev + 1);
    }
  };

  const handleFinishCourse = () => {
    completeCourse(course.id);
    if (onOpenCertificate) {
      onOpenCertificate(course);
    }
  };

  const categorySlug = course.category.toLowerCase().replace(/[^a-z]+/g, "-");

  return (
    <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <section className="modal-panel course-modal" role="dialog" aria-modal="true" aria-labelledby="course-modal-title">
        <button className="icon-button modal-close" onClick={onClose} aria-label="Close course">
          <X size={20} />
        </button>

        {/* Modal Banner */}
        <div className={`modal-course-banner course-art-${categorySlug}`}>
          <div className="modal-banner-left">
            <span className="modal-banner-icon">
              <Play size={22} fill="currentColor" />
            </span>
            <div>
              <span className="banner-category-tag">
                {course.category} · {course.level} · {course.duration}
              </span>
              <h2 id="course-modal-title">{course.title}</h2>
            </div>
          </div>
          <div className="modal-banner-progress">
            <div className="modal-progress-badge">
              {progressPct}%
              <span>complete</span>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="modal-content course-modal-grid">
          {/* Left Column: Lesson Player & Interactive Tabs */}
          <div className="modal-main-column">
            {/* Module Header Bar */}
            <div className="module-header-bar">
              <div>
                <span className="eyebrow">MODULE {String(currentLessonIdx + 1).padStart(2, "0")} OF {course.lessons.length}</span>
                <h3>{currentLesson.title}</h3>
                <span className="lesson-duration-badge">
                  <Clock3 size={12} /> {currentLesson.duration || "35 min"}
                </span>
              </div>

              {isLessonDone && (
                <div className="module-completed-chip">
                  <CheckCircle2 size={16} /> Completed
                </div>
              )}
            </div>

            {/* Tab Navigation */}
            <div className="lesson-tab-nav">
              <button
                className={`lesson-tab ${activeTab === "overview" ? "active" : ""}`}
                onClick={() => setActiveTab("overview")}
              >
                <BookOpen size={15} /> Lesson Guide
              </button>

              {currentLesson.terminalTask && (
                <button
                  className={`lesson-tab ${activeTab === "terminal" ? "active" : ""}`}
                  onClick={() => setActiveTab("terminal")}
                >
                  <TerminalIcon size={15} /> Hands-on Lab
                </button>
              )}

              {currentLesson.quiz && (
                <button
                  className={`lesson-tab ${activeTab === "quiz" ? "active" : ""}`}
                  onClick={() => setActiveTab("quiz")}
                >
                  <HelpCircle size={15} /> Knowledge Check
                </button>
              )}

              <button
                className={`lesson-tab ${activeTab === "notes" ? "active" : ""}`}
                onClick={() => setActiveTab("notes")}
              >
                <FileText size={15} /> My Notes
              </button>
            </div>

            {/* Tab Contents */}
            <div className="lesson-tab-body">
              {activeTab === "overview" && (
                <div className="tab-pane tab-overview">
                  <p className="lesson-overview-text">{currentLesson.overview}</p>

                  {currentLesson.keyTakeaways && (
                    <div className="takeaways-box">
                      <h4>Key Architectural Takeaways</h4>
                      <ul>
                        {currentLesson.keyTakeaways.map((point, idx) => (
                          <li key={idx}>
                            <Sparkles size={14} className="takeaway-icon" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {currentLesson.codeSnippet && (
                    <div className="code-snippet-box">
                      <div className="code-snippet-header">
                        <span>Production Code Reference</span>
                        <button
                          className="copy-code-btn"
                          onClick={() => handleCopyCode(currentLesson.codeSnippet)}
                        >
                          {copiedCode ? <Check size={12} /> : <Copy size={12} />}
                          {copiedCode ? "Copied" : "Copy"}
                        </button>
                      </div>
                      <pre>
                        <code>{currentLesson.codeSnippet}</code>
                      </pre>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "terminal" && currentLesson.terminalTask && (
                <div className="tab-pane tab-terminal">
                  <InteractiveTerminal
                    task={currentLesson.terminalTask}
                    courseTitle={course.title}
                  />
                </div>
              )}

              {activeTab === "quiz" && currentLesson.quiz && (
                <div className="tab-pane tab-quiz">
                  <InteractiveQuiz
                    quiz={currentLesson.quiz}
                    courseId={course.id}
                    lessonIndex={currentLessonIdx}
                  />
                </div>
              )}

              {activeTab === "notes" && (
                <div className="tab-pane tab-notes">
                  <div className="notes-editor-wrapper">
                    <h4>Personal Study Notes for Module {currentLessonIdx + 1}</h4>
                    <p>Notes are automatically preserved in your private browser sandbox.</p>
                    <textarea
                      className="notes-textarea"
                      placeholder="Jot down commands, architectural insights, or personal reminders..."
                      value={currentNote}
                      onChange={(e) => setCurrentNote(e.target.value)}
                      rows={8}
                    />
                    <div className="notes-actions">
                      <button className="button button-primary" onClick={handleSaveNote}>
                        Save Note
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Lesson Navigation & Actions */}
            <div className="lesson-footer-bar">
              <div className="lesson-step-buttons">
                <button
                  className="button button-secondary"
                  disabled={currentLessonIdx === 0}
                  onClick={() => setCurrentLessonIdx((prev) => prev - 1)}
                >
                  <ChevronLeft size={16} /> Previous Module
                </button>

                <button
                  className="button button-secondary"
                  disabled={currentLessonIdx === course.lessons.length - 1}
                  onClick={() => setCurrentLessonIdx((prev) => prev + 1)}
                >
                  Next Module <ChevronRight size={16} />
                </button>
              </div>

              <div className="lesson-primary-actions">
                <button
                  className="button button-secondary"
                  onClick={handleCompleteCurrentLesson}
                  disabled={isLessonDone}
                >
                  {isLessonDone ? (
                    <>
                      <CheckCircle2 size={16} /> Module Completed
                    </>
                  ) : (
                    <>
                      <Check size={16} /> Mark Module Complete
                    </>
                  )}
                </button>

                {course.completed ? (
                  <button
                    className="button button-primary cert-btn"
                    onClick={() => {
                      onClose();
                      if (onOpenCertificate) onOpenCertificate(course);
                    }}
                  >
                    <Award size={16} /> View Certificate
                  </button>
                ) : (
                  <button
                    className="button button-primary"
                    onClick={handleFinishCourse}
                  >
                    Complete Course <Sparkles size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Curriculum Directory */}
          <div className="modal-curriculum-column">
            <div className="curriculum-header">
              <h3>Curriculum Syllabus</h3>
              <span>
                {course.completedLessons?.length || 0} of {course.lessons.length} complete
              </span>
            </div>

            <div className="curriculum-list">
              {course.lessons.map((item, index) => {
                const isCompleted = course.completedLessons?.includes(index);
                const isCurrent = currentLessonIdx === index;
                return (
                  <button
                    key={item.id || index}
                    className={`curriculum-item ${isCurrent ? "curriculum-current" : ""} ${
                      isCompleted ? "curriculum-done" : ""
                    }`}
                    onClick={() => {
                      setCurrentLessonIdx(index);
                      setActiveTab("overview");
                    }}
                  >
                    <div className="curriculum-status-icon">
                      {isCompleted ? (
                        <Check size={14} />
                      ) : (
                        <Play size={11} fill="currentColor" />
                      )}
                    </div>
                    <div className="curriculum-item-info">
                      <span className="curriculum-num">
                        MODULE {String(index + 1).padStart(2, "0")}
                      </span>
                      <strong>{item.title}</strong>
                      <span className="curriculum-duration">{item.duration}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="curriculum-instructor-card">
              <span className="curriculum-inst-label">COURSE INSTRUCTOR</span>
              <strong>{course.instructor}</strong>
              <p>{course.role || "Lead Instructor at CyberSNova"}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
