import { Menu, Typography, Avatar } from "antd";
import { Link } from "react-router-dom";
import { HomeOutlined, BulbOutlined, FundOutlined } from "@ant-design/icons";

export const Navbar = () => {
  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar src="\src\images\tokens.jpeg" size="large" />
        <Typography.Title level={2} className="logo" />
        <Link to="/">CryptoWave</Link>
        <Typography.Title />
      </div>
      <Menu theme="dark">
        <Menu.Item icon={<HomeOutlined />}>
          <Link to="/">Главная</Link>
        </Menu.Item>
        <Menu.Item icon={<FundOutlined />}>
          <Link to="/cryptocurrencies">Криптовалюты</Link>
        </Menu.Item>
        <Menu.Item icon={<BulbOutlined />}>
          <Link to="/news">Новости</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};
