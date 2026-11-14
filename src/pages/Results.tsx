import { useState } from "react";
import { exams, questions } from "../data";
import { demoSession } from "../state";
import { Button, Icon, navigate } from "../components/ui";
import { ExamRow } from "./Student";
import { PageTitle, Shell } from "../components/workspace";

export function Results() {
  const [tab, setTab] = useState("breakdown");
  const exam = exams.find((item) => item.id === demoSession.selectedExamId) ?? exams[0]!;
  const correct = questions.filter(
    (question, index) => demoSession.latestSubmission[index] === question.answer,
  ).length;
  const answered = Object.keys(demoSession.latestSubmission).length;
  const incorrect = Math.max(0, answered - correct);
  const unanswered = questions.length - answered;
  const score = (correct / questions.length) * exam.marks;
  const percentage = Math.round((score / exam.marks) * 100);
  const topicPerformance = [...new Set(questions.map((question) => question.topic))].map(
    (topic) => {
      const topicQuestions = questions.filter((question) => question.topic === topic);
      const topicCorrect = topicQuestions.filter(
        (question) => demoSession.latestSubmission[questions.indexOf(question)] === question.answer,
      ).length;
      return [topic, Math.round((topicCorrect / topicQuestions.length) * 100)] as const;
    },
  );
  return (
    <Shell role="student" route="results">
      <PageTitle
        eyebrow="RESULT · DEMONSTRATION DATA"
        title={
          answered ? "Your demonstration result is ready." : "No submitted attempt in this session."
        }
        subtitle="Cell Biology & Genetics · Completed May 26, 2025"
      />
      <section className="result-hero">
        <div className="grade-orbit">
          <div>
            <strong>{percentage}</strong>
            <span>%</span>
            <small>DEMO SCORE</small>
          </div>
        </div>
        <div className="result-title">
          <span>YOUR RESULT</span>
          <h2>
            {score.toFixed(0)} <small>/ {exam.marks} marks</small>
          </h2>
          <p>
            This score is calculated in your browser from the sample questions and is not a saved or
            official result.
          </p>
          <Button variant="dark" onClick={() => navigate("discover")} icon="arrow">
            Find another exam
          </Button>
        </div>
        <div className="result-stats">
          <div>
            <i className="correct"></i>
            <span>
              CORRECT<strong>{correct}</strong>
            </span>
          </div>
          <div>
            <i className="wrong"></i>
            <span>
              INCORRECT<strong>{incorrect}</strong>
            </span>
          </div>
          <div>
            <i className="empty"></i>
            <span>
              UNANSWERED<strong>{unanswered}</strong>
            </span>
          </div>
        </div>
      </section>
      <div className="result-tabs">
        <button className={tab === "breakdown" ? "active" : ""} onClick={() => setTab("breakdown")}>
          Performance breakdown
        </button>
        <button className={tab === "review" ? "active" : ""} onClick={() => setTab("review")}>
          Question review
        </button>
        <button className={tab === "history" ? "active" : ""} onClick={() => setTab("history")}>
          Previous results
        </button>
      </div>
      {tab === "breakdown" && (
        <div className="breakdown-grid">
          <section className="panel span-2">
            <div className="panel-head">
              <div>
                <span>BY TOPIC</span>
                <h2>Where your marks came from</h2>
              </div>
            </div>
            {topicPerformance.map(([x, n]) => (
              <div className="topic-bar" key={x}>
                <span>{x}</span>
                <div>
                  <i style={{ width: `${n}%` }}></i>
                </div>
                <b>{n}%</b>
              </div>
            ))}
          </section>
          <section className="panel">
            <div className="panel-head">
              <div>
                <span>NEXT STEP</span>
                <h2>Focus area</h2>
              </div>
            </div>
            <div className="focus-topic">
              <Icon name="spark" />
              <b>Cell transport</b>
              <p>Review osmosis, tonicity, and active transport mechanisms.</p>
              <button onClick={() => setTab("review")}>
                Review answers <Icon name="arrow" size={15} />
              </button>
            </div>
          </section>
        </div>
      )}
      {tab === "review" && (
        <div className="review-list">
          {questions.map((q, i) => (
            <article key={q.id}>
              <div className="review-number">{i + 1}</div>
              <div>
                <span
                  className={
                    demoSession.latestSubmission[i] === undefined
                      ? ""
                      : demoSession.latestSubmission[i] === q.answer
                        ? "correct-text"
                        : "wrong-text"
                  }
                >
                  {demoSession.latestSubmission[i] === undefined
                    ? "Unanswered"
                    : demoSession.latestSubmission[i] === q.answer
                      ? "Correct"
                      : "Incorrect"}{" "}
                  ? {q.topic}
                </span>
                <h3>{q.text}</h3>
                <p>
                  <b>Your answer:</b>{" "}
                  {demoSession.latestSubmission[i] === undefined
                    ? "Not answered"
                    : q.options[demoSession.latestSubmission[i]]}
                </p>
                <div className="explanation">
                  <Icon name="spark" />
                  <p>
                    <b>Explanation</b>
                    {q.explanation}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
      {tab === "history" && (
        <section className="panel">
          <div className="history-table">
            {exams
              .filter((x) => x.status === "Completed")
              .map((x) => (
                <ExamRow exam={x} key={x.id} />
              ))}
          </div>
        </section>
      )}
    </Shell>
  );
}
