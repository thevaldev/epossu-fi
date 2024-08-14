import { Link } from "react-router-dom";
import { PriceData } from "../types";

interface MainProps {
  marketData: PriceData | undefined;
}

const Footer = ({ marketData }: MainProps) => {
  return (
    <footer>
      <div className="footer-content">
        <div className="logo-wrap">
          <Link to="/">
            <svg
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 247.65 226.02"
              x="0px"
              y="0px"
              width={54}
              height={54}
              xmlSpace="preserve"
              className="logo"
            >
              <path
                opacity="1.000000"
                stroke="none"
                className="cls-1"
                d="M132.44,45.15l-10.9-15.63c-.43-.61-1.35-.55-1.69.11l-2.96,5.78c-.38.75-1.46.71-1.79-.06L100.59,1.39c-.46-1.08,1.01-1.92,1.71-.98l10.58,14.39c.49.66,1.52.48,1.75-.31l2.02-6.83c.26-.89,1.5-.96,1.86-.11l15.67,36.64c.47,1.1-1.04,1.93-1.72.96Z"
              />
              <path
                opacity="1.000000"
                stroke="none"
                className="cls-1"
                d="M82.88,71.95l-15.78-10.68c-.62-.42-1.46-.03-1.54.71l-.69,6.46c-.09.83-1.11,1.19-1.7.58l-25.72-26.51c-.82-.84.25-2.16,1.25-1.52l15.03,9.64c.69.44,1.59-.1,1.52-.91l-.56-7.1c-.07-.93,1.05-1.43,1.7-.77l27.77,28.58c.83.86-.28,2.18-1.27,1.51Z"
              />
              <path
                opacity="1.000000"
                stroke="none"
                className="cls-1"
                d="M134.43,176.52s.01.06.02.09c3.77,13.99,4.5,28.39,6.1,42.67.61,5.47,7.5,8.55,12.09,5.59.91-.59,1.18-1.47,1.39-2.5,1.2-5.89,1.21-5.84,7.04-4.1.61.18,1.22.64,1.91.77.89.16,1.56-.84,1.15-1.65h0c-15-28.35-3.36-58.82,27.4-67.79,19.89-5.8,35.25-17.66,50.3-30.67,1.47-1.27,2.58-3,3.79-4.57,1.62-2.1,1.85-4.26-.17-6.24-2.86-2.8-2.51-5.36.14-8.13,1.05-1.1,2.54-2.2,1.92-4.25-2.5-8.18-11.73-11.94-19.28-7.57-2.58,1.49-4.6,1.25-7.38.41-15.6-4.68-28.66-14.29-42.89-21.62-2.16-1.12-2.64-2.65-1.53-4.91,1.58-3.24,1.44-6.65.95-10.2-1.45-10.27-4.34-20.45-2.55-31,.09-.53-.22-.99-1.03-1.28-.41-.15-.88-.03-1.2.28-8.01,7.78-16.08,15.84-21.43,26.3-3.42,6.7-4.24,12.54.03,19.81,9.36,15.93,1.14,34.05-16.73,38.45-12.98,3.2-24.11-.64-32.55-10.76-3.71-4.45-7.15-5.67-12.74-4.4-30.27,6.89-52.88,22.81-63.96,52.83-.49,1.33-.74,2.93-2.4,3.67-.35.16-.77.14-1.09-.07-1.11-.7-2.31-1.5-3.56-2.18-5.82-3.16-12.66-.87-16.54,5.5-3.11,5.09-1.69,11.1,3.69,14.75,2.85,1.94,6,2.79,9.35.97,2.6-1.42,3.91-3.79,3.72-6.54s-.86-3.58-3.26-4.87c-1.16-.62-3.19-.03-3.54,1.23-.46,1.66-.04,2.34-1.04,3.66-.59.78-1.59.77-2.81.31-1.62-.61-2.48-2.58-1.85-5.77.75-3.79,5.26-6.13,8.93-4.82,5.27,1.89,7.46,5.54,6.79,11.66-1.86,16.93,2.72,32.17,12.66,45.73,9.77,13.34,22.61,20.99,39.81,20.23,9.6-.43,19.24-.32,28.85-.03,5.06.15,8.61-.63,9.5-6.51.61-3.99,3.15-3.71,5.66-1.42.96.86,1.71,2,2.39,3.12,2.84,4.74,5.58,5.82,10.96,3.72.64-.25.96-.99.68-1.61-5.69-12.62-15.19-18.71-28.89-17.63-1.11.09-1.72-1.3-.89-2.05.21-.19.43-.37.61-.57,20.54-22.79,8.85-58.36-21.34-64.73-9.73-2.06-19.44-.81-29.12.68-3.5.53-6.93,1.58-10.49,2.01-1.3.16-1.87-1.6-.72-2.23,80.16-43.84,92.86,36.17,93.17,38.23ZM178.54,106.9c-4.85.1-10.09-5.54-10.12-10.89-.02-4.73,5.32-10.27,10.03-10.41,6.21-.19,10.65,4.36,10.7,10.97.05,4.97-5.34,10.22-10.61,10.33ZM216.79,123.37c-2.15,4.68-9.19,8.92-14.54,8.98-6.13.06-12.88-4.34-15.36-10.02-.59-1.34-1.56-2.81.21-3.93,1.53-.96,3.21-.91,4.58.36,1.2,1.12,2.17,2.47,3.34,3.63,4.8,4.75,10.01,4.69,14.69-.15.68-.71,1.23-1.55,1.85-2.32,1.4-1.7,3.23-2.67,5.19-1.43,2.14,1.35.74,3.35.04,4.88ZM237.61,104.75c-.47,1.4.66,4.27-1.93,4.07-3.38-.25-2.33-3.71-2.81-5.9-.34-1.58.25-3.29,2.18-2.94,2.34.43,2.66,2.53,2.56,4.77Z"
              />
              <path
                className="cls-1"
                d="M136.75,85.01c.05,0,.11,0,.17,0,9.65-.52,12.67-6.48,7.6-14.78-4.41-7.22-11.48-10.37-19.33-11.71-9.58-1.64-18.67-4.29-26.69-9.99-.49-.35-1.03-.8-1.68-.95-.89-.2-1.69.57-1.65,1.48.16,3.29.2,6.69.64,10.04,1.76,13.49,6.09,25.64,17.34,34.49,6.72,5.29,22.04,5.05,28.04-.99.89-.9.16-2.44-1.11-2.39-11.27.42-14.49-.28-19.86-3.67-4.94-3.11-9.2-8.06-11.21-12.58-.65-1.46,1.18-2.75,2.3-1.61,4.77,4.83,14.04,12.41,25.44,12.65Z"
              />
              <path
                className="cls-1"
                d="M187.74,160.92c.42-.27.97.07.92.57-1.05,9.92-1.55,19.66.19,29.41,1.78,9.97,5.81,18.97,11.89,27.39.26.36.06.89-.39.95-2.48.36-4.09-1.21-5.81-2-3.01-1.38-3.97-.4-3.89,2.59.06,2.25.82,5.17-2.56,5.45-3.49.28-7.99,1.59-9.89-2.51-5.71-12.35-10.65-25-8.17-39.1,1.87-10.62,9-17.17,17.71-22.75Z"
              />
            </svg>
            <span>epossu.fi</span>
          </Link>
          <p>
            Pörssisähkön hinnat tunneittain. Seuraa sähkönhintoja
            tuntikohtaisesti kuvaajalta ja hyödynnä edullisimmat tunnit.
          </p>
        </div>

        <div className="col">
          <p>Navigointi</p>
          <ul>
            <li>
              <Link to="/">
                <span>Etusivu</span>
              </Link>
            </li>
            <li>
              <Link to="/tietoa">
                <span>Tietoja</span>
              </Link>
            </li>
            <li>
              <Link to="/ilmoitukset">
                <span>Ilmoitukset</span>
              </Link>
            </li>
            <li>
              <Link to="/api">
                <span>API-Rajapinta</span>
              </Link>
            </li>
            <li>
              <Link to="/asetukset">
                <span>Asetukset</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="col bigger">
          <p>Tämän päivän hinnat</p>
          <ul>
            {marketData !== undefined ? (
              <>
                <li>
                  Keskihinta:{" "}
                  <span className="number">
                    {marketData.today.options.average}
                  </span>
                  c/kWh
                </li>
                <li>
                  Kallein:{" "}
                  <span className="number">
                    {marketData.today.options.highest.price}
                  </span>
                  c/kWh{" "}
                  <span className="number no-b">
                    ({marketData.today.options.highest.date.split(" ")[1]})
                  </span>
                </li>
                <li>
                  Halvin:{" "}
                  <span className="number">
                    {marketData.today.options.lowest.price}
                  </span>
                  c/kWh{" "}
                  <span className="number no-b">
                    ({marketData.today.options.lowest.date.split(" ")[1]})
                  </span>
                </li>
              </>
            ) : (
              <li>Ladataan tietoja...</li>
            )}
          </ul>
        </div>

        <div className="col bigger">
          <p>Huomisen hinnat</p>
          <ul>
            {marketData !== undefined && marketData.tomorrow.data_ok ? (
              <>
                <li>
                  Keskihinta:{" "}
                  <span className="number">
                    {marketData.tomorrow.options.average}
                  </span>
                  c/kWh
                </li>
                <li>
                  Kallein:{" "}
                  <span className="number">
                    {marketData.tomorrow.options.highest.price}
                  </span>
                  c/kWh{" "}
                  <span className="number no-b">
                    ({marketData.tomorrow.options.highest.date.split(" ")[1]})
                  </span>
                </li>
                <li>
                  Halvin:{" "}
                  <span className="number">
                    {marketData.tomorrow.options.lowest.price}
                  </span>
                  c/kWh{" "}
                  <span className="number no-b">
                    ({marketData.tomorrow.options.lowest.date.split(" ")[1]})
                  </span>
                </li>
              </>
            ) : (
              <li>Huomisen tietoja ei ole vielä saatavilla</li>
            )}
          </ul>
        </div>

        <div className="footer-row">
          <div className="github">
            <p>
              Sivusto on avoimen lähdekoodin projekti.
              <br />
              Voit tarkastella ja osallistua sen kehitykseen{" "}
              <a href="https://github.com/thevaldev/epossu-fi" target="_blank">
                GitHubissa.
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="dev">
        <a
          href="https://theval.dev/"
          target="_blank"
          title="Developed by thevaldev"
        >
          <svg
            viewBox="78.5 78.5 100 100"
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            width={64}
            height={64}
            xmlSpace="preserve"
            className="logo"
          >
            <path
              opacity="1.000000"
              stroke="none"
              d="
M96.817490,109.257164 
	C93.782143,103.943558 90.913895,98.956863 87.550346,93.109047 
	C93.134987,93.109047 97.755257,92.855583 102.317406,93.259132 
	C103.738197,93.384819 105.457779,95.023445 106.267883,96.418251 
	C116.211090,113.538010 126.052917,130.717422 135.765030,147.969177 
	C136.521561,149.313019 136.756424,151.624100 136.120255,152.952286 
	C134.201813,156.957611 131.733597,160.699600 128.974426,165.406250 
	C118.059372,146.359528 107.521973,127.971802 96.817490,109.257164 
z"
            ></path>
            <path
              opacity="1.000000"
              stroke="none"
              d="
M142.257782,142.331955 
	C141.302261,143.843994 140.516525,145.029205 139.278015,146.897415 
	C136.480728,142.104477 133.971573,138.068161 131.790573,133.861725 
	C131.314758,132.944031 131.648926,131.211273 132.223831,130.204315 
	C138.807053,118.673721 145.458633,107.180908 152.253510,95.774246 
	C152.971741,94.568558 154.670319,93.313728 155.995743,93.218506 
	C160.429840,92.899971 164.901031,93.097679 170.436707,93.097679 
	C160.808624,109.909531 151.618103,125.957336 142.257782,142.331955 
z"
            ></path>
          </svg>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
