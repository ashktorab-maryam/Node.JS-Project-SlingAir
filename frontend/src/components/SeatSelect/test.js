// import { useState } from "react"
// import styled from "styled-components"




// const Form = () => {
    
    
// const formData={
//             givenName:"",
//             surname:"",
//             email:""
//         }

//     const [fname, setFname] = useState({...formData}) 
//     const[disabled, setDisabled]=useState(true)
//     const [currentUser, setCurrentUser]= useState(JSON.parse(sessionStorage.getItem('user')))

//     const handleChange = ev => {
//        // setFname(e.target.value)
//        setFname({...fname})
//     }
//     const handleSubmit=(e) =>{
//          ev.preventDefault()
//        fetch("/api/add-reservation", {
           
//            method: 'POST',
//            headers: { 'Content-Type': 'application/json' },
//            body: JSON.stringify({...fname})})
//            .then(res => res.json())
//            .then(data => {

//                console.log(data)
//                setCurrentUser(data.data)
//                sessionStorage.setItem('user', JSON.stringify(data));
//             })
//     }     
//     }
    
       
  
//     // const [status,setStatus] = useState("loading")
//     // const [seating, setSeating] = useState([]);
    

//    // const  PostReservation = (ev) => {

//        // } 
//         return (<div>
//             <Div>
//             {/* <form onSubmit={PostReservation}> */}
//             <wrapper onsubmit= {handleSubmit}
            
//                 <Input type="text" 
//                 placeholder="First name"
//                  value={fname.givenName}
//                 onChange={(e)=> handleChange("givenName" , e.target.value)}/>





//                 <Input type="text" placeholder="Last name" value={fname.surname} onChange={handleChange} /><br></br>
//                 <Input type="text" placeholder="Email" value={fname.email} onChange={handleChange} /><br></br>


//             <Button>Confirm</Button>
//             {/* </form> */}
//             </Div>
//         </div>)
//     }

// const Div = styled.div`
// padding:50px;
// /* height:60vh; */
// margin-left:50%;
// display:block;
// font-size:30px;
// background-color:rgba(204, 85, 0, 0.3);
// font-weight:bold;
// position:absolute;
// text-align:center;
// bottom:0;
// left:0;
// padding-bottom:10px;
// border:1px solid red;
// `;

// const Input = styled.input`
// padding:5px;
// margin:5px;
// width: 100%;
// max-height: 100vh;
// border:none;
// `;

// const Button = styled.button`
// width: 100%;
// max-height: 100vh;
// background-color:#cc5500;
// padding:5px;
// color:white;
// border:none;
// `;

//     export default Form