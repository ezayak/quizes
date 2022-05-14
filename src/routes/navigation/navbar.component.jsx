import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";

const Navbar = () => {
    return (
        <Fragment>
            <nav className="purple darken-4">
                <div className="nav-wrapper">
                <span className="brand-logo">Quizes</span>
                {
                    // <ul id="nav-mobile" class="right hide-on-med-and-down">
                    //     <li><a href="sass.html">Sass</a></li>
                    //     <li><a href="badges.html">Components</a></li>
                    //     <li><a href="collapsible.html">JavaScript</a></li>
                    // </ul>
                }
                </div>
            </nav> 
            <Outlet />           
        </Fragment>
    );
}

export { Navbar };