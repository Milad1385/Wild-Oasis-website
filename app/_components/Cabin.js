import Image from "next/image";
import React from "react";
import TextExpander from "./TextExpander";
import { BanknotesIcon, EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";

function Cabin({ cabin }) {
  const { id, name, maxCapacity, price, discount, image, desc } = cabin;
  return (
    <div className="grid grid-cols-[3fr_4fr] gap-20 border border-primary-800 py-3 px-10 mb-24">
      <div className="relative scale-[1.15] -translate-x-3">
        <Image
          fill
          className="object-cover"
          src={image}
          alt={`Cabin ${name}`}
        />
      </div>

      <div>
        <h3 className="text-accent-100 font-black text-7xl mb-5  bg-primary-950 p-6 pb-1">
          Cabin {name}
        </h3>

        <p className="text-lg text-primary-300 mb-10">
          <TextExpander>{desc}</TextExpander>
        </p>

        <ul className="flex flex-col gap-4 mb-7">
          <li className="flex gap-3 items-center">
            <UsersIcon className="h-5 w-5 text-primary-600" />
            <span className="text-lg">
              For up to <span className="font-bold">{maxCapacity}</span> guests
            </span>
          </li>
          <li className="flex gap-3 items-center">
            <MapPinIcon className="h-5 w-5 text-primary-600" />
            <span className="text-lg">
              Located in the heart of the{" "}
              <span className="font-bold">Dolomites</span> (Italy)
            </span>
          </li>
          <li className="flex gap-3 items-center">
            <EyeSlashIcon className="h-5 w-5 text-primary-600" />
            <span className="text-lg">
              Privacy <span className="font-bold">100%</span> guaranteed
            </span>
          </li>
          <li className="flex gap-3 items-center">
            <BanknotesIcon className="h-5 w-5 text-primary-600" />
            <p className="flex gap-3 justify-end items-baseline">
              {discount > 0 ? (
                <>
                  <span className="text-3xl font-[350]">
                    ${price - discount}
                  </span>
                  <span className="line-through font-semibold text-primary-600">
                    ${price}
                  </span>
                </>
              ) : (
                <span className="text-3xl font-[350]">${price}</span>
              )}
              <span className="text-primary-200">/ night</span>
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Cabin;
