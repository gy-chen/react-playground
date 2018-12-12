import * as React from 'react';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './leaflet.css';

class Leaflet extends React.Component {

    static L = L;

    map: L.Map;

    private _mapRef = React.createRef<HTMLDivElement>();

    componentDidMount() {
        this.map = L.map(this._mapRef.current);
    }

    render() {
        return (
            <div className="leaflet" ref={this._mapRef} />
        );
    }
}

export default Leaflet;