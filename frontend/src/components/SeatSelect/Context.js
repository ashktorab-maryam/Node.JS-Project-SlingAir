import { createContext, useState } from "react";

export const Context = createContext();

export const ContextProvider = ({children}) => {
    const [reservation, setReservation] = useState(null);
    const [seat, setSeat] = useState(null);

return (
    <Context.Provider
    value = {{ reservation, setReservation, seat, setSeat }}>
        {children}
    </Context.Provider>
    );

};