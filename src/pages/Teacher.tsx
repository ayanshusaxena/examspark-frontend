import { useState } from "react";
import { useDialogFocus } from "../components/useDialogFocus";
import { exams, questions } from "../data";
import { Button, Icon, navigate } from "../components/ui";
import { Metric, PageTitle, Shell } from "../components/workspace";

export function TeacherDashboard() {
  return (
    <Shell role="teacher" route="teacher">
      <PageTitle
        eyebrow="TEACHER OVERVIEW"
        title="Welcome back, Dr. Ford."
        subtitle="Your examination workspace is active and up to date."
        action={
          <Button onClick={() => navigate("create")} icon="plus">
            Create examination
          </Button>
        }
      />
      <div className="metric-grid">
        <Metric label="DRAFTS" value="04" note="2 edited this week" icon="file" />
        <Metric label="PUBLISHED" value="12" note="3 currently active" icon="spark" tone="violet" />
        <Metric
          label="SUBMISSIONS"
          value="186"
          note="+24 since yesterday"
          icon="users"
          tone="green"
        />
        <Metric
          label="AVG. SCORE"
          value="78%"
          note="Across published exams"
          icon="chart"
          tone="gold"
        />
      </div>
      <div className="dashboard-grid teacher-grid">
        <section className="panel span-2">
          <div className="panel-head">
            <div>
              <span>EXAMINATION FLOW</span>
              <h2>Your examinations</h2>
            </div>
            <button onClick={() => navigate("create")}>
              Manage all <Icon name="arrow" size={15} />
            </button>
          </div>
          <div className="history-table">
            <div className="table-row table-head">
              <span>Examination</span>
              <span>Participation</span>
              <span>Average</span>
              <span>Status</span>
            </div>
            {exams.slice(0, 4).map((x, i) => (
              <div className="table-row" key={x.id}>
                <span>
                  <i style={{ background: x.accent }}></i>
                  <b>{x.title}</b>
                  <small>{x.code}</small>
                </span>
                <span>{[42, 38, 29, 47][i]} students</span>
                <span>
                  <strong>
                    {[81, 74, 0, 84][i] || "—"}
                    {i !== 2 && "%"}
                  </strong>
                </span>
                <span>
                  <em className={`status ${x.status.toLowerCase()}`}>{x.status}</em>
                </span>
              </div>
            ))}
          </div>
        </section>
        <section className="panel">
          <div className="panel-head">
            <div>
              <span>RECENT ACTIVITY</span>
              <h2>What changed</h2>
            </div>
          </div>
          {[
            "Maya Chen submitted Biology",
            "3 questions added to MAT–210",
            "History exam was published",
            "Physics results exported",
          ].map((x, i) => (
            <div className="activity" key={x}>
              <i>{i + 1}</i>
              <div>
                <b>{x}</b>
                <small>{["4 min ago", "1 hour ago", "Yesterday", "May 23"][i]}</small>
              </div>
            </div>
          ))}
        </section>
      </div>
    </Shell>
  );
}

