import { Link } from "react-router-dom";
import { Button, Form, Row, Col } from "react-bootstrap";

export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor" className="p-4">
      <h4 className="fw-bold mb-4">Edit Assignment</h4>

      <Form>
        {/* Assignment Name */}
        <Form.Group className="mb-3">
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control
            type="text"
            defaultValue="A1 - ENV + HTML"
            id="wd-name"
          />
        </Form.Group>

        {/* Description */}
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            defaultValue="The assignment is available online. Submit a link to the landing page of..."
            id="wd-description"
          />
        </Form.Group>

        <Row className="mb-3">
          <Col md={6}>
            {/* Points */}
            <Form.Group className="mb-3">
              <Form.Label>Points</Form.Label>
              <Form.Control
                type="number"
                defaultValue={100}
                id="wd-points"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            {/* Assignment Group */}
            <Form.Group className="mb-3">
              <Form.Label>Assignment Group</Form.Label>
              <Form.Select defaultValue="ASSIGNMENTS" id="wd-group">
                <option value="ASSIGNMENTS">Assignments</option>
                <option value="QUIZZES">Quizzes</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            {/* Display Grade as */}
            <Form.Group className="mb-3">
              <Form.Label>Display Grade as</Form.Label>
              <Form.Select defaultValue="PERCENTAGE" id="wd-display-grade-as">
                <option value="PERCENTAGE">Percentage</option>
                <option value="GRADE">Grade</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            {/* Submission Type */}
            <Form.Group className="mb-3">
              <Form.Label>Submission Type</Form.Label>
              <Form.Select defaultValue="ONLINE" id="wd-submission-type">
                <option value="ONLINE">Online</option>
                <option value="OFFLINE">Offline</option>
                <option value="NONE">None</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        {/* Online Entry Options */}
        <Form.Group className="mb-3">
          <Form.Label><strong>Online Entry Options</strong></Form.Label>
          <div className="mb-2">
            <Form.Check
              type="checkbox"
              label="Text Entry"
              id="wd-text-entry"
              defaultChecked
            />
            <Form.Check
              type="checkbox"
              label="Website URL"
              id="wd-website-url"
            />
            <Form.Check
              type="checkbox"
              label="Media Recordings"
              id="wd-media-recordings"
            />
            <Form.Check
              type="checkbox"
              label="Student Annotation"
              id="wd-student-annotation"
            />
          </div>
        </Form.Group>

        {/* Dates Section */}
        <Row className="mb-3">
          <Col md={4}>
            <Form.Group>
              <Form.Label>Assign To</Form.Label>
              <Form.Control type="text" defaultValue="Everyone" id="wd-assign-to" />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Due Date</Form.Label>
              <Form.Control type="date" defaultValue="2021-01-01" id="wd-due-date" />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Available From</Form.Label>
              <Form.Control type="date" defaultValue="2021-01-01" id="wd-available-from" />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={4}>
            <Form.Group>
              <Form.Label>Available Until</Form.Label>
              <Form.Control type="date" defaultValue="2021-01-01" id="wd-available-until" />
            </Form.Group>
          </Col>
        </Row>

        {/* Buttons */}
        <div className="d-flex gap-2">
          <Link to="../index.tsx">
            <Button variant="secondary">Cancel</Button>
          </Link>
          <Link to="../index.tsx">
            <Button variant="danger">Save</Button>
          </Link>
        </div>
      </Form>
    </div>
  );
}
