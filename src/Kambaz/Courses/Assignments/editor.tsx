import { Link } from "react-router-dom";

export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">Assignment Name</label>
      <input id="wd-name" defaultValue="A1 - ENV + HTML" />
      <br />
      <br />

      <textarea
        id="wd-description"
        defaultValue="The assignment is available online. Submit a link to the landing page of..."
      />

      <table>
        <tbody>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points">Points</label>
            </td>
            <td>
              <input id="wd-points" defaultValue={100} />
            </td>
          </tr>

          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-group">Assignment Group</label>
            </td>
            <td>
              <select id="wd-group" defaultValue="ASSIGNMENTS">
                <option value="ASSIGNMENTS">Assignments</option>
                <option value="QUIZZES">Quizzes</option>
              </select>
            </td>
          </tr>

          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-display-grade-as">Display Grade as</label>
            </td>
            <td>
              <select id="wd-display-grade-as" defaultValue="PERCENTAGE">
                <option value="PERCENTAGE">Percentage</option>
                <option value="GRADE">Grade</option>
              </select>
            </td>
          </tr>

          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-submission-type">Submission Type</label>
            </td>
            <td>
              <select id="wd-submission-type" defaultValue="ONLINE">
                <option value="ONLINE">Online</option>
                <option value="OFFLINE">Offline</option>
                <option value="NONE">None</option>
              </select>
              <div style={{ marginTop: 16 }}>
                <label><b>Online Entry Options</b></label>
                <div>
                  <input type="checkbox" id="wd-text-entry" defaultChecked />
                  <label htmlFor="wd-text-entry" style={{ marginLeft: 8 }}>
                    Text Entry
                  </label>
                </div>
                <div>
                  <input type="checkbox" id="wd-website-url" />
                  <label htmlFor="wd-website-url" style={{ marginLeft: 8 }}>
                    Website URL
                  </label>
                </div>
                <div>
                  <input type="checkbox" id="wd-media-recordings" />
                  <label htmlFor="wd-media-recordings" style={{ marginLeft: 8 }}>
                    Media Recordings
                  </label>
                </div>
                <div>
                  <input type="checkbox" id="wd-student-annotation" />
                  <label htmlFor="wd-student-annotation" style={{ marginLeft: 8 }}>
                    Student Annotation
                  </label>
                </div>
              </div>
            </td>
          </tr>

          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-assign-to">Assign To</label>
            </td>
            <td>
              <input id="wd-assign-to" defaultValue="Everyone" />
            </td>
          </tr>

          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-due-date">Due Date</label>
            </td>
            <td>
              <input id="wd-due-date" type="date" defaultValue="2021-01-01" />
            </td>
          </tr>

          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-available-from">Available From</label>
            </td>
            <td>
              <input
                id="wd-available-from"
                type="date"
                defaultValue="2021-01-01"
              />
            </td>
          </tr>

          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-available-until">Available Until</label>
            </td>
            <td>
              <input
                id="wd-available-until"
                type="date"
                defaultValue="2021-01-01"
              />
            </td>
          </tr>
        </tbody>
      </table>

      <br />

      <div style={{ display: "flex", gap: 12 }}>
        <Link to="../index.tsx">  <button type="button" className="wd-cancel-button">
          Cancel
        </button>
        </Link>
       <Link to="../index.tsx">  <button type="button" className="wd-save-button">
          Save
        </button>
                </Link>
      </div>
    </div>
  );
}
