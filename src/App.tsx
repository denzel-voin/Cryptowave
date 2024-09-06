import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Link } from "react-router-dom";
import { Typography, Switch, Layout, Space } from "antd";
import {Cryptocurrencies, Exchanges, HomePage, Navbar, News} from "./components";
import {CryptoDetails} from "./components/CryptoDetails/CryptoDetails.tsx";

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
                  <Switch>
                      <Route exact path='/'>
                          <HomePage />
                      </Route>
                      <Route exact path='/cryptocurrencies'>
                          <Cryptocurrencies />
                      </Route>
                      <Route exact path='/exchanges'>
                          <Exchanges />
                      </Route>
                      <Route exact path='/news'>
                          <News />
                      </Route>
                      <Route exact path='/crypto/:coinId'>
                          <CryptoDetails />
                      </Route>
                  </Switch>
              </div>
          </Layout>
      </div>
      <div className='footer'>

      </div>
    </div>
  )
}

export default App
