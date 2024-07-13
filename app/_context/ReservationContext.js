"use client";
import { createContext, useContext, useState } from "react";

const ReservationContext = createContext({});
const initState = { from: undefined, to: undefined };

function ReservationProvider({ children }) {
  const [range, setRange] = useState(initState);
  const resetRange = () => setRange(initState);

  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
}

function useReservation() {
  const context = useContext(ReservationContext);

  if (!context) throw new Error("context was used outside of the provider");

  return context;
}

export { ReservationProvider, useReservation };
