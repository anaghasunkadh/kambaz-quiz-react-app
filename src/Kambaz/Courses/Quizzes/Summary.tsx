import { useParams } from "react-router-dom";

export default function QuizSummary() {
  const { cid, id } = useParams();
  return (
    <div style={{ padding: 24 }}>
      <h2>Quiz Details</h2>
      <p>Course ID: {cid}</p>
      <p>Quiz ID: {id}</p>
      {/* Add more quiz details here as needed */}
    </div>
  );
}
