import * as React from "react";
import * as ReactDOM from "react-dom";
import App from './App';
import QSLocationProvider from './context/QSLocationProvider';
import './index.css';


ReactDOM.render(
    (
        <QSLocationProvider>
            <App />
        </QSLocationProvider>
    ),
    document.getElementById("app")
);