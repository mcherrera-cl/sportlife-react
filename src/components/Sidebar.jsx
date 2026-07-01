import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import menu from "./menu";

export default function Sidebar() {

    const role = "ADMIN";

    const sections = menu.filter(section =>
        section.roles.includes(role)
    );

    return (

        <aside style={{ width: 260 }}>

            {sections.map(section => (

                <div key={section.title}>

                    <h6>{section.title}</h6>

                    <Nav className="flex-column">

                        {section.items.map(item => (

                            <Nav.Link
                                key={item.path}
                                as={NavLink}
                                to={item.path}
                            >
                                {item.label}
                            </Nav.Link>

                        ))}

                    </Nav>

                </div>

            ))}

        </aside>

    );

}