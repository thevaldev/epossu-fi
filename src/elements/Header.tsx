import {
  faBars,
  faBell,
  faHome,
  faInfoCircle,
  faServer,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import logo from "../assets/possu.png";
import { useState } from "react";

const Header = () => {
  const [mobileNav, setMobileNav] = useState(false);

  return (
    <header>
      <Link to="/">
        <div className="logo-wrap">
          <img src={logo} alt="ePossu.fi" className="logo" />
          <span>Sähköpossu</span>
        </div>
      </Link>
      <button
        aria-label="toggle navigation"
        className="mobile-nav"
        onClick={() => setMobileNav(!mobileNav)}
      >
        <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
      </button>

      <ul className={mobileNav ? "visible" : "hidden"}>
        <li>
          <Link to="/">
            <FontAwesomeIcon icon={faHome}></FontAwesomeIcon>
            <span>Etusivu</span>
          </Link>
        </li>
        <li>
          <Link to="/tietoa">
            <FontAwesomeIcon icon={faInfoCircle}></FontAwesomeIcon>
            <span>Tietoja</span>
          </Link>
        </li>
        <li>
          <Link to="/ilmoitukset">
            <FontAwesomeIcon icon={faBell}></FontAwesomeIcon>
            <span>Ilmoitukset</span>
          </Link>
        </li>
        <li>
          <Link to="/api">
            <FontAwesomeIcon icon={faServer}></FontAwesomeIcon>
            <span>API-Rajapinta</span>
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
