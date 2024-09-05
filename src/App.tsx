import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Link } from "react-router-dom";
import { Typography, Switch, Layout, Space } from "antd";

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='app'>
      <div className='navbar'>

      </div>
      <div className='main'>

      </div>
      <div className='footer'>

      </div>
    </div>
  )
}

export default App
