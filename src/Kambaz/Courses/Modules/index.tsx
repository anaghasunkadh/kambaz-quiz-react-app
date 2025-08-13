import { BsGripVertical } from "react-icons/bs";
import { useParams } from "react-router";
import ModuleControlButtons from "./ModuleControlButtons";
import ModulesControls from "./ModulesControls";
import { FormControl, ListGroup } from "react-bootstrap";
import LessonControlButtons from "./LessonControlButtons";
import * as modulesClient from "./client";
import * as courseClient from "../client";

import  { useState , useEffect} from "react";

import { useSelector, useDispatch } from "react-redux";
import { addModule, editModule, updateModule, deleteModule, setModules } from "./reducer";

export default function Modules() {
  const { cid } = useParams();
 const deleteModuleHandler = async (moduleId: string) => {
   await modulesClient.deleteModule(moduleId);
   dispatch(deleteModule(moduleId));
 };

  const [moduleName, setModuleName] = useState("");
  const { modules } = useSelector((state: any) => state.modulesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const dispatch = useDispatch();
   


  // const fetchModules = async () => {
  //   const modules = await coursesClient.findModulesForCourse(cid as string);
  //   dispatch(setModules(modules));
  // };
  // useEffect(() => {
  //   fetchModules();
  // }, []);
 const fetchModulesForCourse = async () => {
   const modules = await courseClient.findModulesForCourse(cid!);
   dispatch(setModules(modules));
 };
 useEffect(() => {
   fetchModulesForCourse();
 }, [cid]);

  const isFaculty = currentUser?.role === "FACULTY";
 const updateModuleHandler = async (module: any) => {
   await modulesClient.updateModule(module);
   dispatch(updateModule(module));
 };

 const addModuleHandler = async () => {
   const newModule = await courseClient.createModuleForCourse(cid!, {
     name: moduleName,
     course: cid,
   });
   dispatch(addModule(newModule));
   setModuleName("");
 };


  const editModuleHandler = (moduleId: string) => {
    dispatch(editModule(moduleId));
  };

 
  

  return (
    <div>
      {/* Show module adding form only for FACULTY */}
      {isFaculty && (
        <ModulesControls
          setModuleName={setModuleName}
          moduleName={moduleName}
                 addModule={addModuleHandler}

        />
      )}

      <br /><br /><br /><br />

      <ListGroup className="rounded-0" id="wd-modules">
        {modules
          .map((module: any) => (
            <ListGroup.Item
              key={module._id}
              className="wd-module p-0 mb-5 fs-5 border-gray"
            >
              <div className="wd-title p-3 ps-2 bg-secondary">
                <BsGripVertical className="me-2 fs-3" />
                {!module.editing && module.name}
                {module.editing && (
                  <FormControl
                    className="w-50 d-inline-block"
                    onChange={(e) =>
                      updateModuleHandler({ ...module, name: e.target.value })
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        updateModuleHandler({ ...module, editing: false });
                      }
                    }}
                    defaultValue={module.name}
                  />
                )}

                {/* Show edit/delete buttons only for FACULTY */}
                {isFaculty && (
                  <ModuleControlButtons
                    moduleId={module._id}
                    deleteModule={(moduleId) => deleteModuleHandler(moduleId)}
                    editModule={editModuleHandler}
                  />
                )}
              </div>

              {module.lessons && (
                <ListGroup className="wd-lessons rounded-0">
                  {module.lessons.map((lesson: any) => (
                    <ListGroup.Item
                      key={lesson._id}
                      className="wd-lesson p-3 ps-1"
                    >
                      <BsGripVertical className="me-2 fs-3" />
                      {lesson.name}
                      <LessonControlButtons />
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          ))}
      </ListGroup>
    </div>
  );
}