export function ExamManagement() {
  const [editing, setEditing] = useState(false);
  const [toast, setToast] = useState("");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  useDialogFocus(editing, () => setEditing(false), ".drawer");
  const shown = exams.filter(
    (exam) =>
      (status === "All" || exam.status === status) &&
      `${exam.title} ${exam.code} ${exam.subject}`
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  );
  return (
    <Shell role="teacher" route="create">
      <PageTitle
        eyebrow="EXAMINATION MANAGEMENT"
        title="Build and publish with clarity."
        subtitle="Create, schedule and maintain every examination."
        action={
          <Button onClick={() => setEditing(true)} icon="plus">
            New examination
          </Button>
        }
      />
      <div className="search-strip">
        <div className="search-box">
          <Icon name="search" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search examinations…"
          />
        </div>
        <div className="filter-tabs">
          {["All", "Draft", "Live", "Upcoming", "Completed"].map((item) => (
            <button
              className={status === item ? "active" : ""}
              onClick={() => setStatus(item)}
              key={item}
            >
              {item === "Live" ? "Published" : item === "Upcoming" ? "Scheduled" : item}
            </button>
          ))}
        </div>
      </div>
      <section className="panel">
        <div className="history-table management">
          <div className="table-row table-head">
            <span>Examination</span>
            <span>Questions</span>
            <span>Availability</span>
            <span>Status</span>
            <span></span>
          </div>
          {shown.map((x) => (
            <div className="table-row" key={x.id}>
              <span>
                <i style={{ background: x.accent }}></i>
                <b>{x.title}</b>
                <small>
                  {x.code} · {x.marks} marks
                </small>
              </span>
              <span>{x.questions}</span>
              <span>{x.date}</span>
              <span>
                <em className={`status ${x.status.toLowerCase()}`}>{x.status}</em>
              </span>
              <span>
                <button
                  className="icon-btn"
                  aria-label={`Edit ${x.title} (demo only)`}
                  onClick={() => setEditing(true)}
                >
                  <Icon name="more" />
                </button>
              </span>
            </div>
          ))}
        </div>
        {shown.length === 0 && (
          <div className="empty-results compact">
            <Icon name="file" size={26} />
            <h2>No examinations found.</h2>
            <button
              className="text-btn"
              onClick={() => {
                setQuery("");
                setStatus("All");
              }}
            >
              Reset filters
            </button>
          </div>
        )}
      </section>
      {editing && (
        <div className="drawer-backdrop">
          <aside
            className="drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="exam-drawer-title"
          >
            <div className="drawer-head">
              <div>
                <span>NEW EXAMINATION</span>
                <h2 id="exam-drawer-title">Set the foundation.</h2>
              </div>
              <button onClick={() => setEditing(false)}>
                <Icon name="x" />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setEditing(false);
                setToast("Demo only: this draft was not saved.");
              }}
            >
              <label>
                Examination title
                <input required placeholder="e.g. Environmental Science I" />
              </label>
              <div className="form-grid">
                <label>
                  Subject
                  <select>
                    <option>Biology</option>
                    <option>Mathematics</option>
                    <option>History</option>
                  </select>
                </label>
                <label>
                  Code
                  <input placeholder="BIO–205" />
                </label>
                <label>
                  Duration (minutes)
                  <input type="number" defaultValue="60" />
                </label>
                <label>
                  Total marks
                  <input type="number" defaultValue="100" />
                </label>
              </div>
              <label>
                Description<textarea placeholder="What does this examination cover?"></textarea>
              </label>
              <label>
                Instructions<textarea placeholder="Add rules and preparation guidance…"></textarea>
              </label>
              <div className="drawer-section">
                <b>AVAILABILITY</b>
                <div className="form-grid">
                  <label>
                    Opens
                    <input type="datetime-local" />
                  </label>
                  <label>
                    Closes
                    <input type="datetime-local" />
                  </label>
                </div>
              </div>
              <div className="drawer-actions">
                <Button variant="secondary" onClick={() => setEditing(false)}>
                  Cancel
                </Button>
                <Button type="submit" icon="arrow">
                  Save & add questions
                </Button>
              </div>
            </form>
          </aside>
        </div>
      )}
      {toast && (
        <div className="toast">
          <Icon name="check" />
          {toast}
          <button onClick={() => setToast("")}>
            <Icon name="x" size={16} />
          </button>
        </div>
      )}
    </Shell>
  );
}

