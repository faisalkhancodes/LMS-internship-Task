import React, { useState } from "react";
import { CheckCircle2, XCircle, HelpCircle, Award, Sparkles } from "lucide-react";
import { useLearning } from "../context/LearningContext";

export default function InteractiveQuiz({ quiz, courseId, lessonIndex }) {
  const { quizAnswers, recordQuizAnswer } = useLearning();
  const quizKey = `${courseId}-${lessonIndex}`;
  const previousResult = quizAnswers[quizKey];

  const [selectedIdx, setSelectedIdx] = useState(null);
  const [submitted, setSubmitted] = useState(previousResult !== undefined);

  if (!quiz) return null;

  const handleSelect = (idx) => {
    if (submitted) return;
    setSelectedIdx(idx);
  };

  const handleSubmit = () => {
    if (selectedIdx === null || submitted) return;
    const isCorrect = selectedIdx === quiz.correct;
    setSubmitted(true);
    recordQuizAnswer(courseId, lessonIndex, isCorrect);
  };

  const handleRetry = () => {
    setSubmitted(false);
    setSelectedIdx(null);
  };

  const isCorrect = selectedIdx === quiz.correct || previousResult === true;

  return (
    <div className="quiz-box">
      <div className="quiz-header">
        <div className="quiz-tag">
          <HelpCircle size={15} />
          <span>KNOWLEDGE CHECK</span>
        </div>
        <span className="quiz-xp-badge">
          <Sparkles size={13} /> +25 XP
        </span>
      </div>

      <h4 className="quiz-question">{quiz.question}</h4>

      <div className="quiz-options">
        {quiz.options.map((opt, idx) => {
          let stateClass = "";
          if (submitted) {
            if (idx === quiz.correct) {
              stateClass = "option-correct";
            } else if (idx === selectedIdx) {
              stateClass = "option-wrong";
            }
          } else if (idx === selectedIdx) {
            stateClass = "option-selected";
          }

          return (
            <button
              key={idx}
              className={`quiz-option ${stateClass}`}
              onClick={() => handleSelect(idx)}
              disabled={submitted}
            >
              <span className="option-index">
                {String.fromCharCode(65 + idx)}
              </span>
              <span className="option-text">{opt}</span>
              {submitted && idx === quiz.correct && (
                <CheckCircle2 size={17} className="status-icon icon-correct" />
              )}
              {submitted && idx === selectedIdx && idx !== quiz.correct && (
                <XCircle size={17} className="status-icon icon-wrong" />
              )}
            </button>
          );
        })}
      </div>

      {submitted ? (
        <div className={`quiz-feedback ${isCorrect ? "feedback-success" : "feedback-error"}`}>
          <div className="feedback-title">
            {isCorrect ? (
              <>
                <Award size={18} /> Correct! Knowledge Check Passed
              </>
            ) : (
              <>
                <XCircle size={18} /> Review Concept & Try Again
              </>
            )}
          </div>
          <p className="feedback-explanation">{quiz.explanation}</p>
          {!isCorrect && (
            <button className="button button-secondary retry-btn" onClick={handleRetry}>
              Try Again
            </button>
          )}
        </div>
      ) : (
        <div className="quiz-actions">
          <button
            className="button button-primary submit-quiz-btn"
            disabled={selectedIdx === null}
            onClick={handleSubmit}
          >
            Check Answer
          </button>
        </div>
      )}
    </div>
  );
}
