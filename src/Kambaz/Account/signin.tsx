import { Link } from "react-router-dom";
export default function Signin() {
  return (
    <div id="wd-signin-screen" className="p-4">
      <h3 className="fw-bold mb-4">Sign in</h3>

      <input
        placeholder="username"
        id="wd-username"
        className="form-control mb-3"
      /> <br/>

      <input
        placeholder="password"
        type="password"
        id="wd-password"
        className="form-control mb-3"
      /> <br/>

      <Link
        to="/Kambaz/Account/Profile"
        className="btn btn-primary w-100 mb-3"
        id="wd-signin-btn"
      >
        Sign in
      </Link> <br/>

      <Link
        to="/Kambaz/Account/Signup"
        className="text-decoration-none"
        id="wd-signup-link"
      >
        Don't have an account? Sign up
      </Link>
    </div>
  );
}
