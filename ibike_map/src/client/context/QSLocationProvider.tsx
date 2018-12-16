import * as React from 'react';
import * as L from 'leaflet';
import * as querystring from 'querystring';
import LocationContext from './location';

interface QSLocationProviderProps {
    defaultLat?: number;
    defaultLng?: number
}

interface QSLocationProviderState {
    location: L.LatLngExpression
}

class QSLocationProvider extends React.Component<QSLocationProviderProps, QSLocationProviderState> {

    static defaultProps: QSLocationProviderProps = {
        defaultLat: 24.1469,
        defaultLng: 120.6839
    }

    constructor(props: QSLocationProviderProps) {
        super(props);

        const qs: {
            lat?: string;
            lng?: string
        } = querystring.parse(window.location.search.substring(1));
        this.state = {
            location: {
                lat: parseFloat(qs.lat) || this.props.defaultLat,
                lng: parseFloat(qs.lng) || this.props.defaultLng
            }
        };
    }

    render() {
        return (
            <LocationContext.Provider value={this.state.location}>
                {this.props.children}
            </LocationContext.Provider>
        )
    }
}

export default QSLocationProvider;