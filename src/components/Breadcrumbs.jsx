import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumbs = ({ links }) => {
    return (
        <div className="text-sm breadcrumbs mx-3 my-3">
            <ul>
                {links.map((link, index) => (
                    <li key={index}>
                        {link.path ? (
                            <Link to={link.path}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 mr-2 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
                                {link.label}
                            </Link>
                        ) : (
                            <a>
                                {link.label}
                            </a>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Breadcrumbs;
