import * as React from 'react';
import * as L from 'leaflet';
import Leaflet from '../Leaflet';
import * as mapHelper from '../../helper/map'
import LocationContext from '../../context/location';
import { ibikes } from '../../data/ibike.json';
import * as markerIcon from 'leaflet/dist/images/marker-icon.png';


const setupIbikeMarkers = (map: L.Map) => {
    const markers: L.Marker[] = [];
    const icon = new L.Icon({
        iconUrl: markerIcon
    });
    for (const ibike of ibikes) {
        const marker = L.marker({ lat: parseFloat(ibike.lat), lng: parseFloat(ibike.lng) })
            .setIcon(icon)
            .addTo(map);
        markers.push(marker);
    }
    return markers;
};

interface IBikeMapProps {
    location: L.LatLngExpression;
}

class IbikeMap extends React.Component<IBikeMapProps> {

    private _leafletRef = React.createRef<Leaflet>();

    componentDidMount() {
        mapHelper.setupLayer(this._leafletRef.current.map);
        mapHelper.setupLocation(this._leafletRef.current.map, this.props.location);
        setupIbikeMarkers(this._leafletRef.current.map);
        this._leafletRef.current.map.zoomControl.remove();
    }

    render() {
        return (
            <Leaflet ref={this._leafletRef} />
        );
    }
}

export default () => (
    <LocationContext.Consumer>
        {(location) => <IbikeMap location={location} />}
    </LocationContext.Consumer>
);