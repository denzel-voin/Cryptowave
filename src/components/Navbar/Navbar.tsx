import {Menu, Typography, Avatar, Button} from "antd";
import { Link } from "react-router-dom";
import {HomeOutlined, BulbOutlined, FundOutlined, MenuOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";

export const Navbar = () => {
    const [activeMenu, setActiveMenu] = useState(true);
    const [screenSize, setScreenSize] = useState(undefined);

    useEffect(() => {
        // @ts-ignore
        const handleResize = () => setScreenSize(window.innerWidth);
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        // @ts-ignore
        if (screenSize <= 800) {
            setActiveMenu(false);
        } else {
            setActiveMenu(true);
        }
    }, [screenSize]);

    return (
        <div className="nav-container">
            <div className="logo-container">
                <Avatar src='./logo.jpeg' size="large" />
                <Typography.Title level={2} className="logo"><Link to="/Cryptowave">CryptoWave</Link></Typography.Title>
                <Button className="menu-control-container" onClick={() => setActiveMenu(!activeMenu)}><MenuOutlined /></Button>
            </div>
            {activeMenu && (
                <Menu theme="dark">
                    <Menu.Item icon={<HomeOutlined />}>
                        <Link to="/Cryptowave">Главная</Link>
                    </Menu.Item>
                    <Menu.Item icon={<FundOutlined />}>
                        <Link to="/cryptocurrencies">Криптовалюты</Link>
                    </Menu.Item>
                    <Menu.Item icon={<BulbOutlined />}>
                        <Link to="/news">Новости</Link>
                    </Menu.Item>
                </Menu>
            )}
        </div>
    );
};
