"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { redirect } from "next/navigation";
import {
  getBooking,
  updateGuest,
  deleteBooking as deleteHandler,
  updateBooking as updateHandler,
  createBooking as createBookingHandler,
} from "./data-service";


export async function signInAction() {
  await signIn("google", {
    redirectTo: "/account",
  });
}

export async function signOutAction() {
  await signOut({
    redirectTo: "/",
  });
}

export async function updateUserProfile(formData) {
  const session = await auth();
  if (!session.user) throw new Error("Please login !!!");

  const nationalId = formData.get("nationalId");

  if (!nationalId) {
    throw new Error("national id is not valid !!!");
  }

  const [nationality, countryFlag] = formData.get("nationality").split("%");

  const updatedFields = {
    nationality,
    nationalId,
    countryFlag,
  };

  await updateGuest(session.user.guestId, updatedFields);

  revalidatePath("/account/profile");
}

export async function createBooking(bookingFeild, formData) {
  const session = await auth();
  if (!session.user) throw new Error("Please login !!!");

  let bookingObj = {
    ...bookingFeild,
    extrasPrice: 0,
    guestId: session.user.guestId,
    status: "unconfirmed",
    hasBreakFast: formData.get("hasBreakFast") || false,
    isPaid: false,
    observation: formData.get("observations"),
    numGuests: +formData.get("numGuests"),
    totalPrice: bookingFeild.cabinPrice,
  };

  await createBookingHandler(bookingObj);

  revalidatePath(`/cabins/${bookingFeild.cabinId}`);

  redirect("/cabins/thankyou");
}

export async function deleteBooking(bookingId) {
  const session = await auth();
  if (!session.user) throw new Error("Please login !!!");

  const bookingInfo = await getBooking(bookingId);

  if (!bookingInfo) {
    throw new Error("The booking is not founded !!!");
  }

  if (bookingInfo.guestId !== session?.user?.guestId) {
    throw new Error("You can't delete this booking");
  }

  await deleteHandler(bookingId);

  revalidatePath("/account/reservations");
}

export async function updateBooking(formData) {
  const session = await auth();
  if (!session.user) throw new Error("Please login !!!");

  const bookingId = formData.get("bookingId");

  const bookingInfo = await getBooking(bookingId);

  if (!bookingInfo) {
    throw new Error("The booking is not founded !!!");
  }

  if (bookingInfo.guestId !== session?.user?.guestId) {
    throw new Error("You can't Update this booking");
  }

  const updateFeilds = {
    numGuests: formData.get("numGuests"),
    observation: formData.get("observations"),
  };

  await updateHandler(bookingId, updateFeilds);

  revalidatePath("/account/reservations");
  revalidatePath(`/account/reservations/edit/${bookingId}`);

  redirect("/account/reservations");
}
