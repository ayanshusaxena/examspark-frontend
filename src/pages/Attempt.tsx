import { useEffect, useState } from "react";
import { exams, questions } from "../data";
import { demoSession } from "../state";
import { Button, Icon, Logo, navigate } from "../components/ui";
import { useDialogFocus } from "../components/useDialogFocus";

export function Attempt() {
  const exam = exams.find((item) => item.id === demoSession.selectedExamId) ?? exams[0]!;
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [review, setReview] = useState<number[]>([]);
  const [seconds, setSeconds] = useState(exam.duration * 60);
  const [modal, setModal] = useState<"submit" | "warning" | "expired" | null>(null);
  useDialogFocus(
    modal !== null,
    () => setModal((current) => (current === "expired" ? current : null)),
    ".modal",
    modal !== "expired",
  );
  useEffect(() => {
    const id = window.setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          window.clearInterval(id);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);
  useEffect(() => {
    if (seconds === 0) setModal("expired");
  }, [seconds]);
  useEffect(() => {
    const fn = () => document.hidden && setModal("warning");
    document.addEventListener("visibilitychange", fn);
    return () => document.removeEventListener("visibilitychange", fn);
  }, []);
  const q = questions[current] ?? questions[0]!;
  const mins = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");
  const toggleReview = () =>
    setReview((r) => (r.includes(current) ? r.filter((x) => x !== current) : [...r, current]));
  return (
    <div className="attempt-page">
      <header className="attempt-head">
        <Logo inverse />
        <div>
          <small>BIO–204</small>
          <b>{exam.title}</b>
        </div>
        <div className="attempt-progress">
          <span>
            {Object.keys(answers).length} of {questions.length} answered
          </span>
          <div>
            <i
              style={{
                width: `${Math.max(8, (Object.keys(answers).length / questions.length) * 100)}%`,
              }}
            ></i>
          </div>
        </div>
        <div className={`timer ${seconds < 300 ? "urgent" : ""}`} aria-live="off">
          <Icon name="clock" />
          <span>
            <small>TIME REMAINING</small>
            <strong>
              {mins} : {secs}
            </strong>
          </span>
        </div>
        <button className="submit-top" onClick={() => setModal("submit")}>
          Finish exam
        </button>
      </header>
      <div className="attempt-body">
        <aside className="question-nav">
          <span id="question-map-label">QUESTION MAP</span>
          <div className="number-map large" aria-labelledby="question-map-label">
            {Array.from({ length: questions.length }, (_, i) => (
              <button
                onClick={() => setCurrent(i)}
                aria-label={`Go to question ${i + 1}`}
                aria-current={current === i ? "step" : undefined}
                className={`${current === i ? "current" : ""} ${answers[i] !== undefined ? "done" : ""} ${review.includes(i) ? "review" : ""}`}
                key={i}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <div className="map-legend">
            <span>
              <i className="done"></i>Answered
            </span>
            <span>
              <i></i>Unanswered
            </span>
            <span>
              <i className="review"></i>Review
            </span>
          </div>
          <div className="focus-note">
            <Icon name="shield" />
            <div>
              <b>Focus mode active</b>
              <p>Switching tabs shows a warning in this demo.</p>
            </div>
          </div>
        </aside>
        <main className="question-work">
          <div className="question-meta">
            <span>
              QUESTION {current + 1} OF {questions.length}
            </span>
            <em>{q.difficulty} · 2 marks</em>
          </div>
          <h1>{q.text}</h1>
          <p className="choose">Choose one answer.</p>
          <div className="option-list">
            {q.options.map((x, i) => (
              <button
                className={answers[current] === i ? "selected" : ""}
                aria-pressed={answers[current] === i}
                onClick={() => setAnswers({ ...answers, [current]: i })}
                key={x}
              >
                <b>{String.fromCharCode(65 + i)}</b>
                <span>{x}</span>
                <i>{answers[current] === i && <Icon name="check" />}</i>
              </button>
            ))}
          </div>
          <div className="question-actions">
            <button
              className={`review-btn ${review.includes(current) ? "active" : ""}`}
              onClick={toggleReview}
            >
              <Icon name="flag" />
              {review.includes(current) ? "Marked for review" : "Mark for review"}
            </button>
            <div>
              <Button
                variant="secondary"
                disabled={current === 0}
                onClick={() => setCurrent((c) => Math.max(0, c - 1))}
              >
                Previous
              </Button>
              <Button
                onClick={() =>
                  current === questions.length - 1 ? setModal("submit") : setCurrent((c) => c + 1)
                }
                icon="arrow"
              >
                {current === questions.length - 1 ? "Review & submit" : "Next question"}
              </Button>
            </div>
          </div>
        </main>
      </div>
      {modal && (
        <div className="modal-backdrop">
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="exam-modal-title"
            aria-describedby="exam-modal-description"
          >
            <div className={`modal-icon ${modal}`}>
              <Icon
                name={modal === "warning" || modal === "expired" ? "shield" : "check"}
                size={28}
              />
            </div>
            <span>
              {modal === "warning"
                ? "FOCUS NOTICE"
                : modal === "expired"
                  ? "TIME EXPIRED"
                  : "READY TO FINISH?"}
            </span>
            <h2 id="exam-modal-title">
              {modal === "warning"
                ? "You left the examination tab."
                : modal === "expired"
                  ? "Your time has ended."
                  : "Submit your examination?"}
            </h2>
            <p id="exam-modal-description">
              {modal === "warning"
                ? "This is a demonstration warning. In a real system, tab changes may be recorded according to exam rules."
                : modal === "expired"
                  ? `The demonstration has stopped accepting answers. Your ${Object.keys(answers).length} answered questions are ready for the result preview.`
                  : `You answered ${Object.keys(answers).length} of ${questions.length} questions. You have ${questions.length - Object.keys(answers).length} unanswered and ${review.length} marked for review.`}
            </p>
            <div className="modal-actions">
              {modal !== "expired" && (
                <Button variant="secondary" onClick={() => setModal(null)}>
                  {modal === "warning" ? "Return to exam" : "Keep reviewing"}
                </Button>
              )}
              {modal === "submit" && (
                <Button
                  onClick={() => {
                    demoSession.latestSubmission = answers;
                    navigate("results");
                  }}
                  icon="arrow"
                >
                  Submit now
                </Button>
              )}
              {modal === "expired" && (
                <Button
                  onClick={() => {
                    demoSession.latestSubmission = answers;
                    navigate("results");
                  }}
                  icon="arrow"
                >
                  View result preview
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
