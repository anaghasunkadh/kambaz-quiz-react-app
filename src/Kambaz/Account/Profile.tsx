import { Link } from "react-router-dom";

export default function Profile() {
  return (
    <div id="wd-profile-screen" className="p-4">
      <h3 className="fw-bold mb-4">Profile</h3>

      <input
        defaultValue="alice"
        placeholder="username"
        className="form-control mb-3"
      /> <br/>

      <input
        defaultValue="123"
        placeholder="password"
        type="password"
        className="form-control mb-3"
      /> <br/>

      <input
        defaultValue="Alice"
        placeholder="First Name"
        id="wd-firstname"
        className="form-control mb-3"
      /> <br/>

      <input
        defaultValue="Wonderland"
        placeholder="Last Name"
        id="wd-lastname"
        className="form-control mb-3"
      /> <br/>

      <input
        defaultValue="2000-01-01"
        type="date"
        id="wd-dob"
        className="form-control mb-3"
      /> <br/>

      <input
        defaultValue="alice@wonderland"
        type="email"
        id="wd-email"
        className="form-control mb-3"
      /> <br/>

      <select
        defaultValue="FACULTY"
        id="wd-role"
        className="form-select mb-4"
      >
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </select> <br/>

      <Link
        to="/Kambaz/Account/Signin"
        className="btn btn-danger w-100"
      >
        Sign out
      </Link>
    </div>
  );
}
