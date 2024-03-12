import "../css/Scenes.scss";

const Scenes = () => {
  document.title = "epossu.fi | Näkymät";

  return (
    <section className="page">
      <h1 className="title2">Näkymät</h1>
      <p className="lead">
        Muokattavat sähkönhintanäkymät infonäytöille ja muille laitteille. Tällä
        työkalulla voit luoda omia näkymiä kuten esimerkiksi nykyinen
        etusivumme. <br />
        Näkymät ovat helppoja luoda ja muokata, ja niitä voi jakaa muiden
        käyttäjien kanssa.
        <br />
        <br />
        <b>Tämä ominaisuus on vielä kehitysvaiheessa!</b>
      </p>

      <div className="scene-builder">
        <button disabled={true}>Luo uusi näkymä</button>

        {/* <h2>Valmiit näkymät</h2>
        <div className="scenes">
          <div className="scene"></div>
          <div className="scene"></div>
          <div className="scene"></div>
          <div className="scene"></div>
          <div className="scene"></div>
          <div className="scene"></div>
          <div className="scene"></div>
          <div className="scene"></div>
        </div> */}
      </div>
    </section>
  );
};

export default Scenes;
