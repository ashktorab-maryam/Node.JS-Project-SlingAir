import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Context } from "../Context";
import Form from "./Form";
import Plane from "./Plane";

const SeatSelect = ({}) => {
const [flights, setFlights] = useState(null);
const [flightId, setFlightId] = useState(null);
const [givenName, setGivenName] = useState(null);
const [surname, setSurname] = useState(null);
const [email, setEmail] = useState(null);
const history = useHistory();
const {seat, reservation, setReservation} = useContext(Context);

  useEffect(() => {
    fetch('/api/get-flights')
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setFlights(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const flightHandler =(e)=>{
    setFlightId(e.target.value)
  }

  const handleSubmit = (ev) => {
    ev.preventDefault();
    fetch("/api/add-reservation", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({flight: flightId, seat:seat, givenName:givenName, surname:surname, email:email}),
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data.data);
        setReservation(data.data);
        sessionStorage.setItem("reservation", JSON.stringify(data.data._id));
        history.push("/confirmed");
    })
    .catch((err) => console.log(err))
  };

  if (!flights){
    return <div>Loading</div>
    }
    const flightArray = flights.data;

  return (
    <>

  <Div>
      <form>
      <BStyle> Flight Number </BStyle>   
      <select onChange = {flightHandler} > 
      <option> Choose a Flight</option>  
      {
          flightArray.map((flight) => {
            return (
              <option key={flight._id} value={flight._id}>
                {flight._id}
              </option>
            );
          })}  
      </select>  
      </form>
  </Div>
      <h2>Select your seat and Provide your information!</h2>
  <Plane flightId = {flightId}/>
  <Form handleSubmit={handleSubmit} setGivenName={setGivenName} setSurname={setSurname} setEmail={setEmail}/>
    </>
  );
};
const BStyle = styled.b`
color:white;
font-family: var(--font-heading);
  font-size: 25px;
`;



const Div = styled.header`
  display: flex;
  justify-content: space-between;
  background: var(--color-cadmium-red);
  height: 110px;
  padding: var(--padding-page) 18px;
`;

export default SeatSelect;
