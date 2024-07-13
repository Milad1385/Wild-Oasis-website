"use client";
import React from "react";
import { useReservation } from "../_context/ReservationContext";
import { differenceInDays } from "date-fns";
import { createBooking } from "../_lib/actions";
import Button from "./Button";

function ResForm({ cabin }) {
  const { maxCapacity, price, id, discount } = cabin;
  const { range, resetRange } = useReservation();

  const startDate = range.from;
  const endDate = range.to;

  const numNights = differenceInDays(endDate, startDate);
  const cabinPrice = numNights * (price - discount);

  const bookingFeild = {
    startDate,
    endDate,
    numNights,
    cabinPrice,
    cabinId: id,
  };

  const createBookingWithData = createBooking.bind(null, bookingFeild);
  return (
    <form
      action={async (formData) => {
        await createBookingWithData(formData);
        resetRange();
      }}
      className="bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col"
    >
      <div className="space-y-2">
        <label htmlFor="numGuests">How many guests?</label>
        <select
          name="numGuests"
          id="numGuests"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          required
        >
          <option value="" key="">
            Select number of guests...
          </option>
          {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
            <option value={x} key={x}>
              {x} {x === 1 ? "guest" : "guests"}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="observations">
          Anything we should know about your stay?
        </label>
        <textarea
          name="observations"
          id="observations"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          placeholder="Any pets, allergies, special requirements, etc.?"
        />
      </div>
      <div className="space-y-2 flex items-center gap-3">
        <input type="checkbox" name="hasBreakFast" className="accent-amber-500 w-[30px] h-[17px]"/>
        <label htmlFor="observations" className="!m-0">Would you like breakfast ?</label>
      </div>

      <div className="flex justify-end items-center gap-6">
        {!(range.to && range.from) ? (
          <p className="text-primary-300 text-base">Start by selecting dates</p>
        ) : (
          <Button pendingLabel={"Reserving ..."}>Reserve now</Button>
        )}
      </div>
    </form>
  );
}

export default ResForm;
