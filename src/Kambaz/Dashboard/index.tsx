import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Card, Button, FormControl } from "react-bootstrap";
import { enroll, unenroll } from "../Enrollments/reducer"; // Adjust path if needed

interface DashboardProps {
  courses: any[];
  course: any;
  setCourse: React.Dispatch<React.SetStateAction<any>>;
  addNewCourse: () => void;
  deleteCourse: (courseId: any) => void;
  updateCourse: () => void;
}

export default function Dashboard({
  courses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
}: DashboardProps) {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const enrollments = useSelector(
    (state: any) => state.enrollmentsReducer.enrollments
  );

  const [showAllCourses, setShowAllCourses] = useState(false);

  if (!currentUser) {
    return <h3>Please sign in to view your dashboard.</h3>;
  }

  const isFaculty = currentUser.role === "FACULTY";

  const isEnrolled = (courseId: string) =>
    enrollments.some(
      (e: any) => e.course === courseId && e.user === currentUser._id
    );

  const displayedCourses = isFaculty
    ? courses
    : showAllCourses
    ? courses
    : courses.filter((course) => isEnrolled(course._id));

  const toggleShowAllCourses = () => setShowAllCourses(!showAllCourses);

  const handleEnroll = (courseId: string) => {
    if (!isEnrolled(courseId)) {
      dispatch(enroll({ user: currentUser._id, course: courseId }));
    }
  };

  const handleUnenroll = (courseId: string) => {
    dispatch(unenroll({ user: currentUser._id, course: courseId }));
  };

  const handleAdd = () => addNewCourse();
  const handleUpdate = () => updateCourse();
  const handleDelete = (id: string) => deleteCourse(id);
  const handleEdit = (selectedCourse: any) => setCourse(selectedCourse);

  return (
    <div id="wd-dashboard">
      <h1
        id="wd-dashboard-title"
        className="d-flex justify-content-between align-items-center"
      >
        Dashboard
        {!isFaculty && (
          <Button
            variant="primary"
            size="sm"
            onClick={toggleShowAllCourses}
            style={{ minWidth: "100px" }}
          >
            {showAllCourses ? "Show Enrollments" : "Show All Courses"}
          </Button>
        )}
      </h1>
      <hr />

      {isFaculty && (
        <>
          <h5>
            New Course
            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={handleAdd}
            >
              Add
            </button>
            <button
              className="btn btn-warning float-end me-2"
              onClick={handleUpdate}
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

      <h2 id="wd-dashboard-published">
        Published Courses ({displayedCourses.length})
      </h2>
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={3} lg={5} className="g-4">
          {displayedCourses.map((course: any) => {
            const enrolled = isEnrolled(course._id);

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

                      <Button variant="primary">Go</Button>

                      {isFaculty ? (
                        <>
                          <button
                            onClick={(event) => {
                              event.preventDefault();
                              handleDelete(course._id);
                            }}
                            className="btn btn-danger float-end"
                            id="wd-delete-course-click"
                          >
                            Delete
                          </button>

                          <button
                            id="wd-edit-course-click"
                            onClick={(event) => {
                              event.preventDefault();
                              handleEdit(course);
                            }}
                            className="btn btn-warning me-2 float-end"
                          >
                            Edit
                          </button>
                        </>
                      ) : enrolled ? (
                        <button
                          className="btn btn-danger float-end"
                          onClick={(e) => {
                            e.preventDefault();
                            handleUnenroll(course._id);
                          }}
                        >
                          Unenroll
                        </button>
                      ) : (
                        <button
                          className="btn btn-success float-end"
                          onClick={(e) => {
                            e.preventDefault();
                            handleEnroll(course._id);
                          }}
                        >
                          Enroll
                        </button>
                      )}
                    </Card.Body>
                  </Link>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
}
