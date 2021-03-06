import * as mongodb from 'mongodb';

const client = new mongodb.MongoClient(process.env.REACT_APP_MONGO_URL, {
    useNewUrlParser: true
});

interface GeolocationDocument {
    ipFrom: number;
    ipTo: number;
    lat: number;
    lng: number;
}

export interface Geolocation {
    lat: number;
    lng: number;
}

export const findGeolocation = async (ip: string): Promise<Geolocation> => {

    await client.connect();

    const geolocationCollection = client.db('ibike_map').collection('geolocations');

    const ipInt = cidrToInt(ip);

    const geolocationDocument = await geolocationCollection.findOne<GeolocationDocument>({
        ipFrom: { "$lt": ipInt },
        ipTo: { "$gt": ipInt }
    })

    return geolocationDocument ? {
        lat: geolocationDocument.lat,
        lng: geolocationDocument.lng
    } : null;
}

const cidrToInt = (ip: string): number => {
    return ip
        .split('.')
        .reduce(
            (p: number, c: string, i: number) => p + parseInt(c) * 256 ** (3 - i),
            0
        );
}