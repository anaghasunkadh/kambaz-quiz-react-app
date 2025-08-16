import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getQuiz, setPublished } from "../service";

export default function QuizDetailsSummary() {
  const { cid, quizId } = useParams();
  const [quiz, setQuiz] = useState<any>(null);
  const navigate = useNavigate();

  const load = async () => setQuiz(await getQuiz(quizId!));
  useEffect(() => { if (quizId) load(); }, [quizId]);

  const toggle = async () => {
    await setPublished(quizId!, !quiz.published);
    load();
  };

  if (!quiz) return <div>Loading…</div>;

  return (
    <div>
      <h3 className="mb-3">{quiz.title}</h3>
      <div className="mb-1"><b>Type:</b> {quiz.type}</div>
      <div className="mb-1"><b>Points:</b> {quiz.points ?? 0}</div>
      <div className="mb-1"><b>Due:</b> {quiz.due_date?.slice(0,10) ?? "-"}</div>
      <div className="mb-1"><b>Available:</b> {quiz.available_date?.slice(0,10) ?? "-"}</div>
      <div className="mb-3"><b>Until:</b> {quiz.until_date?.slice(0,10) ?? "-"}</div>

      <div className="d-flex gap-2">
        <button className="btn btn-outline-secondary" onClick={toggle}>
          {quiz.published ? "Unpublish" : "Publish"}
        </button>
        <Link className="btn btn-outline-primary"
          to={`/Kambaz/Courses/${cid}/Quizzes/${quizId}/Preview`}>
          Preview
        </Link>
        <Link className="btn btn-danger"
          to={`/Kambaz/Courses/${cid}/Quizzes/${quizId}`}>
          Edit
        </Link>
        <button className="btn btn-outline-dark"
          onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes`)}>
          Back to list
        </button>
      </div>
      {quiz.published && <div className="mt-2 text-success">✓ Published</div>}
    </div>
  );
}
