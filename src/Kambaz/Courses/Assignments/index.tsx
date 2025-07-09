import { Link } from "react-router-dom";

export default function Assignments() {
  return (
    <div id="wd-assignments">
      <input placeholder="Search for Assignments" id="wd-search-assignment" />
      <button id="wd-add-assignment-group">+ Group</button>
      <button id="wd-add-assignment">+ Assignment</button>

      <h3 id="wd-assignments-title">
        ASSIGNMENTS 40% of Total <button>+</button>
      </h3>

      <ul id="wd-assignment-list">
        <li className="wd-assignment-list-item">
          <Link to="123" className="wd-assignment-link">
            A1 - ENV + HTML
          </Link>
          <div>
            MULTIPLE MODULES |{" "}
            <strong>Not available until</strong> May 6 at 12:00am |{" "}
            <strong>Due</strong> May 13 at 11:59 PM | 100 Pts
          </div>
        </li>

        <li className="wd-assignment-list-item">
          <Link to="124" className="wd-assignment-link">
            A2 - JavaScript Basics
          </Link>
          <div>
            MULTIPLE MODULES |{" "}
            <strong>Not available until</strong> May 13 at 12:00am |{" "}
            <strong>Due</strong> May 20 at 11:59 PM | 100 Pts
          </div>
        </li>

        <li className="wd-assignment-list-item">
          <Link to="125" className="wd-assignment-link">
            A3 - CSS Fundamentals
          </Link>
          <div>
            MULTIPLE MODULES |{" "}
            <strong>Not available until</strong> May 20 at 12:00am |{" "}
            <strong>Due</strong> May 27 at 11:59 PM | 100 Pts
          </div>
        </li>
      </ul>
    </div>
  );
}
