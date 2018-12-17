const path = require('path');
const fs = require('fs');
const stream = require('stream');
const parse = require('csv-parse')
const { cidr } = require('node-cidr');
const mongodb = require('mongodb');
const dotenv = require('dotenv');

dotenv.config({
    path: path.resolve(__dirname, '../server/.env')
});


const GEOLOCATION_CSV_PATH = path.join(__dirname, '../data/geolocation.csv');
const mongoClient = new mongodb.MongoClient(process.env.REACT_APP_MONGO_URL, {
    useNewUrlParser: true
});

mongoClient.connect(err => {
    if (err) {
        console.log(err);
        return;
    }

    const geolocationCollection = mongoClient.db('ibike_map').collection('geolocations');
    geolocationCollection.deleteMany({});

    let insertCount = 0;
    const bulk = [];

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
        bulk.push(document);

        insertCount += 1;
        if (insertCount % 1000 === 0) {
            geolocationCollection.insertMany(bulk);
            bulk.length = 0;
            console.log(`inserted ${insertCount} objects.`)
        }
    }).on('end', () => {
        mongoClient.close();
    });
})