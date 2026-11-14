import { useState } from "react";
import { exams, questions, type Exam } from "../data";
import { demoSession } from "../state";
import { Button, Icon, navigate } from "../components/ui";
import { PageTitle, Shell } from "../components/workspace";

export function StudentDashboard() {
  const featuredExam = exams[0]!;
  return (
    <Shell role="student" route="student">
      <PageTitle
        eyebrow="MONDAY, MAY 26"
        title="Good morning, Maya."
        subtitle="One exam is live and ready when you are."
        action={
          <Button variant="secondary" onClick={() => navigate("discover")} icon="search">
            Find an exam
          </Button>
        }
      />
      <section className="active-exam">
        <div className="active-copy">
          <div className="live-badge">
            <i></i> AVAILABLE NOW
          </div>
          <span className="exam-code">BIO–204 · BIOLOGY</span>
          <h2>
            Cell Biology
            <br />& Genetics
          </h2>
          <div className="exam-facts">
            <span>
              <Icon name="clock" />
              {featuredExam.duration} minutes
            </span>
            <span>
              <Icon name="file" />
              {questions.length} questions
            </span>
            <span>
              <Icon name="spark" />
              {featuredExam.marks} marks
            </span>
          </div>
          <Button
            onClick={() => {
              demoSession.selectedExamId = 1;
              navigate("prepare");
            }}
            icon="arrow"
          >
            View examination
          </Button>
        </div>
        <div className="active-art">
          <div className="cell cell-a"></div>
          <div className="cell cell-b"></div>
          <div className="cell cell-c"></div>
          <span>READY</span>
          <strong>01</strong>
        </div>
      </section>
      <div className="dashboard-grid">
        <section className="panel span-2">
          <div className="panel-head">
            <div>
              <span>NEXT IN LINE</span>
              <h2>Upcoming examinations</h2>
            </div>
            <button onClick={() => navigate("discover")}>
              View all <Icon name="arrow" size={15} />
            </button>
          </div>
          <div className="exam-list">
            {exams
              .filter((x) => x.status === "Upcoming")
              .map((x) => (
                <ExamRow exam={x} key={x.id} />
              ))}
          </div>
        </section>
        <section className="panel">
          <div className="panel-head">
            <div>
              <span>YOUR PULSE</span>
              <h2>Recent results</h2>
            </div>
          </div>
          <div className="score-ring">
            <div>
              <strong>84</strong>
              <span>%</span>
            </div>
          </div>
          <div className="result-mini">
            <b>Physics: Waves & Optics</b>
            <span>67 / 80 marks · May 12</span>
          </div>
          <button className="wide-link" onClick={() => navigate("results")}>
            Open result <Icon name="arrow" size={15} />
          </button>
        </section>
        <section className="panel span-2">
          <div className="panel-head">
            <div>
              <span>ACTIVITY</span>
              <h2>Recent history</h2>
            </div>
          </div>
          <div className="history-table">
            <div className="table-row table-head">
              <span>Examination</span>
              <span>Date</span>
              <span>Score</span>
              <span>Status</span>
            </div>
            {exams
              .filter((x) => x.status === "Completed")
              .map((x, i) => (
                <div className="table-row" key={x.id}>
                  <span>
                    <i style={{ background: x.accent }}></i>
                    <b>{x.title}</b>
                    <small>{x.code}</small>
                  </span>
                  <span>{x.date}</span>
                  <span>
                    <strong>{i ? "42 / 50" : "67 / 80"}</strong>
                  </span>
                  <span>
                    <em className="status completed">Completed</em>
                  </span>
                </div>
              ))}
          </div>
        </section>
        <section className="panel">
          <div className="panel-head">
            <div>
              <span>NOTICES</span>
              <h2>For your attention</h2>
            </div>
          </div>
          <div className="notice">
            <i className="notice-icon">
              <Icon name="calendar" />
            </i>
            <div>
              <b>Schedule updated</b>
              <p>Mathematics II now begins at 10:00 AM.</p>
              <small>18 minutes ago</small>
            </div>
          </div>
          <div className="notice">
            <i className="notice-icon violet">
              <Icon name="book" />
            </i>
            <div>
              <b>Result published</b>
              <p>Your English Composition result is ready.</p>
              <small>Yesterday</small>
            </div>
          </div>
        </section>
      </div>
    </Shell>
  );
}

export function ExamRow({ exam }: { exam: Exam }) {
  return (
    <button
      className="exam-row"
      onClick={() => {
        demoSession.selectedExamId = exam.id;
        navigate(exam.status === "Live" ? "prepare" : "discover");
      }}
    >
      <i className="subject-marker" style={{ background: exam.accent }}></i>
      <div className="exam-row-title">
        <small>{exam.code}</small>
        <b>{exam.title}</b>
      </div>
      <div>
        <small>WHEN</small>
        <b>{exam.date}</b>
      </div>
      <div>
        <small>DURATION</small>
        <b>{exam.duration} min</b>
      </div>
      <em className={`status ${exam.status.toLowerCase()}`}>{exam.status}</em>
      <Icon name="arrow" />
    </button>
  );
}

