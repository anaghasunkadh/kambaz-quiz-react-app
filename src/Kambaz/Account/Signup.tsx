import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div id="wd-signup-screen" className="p-4">
      <h3 className="fw-bold mb-4">Sign up</h3>

      <input
        placeholder="username"
        className="form-control mb-3"
      /> <br/>

      <input
        placeholder="password"
        type="password"
        className="form-control mb-3"
      /> <br/>

      <input
        placeholder="verify password"
        type="password"
        className="form-control mb-3"
      /> <br/>

      <Link
        to="/Kambaz/Account/Profile"
        className="btn btn-primary w-100 mb-3"
      >
        Sign up
      </Link> <br/>

      <Link
        to="/Kambaz/Account/Signin"
        className="text-decoration-none"
      >
        Already have an account? Sign in
      </Link>
    </div>
  );
}
