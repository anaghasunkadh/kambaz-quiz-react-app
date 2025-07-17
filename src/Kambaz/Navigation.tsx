import { Link, useLocation } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import ListGroup from "react-bootstrap/esm/ListGroup";

export default function KambazNavigation() {
  const location = useLocation();

  return (
    <ListGroup id="wd-kambaz-navigation" style={{ width: 110 }}
      className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2">

      <ListGroup.Item id="wd-neu-link" target="_blank" action
        href="https://www.northeastern.edu/"
        className="bg-black border-0 text-center py-2">
        <img src="/images/Northeastern.jpg" width="65px" />
      </ListGroup.Item>

<ListGroup.Item to="/Kambaz/Account" as={Link}
  className={`text-center border-0 fw-bold
    ${location.pathname.startsWith("/Kambaz/Account") ? "bg-white text-danger" : "bg-black text-white"}`}>
  <FaRegCircleUser 
    className={`fs-1 ${location.pathname.startsWith("/Kambaz/Account") ? "text-danger" : "text-white"}`} 
  />
  Account
</ListGroup.Item>

      <ListGroup.Item to="/Kambaz/Dashboard" as={Link}
        className={`text-center border-0 fw-bold
          ${location.pathname.startsWith("/Kambaz/Dashboard") ? "bg-white text-danger" : "bg-black text-white"}`}>
        <AiOutlineDashboard className="fs-1 text-danger" />
        Dashboard
      </ListGroup.Item>

      <ListGroup.Item to="/Kambaz/Courses" as={Link}
        className={`text-center border-0 fw-bold
          ${location.pathname.startsWith("/Kambaz/Courses") ? "bg-white text-danger" : "bg-black text-white"}`}>
        <LiaBookSolid className="fs-1 text-danger" />
        Courses
      </ListGroup.Item>

      <ListGroup.Item to="/Kambaz/Calendar" as={Link}
        className={`text-center border-0 fw-bold
          ${location.pathname.startsWith("/Kambaz/Calendar") ? "bg-white text-danger" : "bg-black text-white"}`}>
        <IoCalendarOutline className="fs-1 text-danger" />
        Calendar
      </ListGroup.Item>

      <ListGroup.Item to="/Kambaz/Inbox" as={Link}
        className={`text-center border-0 fw-bold
          ${location.pathname.startsWith("/Kambaz/Inbox") ? "bg-white text-danger" : "bg-black text-white"}`}>
        <FaInbox className="fs-1 text-danger" />
        Inbox
      </ListGroup.Item>

      <ListGroup.Item to="/Labs" as={Link}
        className={`text-center border-0 fw-bold
          ${location.pathname.startsWith("/Labs") ? "bg-white text-danger" : "bg-black text-white"}`}>
        <LiaCogSolid className="fs-1 text-danger" />
        <br /> Labs
      </ListGroup.Item>

    </ListGroup>
  );
}
