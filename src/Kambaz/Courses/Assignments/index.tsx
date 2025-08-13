import { Link, useParams, useNavigate } from "react-router-dom";
import { FaPlus, FaSearch, FaTrash } from "react-icons/fa";
import { Button, Form, InputGroup, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import {
  fetchAssignmentsForCourse,
  deleteAssignmentAPI,
} from "./reducer";

import type { AppDispatch } from "../../store";

export default function Assignments() {
  const { cid } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const currentUser = useSelector((state: any) => state.accountReducer.currentUser);

  const assignments = useSelector((state: any) =>
    state.assignmentsReducer.assignments.filter((a: any) => String(a.course) === cid)
  );

  const status = useSelector((state: any) => state.assignmentsReducer.status);

  useEffect(() => {
    if (cid) dispatch(fetchAssignmentsForCourse(cid));
  }, [cid, dispatch]);

  useEffect(() => {
    console.log("Assignments in component:", assignments);
  }, [assignments]);

  const handleDelete = (title: string | undefined) => {
    if (!title) {
      console.warn("Tried to delete assignment with undefined title.");
      return;
    }

    if (currentUser?.role !== "FACULTY") {
      alert("Only faculty can delete assignments.");
      return;
    }

    const confirmed = window.confirm("Are you sure you want to delete this assignment?");
    if (confirmed) {
      dispatch(deleteAssignmentAPI(title));
    }
  };

  const handleCreate = () => {
    if (currentUser?.role !== "FACULTY") {
      alert("Only faculty can create assignments.");
      return;
    }
    navigate(`/Kambaz/Courses/${cid}/Assignments/new`);
  };

  const invalidAssignments = assignments.filter((a: any) => !a.title);
  const validAssignments = assignments.filter((a: any) => a.title);

  return (
    <div id="wd-assignments" className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <InputGroup className="w-50">
          <InputGroup.Text><FaSearch /></InputGroup.Text>
          <Form.Control placeholder="Search for Assignments" id="wd-search-assignment" />
        </InputGroup>
        <div className="ms-auto">
          <Button
            variant="danger"
            className="me-2"
            onClick={handleCreate}
            disabled={currentUser?.role !== "FACULTY"}
          >
            <FaPlus className="me-1" /> Assignment
          </Button>
        </div>
      </div>

      <div className="mb-3 d-flex justify-content-between align-items-center">
        <h5 className="fw-bold mb-0">
          ASSIGNMENTS ({validAssignments.length}) for Course {cid}
        </h5>
        <Button
          size="sm"
          variant="secondary"
          onClick={handleCreate}
          disabled={currentUser?.role !== "FACULTY"}
        >
          <FaPlus />
        </Button>
      </div>

      {status === "loading" && <p>Loading assignments...</p>}

      {invalidAssignments.length > 0 && (
        <div className="alert alert-warning">
          ⚠️ {invalidAssignments.length} assignment(s) are missing titles and were skipped.
        </div>
      )}

      <ListGroup id="wd-assignment-list">
        {validAssignments.map((assignment: any) => (
          <ListGroup.Item
            key={assignment.title}
            className="d-flex border-start border-5 border-success mb-2 p-3 align-items-center"
          >
            <div className="flex-grow-1">
              {currentUser?.role === "FACULTY" ? (
                <Link
                  to={`/Kambaz/Courses/${cid}/Assignments/${assignment.title}`}
                  className="fw-bold text-decoration-none d-block mb-1 text-dark"
                >
                  {assignment.title}
                </Link>
              ) : (
                <span className="fw-bold d-block mb-1">{assignment.title}</span>
              )}
              <div className="text-muted small">
                MULTIPLE MODULES | Not available until TBD | Due TBD | {assignment.points ?? 100} Pts
              </div>
            </div>
            {currentUser?.role === "FACULTY" && (
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => handleDelete(assignment.title)}
                title="Delete Assignment"
              >
                <FaTrash />
              </Button>
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}
