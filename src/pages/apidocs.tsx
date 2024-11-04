import "../css/pages/Apidocs.scss";
import { setMeta } from "../components/Utils";
import CodeExample from "../elements/Apidocs/CodeExample";
import JsonExample from "../elements/Apidocs/JsonExample";

const ApiDocs = () => {
  setMeta(
    "API-Rajapinta",
    "Tietoa epossu.fi-palvelun rajapinnasta. Lue ohjeet ja esimerkit rajapinnan käytöstä."
  );

  return (
    <>
      <section className="page api-docs">
        <h1 className="title">API-Rajapinta</h1>

        <p className="lead">
          Tämä sivu sisältää ohjeet ja esimerkkejä epossu.fi:n rajapinnan
          käytöstä. <br />
          Rajapintamme tarjoaa sähkömarkkinahintoja, jotka ovat peräisin Nord
          Pool -sähköpörssistä.
          <br />
          epossu.fi:n rajapinta on ilmainen ja avoin kaikille käyttäjille,
          rajapintaa voi käyttää esimerkiksi sähkömarkkinahintojen seuraamiseen
          tai analysointiin.
          <br />
          <br />
          <strong>
            {" "}
            Rajapinnan käyttö on rajoitettu <span className="number">
              180
            </span>{" "}
            pyyntöön minuutissa.
          </strong>
        </p>

        <div className="event">
          <p className="definition bolder">Hae uusimmat pörssitiedot</p>
          <pre>
            <code>
              <code className="type">GET</code>
              {` https://api.epossu.fi/v2/marketData`}
            </code>
          </pre>
          <p className="info">
            Palauttaa uusimmat pörssisähköhinnat{" "}
            <span className="number">
              <b>48</b>
            </span>{" "}
            tunnin ajalta.
            <br />
            Seuraavan päivän tiedot ovat saatavilla noin kello{" "}
            <b>
              <span className="number">14:00</span>
            </b>
          </p>

          <ul>
            <li>
              Hinnat sisältävät nykyisen arvonlisäveron{" "}
              <b>
                <span className="number">(25.5%)</span>
              </b>
              .
            </li>
            <li>
              Hintojen yksikkö on <b>c/kWh</b> (senttiä per kilowattitunti).
            </li>
            <li>
              Hintojen aikaleima on <b>dd.mm.yyyy hh:mm</b>
            </li>
            <li>
              Kuvaajan aikaleima on <b>yyyy.mm.dd hh:mm:ss</b>
            </li>
            <li>
              Tietojen päivitys tapahtuu noin kello{" "}
              <span className="number">
                <b>14:00</b>
              </span>
              , jolloin tietoihin sisältyy myös seuraavan päivän hintatiedot.
            </li>
            <li>
              Mikäli huomisen dataa ei ole saatavilla palauttaa <b>data_ok</b>{" "}
              arvon <b>false</b>.
            </li>
          </ul>

          <p className="bolder">Vastaukset</p>
          <pre>
            <code className="type">200 </code>
            <code>Hintojen haku onnistui</code>
          </pre>
          <pre>
            <code className="type">429 </code>
            <code>Liian monta pyyntöä. Yritä uudelleen myöhemmin.</code>
          </pre>

          <p className="bolder">Parametrit</p>
          <p className="info">
            Parametrien käyttö ei ole pakollista, mutta voit muokata
            palautettuja tietoja seuraavilla parametreilla.
          </p>
          <table>
            <thead>
              <tr>
                <th>Nimi</th>
                <th>Oletusarvo</th>
                <th>Selite</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td data-label="Nimi">include_chart</td>
                <td data-label="Oletusarvo">true</td>
                <td data-label="Selite">
                  Palauttaa valmiin datasetin kuvaajaa varten.
                </td>
              </tr>
              <tr>
                <td data-label="Nimi">include_options</td>
                <td data-label="Oletusarvo">true</td>
                <td data-label="Selite">
                  Palauttaa hintatietojen lisäksi keskiarvon, korkeimman ja
                  matalimman hinnan.
                </td>
              </tr>
              <tr>
                <td data-label="Nimi">price_timestamps</td>
                <td data-label="Oletusarvo">false</td>
                <td data-label="Selite">Lisää hintatietoihin aikaleimat.</td>
              </tr>
            </tbody>
          </table>

          <p className="bolder">JS Esimerkki koodi</p>
          <pre>
            <code className="inner break-lines">
              <CodeExample />
            </code>
          </pre>

          <p className="bolder">Vastaus</p>
          <pre className="inner">
            <JsonExample />
          </pre>
        </div>
      </section>
    </>
  );
};

export default ApiDocs;
