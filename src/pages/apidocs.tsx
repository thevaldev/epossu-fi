import { useEffect } from "react";
import "../css/pages/Apidocs.scss";
import Header from "../elements/Header";
import Footer from "../elements/Footer";

const ApiDocs = () => {
  useEffect(() => {
    document.title = "API - epossu.fi";
  }, []);

  const marketData = {
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
            timestamp: 1704070800,
          },
          "...",
          {
            price: 1.234,
            date: "2024.01.03 00:00:00",
            timestamp: 1704067200,
          },
        ],
      },
    },
  };

  const code_example = [
    "async function fetchMarketData() {",
    "    // API:n osoite",
    "    const ENDPOINT = 'https://api.epossu.fi/v2/marketData';",
    "",
    "    // valinnaiset parametrit",
    "    const params = '?include_chart=false&price_timestamps=true';",
    "",
    "    const response = await fetch(ENDPOINT + params);    // Haetaan data API:sta",
    "    const json = await response.json();                 // Muutetaan data JSON-muotoon",
    "",
    "    if (json.success == true) return json.data;         // Jos haku onnistui, palautetaan data",
    "    throw new Error('Tietojen haussa tapahtui virhe');  // Muuten ilmoitetaan virheestä",
    "}",
    "",
    "fetchMarketData().then((data) => {",
    "    console.log(data);",
    "});",
  ];

  function syntaxHighlight(value: string, iscode: boolean = false) {
    if (iscode) {
      // loop thru each line
      const lines = value.split("\n");
      for (let i = 0; i < lines.length; i++) {
        // remove leading whitespaces
        if (lines[i].includes("// ")) {
          lines[i] = lines[i].replace("// ", '<span class="comment">// ');
          lines[i] = lines[i].replace(/$/, "</span>");
        }

        // brackets and semicolons
        lines[i] = lines[i].replace(/\(/g, '<span class="bracket">(</span>');
        lines[i] = lines[i].replace(/\)/g, '<span class="bracket">)</span>');
        lines[i] = lines[i].replace(/\{/g, '<span class="bracket">{</span>');
        lines[i] = lines[i].replace(/\}/g, '<span class="bracket">}</span>');
        lines[i] = lines[i].replace(/;/g, '<span class="semicolon">;</span>');

        // color strings with ''
        const re = new RegExp(/'[^']*'/g);
        lines[i] = lines[i].replace(
          re,
          "<span class='string'>" + lines[i].match(re) + "</span>"
        );

        // operators
        lines[i] = lines[i].replace(/\+/g, '<span class="operator">+</span>');

        // regex ".json"
        const re2 = new RegExp(/\.json/g);
        lines[i] = lines[i].replace(
          re2,
          "<span style='color: #95d773'>.json</span>"
        );

        const keywords = [
          "fetchMarketData",
          "const",
          "async",
          "await",
          "function",
          "if",
          "throw",
          "return",
          "new",
          "Error",
          "fetch",
          "true",
          "false",
          "then",
          "console",
          "log",
        ];

        const colors = {
          Error: "#f92672",
          function: "#52b7e5",
          const: "#52b7e5",
          async: "#52b7e5",
          fetchMarketData: "#95d773",
          if: "#f92672",
          new: "#f92672",
          return: "#f92672",
          await: "#f92672",
          throw: "#f92672",
          fetch: "#95d773",
          true: "#52b7e5",
          false: "#52b7e5",
          then: "#f92672",
          console: "#52b7e5",
          log: "#95d773",
        };

        keywords.forEach((keyword) => {
          const re = new RegExp("\\b" + keyword + "\\b", "g");
          lines[i] = lines[i].replace(
            re,
            "<span style='color: " +
              colors[keyword as keyof typeof colors] +
              "'>" +
              keyword +
              "</span>"
          );
        });
      }

      value = lines.join("\n");

      return value;
    }

    if (!value) return "";

    value = value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    return value.replace(
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
    <>
      <Header />
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
          Mikäli tarvitset apua rajapinnan käytössä tai sinulla on kysyttävää,
          ota yhteyttä{" "}
          <a
            href="https://github.com/thevaldev/epossu-fi/issues"
            target="_blank"
          >
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
          <p className="info">Palauttaa uusimmat 48 tunnin hintatiedot.</p>

          <ul>
            <li>
              Hinnat sisältävät arvonlisäveron <b>(24%)</b>.
            </li>
            <li>
              Hintojen yksikkö on <b>c/kWh</b>
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

          <p>Vastaukset</p>
          <pre>
            <code className="type">200 </code>
            <code>Hintojen haku onnistui</code>
          </pre>
          <pre>
            <code className="type">429 </code>
            <code>Liian monta pyyntöä. Yritä uudelleen myöhemmin.</code>
          </pre>

          <p>Parametrit</p>
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

          <p>JS Esimerkki koodi</p>
          <pre>
            <code
              className="inner"
              dangerouslySetInnerHTML={{
                __html: syntaxHighlight(code_example.join("\n"), true),
              }}
            ></code>
          </pre>

          <p>Vastaus</p>
          <pre
            className="inner"
            dangerouslySetInnerHTML={{
              __html: syntaxHighlight(JSON.stringify(marketData, null, 2)),
            }}
          ></pre>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ApiDocs;
