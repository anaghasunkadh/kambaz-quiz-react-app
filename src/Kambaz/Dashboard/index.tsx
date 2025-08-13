import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Row, Col, Card, Button, FormControl } from "react-bootstrap";

interface DashboardProps {
  courses: any[];
  course: any;
  setCourse: React.Dispatch<React.SetStateAction<any>>;
  addNewCourse: () => void;
  deleteCourse: (courseId: any) => void;
  updateCourse: () => void;
  enrolling: boolean;
  setEnrolling: (enrolling: boolean) => void;
  updateEnrollment: (courseId: string, enrolled: boolean) => void;
}

export default function Dashboard({
  courses,
  course,
  setCourse,
  addNewCourse,
  updateCourse,
  enrolling,
  setEnrolling,
  updateEnrollment,
}: DashboardProps) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  if (!currentUser) {
    return <h3>Please sign in to view your dashboard.</h3>;
  }

  const isFaculty = currentUser.role === "FACULTY";

  return (
    <div id="wd-dashboard">
      <h1
        id="wd-dashboard-title"
        className="d-flex justify-content-between align-items-center"
      >
        Dashboard
        <Button
          variant="primary"
          size="sm"
          onClick={() => setEnrolling(!enrolling)}
          style={{ minWidth: "100px" }}
        >
          {enrolling ? "My Courses" : "All Courses"}
        </Button>
      </h1>
      <hr />

      {isFaculty && (
        <>
          <h5>
            New Course
            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={addNewCourse}
            >
              Add
            </button>
            <button
              className="btn btn-warning float-end me-2"
              onClick={updateCourse}
              id="wd-update-course-click"
            >
              Update
            </button>
          </h5>
          <br />
          <FormControl
            value={course.name}
            className="mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <FormControl
            as="textarea"
            value={course.description}
            rows={3}
            onChange={(e) => setCourse({ ...course, description: e.target.value })}
          />
          <hr />
        </>
      )}

      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={3} lg={5} className="g-4">
          {courses.map((course: any) => {
            // Use enrolled flag on course directly (from props)
            const enrolled = course.enrolled ?? false;

            return (
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
                        <strong>Course Number:</strong> {course.number}
                        <br />
                        <strong>Start Date:</strong> {course.startDate}
                        <br />
                        <strong>End Date:</strong> {course.endDate}
                        <br />
                        <strong>Department:</strong> {course.department}
                        <br />
                        <strong>Credits:</strong> {course.credits}
                        <br />
                        <strong>Author:</strong> {course.author}
                      </Card.Text>

                      <Card.Text
                        className="wd-dashboard-course-description overflow-hidden"
                        style={{ height: "100px" }}
                      >
                        {course.description}
                      </Card.Text>
                    </Card.Body>
                  </Link>

                  <Card.Footer>
                    {!isFaculty && enrolling ? (
                      enrolled ? (
                        <Button
                          variant="danger"
                          className="float-end"
                          onClick={(e) => {
                            e.preventDefault();
                            console.log("Unenroll clicked for course", course._id);
                            updateEnrollment(course._id, false);
                          }}
                        >
                          Unenroll
                        </Button>
                      ) : (
                        <Button
                          variant="success"
                          className="float-end"
                          onClick={(e) => {
                            e.preventDefault();
                            console.log("Enroll clicked for course", course._id);
                            updateEnrollment(course._id, true);
                          }}
                        >
                          Enroll
                        </Button>
                      )
                    ) : (
                      <Button variant="primary" className="me-2">
                        Go
                      </Button>
                    )}
                  </Card.Footer>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
}
