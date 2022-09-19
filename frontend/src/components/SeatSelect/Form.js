import { useState } from "react"
import { useHistory } from "react-router-dom";
import styled from "styled-components"





const Form = ({handleSubmit, setGivenName, setSurname, setEmail}) => {
    const history = useHistory();


    // const [currentUser, setCurrentUser]= useState(JSON.parse(sessionStorage.getItem('user')))
    // const handleChange = (name,value) => {
    //     // setFname(e.target.value)
    //     setFname({...fname,[name]:value })
    // } 



    // const  PostReservation = (ev) => {
    //     ev.preventDefault()
    //     setFname(formData)
    //     fetch("/api/add-reservation", {
            
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({...fname})})
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(data)
    //             if(data.status===201){
    //                 setCurrentUser(data.data)
    //                 sessionStorage.setItem('user', JSON.stringify(data));
    //                 history.push("/confirmed")
    //             }else{
    //             window.alert("User already reserved!")
    //         }
    //         })
    //     } 

        //online import useHistory history.push (/)
        return (<div>
            <Div>
            <form onSubmit={handleSubmit}>
            
                <Input type="text" 
                placeholder="First name" 
                onChange={(e)=> setGivenName(e.target.value)} /><br></br>
                <Input type="text" 
                placeholder="Last name" 
                onChange={(e)=> setSurname(e.target.value)} /><br></br>
                <Input type="text" 
                placeholder="Email" 
                onChange={(e)=> setEmail(e.target.value)} /><br></br>
            <Button >Confirm</Button>
            </form>
            </Div>
        </div>)
    }

const Div = styled.div`
margin-top:-25%;
padding:50px;
margin-left:50%;
display:block;
font-size:30px;
background-color:rgba(204, 85, 0, 0.3);
font-weight:bold;
position:absolute;
text-align:center;
/* bottom:0; */
left:0;
padding-bottom:10px;
border:1px solid var(--color-alabama-crimson);
border-radius:10px;
`;

const Input = styled.input`
padding:5px;
margin:5px;
width: 100%;
max-height: 100vh;
border:none;
`;

const Button = styled.button`
width: 100%;
max-height: 100vh;
background-color:#cc5500;
padding:5px;
color:white;
border:none;
`;

    export default Form