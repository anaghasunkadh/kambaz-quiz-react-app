import Lab1 from "./Lab1";
import { Route, Routes, Navigate } from "react-router";
import Lab2 from "./Lab2";
import TOC from "./TOC";
import Lab3 from "./Lab3";
export default function Labs() {
  return (
    <div>
      <h1>Labs </h1>
      <h1>Tejas Mohan Karkera </h1>
       <a id="wd-github" href="https://github.com/TejasKarkera10/kambaz-web-app-react"> Github </a> 
      <TOC />
      <Routes>
        <Route path="/" element={<Navigate to="Lab1" />} />
        <Route path="Lab1" element={<Lab1 />} />
        <Route path="Lab2/*" element={<Lab2 />} />
        <Route path="Lab3/*" element={<Lab3 />} />
      </Routes>
    </div>
);}

