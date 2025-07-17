import { Link } from "react-router-dom";

export default function AccountNavigation() {
  return (
    <div
      id="wd-account-navigation"
      className="bg-white d-flex flex-column p-3"
      style={{ height: "100vh", width: "200px" }}
    >

      <Link
        to="/Kambaz/Account/Signin"
        className="fw-bold text-black bg-white border-start border-4 border-black mb-3 ps-3 py-2 text-decoration-none"
      >
        Signin
      </Link>

      <Link
        to="/Kambaz/Account/Signup"
        className="text-danger bg-white mb-3 ps-3 py-2 text-decoration-none"
      >
        Signup
      </Link>

      <Link
        to="/Kambaz/Account/Profile"
        className="text-danger bg-white mb-3 ps-3 py-2 text-decoration-none"
      >
        Profile
      </Link>
    </div>
  );
}
