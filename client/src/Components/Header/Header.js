import React, { useState, useEffect, useRef } from "react";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon } from "@heroicons/react/outline";
import "./Header.css"; // Importing external CSS file
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { Link, useNavigate } from "react-router-dom";
import logo from "../Logo/cpmsLogo.png";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../redux/action/auth";

// Utility function to conditionally concatenate CSS classes
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// Example list of notifications
const notifications = [
  { id: 1, text: "New message from John" },
  { id: 2, text: "You have a meeting at 3:00 PM" },
  { id: 3, text: "Reminder: Complete task by EOD" },
  { id: 4, text: "Hey!!! test Notification" },
];

// Navbar component
export default function Navbar({ isDarkMode, toggleDarkMode, setLogin }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // State for managing visibility of notification dropdown
  const [openNotifications, setOpenNotifications] = useState(false);
  const notificationsRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target)
      ) {
        setOpenNotifications(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [notificationsRef]);

  const handleLogout = () => {
    dispatch(logoutAction(setLogin, navigate));
  };

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="max-w-8xl mx-2 px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16 w-auto">
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <Link to="/home/dashboard">
                  <div className="flex-shrink-0 flex items-center">
                    <img className=" h-9" src={logo} alt="CPMS" />
                  </div>
                </Link>
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

                <Menu ref={notificationsRef} as="div" className="relative">
                  <div>
                    {/* Notifications button */}
                    <Menu.Button
                      className="notifications-button"
                      onClick={() => setOpenNotifications(!openNotifications)} // Toggle the state on click
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </Menu.Button>
                  </div>
                  {/* Transition for Notification dropdown menu */}
                  <Transition
                    show={openNotifications}
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="notifications-dropdown-menu z-10 absolute right-0 origin-top-left bg-white shadow-lg rounded-md overflow-hidden hover:cursor-pointer">
                      {notifications.map((notification) => (
                        <Menu.Item key={notification.id}>
                          {({ active }) => (
                            <div
                              className={classNames(
                                "notifications-dropdown-item",
                                active && "active"
                              )}
                            >
                              {notification.text}
                            </div>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
                <Menu as="div" className="ml-4 relative">
                  <div>
                    {/* Profile dropdown */}
                    <Menu.Button className="profile-dropdown-button">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="profile-image"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt="IMG"
                      />
                    </Menu.Button>
                  </div>
                  {/* Transition for profile dropdown menu */}
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="profile-dropdown-menu z-10 hover:cursor-pointer">
                      {/* Profile dropdown menu items */}
                      <Menu.Item>
                        {({ active }) => (
                          <div
                            // href="#"
                            className={classNames(
                              "profile-dropdown-item",
                              active && "active"
                            )}
                          >
                            Your Profile
                          </div>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <div
                            className={classNames(
                              "profile-dropdown-item",
                              active && "active"
                            )}
                          >
                            Settings
                          </div>
                        )}
                      </Menu.Item>
                      <Menu.Item onClick={handleLogout}>
                        {({ active }) => (
                          <div
                            className={classNames(
                              "profile-dropdown-item",
                              active && "active"
                            )}
                          >
                            Sign out
                          </div>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}
