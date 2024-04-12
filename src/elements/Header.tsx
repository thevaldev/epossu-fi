import {
  faHome,
  faServer,
  faWindowRestore,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import logo from "../assets/possu.png";

const Header = () => {
  return (
    <header>
      <Link to="/">
        <div className="logo-wrap">
          <img src={logo} alt="ePossu.fi" className="logo" />
          <span>Sähköpossu</span>
        </div>
      </Link>

      <ul>
        <li>
          <Link to="/">
            <FontAwesomeIcon icon={faHome}></FontAwesomeIcon>
            Etusivu
          </Link>
        </li>
        <li>
          <Link to="/nakymat">
            <FontAwesomeIcon icon={faWindowRestore}></FontAwesomeIcon>
            Näkymät
          </Link>
        </li>
        <li>
          <Link to="/api">
            <FontAwesomeIcon icon={faServer}></FontAwesomeIcon>
            API-Rajapinta
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
