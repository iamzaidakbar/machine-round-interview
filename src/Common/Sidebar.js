import React from 'react';
import "./Sidebar.scss";
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const sidebarLinks = [
        { id: 1, title: 'C Shaped UI', to: 'c_shaped_ui' },
        { id: 2, title: 'Star Rating', to: 'star_rating' },
        { id: 3, title: 'Traffic Light System', to: 'traffic_light_system' },
        { id: 4, title: 'Nested Comments', to: 'nested_comments' },
        { id: 5, title: 'Mark And Shift', to: 'mark_and_shift' },
    ];

    return (
        <div className='sidebar'>
            <label>Machine Round</label>
            <ul>
                {sidebarLinks.map((link) => (
                    <li key={link.id}>
                        <span> {link.id}</span>
                        <Link to={link.to}>{link.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Sidebar;
