import { useEffect, useState } from "react";
import { createQuestion, deleteQuestionAPI, getQuestions, updateQuestion } from "../service";

export default function QuestionsTab({ quizId }: { quizId: string }) {
  const [questions, setQuestions] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<any>({});
  const [groups, setGroups] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGroup, setSelectedGroup] = useState<string>("all");
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [_editingGroup, _setEditingGroup] = useState<any>(null);

  const load = async () => {
    try {
      const questionsData = await getQuestions(quizId);
      
      const processedQuestions = questionsData.map((q: any) => {
        if (q.title === "__METADATA__" || q.type === "metadata") {
          return q; 
        }
        
        let extractedGroup = 'Ungrouped';
        
        if (q.group && q.group !== 'Ungrouped') {
          extractedGroup = q.group;
        } else if (q.title && q.title.match(/^\[(.*?)\]/)) {
          const match = q.title.match(/^\[(.*?)\]/);
          if (match && match[1]) {
            extractedGroup = match[1];
          }
        } else if (q.description && q.description.includes('Group:')) {
          const groupMatch = q.description.match(/Group:\s*(.+?)(?:\n|$)/);
          if (groupMatch && groupMatch[1]) {
            extractedGroup = groupMatch[1].trim();
          }
        }
        
        return { ...q, group: extractedGroup };
      });
      
      console.log('Processed questions with extracted groups:', processedQuestions);
      setQuestions(processedQuestions);
      
      const metadataQuestion = questionsData.find((q: any) => q.title === "__METADATA__");
      let loadedGroups = ['Ungrouped'];
      
      if (metadataQuestion && metadataQuestion.groups) {
        loadedGroups = ['Ungrouped', ...metadataQuestion.groups.filter((g: string) => g !== 'Ungrouped')];
      } else {
        const storedGroups = localStorage.getItem(`quiz_${quizId}_groups`);
        if (storedGroups) {
          try {
            const parsedGroups = JSON.parse(storedGroups);
            loadedGroups = ['Ungrouped', ...parsedGroups.filter((g: string) => g !== 'Ungrouped')];
          } catch (e) {
            console.error('Error parsing stored groups:', e);
          }
        }
        
        const questionGroups = [...new Set(questionsData.map((q: any) => q.group || 'Ungrouped'))];
        loadedGroups = [...new Set([...loadedGroups, ...questionGroups])] as string[];
      }
      
      setGroups(loadedGroups);
      
      if (loadedGroups.length === 1 && loadedGroups[0] === 'Ungrouped') {
        const defaultGroups = ['Basic Concepts', 'Advanced Topics', 'Problem Solving'];
        for (const group of defaultGroups) {
          await createGroup(group);
        }
      }
    } catch (error) {
      console.error('Error loading questions:', error);
    }
  };

  const createGroup = async (groupName: string) => {
    if (groupName.trim() && !groups.includes(groupName)) {
      const newGroups = [...groups, groupName];
      setGroups(newGroups);
      
      localStorage.setItem(`quiz_${quizId}_groups`, JSON.stringify(newGroups));
      
      try {
        const metadataQuestion = {
          title: "__METADATA__",
          type: "metadata",
          description: "Quiz metadata and groups",
          groups: newGroups,
          points: 0
        };
        
        const existingMetadata = questions.find(q => q.title === "__METADATA__");
        if (existingMetadata) {
          await updateQuestion(existingMetadata.id, { ...existingMetadata, groups: newGroups });
        } else {
          await createQuestion(quizId, metadataQuestion);
        }
        
        await load(); 
      } catch (error) {
        console.error('Error saving groups metadata:', error);
      }
    }
  };

  const deleteGroup = async (groupName: string) => {
    if (groupName !== 'Ungrouped') {
      const newGroups = groups.filter(g => g !== groupName);
      setGroups(newGroups);
      
      localStorage.setItem(`quiz_${quizId}_groups`, JSON.stringify(newGroups));
      
      const updatedQuestions = questions.map((q: any) => 
        q.group === groupName ? { ...q, group: 'Ungrouped' } : q
      );
      setQuestions(updatedQuestions);
      
      try {
        const metadataQuestion = questions.find(q => q.title === "__METADATA__");
        if (metadataQuestion) {
          await updateQuestion(metadataQuestion.id, { ...metadataQuestion, groups: newGroups });
        }
      } catch (error) {
        console.error('Error updating groups metadata:', error);
      }
    }
  };
  useEffect(() => { load(); }, [quizId]);
  
  useEffect(() => {
    if (editingId && draft.type === "fillblanks" && (!draft.blanks || draft.blanks.length === 0)) {
      const blankCount = (draft.description || "").match(/_{3,}/g)?.length || 1;
      if (blankCount > 0) {
        setDraft((prev: any) => ({
          ...prev,
          blanks: Array(blankCount).fill(null).map(() => ({ answers: [] }))
        }));
      }
    }
  }, [editingId, draft.type, draft.description, draft.blanks]);

  const filteredQuestions = questions.filter((q: any) => {
    if (q.title === "__METADATA__" || q.type === "metadata") {
      return false;
    }
    
    const matchesSearch = searchTerm === "" || 
      q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (q.description && q.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      q.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesGroup = selectedGroup === "all" || q.group === selectedGroup || 
      (selectedGroup === "Ungrouped" && (!q.group || q.group === "Ungrouped"));
    
    if (selectedGroup !== "all") {
      console.log(`Question "${q.title}" has group: "${q.group}", selectedGroup: "${selectedGroup}", matchesGroup: ${matchesGroup}`);
    }
    
    return matchesSearch && matchesGroup;
  });

  const startNew = async () => {
    try {
      const questionData = {
        title: "New Question",
        type: "mcq",
        description: "Enter your question here...",
        options: ["Option 1"],
        answer: ["Option 1"], 
        blanks: [],
        group: "Ungrouped",
        points: 1
      };
      
      const created = await createQuestion(quizId, questionData);
      await load();
      setEditingId(created.id);
      setDraft(created);
    } catch (error) {
      console.error('Error creating question:', error);
      if (error instanceof Error) {
        alert(`Failed to create question: ${error.message}`);
      } else {
        alert('Failed to create question. Please check if the backend server is running.');
      }
    }
  };

  const startEdit = (q: any) => { 
    const questionData = { ...q };
    
    let extractedGroup = 'Ungrouped';
    
    if (q.group && q.group !== 'Ungrouped') {
      extractedGroup = q.group;
    }
    else if (q.title && q.title.match(/^\[(.*?)\]/)) {
      const match = q.title.match(/^\[(.*?)\]/);
      if (match && match[1]) {
        extractedGroup = match[1];
        questionData.title = q.title.replace(/^\[.*?\]\s*/, '');
      }
    }
    else if (q.description && q.description.includes('Group:')) {
      const groupMatch = q.description.match(/Group:\s*(.+?)(?:\n|$)/);
      if (groupMatch && groupMatch[1]) {
        extractedGroup = groupMatch[1].trim();
        questionData.description = q.description.replace(/\n\nGroup:\s*.+?(?:\n|$)/, '');
      }
    }
    
    questionData.group = extractedGroup;
    
    if (q.type === "fillblanks") {
      if (q.blanks && q.blanks.length > 0) {
      } else if (q.answer && q.answer.length > 0) {
        const blankCount = (q.description || "").match(/_{3,}/g)?.length || 1;
        
        if (q.answer.length === blankCount) {
          questionData.blanks = q.answer.map((answer: any) => ({ answers: [answer] }));
        } else {
          questionData.blanks = Array(blankCount).fill(null).map(() => ({ 
            answers: q.answer || [] 
          }));
        }
      } else {
        questionData.blanks = [{ answers: [] }];
      }
    }
    
    setEditingId(q.id); 
    setDraft(questionData); 
  };
  const cancel = () => { setEditingId(null); setDraft({}); };

  const save = async () => {
    try {
      if (!draft.title || draft.title.trim() === "") {
        alert('Question title is required.');
        return;
      }

      if (!draft.description || draft.description.trim() === "") {
        alert('Question text is required.');
        return;
      }

      const saveData = { 
        ...draft,
        group: draft.group || 'Ungrouped' 
      };
      
      
      if (draft.type === "fillblanks") {
        if (!draft.description.includes('___')) {
          alert('Fill-in-the-blank questions must have ___ for blanks.');
          return;
        }

        if (!draft.blanks || draft.blanks.length === 0) {
          alert('Fill-in-the-blank questions must have at least one blank configured.');
          return;
        }

        const emptyBlanks = draft.blanks.filter((blank: any) => !blank.answers || blank.answers.length === 0);
        if (emptyBlanks.length > 0) {
          alert('All blanks must have at least one correct answer.');
          return;
        }

        saveData.blanks = draft.blanks;
        saveData.answer = draft.blanks.flatMap((blank: any) => blank.answers || []);
      } else if (draft.type === "mcq") {
        if (!draft.options || draft.options.length === 0) {
          alert('Multiple choice questions must have at least one option.');
          return;
        }

        const emptyOptions = draft.options.filter((opt: string) => !opt || opt.trim() === "");
        if (emptyOptions.length > 0) {
          alert('All options must have text.');
          return;
        }

        if (!draft.answer || draft.answer.length === 0) {
          alert('Multiple choice questions must have at least one correct answer selected.');
          return;
        }
      } else if (draft.type === "truefalse") {
        if (!draft.answer || draft.answer.length === 0) {
          alert('True/False questions must have a correct answer selected.');
          return;
        }
      }

      console.log('Saving question with data:', saveData);
      console.log('Question ID being updated:', editingId);
      const result = await updateQuestion(editingId!, saveData);
      console.log('Update result from backend:', result);
      console.log('Question saved successfully');
      
      console.log('About to reload questions...');
      await load();
      console.log('Questions reloaded. Current questions state:', questions);
      
      const reloadedQuestion = questions.find(q => q.id === editingId);
      if (reloadedQuestion) {
        console.log('Reloaded question group info:', {
          id: reloadedQuestion.id,
          title: reloadedQuestion.title,
          group: reloadedQuestion.group,
          expectedGroup: saveData.group
        });
      }
      setEditingId(null);
      setDraft({});
    } catch (error) {
      console.error('Error saving question:', error);
      if (error instanceof Error) {
        alert(`Failed to save question: ${error.message}`);
      } else {
        alert('Failed to save question. Please try again.');
      }
    }
  };

  const remove = async (quid: string) => {
    await deleteQuestionAPI(quid);
    load();
  };

  return (
    <div className="d-grid gap-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5>Questions</h5>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-primary" onClick={() => setShowGroupModal(true)}>Manage Groups</button>
          <button className="btn btn-secondary" onClick={startNew}>New Question</button>
        </div>
      </div>

      {/* Search and Filter Controls */}
      <div className="row g-3 mb-3">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search questions by title, content, or type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            value={selectedGroup}
            onChange={(e) => {
              console.log('Group filter changed to:', e.target.value);
              setSelectedGroup(e.target.value);
            }}
          >
            <option value="all">All Groups</option>
            <option value="Ungrouped">Ungrouped</option>
            {groups.filter(g => g !== 'Ungrouped').map((group: string) => (
              <option key={group} value={group}>{group}</option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <div className="text-muted small">
            Showing {filteredQuestions.length} of {questions.filter(q => q.title !== "__METADATA__" && q.type !== "metadata").length} questions
          </div>
        </div>
      </div>

      <ul className="list-group">
        {filteredQuestions.map((q) => (
          <li key={q.id} className="list-group-item">
            {editingId === q.id ? (
              <div className="d-grid gap-2">
                <label>Title <input className="form-control"
                  value={draft.title || ""} onChange={e => setDraft((prev: any) => ({ ...prev, title: e.target.value }))} /></label>

                <label>Type
                  <select className="form-select" value={draft.type || "mcq"} onChange={(e) => {
                    const newType = e.target.value;
                    setDraft((prev: any) => ({ ...prev, type: newType }));
                    if (newType === "fillblanks") {
                      if (!draft.description) {
                        setDraft((prev: any) => ({ ...prev, description: "The capital of France is ___ and the capital of Germany is ___." }));
                      }
                      const blankCount = (draft.description || "The capital of France is ___ and the capital of Germany is ___.").match(/_{3,}/g)?.length || 2;
                      setDraft((prev: any) => ({ 
                        ...prev, 
                        blanks: Array(blankCount).fill(null).map(() => ({ answers: [] })),
                        options: [],
                        answer: []
                      }));
                    } else if (newType === "mcq") {
                      if (!draft.options || draft.options.length === 0) {
                        setDraft((prev: any) => ({ ...prev, options: ["Option 1"] }));
                      }
                      setDraft((prev: any) => ({ 
                        ...prev, 
                        blanks: [], 
                        answer: prev.options && prev.options.length > 0 ? [prev.options[0]] : ["Option 1"]
                      }));
                    } else if (newType === "truefalse") {
                      setDraft((prev: any) => ({ 
                        ...prev, 
                        options: [], 
                        blanks: [], 
                        answer: ["True"]
                      }));
                    }
                  }}>
                    <option value="mcq">Multiple Choice</option>
                    <option value="truefalse">True/False</option>
                    <option value="fillblanks">Fill in the blanks</option>
                  </select>
                </label>

                <label>Group
                  <select className="form-select" value={draft.group || "Ungrouped"} onChange={(e) => setDraft((prev: any) => ({ ...prev, group: e.target.value }))}>
                    <option value="Ungrouped">Ungrouped</option>
                    {groups.filter(g => g !== 'Ungrouped').map((group: string) => (
                      <option key={group} value={group}>{group}</option>
                    ))}
                  </select>
                </label>

                {draft.type !== "fillblanks" && (
                  <label>Question Text <textarea className="form-control"
                    value={draft.description || ""} onChange={e => setDraft((prev: any) => ({ ...prev, description: e.target.value }))}
                    placeholder="Enter the question text..." /></label>
                )}

                <label>Points <input type="number" className="form-control"
                  value={draft.points ?? 1} onChange={e => setDraft((prev: any) => ({ ...prev, points: Number(e.target.value) }))} /></label>

                {draft.type === "mcq" && (
                  <div className="d-grid gap-2">
                    <div className="fw-semibold">Options</div>
                    {(draft.options ?? []).map((opt: string, i: number) => (
                      <div key={i} className="d-flex gap-2">
                        <textarea className="form-control"
                          value={opt}
                          onChange={(e) => {
                            const opts = [...(draft.options ?? [])]; opts[i] = e.target.value; setDraft((prev: any) => ({ ...prev, options: opts }));
                          }} />
                        <label className="form-check d-flex align-items-center gap-1">
                          <input className="form-check-input" type="checkbox"
                            checked={(draft.answer ?? []).includes(opt)}
                            onChange={(e) => {
                              const ans = new Set(draft.answer ?? []);
                              if (e.target.checked) ans.add(opt); else ans.delete(opt);
                              setDraft((prev: any) => ({ ...prev, answer: Array.from(ans) }));
                            }} />
                          Correct
                        </label>
                        <button className="btn btn-outline-danger"
                          onClick={() => {
                            const opts = [...(draft.options ?? [])]; const removed = opts.splice(i, 1)[0];
                            setDraft((prev: any) => ({ 
                              ...prev, 
                              options: opts,
                              answer: (prev.answer ?? []).filter((a: string) => a !== removed)
                            }));
                          }}>Remove</button>
                      </div>
                    ))}
                    <button className="btn btn-outline-secondary"
                      onClick={() => setDraft((prev: any) => ({ ...prev, options: [...(prev.options ?? []), ""] }))}>+ Add option</button>
                  </div>
                )}

                {draft.type === "truefalse" && (
                  <div className="d-flex gap-3">
                    <label className="form-check">
                      <input className="form-check-input" name="tf" type="radio"
                        checked={(draft.answer ?? [])[0] === "True"}
                        onChange={() => setDraft((prev: any) => ({ ...prev, answer: ["True"] }))} /> True
                    </label>
                    <label className="form-check">
                      <input className="form-check-input" name="tf" type="radio"
                        checked={(draft.answer ?? [])[0] === "False"}
                        onChange={() => setDraft((prev: any) => ({ ...prev, answer: ["False"] }))} /> False
                    </label>
                  </div>
                )}

                {draft.type === "fillblanks" && (
                  <div className="d-grid gap-2">
                    <label>Question Text <textarea className="form-control"
                      value={draft.description || ""} onChange={(e) => {
                        const text = e.target.value;
                        
                        setDraft((prev: any) => ({ ...prev, description: text }));

                        const blankCount = (text.match(/_{3,}/g) || []).length;
                        if (blankCount > 0) {
                          setDraft((prev: any) => {
                            const currentBlanks = prev.blanks || [];
                            if (blankCount !== currentBlanks.length) {
                              const newBlanks = Array(blankCount).fill(null).map((_, i) =>
                                currentBlanks[i] || { answers: [] }
                              );
                              return { ...prev, blanks: newBlanks };
                            }
                            return prev;
                          });
                        } else {
                          setDraft((prev: any) => ({ ...prev, blanks: [] }));
                        }
                      }}
                      placeholder="Enter your question text. Use ___ (triple underscore) to create blanks. Example: The capital of France is ___ and Germany is ___." /></label>

                    {draft.description && (
                      <div className="text-muted small">
                        Detected blanks: {(draft.description.match(/_{3,}/g) || []).length}
                      </div>
                    )}

                    {draft.description && (
                      <div className="border rounded p-2 bg-light">
                        <div className="text-muted small mb-1">Preview:</div>
                        <div>
                          {draft.description.split(/(_{3,})/).map((part: string, idx: number) =>
                            part.match(/_{3,}/) ? (
                              <span key={idx} className="badge bg-warning text-dark mx-1">
                                BLANK {Math.floor(idx / 2) + 1}
                              </span>
                            ) : (
                              part
                            )
                          )}
                        </div>
                      </div>
                    )}

                    <div className="fw-semibold">Blanks Configuration</div>
                    <div className="d-grid gap-2">
                      {(draft.blanks ?? []).map((blank: any, i: number) => (
                        <div key={i} className="border rounded p-3">
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <span className="fw-semibold">Blank {i + 1}</span>
                            <button className="btn btn-sm btn-outline-danger"
                              onClick={() => {
                                const newBlanks = [...(draft.blanks ?? [])];
                                newBlanks.splice(i, 1);
                                setDraft((prev: any) => ({ ...prev, blanks: newBlanks }));
                              }}>
                              Remove Blank
                            </button>
                          </div>

                          <div className="d-grid gap-2">
                            <label>Correct Answers (one per line):</label>
                            <textarea className="form-control"
                              value={(blank.answers ?? []).join("\n")}
                              onChange={(e) => {
                                const newBlanks = [...(draft.blanks ?? [])];
                                newBlanks[i] = { ...blank, answers: e.target.value.split("\n").filter(Boolean) };
                                setDraft((prev: any) => ({ ...prev, blanks: newBlanks }));
                              }}
                              placeholder="Enter accepted answers for this blank..." />
                          </div>
                        </div>
                      ))}

                      <button className="btn btn-outline-secondary"
                        onClick={() => {
                          const newBlanks = [...(draft.blanks ?? []), { answers: [] }];
                          setDraft((prev: any) => ({ ...prev, blanks: newBlanks }));
                        }}>
                        + Add Blank
                      </button>
                    </div>
                  </div>
                )}

                <div className="d-flex gap-2">
                  <button className="btn btn-outline-dark" onClick={cancel}>Cancel</button>
                  <button className="btn btn-danger" onClick={save}>Save</button>
                </div>
              </div>
            ) : (
              <div className="d-flex justify-content-between">
                <div>
                  <div className="fw-semibold">{q.title}</div>
                  {q.description && (
                    <div className="text-muted">{q.description}</div>
                  )}
                  {q.type === "fillblanks" && q.blanks && q.blanks.length > 0 && (
                    <div className="text-muted small">Number of blanks: {q.blanks.length}</div>
                  )}
                  <div className="text-muted small">
                    {q.group && q.group !== 'Ungrouped' && (
                      <span className="badge bg-primary me-2">{q.group}</span>
                    )}
                    {q.type} • {q.points ?? 1} pts
                  </div>
                </div>
                <div className="d-flex gap-2">
                  <button className="btn btn-sm btn-outline-secondary" onClick={() => startEdit(q)}>Edit</button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => remove(q.id)}>Delete</button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>

      {/* Group Management Modal */}
      {showGroupModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Manage Question Groups</h5>
                <button type="button" className="btn-close" onClick={() => setShowGroupModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Create New Group</label>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter group name"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          createGroup(e.currentTarget.value);
                          e.currentTarget.value = '';
                        }
                      }}
                    />
                    <button
                      className="btn btn-outline-secondary"
                      onClick={(e) => {
                        const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                        createGroup(input.value);
                        input.value = '';
                      }}
                    >
                      Add
                    </button>
                  </div>
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Existing Groups</label>
                  <div className="list-group">
                    {groups.filter(g => g !== 'Ungrouped').map((group: string) => (
                      <div key={group} className="list-group-item d-flex justify-content-between align-items-center">
                        <span>{group}</span>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => deleteGroup(group)}
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                    {groups.filter(g => g !== 'Ungrouped').length === 0 && (
                      <div className="text-muted">No custom groups created yet.</div>
                    )}
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowGroupModal(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
