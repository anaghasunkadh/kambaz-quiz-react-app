import { BsGripVertical } from "react-icons/bs";
import ModuleControlButtons from "./ModuleControlButtons";
import ModulesControls from "./ModulesControls";
import { ListGroup } from "react-bootstrap";
import LessonControlButtons from "./LessonControlButtons";

export default function Modules() {
  return (
    <div>
      <ModulesControls /><br /><br /><br /><br />

      <ListGroup className="rounded-0" id="wd-modules">

        {/* Module 1 */}
        <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            Week 1, Lecture 1, Course Introduction, Syllabus Agenda
            <ModuleControlButtons />
          </div>

          <ListGroup className="wd-lessons rounded-0">

            <ListGroup.Item className="wd-lesson p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" />
              <strong>LEARNING OBJECTIVES</strong>
              <LessonControlButtons />
              <ListGroup variant="flush" className="wd-content mt-2">
                <ListGroup.Item className="wd-content-item ps-3">
                  <BsGripVertical className="me-2 fs-3" />
                  Introduction to the course
                  <LessonControlButtons />
                </ListGroup.Item>
                <ListGroup.Item className="wd-content-item ps-3">
                  <BsGripVertical className="me-2 fs-3" />
                  Learn what is Web Development
                  <LessonControlButtons />
                </ListGroup.Item>
              </ListGroup>
            </ListGroup.Item>

            <ListGroup.Item className="wd-lesson p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" />
              <strong>READING</strong>
              <LessonControlButtons />
              <ListGroup variant="flush" className="wd-content mt-2">
                <ListGroup.Item className="wd-content-item ps-3">
                  <BsGripVertical className="me-2 fs-3" />
                  Full Stack Developer - Chapter 1 - Introduction
                  <LessonControlButtons />
                </ListGroup.Item>
                <ListGroup.Item className="wd-content-item ps-3">
                  <BsGripVertical className="me-2 fs-3" />
                  Full Stack Developer - Chapter 2 - Creating Us
                  <LessonControlButtons />
                </ListGroup.Item>
              </ListGroup>
            </ListGroup.Item>

            <ListGroup.Item className="wd-lesson p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" />
              <strong>SLIDES</strong>
              <LessonControlButtons />
              <ListGroup variant="flush" className="wd-content mt-2">
                <ListGroup.Item className="wd-content-item ps-3">
                  <BsGripVertical className="me-2 fs-3" />
                  Introduction to web development
                  <LessonControlButtons />
                </ListGroup.Item>
                <ListGroup.Item className="wd-content-item ps-3">
                  <BsGripVertical className="me-2 fs-3" />
                  Creating a HTTP server using Nodejs
                  <LessonControlButtons />
                </ListGroup.Item>
                <ListGroup.Item className="wd-content-item ps-3">
                  <BsGripVertical className="me-2 fs-3" />
                  Creating a React application
                  <LessonControlButtons />
                </ListGroup.Item>
              </ListGroup>
            </ListGroup.Item>

          </ListGroup>
        </ListGroup.Item>

        {/* Module 2 */}
        <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            Week 1 - Lecture 2 Formatting user interfaces with HTML
            <ModuleControlButtons />
          </div>

          <ListGroup className="wd-lessons rounded-0">
            <ListGroup.Item className="wd-lesson p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" />
              <strong>LEARNING OBJECTIVES</strong>
              <LessonControlButtons />
              <ListGroup variant="flush" className="wd-content mt-2">
                <ListGroup.Item className="wd-content-item ps-3">
                  <BsGripVertical className="me-2 fs-3" />
                  Learn how to create user interfaces with HTML
                  <LessonControlButtons />
                </ListGroup.Item>
                <ListGroup.Item className="wd-content-item ps-3">
                  <BsGripVertical className="me-2 fs-3" />
                  Deployment on Netlify
                  <LessonControlButtons />
                </ListGroup.Item>
              </ListGroup>
            </ListGroup.Item>
          </ListGroup>
        </ListGroup.Item>

        {/* Module 3 */}
        <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            Week 2
            <ModuleControlButtons />
          </div>
        </ListGroup.Item>

        {/* Module 4 */}
        <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            Week 3
            <ModuleControlButtons />
          </div>
        </ListGroup.Item>

      </ListGroup>
    </div>
  );
}
