const Footer = () => {
  return (
    <footer>
      <div className="dev">
        <a
          href="https://theval.dev/"
          target="_blank"
          title="Developed by thevaldev"
        >
          <svg
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="87 80 90 90"
            width={64}
            height={64}
            xmlSpace="preserve"
            className="logo"
          >
            <g>
              <g>
                <polygon points="132.2,132.8 140.9,147.8 132.2,162.7 89.3,88.3 106.6,88.3 		"></polygon>
              </g>
              <g>
                <polygon points="175.2,88.3 151.7,128.9 151.7,128.9 150.9,130.4 143.1,143.9 134.4,128.9 157.9,88.3 		"></polygon>
              </g>
            </g>
          </svg>
        </a>
      </div>
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
    </footer>
  );
};

export default Footer;
