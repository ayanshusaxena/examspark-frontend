import { useState, type FormEvent } from "react";
import { Button, Logo, navigate, type Role } from "../components/ui";

export function Auth({ register = false }: { register?: boolean }) {
  const [role, setRole] = useState<Role>("student");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    if (register && !String(form.get("name") ?? "").trim())
      return setError("Enter your full name to continue.");
    if (!form.get("email") || !form.get("password")) {
      return setError("Enter your email and password to continue.");
    }
    if (String(form.get("password")).length < 8) {
      return setError("Use at least 8 characters for the demonstration password.");
    }
    navigate(role);
  };
  return (
    <div className="auth-page">
      <div className="auth-brand">
        <Logo inverse />
        <div className="auth-message">
          <div className="eyebrow light">
            <span></span> PREPARE · ATTEMPT · REVIEW
          </div>
          <h1>
            {register
              ? "Your next chapter starts with one clear step."
              : "Welcome back to your learning rhythm."}
          </h1>
          <p>
            This prototype uses demonstration data only. No account is created and no credentials
            are stored.
          </p>
        </div>
        <div className="auth-pattern"></div>
      </div>
      <div className="auth-form-wrap">
        <button className="back-link" onClick={() => navigate("home")}>
          ← Back to home
        </button>
        <form className="auth-form" onSubmit={submit}>
          <span className="form-step">{register ? "CREATE ACCOUNT" : "SECURE ACCESS"}</span>
          <h2>{register ? "Join ExamSpark" : "Sign in"}</h2>
          <p>
            {register
              ? "Set up your student demonstration account."
              : "Choose your workspace and continue."}
          </p>
          {!register && (
            <div className="role-tabs" aria-label="Choose a workspace">
              {(["student", "teacher", "admin"] as Role[]).map((r) => (
                <button
                  type="button"
                  className={role === r ? "active" : ""}
                  aria-pressed={role === r}
                  onClick={() => setRole(r)}
                  key={r}
                >
                  {r[0].toUpperCase() + r.slice(1)}
                </button>
              ))}
            </div>
          )}
          {register && (
            <label>
              Full name
              <input name="name" autoComplete="name" placeholder="Your full name" required />
            </label>
          )}
          <label>
            Email address
            <input
              name="email"
              type="email"
              autoComplete="email"
              placeholder={`${role}@demo.edu`}
              onChange={() => {
                setError("");
                setResetSent(false);
              }}
            />
          </label>
          <label>
            Password
            <div className="input-wrap">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete={register ? "new-password" : "current-password"}
                placeholder="At least 8 characters"
                onChange={() => setError("")}
              />
              <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword((shown) => !shown)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </label>
          {error && (
            <div className="form-error" role="alert">
              {error}
            </div>
          )}
          {resetSent && (
            <div className="form-success" role="status">
              If this were a connected product, reset instructions would be sent to the email above.
            </div>
          )}
          {!register && (
            <div className="form-row">
              <label className="checkbox">
                <input type="checkbox" /> Keep me signed in
              </label>
              <button
                type="button"
                className="text-btn"
                onClick={() => {
                  setError("");
                  setResetSent(true);
                }}
              >
                Forgot password?
              </button>
            </div>
          )}
          <Button type="submit" icon="arrow">
            {register ? "Create student account" : `Continue as ${role}`}
          </Button>
          <div className="switch-auth">
            {register ? "Already have an account?" : "New to ExamSpark?"}{" "}
            <button type="button" onClick={() => navigate(register ? "login" : "register")}>
              {register ? "Sign in" : "Create account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