export function Discover() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const shown = exams.filter(
    (x) =>
      x.status !== "Draft" &&
      (filter === "All" || x.status === filter) &&
      `${x.title} ${x.subject} ${x.code}`.toLowerCase().includes(query.trim().toLowerCase()),
  );
  return (
    <Shell role="student" route="discover">
      <PageTitle
        eyebrow="EXAM CATALOGUE"
        title="Find your next examination."
        subtitle="Browse available and scheduled examinations."
      />
      <div className="search-strip">
        <div className="search-box">
          <Icon name="search" />
          <input
            placeholder="Search by title, subject or code…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="filter-tabs">
          {["All", "Live", "Upcoming", "Completed"].map((x) => (
            <button className={filter === x ? "active" : ""} onClick={() => setFilter(x)} key={x}>
              {x}
            </button>
          ))}
        </div>
        <button
          className="filter-btn"
          aria-label="Clear catalogue filters"
          onClick={() => {
            setQuery("");
            setFilter("All");
          }}
        >
          <Icon name="filter" /> Clear filters
        </button>
      </div>
      <div className="catalogue-count">
        <span>{shown.length} examinations</span>
        <small>Demo catalogue · results are not real records</small>
      </div>
      <div className="exam-grid">
        {shown.map((x) => (
          <article className="exam-card" key={x.id}>
            <div className="card-topline" style={{ background: x.accent }}></div>
            <div className="exam-card-head">
              <span className="subject-symbol" style={{ color: x.accent }}>
                {x.subject.slice(0, 2).toUpperCase()}
              </span>
              <em className={`status ${x.status.toLowerCase()}`}>{x.status}</em>
            </div>
            <small>
              {x.code} · {x.subject.toUpperCase()}
            </small>
            <h2>{x.title}</h2>
            <p>{x.status === "Live" ? "Available until 4:30 PM today" : x.date}</p>
            <div className="card-facts">
              <span>
                <Icon name="clock" />
                {x.duration} min
              </span>
              <span>
                <Icon name="file" />
                {x.questions} questions
              </span>
              <span>
                <Icon name="spark" />
                {x.marks} marks
              </span>
            </div>
            <Button
              variant={x.status === "Completed" ? "secondary" : "primary"}
              onClick={() => {
                demoSession.selectedExamId = x.id;
                navigate(
                  x.status === "Completed"
                    ? "results"
                    : x.status === "Live"
                      ? "prepare"
                      : "discover",
                );
              }}
              icon="arrow"
            >
              {x.status === "Completed"
                ? "View result"
                : x.status === "Live"
                  ? "View details"
                  : "View schedule"}
            </Button>
          </article>
        ))}
        {shown.length === 0 && (
          <div className="empty-results">
            <Icon name="search" size={28} />
            <h2>No examinations match.</h2>
            <p>Try another keyword or clear the selected status.</p>
            <Button
              variant="secondary"
              onClick={() => {
                setQuery("");
                setFilter("All");
              }}
            >
              Clear search
            </Button>
          </div>
        )}
      </div>
    </Shell>
  );
}

export function Prepare() {
  const [agreed, setAgreed] = useState(false);
  const exam = exams.find((item) => item.id === demoSession.selectedExamId) ?? exams[0]!;
  return (
    <Shell role="student" route="discover">
      <button className="back-link inline" onClick={() => navigate("discover")}>
        ← Back to examinations
      </button>
      <div className="prepare-layout">
        <div className="prepare-main">
          <div className="prep-tag">
            <i></i>AVAILABLE NOW · UNTIL 4:30 PM
          </div>
          <span className="exam-code">BIO–204 · BIOLOGY</span>
          <h1>
            Cell Biology
            <br />& Genetics
          </h1>
          <p className="lead">
            This examination covers cell structure, transport, division, Mendelian genetics and
            molecular inheritance.
          </p>
          <div className="prep-metrics">
            <div>
              <Icon name="clock" />
              <span>
                DURATION<strong>{exam.duration} minutes</strong>
              </span>
            </div>
            <div>
              <Icon name="file" />
              <span>
                QUESTIONS<strong>{questions.length} multiple choice</strong>
              </span>
            </div>
            <div>
              <Icon name="spark" />
              <span>
                TOTAL<strong>{exam.marks} marks</strong>
              </span>
            </div>
          </div>
          <section className="instruction-block">
            <span>BEFORE YOU BEGIN</span>
            <h2>Examination instructions</h2>
            <ol>
              <li>You must complete the examination in one sitting.</li>
              <li>Choose one answer for each question. You may change it before submitting.</li>
              <li>Use “mark for review” to flag questions you want to revisit.</li>
              <li>
                This prototype timer is for demonstration only and does not submit automatically.
              </li>
              <li>Leaving this tab may trigger a demonstration warning.</li>
            </ol>
          </section>
        </div>
        <aside className="start-card">
          <div className="readiness">
            <span>READINESS CHECK</span>
            <strong>Almost ready</strong>
            <div>
              <i></i>
              <i></i>
              <i></i>
            </div>
          </div>
          <ul>
            <li>
              <Icon name="check" />
              Stable connection recommended
            </li>
            <li>
              <Icon name="check" />
              Timer begins after confirmation
            </li>
            <li>
              <Icon name="check" />
              Answers are saved in this session
            </li>
          </ul>
          <label className="confirm-check">
            <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
            <span>I have read the instructions and am ready to begin this demonstration.</span>
          </label>
          <Button
            disabled={!agreed}
            onClick={() => {
              demoSession.latestSubmission = {};
              navigate("attempt");
            }}
            icon="arrow"
          >
            Start examination
          </Button>
          <small>This prototype does not securely monitor or grade an exam.</small>
        </aside>
      </div>
    </Shell>
  );
}
