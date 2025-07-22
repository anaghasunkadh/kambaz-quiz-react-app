import { Link, useParams } from "react-router-dom";
import { FaPlus, FaSearch } from "react-icons/fa";
import { Button, Form, InputGroup, ListGroup } from "react-bootstrap";
import * as db from "../../Database";

export default function Assignments() {
  const { cid } = useParams();  // Get the current course ID from URL
  const assignments = db.assignments.filter(a => a.course === cid);

  return (
    <div id="wd-assignments" className="p-4">
      {/* Search bar and buttons */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <InputGroup className="w-50">
          <InputGroup.Text>
            <FaSearch />
          </InputGroup.Text>
          <Form.Control placeholder="Search for Assignments" id="wd-search-assignment" />
        </InputGroup>

        <div className="ms-auto">
          <Button variant="success" className="me-2">
            <FaPlus className="me-1" />
            Group
          </Button>
          <Button variant="danger">
            <FaPlus className="me-1" />
            Assignment
          </Button>
        </div>
      </div>

      {/* Section header */}
      <div className="mb-3 d-flex justify-content-between align-items-center">
        <h5 className="fw-bold mb-0">
          ASSIGNMENTS ({assignments.length}) for Course {cid}
        </h5>
        <Button size="sm" variant="secondary">
          <FaPlus />
        </Button>
      </div>

      {/* Assignment list */}
      <ListGroup id="wd-assignment-list">
        {assignments.map((assignment) => (
          <ListGroup.Item
            key={assignment._id}
            className="d-flex border-start border-5 border-success mb-2 p-3"
          >
            <div className="flex-grow-1">
              <Link
                to={`/Kambaz/Courses/${cid}/Assignments/${assignment._id}`}
                className="fw-bold text-decoration-none d-block mb-1 text-dark"
              >
                {assignment.title}
              </Link>
              <div className="text-muted small">
                MULTIPLE MODULES | Not available until TBD | Due TBD | 100 Pts
              </div>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}
