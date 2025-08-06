import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

import {
  createAssignmentForCourse,
  updateAssignmentAPI,
} from "./reducer";

import type { AppDispatch } from "../../store"; // update the path accordingly

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const dispatch = useDispatch<AppDispatch>(); // typed dispatch
  const navigate = useNavigate();

  const currentUser = useSelector((state: any) => state.accountReducer.currentUser);
  const assignments = useSelector((state: any) => state.assignmentsReducer.assignments);

  const existingAssignment = aid && aid !== "new" ? assignments.find((a: any) => a._id === aid) : null;

  const [assignment, setAssignment] = useState<any>({
    title: "",
    description: "",
    points: 0,
    dueDate: "",
    availableFrom: "",
    availableUntil: "",
    course: cid,
  });

  useEffect(() => {
    if (existingAssignment) setAssignment(existingAssignment);
  }, [existingAssignment]);

  // Redirect if no faculty role (optional)
  useEffect(() => {
    if (!currentUser || currentUser.role !== "FACULTY") {
      alert("You do not have permission to edit assignments.");
      navigate(`/Kambaz/Courses/${cid}/Assignments`);
    }
  }, [currentUser, cid, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setAssignment((prev: any) => ({ ...prev, [id]: value }));
  };

  const handleSave = async () => {
    if (!cid) return; // safeguard

    if (aid === "new") {
      await dispatch(createAssignmentForCourse({ courseId: cid, assignment }));
    } else {
      await dispatch(updateAssignmentAPI(assignment));
    }
    navigate(`/Kambaz/Courses/${cid}/Assignments`);
  };

  const handleCancel = () => {
    navigate(`/Kambaz/Courses/${cid}/Assignments`);
  };

  const isFaculty = currentUser?.role === "FACULTY";

  return (
    <div className="p-4">
      <h3>{aid === "new" ? "Create Assignment" : "Edit Assignment"}</h3>

      <div className="mb-3">
        <label htmlFor="title" className="form-label">Title</label>
        <input
          id="title"
          className="form-control"
          value={assignment.title}
          onChange={handleChange}
          disabled={!isFaculty}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <textarea
          id="description"
          className="form-control"
          value={assignment.description}
          onChange={handleChange}
          disabled={!isFaculty}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="points" className="form-label">Points</label>
        <input
          id="points"
          type="number"
          className="form-control"
          value={assignment.points}
          onChange={handleChange}
          disabled={!isFaculty}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="dueDate" className="form-label">Due Date</label>
        <input
          id="dueDate"
          type="date"
          className="form-control"
          value={assignment.dueDate}
          onChange={handleChange}
          disabled={!isFaculty}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="availableFrom" className="form-label">Available From</label>
        <input
          id="availableFrom"
          type="date"
          className="form-control"
          value={assignment.availableFrom}
          onChange={handleChange}
          disabled={!isFaculty}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="availableUntil" className="form-label">Available Until</label>
        <input
          id="availableUntil"
          type="date"
          className="form-control"
          value={assignment.availableUntil}
          onChange={handleChange}
          disabled={!isFaculty}
        />
      </div>

      <div className="d-flex gap-2">
        <button className="btn btn-primary" onClick={handleSave} disabled={!isFaculty}>
          Save
        </button>
        <button className="btn btn-secondary" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}
