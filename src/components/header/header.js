import React from 'react';
import {Link} from 'react-router-dom';
import './header.css';

const Header = () => {
    return (
        <nav>
            <h3 className="title">
                Statistics of European football tournaments.
            </h3>
            <ul>
                <li>
                    <Link to='/'>Leagues</Link>
                </li>   
            </ul>
        </nav>
    );
};

export default Header;