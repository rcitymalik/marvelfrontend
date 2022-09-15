import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {index} from "./store";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";

//React Bootstrap configuration
import "../node_modules/react-bootstrap/dist/react-bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={index}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
);

