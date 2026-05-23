import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import axios from 'axios';

// Set the base URL for all Axios requests in the app.
// In local development, it will use '' (empty string), so the Vite proxy works.
// In production (Netlify), it will use the URL from the VITE_API_BASE_URL environment variable.
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL || '';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
