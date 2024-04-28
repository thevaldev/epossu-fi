import "../css/pages/Notifications.scss";
import Footer from "../elements/Footer";
import Header from "../elements/Header";

const Notifications = () => {
  document.title = "Ilmoitukset - epossu.fi";

  return (
    <>
      <Header />
      <section className="page notifications">
        <h1 className="title with-label red">
          Ilmoitukset <label>Tulossa pian</label>
        </h1>
        <h2>
          Arvioitu julkaisu:{" "}
          <span className="number">
            <strong>2024</strong>
          </span>{" "}
          aikana.
        </h2>
        <p className="lead">
          Muokattavat ilmoitukset puhelimeen ja muihin laitteisiin.
          <br />
          Tällä työkalulla voit tilata maksuttomat ilmoitukset puhelimeesi{" "}
          <strong>
            esimerkiksi kun sähkön hinta on suurempi kuin 20 c/kWh.
          </strong>
          <br />
          <br />
          Ilmoituksia pystyy itse määrittelemään ja muokkaamaan.
          <br />
          <br />
          <br />
          <strong>Lisää tietoa tästä ominaisuudesta tulossa pian.</strong>
        </p>
      </section>
      <Footer />
    </>
  );
};

export default Notifications;
