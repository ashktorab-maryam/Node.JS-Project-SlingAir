const { flights, reservations } = require("./data");


const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};


const batchImport = async () => {
    // const newFlights = {_id:"SA231", flights:"SA231", seats:flights.SA231}
    const client = new MongoClient(MONGO_URI, options);
    // temporary content... for testing purposes.
    try {
    await client.connect();
    const db = client.db("SlingAirP");
    console.log("connected!");

    const flightsResult = await db.collection("flights").insertOne({_id:"SA231", flights:"SA231", seats:flights.SA231});
    const reservationResult = await db.collection("reservation").insertOne(reservations[0]);
    client.close();
    
    // console.log(req.body);

    }
catch (err) {
    console.log(err.stack);

}



};
batchImport()

