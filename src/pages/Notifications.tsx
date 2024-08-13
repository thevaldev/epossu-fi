import "../css/pages/Notifications.scss";
import { setMeta } from "../components/Utils";

const Notifications = () => {
  setMeta(
    "Pörssisähkön hinta ilmoitukset",
    "Tilaa maksuttomat ilmoitukset sähkön hinnan muutoksista. Saat ilmoituksen aina kun sähkön hinta on haluamasi raja-arvon yläpuolella tai vaikka joka päivä tiettyyn kellon aikaan."
  );

  return (
    <>
      <section className="page notifications">
        <h1 className="title with-label red">
          Ilmoitukset <label>Tulossa pian</label>
        </h1>
        <p className="lead">
          Tältä sivulta voit tilata ilmoitukset laitteellesi sähkön hinnan
          muutoksista.
          <br />
          Ilmoitukset ovat maksuttomia ja saat ne aina kun sähkön hinta on
          haluamasi raja-arvon yläpuolella, tai vaikka joka päivä tiettyyn
          kellon aikaan.
          <br />
          <br />
          Saat itse päättää mitä tietoja sinulle lähetetään ja milloin.
          <br />
          <br />
        </p>
        <h2>
          Ilmoitukset ovat vielä testauksessa, mutta ne julkaistaan hyvin pian!
        </h2>
      </section>
    </>
  );
};

export default Notifications;
