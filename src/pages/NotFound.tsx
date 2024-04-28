import { Link } from "react-router-dom";
import "../css/pages/NotFound.scss";
import Header from "../elements/Header";
import Footer from "../elements/Footer";

const NotFound = () => {
  document.title = "Sivua ei löytynyt - epossu.fi";

  return (
    <>
      <Header />
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
      <Footer />
    </>
  );
};
export default NotFound;
