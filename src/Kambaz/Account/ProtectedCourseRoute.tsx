import  { type JSX } from "react";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";

export default function ProtectedCourseRoute({ children }: { children: JSX.Element }) {
  const { cid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const enrollments = useSelector((state: any) => state.enrollmentsReducer.enrollments);

  const isFaculty = currentUser?.role === "FACULTY";

  const enrolled = enrollments.some(
    (enr: any) => enr.user === currentUser._id && enr.course === cid
  );

  if (!currentUser) {
    return <Navigate to="/Kambaz/Account" />;
  }

  if (isFaculty || enrolled) {
    return children;
  }

  return <Navigate to="/Kambaz/Dashboard" />;
}
