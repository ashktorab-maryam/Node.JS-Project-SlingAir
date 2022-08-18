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
const sendResponse= (res, status, data, message = "nothing")=>{
    return res.status(status).json({status, data,message})

}

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
    console.log(result)
    await db
    .collection("flights")
    .updateOne({_id: req.body.flight ,"seats.id": req.body.seat },{ $set:{"seats.$.isAvailable":false }})
    result ? 
    res.status(201).json({ status: 201, data: req.body,message: "reservation success" }):
    res.status(400).json({ status: 400, data: req.body, message: "failed reservation" });
    }
catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500,  message: "server error" });
}
    client.close();
    console.log("disconnected!");
};

// // updates an existing reservation
const updateReservation = async (req, res) => {
    const { _id, flight, seat, givenName, surname, email } = req.body;
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("SlingAirP");
    const query={_id};
    const newValues = { $set: { flight, seat, givenName, surname, email } };

 let isMissing = false
 if(!flight || !givenName || !email)
 {
    isMissing =true
    res.status(404).json({status:404, message:"seat not available",data: req.body});
 }
 else{
    const updateReservation = await db.collection("reservations").updateOne(query, newValues);
    updateReservation.acknowledged && res.status(200).json({ status: 200,message: "success" ,updatedTo: req.body  });
 }
client.close()

}
//         const findReservation = await db.collection("reservations").findOne(question);
//         const query = { _id: findReservation._id };
        
//         const seatsData = await db.collection("flights").findOne({_id: findReservation._id});
//         console.log(query)
//         if (seatBody) {

//             const seatsArray = seatsData.seats;
//             const findSeat = seatsArray.find(seat=>seat.id === seatBody);
// // lookn for the seat in the array
//             if (!findSeat.isAvailable) {
//                 res.status(404).json({status:404, message:"seat not available"});
//                 return;
//             }
//             findSeat.isAvailable = false;
//             const findOldSeat = seatsArray.find(seat=>seat.id === findReservation.seat);
//             findOldSeat.isAvailable = true;
//             const updateSeat = await db.collection("flights").updateOne(query, {$set: {...seatsData}});
//         }
// // update the reservation with the new seat if it exists
//         const updateReservation = await db.collection("reservations").updateOne(question, bodyDetails);
//         res.status(201).json({ status: 201, data: {updateReservation}, message: "success" });
//     } catch (err) {
//         console.log(err.stack);
//         res.status(500).json({ status: 500, data: {updateReservation}, message: err.message });
//     }
//     client.close();
// };

// // deletes a specified reservation
const deleteReservation = async(req, res) => {
 const client = new MongoClient(MONGO_URI, options);
        await client.connect();
        const db = client.db("SlingAirP");
        const {reservation}= req.params
        const result = await db.collection("reservation").findOne({_id:reservation})


        const { flight, seat }= result
        const query = {_id:flight, "seats.id": seat}
        const newValues = { $set: { "seats.$.isAvailable":true } };


        const del =  await db.collection("reservation").deleteOne({_id:reservation})

        if(del.deletedCount>0){
            const newSeat= await db.collection("flight").updateOne({query,newValues})
            res.status(201).json({ status: 201,
                  message: "success",
                del,
            newSeat });
 }
 else{
    res.status(404).json({status:404, message:"seat not available",data: req.body});
 }
client.close()
        
    }


// //     const _id = req.params.reservation
// //     console.log("connected!");
// //     const result = await db.collection("reservation").deleteOne({ _id });
// //     console.log(req.body);
// //     res.status(201).json({ status: 204, data: req.body });
// //     }
// // catch (err) {
// //     console.log(err.stack);
// //     res.status(500).json({ status: 500, data: req.body, message: "Delete reservation failed" });
// // }
// //     client.close();
// //     console.log("disconnected!");



// //**********************************Dipti */

// const deleteReservation = async (req, res) => {
//     const client = new MongoClient(MONGO_URI, options);
//     const _id = req.params.reservation;

//     try {
//         await client.connect();
//         const db = client.db("SlingAirP");
// // create a new flight with the specified seats

//         const detailsReservation = await db.collection("reservations").findOne({ _id });
//         console.log(detailsReservation.flight);
//         const flightId = detailsReservation.flight;
//         const seatBody = detailsReservation.seat;
//         const query = { _id: flightId, "seats.id": seatBody };
//         const newValues = { $set: { "seats.$.isAvailable": true } };
// // update the flight with the new seat if it exists
//         const updateSeat = await db.collection("flights").updateOne(query, newValues);

//         const result = await db.collection("reservations").deleteOne({ _id });
//         res.status(204).json({ status: 204, data: {result, updateSeat}, message: "Data passes through" });
//     } catch (err) {
//         console.log(err.stack);
//         res.status(500).json({ status: 500, message: err.message });
//     }
//     client.close();
// };



module.exports = {
    getFlights,
    getFlight,
    getReservations,
    addReservation,
    getSingleReservation,
    deleteReservation,
    updateReservation,
};