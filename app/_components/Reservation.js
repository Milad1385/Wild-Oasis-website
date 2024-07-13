import React from "react";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";
import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import { auth } from "../_lib/auth";
import LoginMessage from "./LoginMessage";

async function Reservation({ cabin }) {
  const session = await auth();
  const [settings, bookedDate] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);

  return (
    <div className="grid mt-12 grid-cols-2 border border-primary-800 min-h-[400px]">
      <DateSelector
        settings={settings}
        bookedDate={bookedDate}
        cabinInfo={cabin}
      />
      {session?.user ? (
        <ReservationForm user={session.user} cabin={cabin} />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
}

export default Reservation;
