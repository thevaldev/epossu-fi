import "../css/pages/Notifications.scss";
import { setMeta } from "../components/Utils";
import {
  faBullhorn,
  faCheckCircle,
  faWarning,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import NotificationsHandle from "../components/NotificationsHandle";
import { ModalHandlerProps, ModuleData, subscriptionJSON } from "../types";

const Notifications = ({
  moduleData,
  modalCallback,
}: {
  moduleData: ModuleData;
  modalCallback: (data: ModalHandlerProps | undefined) => void;
}) => {
  setMeta(
    "Pörssisähkön hinta ilmoitukset",
    "Tilaa maksuttomat ilmoitukset sähkön hinnan muutoksista. Saat ilmoituksen aina kun sähkön hinta on haluamasi raja-arvon yläpuolella tai vaikka joka päivä tiettyyn kellon aikaan."
  );

  const content = useRef<HTMLSelectElement>(null);
  const when = useRef<HTMLSelectElement>(null);
  const [error, setError] = useState<string | undefined>(undefined);
  const doesDeviceSupport = NotificationsHandle.verifyDeviceSupport();
  const [notificationSubscription, setNotificationSubscription] = useState<
    subscriptionJSON | undefined
  >(undefined);
  const [ready, setReady] = useState<boolean>(false);

  async function subscribe() {
    if (
      content.current === null ||
      when.current === null ||
      content.current.value === undefined ||
      when.current.value === undefined
    ) {
      setError("Virheelliset tiedot");
      return;
    }

    const response = await NotificationsHandle.Subscribe(
      content.current.value,
      when.current.value
    );

    if (response.error) {
      modalCallback({
        title: "Virhe ilmoitusten tilauksessa",
        jsx: (
          <>
            <p>
              Ilmoitusten tilaaminen epäonnistui. Yritä myöhemmin uudelleen.
            </p>
          </>
        ),
        icon: <FontAwesomeIcon icon={faWarning} />,
        onClose: () => {
          modalCallback(undefined);
        },
      });
      return;
    }

    if (response.success) {
      setNotificationSubscription(response.data);
      setError(undefined);

      modalCallback({
        title: "Ilmoitusten tilaus onnistui",
        jsx: (
          <>
            <p>
              Ilmoitukset on tilattu laitteellesi. Saat ilmoituksen kun
              valitsemasi ehdot täyttyvät.
            </p>
          </>
        ),
        icon: <FontAwesomeIcon icon={faCheckCircle} />,
        onClose: () => {
          modalCallback(undefined);
        },
      });
    } else setError(response.message);
  }

  useEffect(() => {
    if (
      !ready &&
      notificationSubscription === undefined &&
      moduleData.notifications.subscription !== undefined
    ) {
      setNotificationSubscription(moduleData.notifications.subscription);
      setReady(true);
    }
  }, [moduleData, notificationSubscription, ready]);

  return (
    <>
      <section className="page notifications">
        <h1 className="title with-label">Ilmoitukset</h1>
        <p className="lead">
          Tältä sivulta voit tilata ilmoitukset laitteellesi valitsemillasi
          ehdoilla ja haluamallasi sisällöllä.
          <br />
          Ilmoitukset ovat <strong>maksuttomia</strong> ja saat ne välittömästi
          kun valitut ehdot tai aikaikkuna täyttyvät.
          <br />
          <br />
          <strong>
            Lupaamme ettemme lähetä sinulle turhia ilmoituksia, saat pelkästään
            ne ilmoitukset jotka olet tilannut.
          </strong>
        </p>

        {!doesDeviceSupport && (
          <div className="box no-padding red">
            <h2>
              <FontAwesomeIcon icon={faBullhorn} />
              laitteesi ei valitettavasti tue ilmoituksia
            </h2>

            <p className="description">
              Nykyinen laitteesi ei tue ilmoituksia. <br />
              Alla olevat tiedot kertovat onko laitteesi valmis vastaanottamaan
              ilmoituksia.
            </p>

            <p className="description details">
              <ul>
                <li>
                  <b>Service Worker:</b>{" "}
                  {"serviceWorker" in navigator ? "Tuettu" : "Ei tuettu"}
                </li>
                <li>
                  <b>Push Manager:</b>{" "}
                  {"PushManager" in window ? "Tuettu" : "Ei tuettu"}
                </li>
                <li>
                  <b>Notification:</b>{" "}
                  {"Notification" in window ? "Tuettu" : "Ei tuettu"}
                </li>
              </ul>
            </p>
          </div>
        )}

        {doesDeviceSupport &&
          notificationSubscription === undefined &&
          moduleData !== undefined &&
          moduleData.notifications.options !== undefined && (
            <div className="box fixed-height">
              <h2>
                <FontAwesomeIcon icon={faBullhorn} />
                Tilaa ilmoitukset laitteellesi
              </h2>
              <p className="description">
                Tästä voit tilata ilmoitukset nykyiselle laitteellesi
              </p>

              <label className="wider">
                Mitä haluat ilmoituksen sisältävän?
                <select name="content" ref={content}>
                  {Object.keys(moduleData.notifications.options.contents).map(
                    (key) => (
                      <option key={key} value={key}>
                        {moduleData.notifications.options !== undefined
                          ? moduleData.notifications.options.contents[key]
                          : "Tuntematon"}
                      </option>
                    )
                  )}
                </select>
              </label>

              <label className="wider">
                Millon haluat ilmoituksen?
                <select name="when" ref={when}>
                  {Object.keys(moduleData.notifications.options.types).map(
                    (key) => (
                      <option key={key} value={key}>
                        {moduleData.notifications.options !== undefined
                          ? moduleData.notifications.options.types[key]
                          : "Tuntematon"}
                      </option>
                    )
                  )}
                </select>
              </label>

              {error !== undefined && (
                <span className="red-notice">
                  <FontAwesomeIcon icon={faWarning} />
                  {error}
                </span>
              )}
              <button
                className="btn"
                onClick={subscribe}
                disabled={error !== undefined}
              >
                Tilaa ilmoitukset
              </button>
            </div>
          )}

        {notificationSubscription !== undefined && (
          <div className="box">
            <h2>
              <FontAwesomeIcon icon={faBullhorn} />
              Tilaamasi ilmoitukset
            </h2>
            <p className="description">
              Olet tilannut ilmoitukset laitteellesi. Voit peruuttaa tilauksen
              koska tahansa.
              <br />
              <strong>HUOM:</strong> Jos tyhjennät selaimesi välimuistin, tilaus
              poistuu.
            </p>

            <label className="wider">
              Ilmoituksen tunniste
              <input
                type="disabled"
                disabled
                value={notificationSubscription.id}
              />
            </label>
            <label className="wider">
              Ilmoituksen sisältö
              <input
                type="disabled"
                disabled
                value={notificationSubscription.type.content}
              />
            </label>
            <label className="wider">
              Ilmoituksen lähetys aika
              <input
                type="disabled"
                disabled
                value={notificationSubscription.type.when}
              />
            </label>

            <div className="btn-row">
              <button
                className="btn"
                onClick={() => {
                  NotificationsHandle.requestTestNotification(
                    notificationSubscription
                  );

                  modalCallback({
                    title: "Pyyntö lähetetty",
                    jsx: (
                      <>
                        <p>
                          Saat ilmoituksen muutaman sekunnin sisällä. Tarkista
                          onko ilmoitus tullut laitteellesi.
                        </p>
                      </>
                    ),
                    icon: <FontAwesomeIcon icon={faCheckCircle} />,
                    onClose: () => {
                      modalCallback(undefined);
                    },
                  });
                }}
              >
                Testaa ilmoitusta
              </button>
              <button
                className="btn red"
                onClick={() => {
                  modalCallback({
                    title: "Haluatko varmasti peruuttaa tilauksesi?",
                    jsx: (
                      <>
                        <p>
                          Et saa enään ilmoituksia tälle laitteelle kun tilaus
                          on peruutettu.
                        </p>

                        <div className="btn-row">
                          <button
                            className="btn"
                            onClick={() => {
                              modalCallback(undefined);
                            }}
                          >
                            Jatka tilausta
                          </button>
                          <button
                            className="btn red"
                            onClick={() => {
                              NotificationsHandle.unregisterToAPI(
                                notificationSubscription
                              );
                              setNotificationSubscription(undefined);
                              modalCallback({
                                title: "Tilaus on peruutettu onnistuneesti",
                                jsx: (
                                  <>
                                    <p>
                                      Emme lähetä enään ilmoituksia tälle
                                      laitteelle.
                                    </p>
                                  </>
                                ),
                                icon: <FontAwesomeIcon icon={faCheckCircle} />,
                                onClose: () => {
                                  modalCallback(undefined);
                                },
                              });
                            }}
                          >
                            Peruuta tilaus
                          </button>
                        </div>
                      </>
                    ),
                    icon: <FontAwesomeIcon icon={faBullhorn} />,
                    onClose: () => {
                      modalCallback(undefined);
                    },
                    closeText: "",
                  });
                }}
              >
                Peruuta tilaus
              </button>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Notifications;
