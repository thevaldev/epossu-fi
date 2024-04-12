import "../css/apidocs.scss";

const ApiDocs = () => {
  document.title = "API - epossu.fi";

  const example_json = {
    success: true,
    data: {
      today: {
        data_ok: true,
        prices: [
          {
            price: 1.234,
            date: "01.01.2024 00:00",
          },
          "...",
          {
            price: 1.234,
            date: "01.01.2024 23:00",
          },
        ],
        options: {
          average: 1.234,
          highest: {
            price: 1.234,
            date: "01.01.2024 09:00",
          },
          lowest: {
            price: 1.234,
            date: "01.01.2024 00:00",
          },
        },
      },
      tomorrow: {
        data_ok: false,
        prices: [],
        options: {
          average: 0,
          highest: {
            price: 0,
            date: "",
          },
          lowest: {
            price: 0,
            date: "",
          },
        },
      },
      chart: {
        dataset: [
          {
            price: 1.234,
            date: "2024.01.01 01:00:00",
            hour: "01",
          },
          "...",
          {
            price: 1.234,
            date: "2024.01.03 00:00:00",
            hour: "00",
          },
        ],
        options: {
          highest: 1.234,
          lowest: 1.234,
        },
      },
    },
  };

  const example_json_types = {
    success: "boolean",
    data: {
      today: {
        data_ok: "boolean",
        prices: [
          {
            price: "number",
            date: "string",
          },
        ],
        options: {
          average: "number",
          highest: {
            price: "number",
            date: "string",
          },
          lowest: {
            price: "number",
            date: "string",
          },
        },
      },
      tomorrow: {
        data_ok: "boolean",
        prices: [
          {
            price: "number",
            date: "string",
          },
        ],
        options: {
          average: "number",
          highest: {
            price: "number",
            date: "string",
          },
          lowest: {
            price: "number",
            date: "string",
          },
        },
      },
      chart: {
        dataset: [
          {
            price: "number",
            date: "string",
            hour: "string",
          },
        ],
        options: {
          highest: "number",
          lowest: "number",
        },
      },
    },
  };

  function syntaxHighlight(json: string) {
    if (!json) return "";
    json = json
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    return json.replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g,
      function (match: string) {
        let cls = "jsonnumber";
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = "key";
          } else {
            cls = "string";
          }
        } else if (/true|false/.test(match)) {
          cls = "boolean";
        } else if (/null/.test(match)) {
          cls = "null";
        }
        return '<span class="' + cls + '">' + match + "</span>";
      }
    );
  }

  return (
    <section className="page api-docs">
      <h1 className="title">API-Rajapinta</h1>

      <p className="lead">
        Tämä sivu sisältää ohjeet ja esimerkit epossu.fi:n tarjoamasta
        rajapinnasta. Rajapinta tarjoaa sähkön markkinahintoja, jotka ovat
        peräisin Nord Pool -sähköpörssistä.
        <br />
        <br />
        Rajapinta on tarkoitettu julkiseen käyttöön ja sen käyttö on ilmaista.
        <br />
        Rajapinnan käyttö on sallittua, kunhan se ei aiheuta kohtuutonta
        kuormitusta palvelimelle.
        <br />
        <b>
          Mikäli havaitsemme kohtuutonta kuormitusta, pidätämme oikeuden
          rajoittaa tai estää rajapinnan käyttöä.
        </b>
        <br />
        <br />
        Mikäli tarvitset apua rajapinnan käytössä tai sinulla on kysyttävää, ota
        yhteyttä{" "}
        <a href="https://github.com/thevaldev/epossu-fi/issues" target="_blank">
          githubin
        </a>{" "}
        kautta.
      </p>

      <div className="event">
        <p className="definition">Hae uusimmat pörssitiedot</p>
        <pre>
          <code>
            <code className="type">GET</code>
            {` https://api.epossu.fi/v2/marketData`}
          </code>
        </pre>
        <p className="info">
          Palauttaa uusimmat 48 tunnin hintatiedot.
          <br />
          <ul>
            <li>
              Hinnat sisältävät arvonlisäveron <b>(24%)</b>.
            </li>
            <li>
              Hintojen yksikkö on <b>snt/kWh</b>
            </li>
            <li>
              Hintojen aikaleima on <b>dd.mm.yyyy hh:mm</b>
            </li>
            <li>
              Kuvaajan aikaleima on <b>yyyy.mm.dd hh:mm:ss</b>
            </li>
            <li>
              Tietojen päivitys tapahtuu noin kello 14:00, jolloin tietoihin
              sisältyy seuraavan päivän hintatiedot.
            </li>
            <li>
              Mikäli huomisen dataa ei ole saatavilla palauttaa <b>data_ok</b>{" "}
              arvon <b>false</b>.
            </li>
          </ul>
        </p>

        <p>Vastaukset</p>
        <pre>
          <code className="type">200 </code>
          <code>Hintojen haku onnistui</code>
        </pre>

        <p className="example">
          Esimerkki tapaus (Tiedot haetaan ennen kello 14:00)
        </p>
        <pre>
          <code>
            <code className="type">GET</code>
            {` https://api.epossu.fi/v2/marketData`}
          </code>

          <br />
          <br />
          <code>
            <code className="type">200 OK</code>
          </code>
          <br />
          <code>
            <code className="type">Content-Type: application/json</code>
          </code>

          <br />
          <br />
          <code className="type">Response body</code>
          <pre
            className="inner"
            dangerouslySetInnerHTML={{
              __html: syntaxHighlight(JSON.stringify(example_json, null, 2)),
            }}
          ></pre>
          <br />
          <code className="type">Response types</code>
          <pre
            className="inner"
            dangerouslySetInnerHTML={{
              __html: syntaxHighlight(
                JSON.stringify(example_json_types, null, 2)
              ),
            }}
          ></pre>
        </pre>
      </div>
    </section>
  );
};

export default ApiDocs;
