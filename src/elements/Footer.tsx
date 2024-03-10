const Footer = () => {
  return (
    <footer>
      <svg
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 268 268"
        xmlSpace="preserve"
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
      <p>
        Copyright © {new Date().getFullYear()}
        <a href="https://theval.dev/" target="_blank">
          thevaldev
        </a>
      </p>
    </footer>
  );
};

export default Footer;
