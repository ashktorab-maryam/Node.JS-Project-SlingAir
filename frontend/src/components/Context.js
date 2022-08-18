import { createContext, useState } from "react";

export const Context = createContext();

export const ContextProvider = ({children}) => {
    const [reservation, setReservation] = useState(JSON.parse(sessionStorage.getItem("user"))||null);
    const [seat, setSeat] = useState(null);

return (
    <Context.Provider
    value = {{ seat, setSeat, reservation, setReservation }}>
        {children}
    </Context.Provider>
    );

};