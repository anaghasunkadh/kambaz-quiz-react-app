import { Link } from "react-router-dom";

export default function CourseNavigation() {
  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      <Link to="/Kambaz/Courses/1234/Home"
        className="list-group-item active border border-0">
        Home
      </Link>
      <Link to="/Kambaz/Courses/1234/Modules"
        className="list-group-item text-danger border border-0">
        Modules
      </Link>
      <Link to="/Kambaz/Courses/1234/Piazza"
        className="list-group-item text-danger border border-0">
        Piazza
      </Link>
      <Link to="/Kambaz/Courses/1234/Zoom"
        className="list-group-item text-danger border border-0">
        Zoom
      </Link>
      <Link to="/Kambaz/Courses/1234/Assignments"
        className="list-group-item text-danger border border-0">
        Assignments
      </Link>
      <Link to="/Kambaz/Courses/1234/Quizzes"
        className="list-group-item text-danger border border-0">
        Quizzes
      </Link>
      <Link to="/Kambaz/Courses/1234/Grades"
        className="list-group-item text-danger border border-0">
        Grades
      </Link>
      <Link to="/Kambaz/Courses/1234/People"
        className="list-group-item text-danger border border-0">
        People
      </Link>
    </div>
  );
}