export function QuestionBank() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [difficulty, setDifficulty] = useState("All difficulties");
  useDialogFocus(open, () => setOpen(false), ".drawer");
  const rows = questions;
  return (
    <Shell role="teacher" route="bank">
      <PageTitle
        eyebrow="QUESTION BANK"
        title="Ideas, organised for reuse."
        subtitle="Search, create and shape your library of questions."
        action={
          <div className="button-pair">
            <Button
              variant="secondary"
              onClick={() => setToast("Demo only: question import is not available.")}
            >
              Import questions
            </Button>
            <Button onClick={() => setOpen(true)} icon="plus">
              Add question
            </Button>
          </div>
        }
      />
      <div className="search-strip">
        <div className="search-box">
          <Icon name="search" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search question text or topic…"
          />
        </div>
        <span className="filter-btn" aria-label="Question set subject">
          Biology demo set
        </span>
        <select
          aria-label="Filter by difficulty"
          value={difficulty}
          onChange={(event) => setDifficulty(event.target.value)}
        >
          <option>All difficulties</option>
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>
      </div>
      <section className="panel question-table">
        {rows
          .filter(
            (x) =>
              (difficulty === "All difficulties" || x.difficulty === difficulty) &&
              `${x.text} ${x.topic}`.toLowerCase().includes(query.trim().toLowerCase()),
          )
          .map((q) => (
            <div className="question-row" key={q.id}>
              <div>
                <span>
                  {q.topic} · <em className={q.difficulty.toLowerCase()}>{q.difficulty}</em>
                </span>
                <b>{q.text}</b>
                <small>Multiple choice · 2 marks</small>
              </div>
              <button
                className="icon-btn"
                aria-label="Edit sample question"
                onClick={() => setOpen(true)}
              >
                <Icon name="more" />
              </button>
            </div>
          ))}
      </section>
      {open && (
        <div className="drawer-backdrop">
          <aside
            className="drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="question-drawer-title"
          >
            <div className="drawer-head">
              <div>
                <span>QUESTION EDITOR</span>
                <h2 id="question-drawer-title">Write with precision.</h2>
              </div>
              <button onClick={() => setOpen(false)}>
                <Icon name="x" />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setOpen(false);
                setToast("Demo only: this question was not saved.");
              }}
            >
              <div className="form-grid">
                <label>
                  Topic
                  <input defaultValue="Cell structure" />
                </label>
                <label>
                  Difficulty
                  <select>
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                  </select>
                </label>
              </div>
              <label>
                Question
                <textarea
                  required
                  defaultValue="Which organelle is primarily responsible for producing ATP?"
                />
              </label>
              <b className="form-label">ANSWER OPTIONS</b>
              {["Golgi apparatus", "Mitochondrion", "Lysosome", "Ribosome"].map((x, i) => (
                <label className="answer-edit" key={x}>
                  <input type="radio" name="correct" defaultChecked={i === 1} />
                  <span>{String.fromCharCode(65 + i)}</span>
                  <input defaultValue={x} />
                </label>
              ))}
              <label>
                Explanation
                <textarea defaultValue="Mitochondria generate most of the cell’s ATP." />
              </label>
              <div className="drawer-actions">
                <Button variant="secondary" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save question</Button>
              </div>
            </form>
          </aside>
        </div>
      )}
      {toast && (
        <div className="toast" role="status">
          <Icon name="check" />
          {toast}
          <button aria-label="Dismiss notification" onClick={() => setToast("")}>
            <Icon name="x" size={16} />
          </button>
        </div>
      )}
    </Shell>
  );
}

export function Analytics() {
  return (
    <Shell role="teacher" route="analytics">
      <PageTitle
        eyebrow="RESULTS & ANALYTICS"
        title="See where learning lands."
        subtitle="Cell Biology & Genetics · 42 submissions"
        action={
          <Button variant="secondary" disabled>
            Export results
          </Button>
        }
      />
      <div className="metric-grid">
        <Metric label="PARTICIPATION" value="42/44" note="95% completion" icon="users" />
        <Metric label="AVERAGE" value="81%" note="Class performance" icon="chart" tone="violet" />
        <Metric label="HIGHEST" value="96%" note="Top score" icon="spark" tone="green" />
        <Metric label="AVG. TIME" value="38m" note="of 45 minutes" icon="clock" tone="gold" />
      </div>
      <div className="breakdown-grid">
        <section className="panel span-2">
          <div className="panel-head">
            <div>
              <span>QUESTION PERFORMANCE</span>
              <h2>Accuracy by question</h2>
            </div>
          </div>
          <div className="bar-chart">
            {[78, 92, 61, 84, 73, 95, 55, 88, 80, 69, 91, 76].map((n, i) => (
              <div key={i}>
                <i style={{ height: `${n}%` }}></i>
                <span>{i + 1}</span>
              </div>
            ))}
          </div>
        </section>
        <section className="panel">
          <div className="panel-head">
            <div>
              <span>NEEDS ATTENTION</span>
              <h2>Most missed</h2>
            </div>
          </div>
          {[
            ["Question 7", "Cell transport", "55%"],
            ["Question 3", "Genetics", "61%"],
            ["Question 10", "DNA replication", "69%"],
          ].map((x) => (
            <div className="missed" key={x[0]}>
              <strong>{x[2]}</strong>
              <div>
                <b>{x[0]}</b>
                <span>{x[1]}</span>
              </div>
            </div>
          ))}
        </section>
      </div>
    </Shell>
  );
}
