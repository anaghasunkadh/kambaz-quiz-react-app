import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import * as client from "../../Account/client";
import { FormControl, FormSelect } from "react-bootstrap";
import { IoCloseSharp } from "react-icons/io5";
import { FaPencil } from "react-icons/fa6";
import { FaCheck, FaUserCircle } from "react-icons/fa";

const roles = ["STUDENT", "TA", "FACULTY", "ADMIN"];

export default function PeopleDetails() {
  const { uid } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState<any>({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (uid) {
      const fetchUser = async () => {
        const u = await client.findUserById(uid);
        setUser(u);
        setName(`${u.firstName} ${u.lastName}`);
        setEmail(u.email || "");
        setRole(u.role || "");
      };
      fetchUser();
    }
  }, [uid]);

  if (!uid) return null;

  const saveUser = async () => {
    const [firstName, ...lastParts] = name.trim().split(" ");
    const lastName = lastParts.join(" ") || "";
    const updatedUser = {
      ...user,
      firstName,
      lastName,
      email,
      role,
    };
    await client.updateUser(updatedUser);
    setUser(updatedUser);
    setEditing(false);
    navigate(-1);
  };

  const deleteUser = async (uid: string) => {
    await client.deleteUser(uid);
    navigate(-1);
  };

  return (
    <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25">
      <button
        onClick={() => navigate(-1)}
        className="btn position-fixed end-0 top-0 wd-close-details"
      >
        <IoCloseSharp className="fs-1" />
      </button>

      <div className="text-center mt-2">
        <FaUserCircle className="text-secondary me-2 fs-1" />
      </div>
      <hr />

      {/* Name editing */}
      <div className="text-danger fs-4 wd-name">
        {!editing && (
          <>
            {user.firstName} {user.lastName}
            <FaPencil
              onClick={() => setEditing(true)}
              className="float-end fs-5 mt-2 wd-edit"
              style={{ cursor: "pointer" }}
            />
          </>
        )}

        {editing && (
          <>
            <FormControl
              className="w-50 wd-edit-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  saveUser();
                }
              }}
              autoFocus
            />
            <FaCheck
              onClick={saveUser}
              className="float-end fs-5 mt-2 me-2 wd-save"
              style={{ cursor: "pointer" }}
            />
          </>
        )}
      </div>

      <hr />

      {/* Email editing */}
      <b>Email:</b>{" "}
      {!editing ? (
        <span>{user.email || "-"}</span>
      ) : (
        <FormControl
          type="email"
          className="w-100 mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
        />
      )}
      <br />

      {/* Role editing */}
      <b>Role:</b>{" "}
      {!editing ? (
        <span>{user.role}</span>
      ) : (
        <FormSelect
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-50 mb-3"
        >
          {roles.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </FormSelect>
      )}
      <br />

      {/* Other read-only fields */}
      <b>Login ID:</b> <span className="wd-login-id">{user.loginId}</span>
      <br />
      <b>Section:</b> <span className="wd-section">{user.section}</span>
      <br />
      <b>Total Activity:</b>{" "}
      <span className="wd-total-activity">{user.totalActivity}</span>
      <hr />

      {/* Buttons */}
      <button
        onClick={() => deleteUser(uid)}
        className="btn btn-danger float-end wd-delete"
      >
        Delete
      </button>

      <button
        onClick={() => {
          if (editing) {
            // Cancel editing: reset to user values
            setName(`${user.firstName} ${user.lastName}`);
            setEmail(user.email || "");
            setRole(user.role || "");
            setEditing(false);
          } else {
            navigate(-1);
          }
        }}
        className="btn btn-secondary float-start float-end me-2 wd-cancel"
      >
        {editing ? "Cancel Edit" : "Cancel"}
      </button>
    </div>
  );
}
