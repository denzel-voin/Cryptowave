import { useState } from 'react'
import './App.css'
import { Route, Link, Routes } from 'react-router-dom';
import { Typography, Layout, Space } from "antd";
import { Cryptocurrencies, Exchanges, HomePage, Navbar, News } from "./components";
import { CryptoDetails } from "./components/CryptoDetails/CryptoDetails.tsx";

function App() {
    const [count, setCount] = useState(0)

    return (
        <div className='app'>
            <div className='navbar'>
                <Navbar />
            </div>
            <div className='main'>
                <Layout>
                    <div className='routes'>
                        <Routes>
                            <Route path='/' element={<HomePage/>}/>
                            <Route path='/cryptocurrencies' element={<Cryptocurrencies/>}/>
                            <Route path='/exchanges' element={<Exchanges/>}/>
                            <Route path='/news' element={<News/>}/>
                            <Route path='/crypto/:coinId' element={<CryptoDetails/>}/>
                        </Routes>
                    </div>
                </Layout>
                <div className='footer'>
                    <Typography.Title level={5} style={{color: "white", textAlign: "center"}}>
                        CryptoWave <br/>
                        all rights reserved
                    </Typography.Title>
                    <Space>
                        <Link to='/'>Главная</Link>
                        <Link to='/exchanges'>Обменник</Link>
                        <Link to='/news'>Новости</Link>
                    </Space>
                </div>
            </div>
        </div>
    )
}

export default App;
