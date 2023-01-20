import React from 'react';
import {Link} from 'react-router-dom';

export default function Navbar() {

    const handleNavClick = () => {
        const hamburger = document.querySelector(".hamburger");
        const navLinks = document.querySelector(".navLinks");

        hamburger.classList.toggle("active")
        navLinks.classList.toggle("active")
    }

    const handleClickClose = () => {
        const hamburger = document.querySelector(".hamburger");
        const navLinks = document.querySelector(".navLinks");

        hamburger.classList.remove("active")
        navLinks.classList.remove("active")
    }

    return (
        <nav>
            <Link className="logo" to="/">SustainablePantry</Link>
            
            <ul className="navLinks">
                <li><Link className="navLink" to="/" onClick={handleClickClose}>Home</Link></li>
                <li><Link className="navLink" to="/discover" onClick={handleClickClose}>Discover</Link></li>
            </ul>
            <div className="hamburger" onClick={handleNavClick}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>
        </nav>
  )
}
