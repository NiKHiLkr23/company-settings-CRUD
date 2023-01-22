import React from "react";
import { useRouter } from "next/router";
import github from "../public/images/github.png";
import Image from "next/image";

function Header() {
  const router = useRouter();
  return (
    <div className="max-w-4xl mx-auto p-2 space-y-5">
      <div className="flex text-2xl font-mono font-bold ">
        Comapnay Settings
        <div className="flex grow justify-end">
          <a
            href="https://github.com/NiKHiLkr23"
            target="_blank"
            rel="noreferrer"
          >
            <Image src={github} alt="github" className="h-10 w-28" />
          </a>
        </div>
      </div>

      <div className="sm:hidden">
        <label className="sr-only">Select Options</label>
        <select
          id="tabs"
          className=" border border-gray-300 text-sm rounded-lg   p-2.5 "
        >
          <option>General</option>
          <option>Users</option>
          <option>Plan</option>
          <option>Billing</option>
          <option>Integrations</option>
        </select>
      </div>
      <ul className="hidden text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg shadow sm:flex max-w-md focus:outline-none">
        <li className="w-full">
          <p
            className={` link rounded-l-lg cursor-pointer ${
              router.pathname === "/" ? " bg-gray-200" : ""
            }`}
            onClick={() => router.push("/")}
          >
            General
          </p>
        </li>
        <li className="w-full">
          <p
            className={` link cursor-pointer ${
              router.pathname === "/users" ? " bg-gray-200" : ""
            }`}
            onClick={() => router.push("/users")}
          >
            Users
          </p>
        </li>
        <li className="w-full ">
          <p className="link cursor-not-allowed">Plan</p>
        </li>
        <li className="w-full">
          <p className="link cursor-not-allowed">Billing</p>
        </li>
        <li className="w-full">
          <p className="link cursor-not-allowed rounded-r-lg">Integrations</p>
        </li>
      </ul>
    </div>
  );
}

export default Header;
