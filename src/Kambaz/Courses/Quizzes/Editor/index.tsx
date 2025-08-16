import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getQuiz, updateQuiz, setPublished } from "../service";
import Details from "./Details";
import QuestionsTab from "./Questions";

export default function QuizEditor() {
  const { cid, quizId } = useParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState<"Details" | "Questions">("Details");
  const [quiz, setQuiz] = useState<any>(null);

  const load = async () => setQuiz(await getQuiz(quizId!));
  useEffect(() => { if (quizId) load(); }, [quizId]);

  const save = async (publish = false) => {
    await updateQuiz(quizId!, quiz);
    if (publish) await setPublished(quizId!, true);
    // Save → details; Save&Publish → list (per rubric)
    publish
      ? navigate(`/Kambaz/Courses/${cid}/Quizzes`)
      : navigate(`/Kambaz/Courses/${cid}/Quizzes/${quizId}/Summary`);
  };
  const cancel = () => navigate(`/Kambaz/Courses/${cid}/Quizzes`);

  if (!quiz) return <div>Loading…</div>;

  return (
    <div>
      <div className="mb-3">
        <button className={`btn btn-sm me-2 ${tab==="Details"?"btn-danger":"btn-outline-danger"}`}
                onClick={()=>setTab("Details")}>Details</button>
        <button className={`btn btn-sm ${tab==="Questions"?"btn-danger":"btn-outline-danger"}`}
                onClick={()=>setTab("Questions")}>Questions</button>
      </div>

      {tab === "Details" && (
        <Details
          quiz={quiz}
          onChange={setQuiz}
          onSave={() => save(false)}
          onSavePublish={() => save(true)}
          onCancel={cancel}
        />
      )}

      {tab === "Questions" && (
        <QuestionsTab quizId={quizId!} />
      )}
    </div>
  );
}
