import { Link } from "react-router-dom";
import "../css/pages/NotFound.scss";
import { setMeta } from "../components/Utils";

const NotFound = () => {
  setMeta(
    "Sivua ei löytynyt",
    "Etsimääsi sivua ei löytynyt. Tarkista osoite ja yritä uudelleen."
  );

  return (
    <>
      <section className="page not-found">
        <h1 className="title">Etsimääsi sivua ei löytynyt</h1>
        <p className="lead">
          Sivu jota yritit etsiä ei ole olemassa. Tarkista osoite ja yritä
          uudelleen.
        </p>
        <Link to={"/"}>
          <button>Palaa etusivulle</button>
        </Link>
      </section>
    </>
  );
};
export default NotFound;
