const path = require('path');
const fs = require('fs');
const stream = require('stream');
const parse = require('csv-parse')
const { cidr } = require('node-cidr');
const mongodb = require('mongodb');

const GEOLOCATION_CSV_PATH = path.join(__dirname, '../data/geolocation.csv');
// TODO load mongodb url from env
const mongoClient = new mongodb.MongoClient('mongodb://localhost:27017', {
    useNewUrlParser: true
});

mongoClient.connect(err => {
    if (err) {
        console.log(err);
        return;
    }

    const geolocationCollection = mongoClient.db('ibike_map').collection('geolocations');
    geolocationCollection.deleteMany({});

    stream.pipeline(
        fs.createReadStream(GEOLOCATION_CSV_PATH),
        parse({
            from_line: 2,
            cast: true
        })
    ).on('data', ([
        network,
        geoname_id,
        registered_country_geoname_id,
        represented_country_geoname_id,
        is_anonymous_proxy,
        is_satellite_provider,
        postal_code,
        lat,
        lng,
        accuracy_radius
    ]) => {
        const [ipFrom, ipTo] = cidr.toIntRange(network);
        const document = {
            ipFrom,
            ipTo,
            lat,
            lng
        };
        geolocationCollection.insertOne(document);
    }).on('end', () => {
        mongoClient.close();
    });
})