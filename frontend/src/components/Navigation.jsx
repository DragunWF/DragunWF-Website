import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import styles from "./Navigation.module.css";
import { pageLinks } from "../helpers/links";

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home" },
    { path: pageLinks.about, label: "About" },
    { path: pageLinks.blog, label: "Blog" },
    { path: pageLinks.anonymousMessage, label: "Message" },
  ];

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        {/* Logo/Brand */}
        <NavLink to="/" className={styles.navLogo} onClick={closeMenu}>
          DragunWF
        </NavLink>

        {/* Desktop Menu */}
        <div className={styles.navMenu}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={`${styles.navLink} ${
                location.pathname === item.path ? styles.active : ""
              }`}
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <div
          className={`${styles.navToggle} ${isMenuOpen ? styles.active : ""}`}
          onClick={toggleMenu}
        >
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${styles.mobileMenu} ${isMenuOpen ? styles.active : ""}`}
      >
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={`${styles.mobileLink} ${
              location.pathname === item.path ? styles.active : ""
            }`}
            onClick={closeMenu}
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

export default Navigation;
