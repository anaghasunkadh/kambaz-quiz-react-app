import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  createQuiz, deleteQuiz, getQuizzesByCourse, setPublished
} from "./service";

export default function Quizzes() {
  const { cid } = useParams();
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    if (!cid) return;
    setLoading(true);
    const data = await getQuizzesByCourse(cid);
    data.sort(
      (a: any, b: any) =>
        new Date(a.available_date || 0).getTime() -
        new Date(b.available_date || 0).getTime()
    );
    setQuizzes(data);
    setLoading(false);
  };

  useEffect(() => { load(); }, [cid]);

  const onAdd = async () => {
    const created = await createQuiz(cid!, {
      title: "New Quiz",
      type: "Graded Quiz",
      points: 0,
      available_date: new Date().toISOString(),
      published: false,
    });
    // ✅ navigate to quiz editor screen per rubric
    navigate(`/Kambaz/Courses/${cid}/Quizzes/${created.id}`);
  };

  const onTogglePublish = async (id: string, published: boolean) => {
    await setPublished(id, !published);
    load();
  };

  const onDelete = async (id: string) => {
    await deleteQuiz(id);
    load();
  };

  return (
    <div className="wd-quizzes">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Quizzes</h3>
        <button className="btn btn-danger" onClick={onAdd}>+ Quiz</button>
      </div>

      {loading ? (
        <div>Loading…</div>
      ) : quizzes.length === 0 ? (
        <div className="alert alert-secondary">
          Empty. Click <b>+ Quiz</b> to add one.
        </div>
      ) : (
        <ul className="list-group">
          {quizzes.map((q) => (
            <li key={q.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                {/* ✅ title → details screen */}
                <Link
                  to={`/Kambaz/Courses/${cid}/Quizzes/${q.id}`}
                  className="fw-semibold text-decoration-none"
                >
                  {q.title}
                </Link>
                {q.published && <span className="badge bg-success ms-2">✓</span>}
                <div className="text-muted small">
                  {(q.type ?? "Graded Quiz")} • {(q.points ?? 0)} pts • Available {q.available_date?.slice(0,10) ?? "-"}
                </div>
              </div>

              {/* 3-dot style menu simplified into two buttons */}
              <div className="btn-group">
                <Link
                  to={`/Kambaz/Courses/${cid}/Quizzes/${q.id}`}
                  className="btn btn-sm btn-outline-primary"
                >
                  Edit
                </Link>
                <Link
                  to={`/Kambaz/Courses/${cid}/Quizzes/${q.id}/Preview`}
                  className="btn btn-sm btn-outline-info"
                >
                  Preview
                </Link>
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => onTogglePublish(q.id, q.published)}
                >
                  {q.published ? "Unpublish" : "Publish"}
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => onDelete(q.id)}
                >
                  ⋯ Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
