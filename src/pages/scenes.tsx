import "../css/Scenes.scss";
import { Link } from "react-router-dom";

const Scenes = () => {
  document.title = "epossu.fi | Näkymät";

  return (
    <section className="page">
      <h1 className="title2 with-label">
        Näkymät <label>BETA</label>
      </h1>
      <p className="lead">
        Muokattavat sähkönhintanäkymät infonäytöille ja muille laitteille. Tällä
        työkalulla voit luoda omia näkymiä kuten esimerkiksi nykyinen
        etusivumme. <br />
        Näkymät ovat helppoja luoda, muokata ja niitä voi jakaa muiden
        käyttäjien kanssa.
        <br />
        <br />
        <strong>Huom!</strong> Tämä on beta-versio, joten kaikki ominaisuudet ja
        toiminnot eivät ole vielä käytössä.
        <br />
        Kehitys on kuitenkin aktiivista ja uusia ominaisuuksia lisätään
        jatkuvasti.
      </p>

      <div className="scene-builder">
        <Link to={"/nakyma/build_scene"}>
          <button>Luo uusi näkymä</button>
        </Link>
      </div>
    </section>
  );
};

export default Scenes;
