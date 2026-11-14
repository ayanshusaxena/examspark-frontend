import { useEffect, useMemo, useState, type ReactNode } from "react";
import type { Route } from "./components/ui";
import { menus } from "./components/workspace";
import { Marketing } from "./pages/Marketing";
import { Auth } from "./pages/Auth";
import { StudentDashboard, Discover, Prepare } from "./pages/Student";
import { Attempt } from "./pages/Attempt";
import { Results } from "./pages/Results";
import { TeacherDashboard, ExamManagement, QuestionBank, Analytics } from "./pages/Teacher";
import { AdminDashboard, UserManagement, Oversight, Settings } from "./pages/Admin";

export default function App() {
  const validRoutes: Route[] = [
    "home",
    "login",
    "register",
    "student",
    "discover",
    "prepare",
    "attempt",
    "results",
    "teacher",
    "create",
    "bank",
    "analytics",
    "admin",
    "users",
    "oversight",
    "settings",
  ];
  const getRoute = (): Route => {
    const candidate = window.location.hash.replace("#", "") || "home";
    return validRoutes.includes(candidate as Route) ? (candidate as Route) : "home";
  };
  const [route, setRoute] = useState<Route>(getRoute);
  useEffect(() => {
    const fn = () => {
      const nextRoute = getRoute();
      setRoute(nextRoute);
      document.title =
        nextRoute === "home"
          ? "ExamSpark — Prepare. Attempt. Review."
          : `${menus.student.find((item) => item.route === nextRoute)?.label || menus.teacher.find((item) => item.route === nextRoute)?.label || menus.admin.find((item) => item.route === nextRoute)?.label || (nextRoute === "login" ? "Sign in" : nextRoute === "register" ? "Create account" : nextRoute === "prepare" ? "Prepare examination" : nextRoute === "attempt" ? "Examination in progress" : "ExamSpark")} · ExamSpark`;
    };
    fn();
    window.addEventListener("hashchange", fn);
    return () => window.removeEventListener("hashchange", fn);
  }, []);
  const pages: Record<Route, ReactNode> = useMemo(
    () => ({
      home: <Marketing />,
      login: <Auth />,
      register: <Auth register />,
      student: <StudentDashboard />,
      discover: <Discover />,
      prepare: <Prepare />,
      attempt: <Attempt />,
      results: <Results />,
      teacher: <TeacherDashboard />,
      create: <ExamManagement />,
      bank: <QuestionBank />,
      analytics: <Analytics />,
      admin: <AdminDashboard />,
      users: <UserManagement />,
      oversight: <Oversight />,
      settings: <Settings />,
    }),
    [],
  );
  return pages[route] || <Marketing />;
}
