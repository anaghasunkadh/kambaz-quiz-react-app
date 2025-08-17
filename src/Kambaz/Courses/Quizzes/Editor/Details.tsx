import { useNavigate, useParams } from "react-router-dom";

type Props = {
  quiz: any;
  onChange: (q: any) => void;
  onSave: () => void;
  onSavePublish: () => void;
  onCancel: () => void;
};

export default function Details({ quiz, onChange, onSave, onSavePublish, onCancel }: Props) {
  const bind = (k: string) => ({
    value: quiz?.[k] ?? "",
    onChange: (e: any) =>
      onChange({ ...quiz, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value })
  });
  const navigate = useNavigate();
  const { cid, quizId } = useParams();

  return (
    <div className="d-grid gap-3">
      <label>Title <input className="form-control" {...bind("title")} /></label>
      <label>Description <textarea className="form-control" {...bind("description")} /></label>
      <label>Points <input type="number" className="form-control" {...bind("points")} /></label>

      <label className="form-check">
        <input className="form-check-input" type="checkbox"
          checked={!!quiz.shuffle_answers}
          onChange={e => onChange({ ...quiz, shuffle_answers: e.target.checked })} />
        <span className="form-check-label">Shuffle answers</span>
      </label>

      <div className="row g-2">
        <div className="col-auto form-check">
          <input id="timelimit" className="form-check-input" type="checkbox"
            checked={!!quiz.time_limit}
            onChange={() => onChange({ ...quiz, time_limit: quiz.time_limit ? 0 : 30 })} />
          <label htmlFor="timelimit" className="form-check-label">Time limit</label>
        </div>
        {quiz.time_limit ? (
          <div className="col-3">
            <input type="number" className="form-control" {...bind("time_limit")} placeholder="minutes" />
          </div>
        ) : null}
      </div>

      <div className="row g-2">
        <div className="col">
          <label>Due <input type="date" className="form-control" {...bind("due_date")} /></label>
        </div>
        <div className="col">
          <label>Available <input type="date" className="form-control" {...bind("available_date")} /></label>
        </div>
        <div className="col">
          <label>Until <input type="date" className="form-control" {...bind("until_date")} /></label>
        </div>
      </div>

      <div className="d-flex gap-2">
        <button className="btn btn-secondary" onClick={onSave}>Save</button>
        <button className="btn btn-danger" onClick={onSavePublish}>Save & Publish</button>
        <button className="btn btn-outline-dark" onClick={onCancel}>Cancel</button>
        <button className="btn btn-outline-primary" onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/${quizId}/Preview`)}>Preview</button>
      </div>
    </div>
  );
}
