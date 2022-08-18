import { createContext, useEffect, useState } from "react";

export const Context = createContext();

export const ContextProvider = ({children}) => {
    const reservationId=  JSON.parse(sessionStorage.getItem("reservation"))
    const [reservation, setReservation] = useState(null);
    const [seat, setSeat] = useState(null);

    useEffect(()=>{
        fetch(`/api/get-reservation/${reservationId}`)
        .then((res)=> res.json())
        .then(data => {
            console.log(data)
            setReservation(data.data)
        })
        
    })

return (
    <Context.Provider
    value = {{ seat, setSeat, reservation, setReservation }}>
        {children}
    </Context.Provider>
    );

};