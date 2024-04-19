import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./pages/main";
import ApiDocs from "./pages/apidocs";
import Footer from "./elements/Footer";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Notifications from "./pages/Notifications";

function App() {
  return (
    <Router>
      <div className="wrap">
        <div className="container">
          <div className="row">
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/tietoa" element={<About />} />
              <Route path="/api" element={<ApiDocs />} />
              <Route path="/ilmoitukset" element={<Notifications />} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
            <Footer />
          </div>
        </div>
      </div>
    </Router>
  );
}
export default App;
