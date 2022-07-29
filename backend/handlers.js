"use strict";
const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");

// use this data. Changes will persist until the server (backend) restarts.
const { flights, reservations } = require("./data");

// returns a list of all flights
const getFlights = async(req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("SlingAirP");
    const result = await db.collection("flights").find().toArray();
    result
    ? res.status(200).json({ status: 200, data: result })
    : res.status(404).json({ status: 404, data: "Flight Not Found" });
    client.close();
};

// returns all the seats on a specified flight
const getFlight = async(req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("SlingAirP");
    // .get("/api/get-flight/:flight", getFlight)
    const _id  = req.params.flight 
    const result = await db.collection("flights").findOne({_id });
    result
    ? res.status(200).json({ status: 200, data: result.seats })
    : res.status(404).json({ status: 404, message: "Specified Flight Not Found" });

client.close();
};

// returns all reservations
const getReservations = async(req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("SlingAirP");
    const result = await db.collection("reservation").find().toArray();
    result
    ? res.status(200).json({ status: 200, data: result })
    : res.status(404).json({ status: 404, data: "No reservation Found" });
    client.close();
};

// returns a single reservation
const getSingleReservation = async(req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("SlingAirP");
    // .get("/api/get-reservation/:reservation", getSingleReservation)
    const _id  = req.params.reservation 
    console.log(_id)
    const result = await db.collection("reservation").findOne({_id });
    console.log(result);
    result
    ? res.status(200).json({ status: 200, data: result, message:"reservation Found"})
    : res.status(404).json({ status: 404, message: "No single reservation Found" });

client.close();
};

// creates a new reservation
const addReservation = async(req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    try {
    await client.connect();
    const db = client.db("SlingAirP");
    console.log("connected!");
    const result = await db.collection("reservation").insertOne(req.body);
    console.log(req.body);
    res.status(201).json({ status: 201, data: req.body,message: "reservation success" });
    }
catch (err) {
    console.log(err.stack);
    res.status(400).json({ status: 400, data: req.body, message: "failed reservation" });
}
    client.close();
    console.log("disconnected!");
};

// updates an existing reservation
const updateReservation = async(req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    try {
    await client.connect();
    const db = client.db("SlingAirP")
    const _id = req.params._id 

    const xyz =  await db.collection("reservation").updateOne({_id:ObjectId(_id)},
    {$set:{
        givenName:givenName,
        surname:surname,
        email:email
    }})

    const query = { _id };
    //console.log(query)
    // contains the values that we which to
   const newValues = { $set: {...req.body} };
    console.log("connected!");

    const result = await db.collection("reservation").updateOne(query, newValues);

    console.log(result);
    res.status(200).json({ status: 200, data:xyz});
    }

catch (err) {
    console.log(err.stack);
    res.status(404).json({ status: 404, message: "Update reservation failed" });
}
    client.close();
    console.log("disconnected!");
};

// deletes a specified reservation
const deleteReservation = async(req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    try {
    await client.connect();
    const db = client.db("SlingAirP");
    const _id = req.params.reservation
    console.log("connected!");
    const result = await db.collection("reservation").deleteOne({ _id });
    console.log(req.body);
    res.status(201).json({ status: 204, data: req.body });
    }
catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, message: "Delete reservation failed" });
}
    client.close();
    console.log("disconnected!");
};

module.exports = {
    getFlights,
    getFlight,
    getReservations,
    addReservation,
    getSingleReservation,
    deleteReservation,
    updateReservation,
};