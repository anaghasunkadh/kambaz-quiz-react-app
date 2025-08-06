import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FormControl, Button } from "react-bootstrap";
import * as client from "./client";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";

export default function Signup() {
  const [user, setUser] = useState({ username: "", password: "", verifyPassword: "" });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signup = async () => {
    setError(null);

    if (!user.username || !user.password) {
      setError("Username and password are required.");
      return;
    }

    if (user.password !== user.verifyPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const createdUser = await client.signup({
        username: user.username,
        password: user.password,
      });
      dispatch(setCurrentUser(createdUser));
      navigate("/Kambaz/Account/Profile");
    } catch (err: any) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div id="wd-signup-screen" className="p-4">
      <h3 className="fw-bold mb-4">Sign up</h3>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <FormControl
        placeholder="username"
        className="mb-3"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />

      <FormControl
        placeholder="password"
        type="password"
        className="mb-3"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />

      <FormControl
        placeholder="verify password"
        type="password"
        className="mb-3"
        value={user.verifyPassword}
        onChange={(e) => setUser({ ...user, verifyPassword: e.target.value })}
      />

      <Button className="w-100 mb-3" onClick={signup}>
        Sign up
      </Button>

      <Link to="/Kambaz/Account/Signin" className="text-decoration-none">
        Already have an account? Sign in
      </Link>
    </div>
  );
}
