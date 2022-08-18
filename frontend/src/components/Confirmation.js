import { useContext, useEffect } from "react";
import styled from "styled-components";
import tombstone from "../assets/tombstone.png";
import { UserContext } from "./SeatSelect/UserContext";

const Confirmation = () => {
  const {
    fname,
    setFname,
    currentUser,
    setCurrentUser,
    handleChange} = useContext(UserContext)

useEffect(() => {
  setFname(currentUser)
}, [])
  return <Wrapper>
    <Box>
      <Div>
        <ConfirmStyle>Your flight is confirmed!</ConfirmStyle>
      </Div>
<PStyle>Reservation # {fname.id}:</PStyle>
<PStyle>Flight #: {fname.flight}</PStyle>
<PStyle>seat #: {fname.seat}</PStyle>
<PStyle>Name: {fname.givenName} {fname.surname} </PStyle>
<PStyle>Email: {fname.email}</PStyle>
      </Box>
      <Img src={tombstone}/>
      </Wrapper>;
};
const Img = styled.img`
margin:3px;
width:200px;

`;

const Box = styled.div`
border:2px solid  var(--color-alabama-crimson);
border-radius:5px;
padding:20px;
width:700px;
text-align: left;
margin:auto;
margin-top:50px;
`;

const Wrapper = styled.div`
padding:20px;
text-align: center;
`;
const Div = styled.div`
border-bottom: 2px solid var(--color-alabama-crimson);;
margin-bottom:15px;
`;
const ConfirmStyle = styled.p`
margin-bottom:10px;
color:var(--color-alabama-crimson);;
font-size:30px;
`;
const PStyle = styled.p`
color:black;
font-size:20px;
font-weight:bold;
line-height:200%;
`;




export default Confirmation;
