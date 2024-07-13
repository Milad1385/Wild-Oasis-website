"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleFilter = (filter) => {
    const params = new URLSearchParams(searchParams);
    params.set(`capacity`, filter);
    router.replace(`${pathname}?${params}`);
  };
  return (
    <div className="border border-primary-800 flex">
      <Button filter="all" onFilter={handleFilter}>
        All Cabins
      </Button>
      <Button filter="small" onFilter={handleFilter}>
        1-3 guests
      </Button>
      <Button filter="medium" onFilter={handleFilter}>
        4-7 guests
      </Button>
      <Button filter="large" onFilter={handleFilter}>
        8-12 guests
      </Button>
    </div>
  );
}

function Button({ filter, children, onFilter }) {
  const searchParams = useSearchParams();
  const capacity = searchParams.get("capacity") || "all";
  return (
    <button
      className={`px-5 py-2 hover:bg-primary-700 ${
        filter === capacity ? "bg-primary-700" : ""
      }`}
      onClick={() => onFilter(filter)}
    >
      {children}
    </button>
  );
}

export default Filter;
