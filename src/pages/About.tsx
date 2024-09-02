import "../css/pages/About.scss";
import { setMeta } from "../components/Utils";

const Scenes = () => {
  setMeta(
    "Tietoa palvelusta",
    "Tietoa epossu.fi-palvelusta. Lue usein kysytyt kysymykset ja vastaukset."
  );

  return (
    <>
      <section className="page about">
        <h1 className="title">Tietoa palvelusta</h1>
        <p className="lead">
          Täältä löydät vastauksia usein kysyttyihin kysymyksiin ja yleistä
          tietoa palvelusta.
        </p>

        <h2>Mikä on tämän palvelun tarkoitus?</h2>
        <p className="lead">
          Sivuston tarkoitus on tarjota käyttäjille mahdollisuus seurata
          pörssisähkön hintoja reaaliaikaisesti, helposti ja ilman häiriöitä.
          <br />
          Tämän lisäksi palvelu tarjoaa ilmaisen API-rajapinnan ja lukuisia
          ominaisuuksia helpottamaan sähkön reaaliaikaista seuraamista, <br />
          kuten esimerkiksi ilmoitukset eri laitteille sähkön hinnan noustessa
          tai laskiessa.
          <br />
          <br />
          Palvelua kehitetään jatkuvasti ja uusia ominaisuuksia lisätään
          säännöllisesti.
        </p>

        <h2>Sisältävätkö hinnat arvolisäveron?</h2>
        <p className="lead">
          Kyllä, kaikki hinnat sisältävät nykyisen arvonlisäveron{" "}
          <span className="number">
            <b>(25.5%)</b>
          </span>
          .
        </p>

        <h2>Milloin seuraavan päivän hinnat ovat näkyvillä?</h2>
        <p className="lead">
          Seuraavan päivän hinnat tulevat näkyviin yleensä{" "}
          <strong>
            noin kello <span className="number">14.00</span>
          </strong>{" "}
          aikoihin kun Nord Pool julkaisee ne.
          <br />
          Mikäli hinnat ovat myöhässä ilmoittaa palvelu siitä.
        </p>

        <h2>Missä voin ilmoittaa virheestä tai pyytää ominaisuutta?</h2>
        <p className="lead">
          Voit ilmoittaa virheestä tai pyytää uusia ominaisuuksia{" "}
          <a
            href="https://github.com/thevaldev/epossu-fi/issues"
            target="_blank"
          >
            GitHubissa
          </a>
          .
        </p>
      </section>
    </>
  );
};

export default Scenes;
