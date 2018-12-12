import * as React from "react";
import * as ReactDOM from "react-dom";
import App from './App';
import LocationContext from './context/location';
import './index.css';


ReactDOM.render(
    (
        <LocationContext.Provider value={[24.1469, 120.6839]}>
            <App />
        </LocationContext.Provider>
    ),
    document.getElementById("app")
);