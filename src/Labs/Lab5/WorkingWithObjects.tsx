import  { useState } from "react";
import { FormControl, FormCheck } from "react-bootstrap";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;

export default function WorkingWithObjects() {
  const [assignment, setAssignment] = useState({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
  });

  const [moduleObj, setModuleObj] = useState({
    id: "CS101",
    name: "Intro to Computer Science",
    description: "Basics of computer science and programming",
    course: "Computer Science",
  });

  const ASSIGNMENT_API = `${REMOTE_SERVER}/lab5/assignment`;
  const MODULE_API = `${REMOTE_SERVER}/lab5/module`;

  return (
    <div id="wd-working-with-objects">
      <h3>Working With Objects</h3>

      {/* Update Assignment Title */}
      <h4>Assignment Title</h4>
      <a
        id="wd-update-assignment-title"
        className="btn btn-primary float-end mb-2"
        href={`${ASSIGNMENT_API}/title/${encodeURIComponent(assignment.title)}`}
      >
        Update Title
      </a>
      <FormControl
        className="w-75 mb-3"
        id="wd-assignment-title"
        type="text"
        value={assignment.title}
        onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}
      />

      {/* Update Assignment Score */}
      <h4>Assignment Score</h4>
      <a
        id="wd-update-assignment-score"
        className="btn btn-primary float-end mb-2"
        href={`${ASSIGNMENT_API}/score/${assignment.score}`}
      >
        Update Score
      </a>
      <FormControl
        className="w-25 mb-3"
        id="wd-assignment-score"
        type="number"
        value={assignment.score}
        onChange={(e) =>
          setAssignment({ ...assignment, score: parseInt(e.target.value) || 0 })
        }
      />

      {/* Update Assignment Completed */}
      <h4>Assignment Completed</h4>
      <a
        id="wd-update-assignment-completed"
        className="btn btn-primary float-end mb-2"
        href={`${ASSIGNMENT_API}/completed/${assignment.completed}`}
      >
        Update Completed
      </a>
      <FormCheck
        id="wd-assignment-completed"
        type="checkbox"
        label="Completed"
        checked={assignment.completed}
        onChange={(e) =>
          setAssignment({ ...assignment, completed: e.target.checked })
        }
      />

      <hr />

      {/* Module Section */}
      <h3>Module Object</h3>

      {/* Get Module */}
      <a id="wd-get-module" className="btn btn-primary mb-3" href={`${MODULE_API}`}>
        Get Module
      </a>

      {/* Get Module Name */}
      <a
        id="wd-get-module-name"
        className="btn btn-primary mb-3 ms-2"
        href={`${MODULE_API}/name`}
      >
        Get Module Name
      </a>

      {/* Edit Module Name */}
      <h4>Edit Module Name</h4>
      <a
        id="wd-update-module-name"
        className="btn btn-primary float-end mb-2"
        href={`${MODULE_API}/name/${encodeURIComponent(moduleObj.name)}`}
      >
        Update Module Name
      </a>
      <FormControl
        className="w-75 mb-3"
        id="wd-module-name"
        type="text"
        value={moduleObj.name}
        onChange={(e) => setModuleObj({ ...moduleObj, name: e.target.value })}
      />

      {/* Edit Module Description */}
      <h4>Edit Module Description</h4>
      <a
        id="wd-update-module-description"
        className="btn btn-primary float-end mb-2"
        href={`${MODULE_API}/description/${encodeURIComponent(moduleObj.description)}`}
      >
        Update Module Description
      </a>
      <FormControl
        as="textarea"
        rows={3}
        className="w-75 mb-3"
        id="wd-module-description"
        value={moduleObj.description}
        onChange={(e) => setModuleObj({ ...moduleObj, description: e.target.value })}
      />
    </div>
  );
}
