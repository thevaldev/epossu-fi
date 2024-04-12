import { Link } from "react-router-dom";
import "../css/notFound.scss";

const NotFound = () => {
  document.title = "Sivua ei löytynyt - epossu.fi";

  return (
    <section className="page not-found">
      <h1 className="title">Etsimääsi sivua ei löytynyt</h1>
      <p>
        Sivu jota yritit etsiä ei ole olemassa. Tarkista osoite ja yritä
        uudelleen.
      </p>
      <Link to={"/"}>
        <button>Palaa etusivulle</button>
      </Link>
    </section>
  );
};
export default NotFound;
