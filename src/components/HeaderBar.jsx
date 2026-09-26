import React from "react";
import { Link } from "react-router";

export function Header() {
  const NavLinks = [
    { link: "/", text: "Home" },
    { link: "/artists", text: "Artists" },
    { link: "/commercials", text: "Commercials" },
    { link: "/bingo-settings", text: "Make Your Own Bingo" },
  ]
  const navItems = NavLinks.map((item) => (
    <Link to={item.link}>
      {item.text}
    </Link>
  ));
  return (
    <header>
      <div className="container">
        <nav className="nav-bar">
  {navItems}
</nav>

        <div className="container text-center">
          <Link to="/" className="site-title">
            <h1>Stagely</h1>
          </Link>
          <p className="lead">
            Vote for which artist to headline the halftime show or your favorite Super Bowl commercial!
          </p>
        </div>
      </div>
    </header>
  );
}