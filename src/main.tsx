import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import {BrowserRouter as Router} from "react-router-dom";
import 'antd/dist/reset.css';
import {Provider} from "react-redux";
import store from "./app/store";

createRoot(document.getElementById('root')!).render(
  <Router>
      <Provider store={store}>
          <App />
      </Provider>
  </Router>
)
