import { Link, useLocation } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import ListGroup from "react-bootstrap/esm/ListGroup";
import React from "react";

export default function KambazNavigation() {
  const { pathname } = useLocation();

  const links = [
    { label: "Dashboard", path: "/Kambaz/Dashboard", icon: AiOutlineDashboard },
    { label: "Courses",   path: "/Kambaz/Courses",   icon: LiaBookSolid },
    { label: "Calendar",  path: "/Kambaz/Calendar",  icon: IoCalendarOutline },
    { label: "Inbox",     path: "/Kambaz/Inbox",     icon: FaInbox },
    { label: "Labs",      path: "/Labs",             icon: LiaCogSolid },
  ];

  return (
    <ListGroup id="wd-kambaz-navigation" style={{ width: 110 }}
      className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2">

      <ListGroup.Item id="wd-neu-link" target="_blank" action
        href="https://www.northeastern.edu/"
        className="bg-black border-0 text-center py-2">
        <img src="/images/Northeastern.jpg" width="65px" />
      </ListGroup.Item>

      <ListGroup.Item as={Link} to="/Kambaz/Account" className={`text-center border-0 bg-black
        ${pathname.includes("Account") ? "bg-white text-danger" : "bg-black text-white"}`}>
        <FaRegCircleUser className={`fs-1 ${pathname.includes("Account") ? "text-danger" : "text-white"}`} />
        <br />
        Account
      </ListGroup.Item>

      {links.map((link) => (
        <ListGroup.Item key={link.path} as={Link} to={link.path}
          className={`text-center border-0 fw-bold
            ${pathname.startsWith(link.path) ? "bg-white text-danger" : "bg-black text-white"}`}>
          {React.createElement(link.icon, { className: "fs-1 text-danger" })}
          <br />
          {link.label}
        </ListGroup.Item>
      ))}

    </ListGroup>
  );
}
