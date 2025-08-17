import { Link } from "react-router-dom";

const teamMembers = [
  { name: "Anagha Srinath", section: "summer02 2025" },
  { name: "Shashidhar Gadepalli",section: "summer02 2025" },
  { name: "Tejas Mohar Karkera", section: "summer02 2025" },
  // Add other team members here
];

export default function TeamInfo() {
  return (
    <div style={{ padding: 24 }}>
      <h2>Team Information</h2>
      <ul>
        {teamMembers.map((member, idx) => (
          <li key={idx}>
            <strong>{member.name}</strong> - Section: {member.section}
          </li>
        ))}
      </ul>
      <h3>Project Repositories</h3>
      <ul>
        <li>
          <a href="https://github.com/ShashidharGadepalli/project-react-web-app" target="_blank" rel="noopener noreferrer">
            Frontend GitHub Repository
          </a>
        </li>
        <li>
          <a href="https://github.com/ShashidharGadepalli/project-node-server-app" target="_blank" rel="noopener noreferrer">
            Server GitHub Repository
          </a>
        </li>
        <li>
          <Link to="/Kambaz/Account/Signin">
            Kambaz App (Sign In)
          </Link>
        </li>
      </ul>
    </div>
  );
}
