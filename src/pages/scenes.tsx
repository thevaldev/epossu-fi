import "../css/pages/Scenes.scss";
import Header from "../elements/Header";

const Scenes = () => {
  document.title = "Näkymät - epossu.fi";

  return (
    <>
      <Header />
      <section className="page scenes">
        <h1 className="title with-label red">
          Näkymät <label>Tulossa pian</label>
        </h1>
        <h2>
          Arvioitu julkaisu:{" "}
          <span className="number">
            <strong>1.6.2024</strong>
          </span>{" "}
          mennessä.
        </h2>
        <p className="lead">
          Muokattavat sähkönhintanäkymät infonäytöille ja muille laitteille.
          Tällä työkalulla voit luoda omia näkymiä kuten esimerkiksi nykyinen
          etusivumme.
          <br />
          Näkymiä voi upottaa, jakaa ja niiden sisältöä on helppo muokata.
          <br />
          <br />
          Voit valita itse mitä tietoja näytetään, missä järjestyksessä ja minkä
          kokoisina.
          <br />
          <br />
          <br />
          <strong>Lisää tietoa tästä ominaisuudesta tulossa pian.</strong>
        </p>
      </section>
    </>
  );
};

export default Scenes;
