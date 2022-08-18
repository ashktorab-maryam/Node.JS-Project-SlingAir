// import { createContext,useState } from "react";
// import {  useHistory } from "react-router-dom";

// export const UserContext = createContext(null);

// export const UserProvider = ({ children }) => {
//     const formData={
//         id:"",
//         flight:"",
//         seat:"",
//         givenName:"",
//         surname:"",
//         email:""
//     }

//     const history = useHistory();

//     const [fname, setFname] = useState({...formData})  
//     const initialState= JSON.parse(localStorage.getItem('user'));

//     const [currentUser, setCurrentUser]= useState( initialState!==null ? initialState : null)
//     const handleChange = (name,value) => {
//         // setFname(e.target.value)
//         setFname({...fname,[name]:value })
//     } 



//     // const  NewReservation = (ev) => {
//     //     ev.preventDefault()
//     //     setFname(formData)
//     //     fetch("/api/add-reservation", {
            
//     //         method: 'POST',
//     //         headers: { 'Content-Type': 'application/json' },
//     //         body: JSON.stringify({...fname})})
//     //         .then(res => res.json())
//     //         .then(data => {

//     //             console.log(data)
//     //             if(data.status===201){   
//     //                 setCurrentUser(data.data)
//     //                 localStorage.setItem('user', JSON.stringify(data.data));
//     //                 history.push("/confirmed")
//     //             }
//     //         })
//     //     } 


//     return  (
//         <UserContext.Provider value={{
//             fname,
//             setFname,
//             currentUser,
//             setCurrentUser,
//             handleChange
//         }}>
//             {children}
//         </UserContext.Provider>
//     )

// }