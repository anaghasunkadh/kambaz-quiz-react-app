import { Link, useLocation, useParams } from "react-router-dom";

export default function CourseNavigation() {
  const { cid } = useParams();
  const { pathname } = useLocation();

  const links = [
    "Home",
    "Modules",
    "Piazza",
    "Zoom",
    "Assignments",
    "Quizzes",   // ✅ keep Quizzes in the list
    "Grades",
    "People",
  ];

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((label) => {
        const path = `/Kambaz/Courses/${cid}/${label}`;
        const isActive = pathname === path || pathname.startsWith(path + "/");
        return (
          <Link
            key={label}
            to={path}
            className={`list-group-item border-0 ${isActive ? "active" : "text-danger"}`}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}
