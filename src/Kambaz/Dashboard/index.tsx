import { Link } from "react-router-dom";
import * as db from "./../Database";
import { Row, Col, Card, Button } from "react-bootstrap";

export default function Dashboard() {
  const courses = db.courses;

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={3} lg={5} className="g-4">
          {courses.map((course) => (
            <Col key={course._id} className="wd-dashboard-course">
              <Card>
                <Link
                  to={`/Kambaz/Courses/${course._id}/Home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <Card.Img
                    variant="top"
                    src={course.image || "/images/default.png"}
                    height={160}
                  />
                  <Card.Body>
                    <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {course.name}
                    </Card.Title>

                    <Card.Text className="small text-muted">
                      <strong>Course Number:</strong> {course.number}<br />
                      <strong>Start Date:</strong> {course.startDate}<br />
                      <strong>End Date:</strong> {course.endDate}<br />
                      <strong>Department:</strong> {course.department}<br />
                      <strong>Credits:</strong> {course.credits}<br />
                      <strong>Author:</strong> {course.author}
                    </Card.Text>

                    <Card.Text
                      className="wd-dashboard-course-description overflow-hidden"
                      style={{ height: "100px" }}
                    >
                      {course.description}
                    </Card.Text>

                    <Button variant="primary">Go</Button>
                  </Card.Body>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
