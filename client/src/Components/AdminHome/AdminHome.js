import React, { useState, useEffect } from "react";
import "./AdminHome.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../Header/Header";
import SideNavBar from "./SideNavBar/SideNavBar";
import { useNavigate, Outlet } from "react-router-dom";
import { Container, Content } from "rsuite";

function AdminHome({ isDarkMode, toggleDarkMode, login, setLogin }) {
  const [expanded, setExpanded] = useState(() => {
    const savedexpanded = localStorage.getItem("expanded");
    return savedexpanded !== null ? JSON.parse(savedexpanded) : false;
  });
  const navigate = useNavigate(); // Add this state

  useEffect(() => {
    if (!login) {
      navigate("/"); // replace '/login' with your actual login path
      alert("Please login to continue");
    } else {
      // setisLoggedIn = true;
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("expanded", JSON.stringify(expanded));
  }, [expanded]);

  const toggleMenu = () => {
    setExpanded((prevExpanded) => !prevExpanded); // Toggle expanded state
  };

  return login ? (
    <div className="Home h-[100vh]">
      <Navbar
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        setLogin={setLogin}
      />
      <div className="body">
        <div className="sidenav">
          <SideNavBar expanded={expanded} toggleMenu={toggleMenu} />
        </div>
        <div
          className={expanded ? "show-container" : "expanded-show-container"}
        >
          <Container>
            <Content>
              <Outlet />
            </Content>
          </Container>
        </div>
      </div>
    </div>
  ) : null;
}

export default AdminHome;
