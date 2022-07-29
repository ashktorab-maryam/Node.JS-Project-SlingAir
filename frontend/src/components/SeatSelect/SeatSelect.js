import styled from "styled-components";
import Form from "./Form";
import Plane from "./Plane";

const SeatSelect = ({}) => {
  return (
    <>
  <Div>
      <form>
      <BStyle> Flight Number </BStyle>   
      <select id = "myList" onchange = "favTutorial()" > 
      <option> Choose a Flight</option>  
      <option> SA231 </option>   
      </select>  
      </form>
  </Div>
      <h2>Select your seat and Provide your information!</h2>
  <Plane/>
  <Form/>
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
