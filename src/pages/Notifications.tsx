import "../css/pages/Notifications.scss";
import { setMeta } from "../components/Utils";
import { faBullhorn, faWarning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Notifications = () => {
  setMeta(
    "Pörssisähkön hinta ilmoitukset",
    "Tilaa maksuttomat ilmoitukset sähkön hinnan muutoksista. Saat ilmoituksen aina kun sähkön hinta on haluamasi raja-arvon yläpuolella tai vaikka joka päivä tiettyyn kellon aikaan."
  );

  return (
    <>
      <section className="page notifications">
        <h1 className="title with-label">Ilmoitukset</h1>
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

        <div className="box">
          <h2>
            <FontAwesomeIcon icon={faBullhorn} />
            Tilaa ilmoitukset laitteellesi
          </h2>
          <p className="description">
            Tästä voit tilata ilmoitukset nykyiselle laitteellesi
          </p>

          <label>
            Mitä haluat ilmoituksen sisältävän?
            <select name="why">
              <option value="next_highest">
                Seuraavan päivän kallein hinta ja tunti
              </option>
              <option value="next_lowest">
                Seuraavan päivän halvin hinta ja tunti
              </option>
              <option value="next_average">Seuraavan päivän keskihinta</option>
              <option value="next_all">
                Seuraavan päivän kallein, halvin, keskihinta ja niiden tunnit
              </option>

              <option value="today_highest">
                Nykyisen päivän kallein hinta ja tunti
              </option>
              <option value="today_lowest">
                Nykyisen päivän halvin hinta ja tunti
              </option>
              <option value="today_average">Nykyisen päivän keskihinta</option>
              <option value="today_all">
                Nykyisen päivän kallein, halvin, keskihinta ja niiden tunnit
              </option>
            </select>
          </label>

          <label>
            Millon haluat ilmoituksen?
            <select name="when">
              <option value="at_6">Joka päivä kello 6:00</option>
              <option value="at_8">Joka päivä kello 8:00</option>
              <option value="at_12">Joka päivä kello 12:00</option>
              <option value="at_16">Joka päivä kello 16:00</option>
              <option value="at_20">Joka päivä kello 20:00</option>
            </select>
          </label>

          <span className="red-notice">
            <FontAwesomeIcon icon={faWarning} />
            Ilmoituksien tilaaminen on tällä hetkellä poissa käytöstä!
          </span>
          <button className="btn" disabled>
            Tilaa ilmoitukset
          </button>
        </div>
      </section>
    </>
  );
};

export default Notifications;
