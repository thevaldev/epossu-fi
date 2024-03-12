import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./pages/main";
import ApiDocs from "./pages/apidocs";
import "./css/style.scss";
import Scenes from "./pages/scenes";
import Header from "./elements/Header";
import Footer from "./elements/Footer";

function App() {
  return (
    <Router>
      <div className="wrap">
        <div className="container">
          <div className="row">
            <Header />
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/api" element={<ApiDocs />} />
              <Route path="/nakymat" element={<Scenes />} />
            </Routes>
            <Footer />
          </div>
        </div>
      </div>
    </Router>
  );
}
export default App;
