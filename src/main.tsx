// import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
// import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// import './index.css';

// import Lab1 from './Labs/Lab1';
// import Kambaz from "./Kambaz";

// const App = () => (
//   <>
//     <h1>Welcome to Web Development!</h1>
//     <ul>
//       <li><Link to="/labs/lab1">Assignment 1</Link></li>
//       <li><Link to="/Kambaz">Kanbas</Link></li>
//     </ul>
//   </>
// );

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<App />} />
//         <Route path="/labs/lab1" element={<Lab1 />} />
//         <Route path="/Kambaz/*" element={<Kambaz />} />
//       </Routes>
//     </BrowserRouter>
//   </StrictMode>
// );

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import './index.css'
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.min.css";

createRoot(document.getElementById("root")!).render(
 <StrictMode>
   <App />
 </StrictMode>);
