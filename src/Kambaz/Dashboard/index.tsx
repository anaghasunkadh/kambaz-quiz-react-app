import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">Published Courses (5)</h2>
      <hr />
      <div
        id="wd-dashboard-courses"
        style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}
      >
        <div
          className="wd-dashboard-course"
          style={{ border: "1px solid #ccc", padding: "10px", width: "220px" }}
        >
          <Link
            to="/Kambaz/Courses/1234/Home"
            className="wd-dashboard-course-link"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <img src="/images/react.png" width={200} alt="ReactJS" />
            <div>
              <h5>CS1234 React JS</h5>
              <p className="wd-dashboard-course-title">Full Stack Software Developer</p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        <div
          className="wd-dashboard-course"
          style={{ border: "1px solid #ccc", padding: "10px", width: "220px" }}
        >
          <Link
            to="/Kambaz/Courses/2345/Home"
            className="wd-dashboard-course-link"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <img src="/images/nodejs.jpeg" width={200} alt="NodeJS" />
            <div>
              <h5>CS2345 Node JS</h5>
              <p className="wd-dashboard-course-title">Back End Development</p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        <div
          className="wd-dashboard-course"
          style={{ border: "1px solid #ccc", padding: "10px", width: "220px" }}
        >
          <Link
            to="/Kambaz/Courses/3456/Home"
            className="wd-dashboard-course-link"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <img src="/images/mongodb.jpeg" width={200} alt="MongoDB" />
            <div>
              <h5>CS3456 MongoDB</h5>
              <p className="wd-dashboard-course-title">Database for Web</p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        <div
          className="wd-dashboard-course"
          style={{ border: "1px solid #ccc", padding: "10px", width: "220px" }}
        >
          <Link
            to="/Kambaz/Courses/4567/Home"
            className="wd-dashboard-course-link"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <img src="/images/python.webp" width={200} alt="Python" />
            <div>
              <h5>CS4567 Python</h5>
              <p className="wd-dashboard-course-title">Programming Fundamentals</p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        <div
          className="wd-dashboard-course"
          style={{ border: "1px solid #ccc", padding: "10px", width: "220px" }}
        >
          <Link
            to="/Kambaz/Courses/5678/Home"
            className="wd-dashboard-course-link"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <img src="/images/docker.png" width={200} alt="Docker" />
            <div>
              <h5>CS5678 Docker</h5>
              <p className="wd-dashboard-course-title">Containers and DevOps</p>
              <button>Go</button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
