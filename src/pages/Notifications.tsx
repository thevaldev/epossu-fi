import "../css/pages/Notifications.scss";
import { setMeta } from "../components/Utils";
import {
  faBullhorn,
  faCheckCircle,
  faPencil,
  faTimes,
  faTrash,
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

  const content_edit = useRef<HTMLSelectElement>(null);
  const when_edit = useRef<HTMLSelectElement>(null);
  const [error, setError] = useState<string | undefined>(undefined);
  const doesDeviceSupport = NotificationsHandle.verifyDeviceSupport();
  const [notificationSubscription, setNotificationSubscription] = useState<
    subscriptionJSON | undefined
  >(undefined);
  const [ready, setReady] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);

  async function recoverSubscription() {
    const response = await NotificationsHandle.recoverSubscription();

    if (response == null || !response.success) {
      modalCallback({
        title: "Tilausta ei löytynyt",
        jsx: (
          <>
            <p>
              Emme valitettavasti löytänyt tilaustasi palvelimelta. Tilaa
              ilmoitukset uudelleen tälle laitteelle.
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

    setNotificationSubscription(response.data);
    modalCallback({
      title: "Tilaus palautettu",
      jsx: (
        <>
          <p>
            Tilaus on palautettu onnistuneesti. Voit peruuttaa tilauksen milloin
            tahansa.
          </p>
        </>
      ),
      icon: <FontAwesomeIcon icon={faCheckCircle} />,
      onClose: () => {
        modalCallback(undefined);
      },
    });
  }

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

  async function saveEdits() {
    if (
      content_edit.current === null ||
      when_edit.current === null ||
      content_edit.current.value === undefined ||
      when_edit.current.value === undefined ||
      moduleData.notifications.subscription === undefined
    ) {
      setError("Virheelliset tiedot");
      return;
    }

    if (
      moduleData.notifications.subscription.type.content_type ===
        content_edit.current.value &&
      moduleData.notifications.subscription.type.when_type ===
        when_edit.current.value
    ) {
      setEdit(false);
      return;
    }

    const response = await NotificationsHandle.editSubscription(
      moduleData.notifications.subscription,
      content_edit.current.value,
      when_edit.current.value
    );

    if (!response.success) {
      modalCallback({
        title: "Virhe ilmoituksen muokkaamisessa",
        jsx: (
          <>
            <p>
              Ilmoituksen muokkaaminen epäonnistui. Yritä myöhemmin uudelleen.
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
      setEdit(false);
    } else setError(response.message);
  }

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
              {moduleData.notifications.status === false ? (
                <span className="red-notice">
                  <FontAwesomeIcon icon={faWarning} />
                  {moduleData.notifications.message}
                </span>
              ) : (
                <p className="description">
                  Tästä voit tilata ilmoitukset nykyiselle laitteellesi
                </p>
              )}

              <label className="wider">
                Mitä haluat ilmoituksen sisältävän?
                <select
                  name="content"
                  ref={content}
                  disabled={moduleData.notifications.status === false}
                >
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
                <select
                  name="when"
                  ref={when}
                  disabled={moduleData.notifications.status === false}
                >
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
                disabled={
                  error !== undefined ||
                  moduleData.notifications.status === false
                }
              >
                Tilaa ilmoitukset
              </button>
            </div>
          )}

        {doesDeviceSupport &&
          notificationSubscription === undefined &&
          moduleData !== undefined &&
          moduleData.notifications.status !== false && (
            <div className="box no-padding">
              <h2>
                <FontAwesomeIcon icon={faBullhorn} />
                Katosiko tilauksesi?
              </h2>

              <p className="description">
                Jos esimerkiksi tyhjensit selaimesi välimuistin, tilaus voi olla
                kadonnut, mutta se voi vielä olla olemassa palvelimella.
                <br />
                Voit palauttaa tilauksen alla olevalla napilla.
              </p>
              <button onClick={recoverSubscription}>Palauta tilaus</button>
            </div>
          )}

        {notificationSubscription !== undefined && (
          <div className="box">
            <h2>
              <FontAwesomeIcon icon={faBullhorn} />
              Tilaamasi ilmoitukset
            </h2>
            <p className="description">
              Tästä näet tilaamasi ilmoitukset tälle laitteelle.
              <br />
              <strong>HUOM:</strong> Jos tyhjennät selaimesi välimuistin, tilaus
              voi kadota.
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
              <select
                name="content"
                ref={content_edit}
                disabled={!edit}
                defaultValue={notificationSubscription.type.content_type}
              >
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
              Ilmoituksen lähetys aika
              <select
                name="when"
                ref={when_edit}
                disabled={!edit}
                defaultValue={notificationSubscription.type.when_type}
              >
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

            <div className="btn-row">
              {!edit && (
                <button
                  className="btn"
                  onClick={async () => {
                    const response =
                      await NotificationsHandle.requestTestNotification(
                        notificationSubscription
                      );

                    if (!response.success) {
                      modalCallback({
                        title: "Ilmoituksen testaus epäonnistui",
                        jsx: (
                          <>
                            <p>
                              Ilmoituksen testaus epäonnistui. Yritä myöhemmin
                              uudelleen.
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
                  <FontAwesomeIcon icon={faBullhorn} />
                  Testaa ilmoitusta
                </button>
              )}
              {edit && (
                <button onClick={saveEdits}>
                  <FontAwesomeIcon icon={faCheckCircle} />
                  Tallenna
                </button>
              )}
              <button
                onClick={() => setEdit(!edit)}
                className={edit ? "red" : ""}
              >
                {edit ? (
                  <FontAwesomeIcon icon={faTimes} />
                ) : (
                  <FontAwesomeIcon icon={faPencil} />
                )}
                {edit ? "Peruuta muokkaus" : "Muokkaa"}
              </button>
              {!edit && (
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
                                  icon: (
                                    <FontAwesomeIcon icon={faCheckCircle} />
                                  ),
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
                  <FontAwesomeIcon icon={faTrash} />
                  Peruuta tilaus
                </button>
              )}
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Notifications;
