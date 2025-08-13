import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PeopleTable from "./Table";
import * as courseClient from "../client";

export default function People() {
  const { cid } = useParams<{ cid: string }>();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!cid) return;

    const fetchUsers = async () => {
      setLoading(true);
      setError("");
      try {
        const enrolledUsers = await courseClient.findUsersForCourse(cid);
        setUsers(enrolledUsers);
      } catch (err) {
        setError("Failed to load users for this course.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [cid]);

  if (loading) return <div>Loading users...</div>;
  if (error) return <div className="text-danger">{error}</div>;

  return (
    <div>
      <h2>Users Enrolled in this Course</h2>
      <PeopleTable users={users} />
    </div>
  );
}
