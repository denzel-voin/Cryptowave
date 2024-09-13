import "./App.css";
import { Route, Link, Routes } from "react-router-dom";
import { Layout, Space } from "antd";
import { Cryptocurrencies, HomePage, Navbar, News } from "./components";
import { CryptoDetails } from "./components/CryptoDetails/CryptoDetails.tsx";

function App() {
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <Routes>
              <Route path="/Cryptowave" element={<HomePage />} />
              <Route
                path="/cryptocurrencies"
                element={<Cryptocurrencies simplified={false} />}
              />
              <Route path="/news" element={<News simplified />} />
              <Route path="/crypto/:coinId" element={<CryptoDetails />} />
            </Routes>
          </div>
        </Layout>
        <div className="footer">
          <Space>
            <Link to="/">Главная</Link>
            <Link to="/cryptocurrencies">Криптовалюта</Link>
            <Link to="/news">Новости</Link>
          </Space>
        </div>
      </div>
    </div>
  );
}

export default App;
