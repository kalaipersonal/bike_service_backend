import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import 'leaflet/dist/leaflet.css';
import { BrowserRouter } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import { Provider } from "react-redux";

import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primereact/resources/primereact.css';    
                   // core css
import store from "./Redux/store/Store";

import 'primeicons/primeicons.css';                                 // icons
// import 'primeflex/primeflex.css';  
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <ToastContainer></ToastContainer>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>


  </>
);


reportWebVitals();
