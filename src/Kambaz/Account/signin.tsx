import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FormControl, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import * as db from "../Database";

export default function Signin() {
  const [credentials, setCredentials] = useState({ loginId: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signin = () => {
    // Find user by loginId and password (password field missing in your JSON, so assuming password == loginId for demo)
    // You might want to adjust based on your real password field!
    const user = db.users.find(
      (u: any) =>
        u.loginId === credentials.loginId && 
        (credentials.password === u.loginId) // placeholder check; replace with real password check if you add password
    );

    if (!user) return; // ignore if no user matches

    dispatch(setCurrentUser(user));
    navigate("/Kambaz/Dashboard");
  };

  return (
    <div id="wd-signin-screen" className="p-4">
      <h3 className="fw-bold mb-4">Sign in</h3>

      <FormControl
        placeholder="login ID"
        id="wd-username"
        className="mb-3"
        value={credentials.loginId}
        onChange={(e) => setCredentials({ ...credentials, loginId: e.target.value })}
      />

      <FormControl
        placeholder="password"
        id="wd-password"
        type="password"
        className="mb-3"
        value={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
      />

      <Button
        id="wd-signin-btn"
        className="w-100 mb-3"
        onClick={signin}
      >
        Sign in
      </Button>

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
