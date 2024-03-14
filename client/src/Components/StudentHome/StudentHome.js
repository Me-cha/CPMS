import React, { useState, useEffect } from "react";
import "./StudentHome.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../Header/Header";
import StudentSideNavBar from "./Student_SideNavBar/Student_SideNavBar";
import { useNavigate, Outlet } from "react-router-dom";
import { Container, Content } from "rsuite";

function StudentHome({ isDarkMode, toggleDarkMode, login, setLogin }) {
  const [expanded, setExpanded] = useState(() => {
    const savedexpanded = localStorage.getItem("expanded");
    return savedexpanded !== null ? JSON.parse(savedexpanded) : false;
  });

  const navigate = useNavigate();
  useEffect(() => {
    if (!login) {
      navigate("/");
      alert("Please login to continue");
    }
  }, [login, navigate]);

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
          <StudentSideNavBar expanded={expanded} toggleMenu={toggleMenu} />
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

export default StudentHome;
