import React, { useState } from "react";
import { Disclosure } from "@headlessui/react";
import "./AuthHeader.css"; // Importing external CSS file
import { DarkModeSwitch } from "react-toggle-dark-mode";
import logo from "../../../Logo/cpmsLogo.png";

// Navbar component
export default function AuthHeader({ isDarkMode, toggleDarkMode }) {
  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <div className="max-w-8xl mx-2 px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16 w-auto">
            <div
              className="flex items-center bg-gray-800 pb-1 "
              style={{
                fontWeight: "bolder",
                fontSize: "30px",
                color: "White",
                textAlign: "center",
              }}
            >
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <img
                    className="hidden lg:block h-9 w-auto"
                    src={logo}
                    alt="CPMS"
                  />
                </div>
                <div className="pl-2">CPMS</div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {/* Darkmode Switch */}
              <DarkModeSwitch
                style={{ marginRight: "1em" }}
                checked={isDarkMode}
                onChange={toggleDarkMode}
                sunColor="white"
                size={25}
              />
            </div>
          </div>
        </div>
      )}
    </Disclosure>
  );
}
