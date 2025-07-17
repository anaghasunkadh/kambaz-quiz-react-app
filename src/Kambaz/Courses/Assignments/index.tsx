import { Link } from "react-router-dom";
import { FaPlus, FaSearch } from "react-icons/fa";
import { Button, Form, InputGroup, ListGroup } from "react-bootstrap";

export default function Assignments() {
  return (
    <div id="wd-assignments" className="p-4">
      {/* Search bar and buttons */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <InputGroup className="w-50">
          <InputGroup.Text>
            <FaSearch />
          </InputGroup.Text>
          <Form.Control
            placeholder="Search for Assignments"
            id="wd-search-assignment"
          />
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
          ASSIGNMENTS 40% of Total
        </h5>
        <Button size="sm" variant="secondary">
          <FaPlus />
        </Button>
      </div>

      {/* Assignment list */}
      <ListGroup id="wd-assignment-list">
        {[
          {
            title: "A1 - ENV + HTML",
            info:
              "MULTIPLE MODULES | Not available until May 6 at 12:00am | Due May 13 at 11:59 PM | 100 Pts",
            link: "123",
          },
          {
            title: "A2 - JavaScript Basics",
            info:
              "MULTIPLE MODULES | Not available until May 13 at 12:00am | Due May 20 at 11:59 PM | 100 Pts",
            link: "124",
          },
          {
            title: "A3 - CSS Fundamentals",
            info:
              "MULTIPLE MODULES | Not available until May 20 at 12:00am | Due May 27 at 11:59 PM | 100 Pts",
            link: "125",
          },
        ].map((assignment) => (
          <ListGroup.Item
            key={assignment.link}
            className="d-flex border-start border-5 border-success mb-2 p-3"
          >
            <div className="flex-grow-1">
              <Link
                to={assignment.link}
                className="fw-bold text-decoration-none d-block mb-1 text-dark"
              >
                {assignment.title}
              </Link>
              <div className="text-muted small">
                {assignment.info}
              </div>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}
