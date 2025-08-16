import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuiz, getQuestions } from "../service";

export default function Preview() {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [i, setI] = useState(0);

  useEffect(() => {
    if (!quizId) return;
    getQuiz(quizId).then(setQuiz);
    getQuestions(quizId).then(setQuestions);
  }, [quizId]);

  const q = questions[i];
  return (
    <div>
      <h3 className="mb-3">{quiz?.title ?? "Quiz"}</h3>
      {!q ? (
        <div>No questions.</div>
      ) : (
        <>
          <div className="mb-2 text-muted">Question {i + 1} / {questions.length}</div>
          <div className="mb-3">
            <div className="fw-semibold">{q.title}</div>
            {q.description && <div className="mb-2">{q.description}</div>}

            {q.type === "mcq" && (
              <ul className="list-unstyled">
                {(q.options ?? []).map((o: string, idx: number) => (
                  <li key={idx}>
                    <label><input type="checkbox" className="form-check-input me-2" /> {o}</label>
                  </li>
                ))}
              </ul>
            )}
            {q.type === "truefalse" && (
              <div className="d-flex gap-3">
                <label><input type="radio" name="tf" className="form-check-input me-2" /> True</label>
                <label><input type="radio" name="tf" className="form-check-input me-2" /> False</label>
              </div>
            )}
            {q.type === "fillblanks" && (
              <div>
                {q.description ? (
                  <div className="mb-3">
                    {q.description.split(/(_{3,})/).map((part: string, idx: number) => {
                      if (part.match(/_{3,}/)) {
                        const blankIndex = Math.floor(idx / 2);
                        return (
                          <input
                            key={idx}
                            className="form-control d-inline mx-1"
                            style={{ width: '150px', display: 'inline-block' }}
                            placeholder={`Blank ${blankIndex + 1}`}
                          />
                        );
                      }
                      return <span key={idx}>{part}</span>;
                    })}
                  </div>
                ) : (
                  <div>
                    {(q.blanks ?? []).map((blank: any, idx: number) => (
                      <div key={idx} className="mb-2">
                        <label className="form-label">Blank {idx + 1}:</label>
                        <input
                          className="form-control"
                          placeholder={`Answer for blank ${idx + 1}`}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="d-flex gap-2 mb-2">
            <button className="btn btn-outline-dark" disabled={i === 0} onClick={() => setI(i - 1)}>Prev</button>
            <button className="btn btn-outline-dark" disabled={i === questions.length - 1} onClick={() => setI(i + 1)}>Next</button>
          </div>

          <div className="d-flex flex-wrap gap-1">
            {questions.map((_: any, idx: number) => (
              <button key={idx}
                className={`btn btn-sm ${idx === i ? "btn-danger" : "btn-outline-danger"}`}
                onClick={() => setI(idx)}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
