import { useState } from "react";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import menu from "./menu";
import { getUser } from "@services/authStorage";

import styles from "./Sidebar.module.css";

export default function Sidebar() {
  const user = getUser();

  const roleClass = {
    ADMIN: styles.admin,
    COACH: styles.coach,
    USER: styles.user,
  }[user.role.toUpperCase()];

  const sections = menu.filter(section =>
    section.roles.includes(user.role.toUpperCase())
  );

  const [openSections, setOpenSections] = useState(() =>
    Object.fromEntries(sections.map(s => [s.title, true]))
  );

  function toggleSection(title) {
    setOpenSections(prev => ({
      ...prev,
      [title]: !prev[title],
    }));
  }

  return (
    <aside className={`${styles.sidebar} ${roleClass}`}>

      {sections.map(section => (

        <div key={section.title} className={styles.section}>

          <button
            className={styles.sectionTitle}
            onClick={() => toggleSection(section.title)}
          >
            <span>{section.title}</span>

            <span>
              {openSections[section.title] ? "−" : "+"}
            </span>
          </button>

          {openSections[section.title] && (

            <Nav className="flex-column">

              {section.items.map(item => (

                <Nav.Link
                  key={item.path}
                  as={NavLink}
                  to={item.path}
                  className={({ isActive }) =>
                    `${styles.link} ${isActive ? styles.active : ""}`
                  }
                >
                  {item.label}
                </Nav.Link>

              ))}

            </Nav>

          )}

        </div>

      ))}

    </aside>
  );
}