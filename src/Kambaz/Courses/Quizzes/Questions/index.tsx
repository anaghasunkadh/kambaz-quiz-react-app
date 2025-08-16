import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuestions } from "../service";

export default function QuestionsDebug() {
  const { quizId } = useParams();
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState<string | null>(null);

  useEffect(() => {
    if (!quizId) return;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getQuestions(quizId);
        setQuestions(data);
      } catch (e: any) {
        setError(e?.message ?? "Failed to load questions");
      } finally {
        setLoading(false);
      }
    })();
  }, [quizId]);

  if (loading) return <div>Loading questions…</div>;
  if (error)   return <div className="text-danger">{error}</div>;

  return (
    <div>
      <h4>Questions for {quizId}</h4>
      {questions.length === 0 ? (
        <div className="alert alert-secondary">No questions found.</div>
      ) : (
        <ul className="list-group">
          {questions.map((q) => (
            <li key={q.id} className="list-group-item">
              <div className="fw-semibold">{q.title}</div>
              <div className="text-muted small">{q.type} • {q.points ?? 1} pts</div>
              {q.description && <div className="mt-2">{q.description}</div>}
              {q.type === "mcq" && (
                <ul className="mt-2">
                  {(q.options ?? []).map((o: string, i: number) => <li key={i}>{o}</li>)}
                </ul>
              )}
              {q.type === "truefalse" && <div className="mt-2">True / False</div>}
              {q.type === "fillblanks" && (
                <div className="mt-2">
                  {q.blanks && q.blanks.length > 0 ? (
                    <div>
                      <div className="fw-semibold">Blanks ({q.blanks.length}):</div>
                      {q.blanks.map((blank: any, idx: number) => (
                        <div key={idx} className="ms-3">
                          <span className="text-muted">Blank {idx + 1}:</span> {(blank.answers ?? []).join(", ")}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-muted">No blanks configured</div>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
