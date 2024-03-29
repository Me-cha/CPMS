import React from "react";
import "./Student_SideNavBar.css";
import { Sidenav, Nav } from "rsuite";
import DashboardIcon from "@rsuite/icons/legacy/Dashboard";
import GroupIcon from "@rsuite/icons/legacy/Group";
import TaskIcon from "@rsuite/icons/Task";
import BriefcaseIcon from "@rsuite/icons/legacy/Briefcase";
import GearIcon from "@rsuite/icons/Gear";
import { Disclosure } from "@headlessui/react";
import { Link, useLocation } from "react-router-dom";

const StudentSideNavBar = ({ expanded }) => {
  const NavLink = React.memo(
    React.forwardRef(({ href, children, ...rest }, ref) => (
      <Link ref={ref} to={href} {...rest}>
        {children}
      </Link>
    ))
  );

  const location = useLocation();
  const path = location.pathname.split("/studentHome/")[1];

  return (
    <div className="sideNavBar h-[91vh] ">
      <Sidenav className="w-[18vw] h-[inherit]" expanded={expanded}>
        <Sidenav.Header>
          <Disclosure>
            <div className="flex items-center pb-1  bg-white ">
              <div
                style={{
                  // width: "2vw",
                  fontWeight: "bolder",
                  fontSize: "30px",
                  color: "White",
                  textAlign: "center",
                }}
              ></div>
            </div>
          </Disclosure>
        </Sidenav.Header>
        <Sidenav.Body>
          <Nav>
            <Nav.Item
              as={NavLink}
              href="studentDashboard"
              eventKey="1"
              icon={<DashboardIcon />}
              active={path === "studentDashboard"}
            >
              DASHBOARD
            </Nav.Item>
            <Nav.Item
              as={NavLink}
              href="studentJobPosts/student_applicationList"
              eventKey="2"
              icon={<BriefcaseIcon />}
              active={path.startsWith("studentJobPosts")}
            >
              JOBS
            </Nav.Item>
            <Nav.Item
              as={NavLink}
              href="student_Trainings/student_trainingList"
              eventKey="3"
              icon={<TaskIcon />}
              active={path.startsWith("student_Trainings")}
            >
              TRAININGS
            </Nav.Item>
            <Nav.Item
              as={NavLink}
              href="student_StudentList"
              eventKey="4"
              icon={<GroupIcon />}
              active={path === "student_StudentList"}
            >
              STUDENTS
            </Nav.Item>
            <Nav.Item
              as={NavLink}
              href="student_Settings"
              eventKey="5"
              icon={<GearIcon />}
              active={path === "student_Settings"}
            >
              SETTINGS
            </Nav.Item>
          </Nav>
        </Sidenav.Body>
      </Sidenav>
    </div>
  );
};

export default StudentSideNavBar;
