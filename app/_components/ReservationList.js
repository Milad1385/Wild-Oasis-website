"use client";
import React, { useEffect, useOptimistic } from "react";
import ReservationCard from "./ReservationCard";
import { deleteBooking } from "../_lib/actions";

function ReservationList({ bookings }) {
  const [optimisticBookings, deleteOptimistic] = useOptimistic(
    bookings,
    (curBookings, bookingId) => {
      return curBookings.filter((booking) => booking.id !== bookingId);
    }
  );

  const deleteHandler = async (id) => {
    deleteOptimistic(id);
    await deleteBooking(id)
  };
  return (
    <>
      <ul className="space-y-6">
        {optimisticBookings.map((booking) => (
          <ReservationCard
            onDelete={deleteHandler}
            booking={booking}
            key={booking.id}
          />
        ))}
      </ul>
    </>
  );
}

export default ReservationList;
