import React from "react";
import "./SideNavBar.css";
import { Sidenav, Nav } from "rsuite";
import DashboardIcon from "@rsuite/icons/legacy/Dashboard";
import GroupIcon from "@rsuite/icons/legacy/Group";
import TaskIcon from "@rsuite/icons/Task";
import BriefcaseIcon from "@rsuite/icons/legacy/Briefcase";
import GearIcon from "@rsuite/icons/Gear";
import AdminIcon from "@rsuite/icons/Admin";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { Disclosure } from "@headlessui/react";
import { Link } from "react-router-dom";

const SideNavBar = ({ expanded }) => {
  const NavLink = React.memo(
    React.forwardRef(({ href, children, ...rest }, ref) => (
      <Link ref={ref} to={href} {...rest}>
        {children}
      </Link>
    ))
  );

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
              href="adminDashboard"
              eventKey="1"
              icon={<DashboardIcon />}
            >
              DASHBOARD
            </Nav.Item>
            <Nav.Item
              as={NavLink}
              href="adminJobPosts/applicationList"
              eventKey="2"
              icon={<BriefcaseIcon />}
            >
              JOBS
            </Nav.Item>
            <Nav.Item
              as={NavLink}
              href="adminTrainings/trainingList"
              eventKey="3"
              icon={<TaskIcon />}
            >
              TRAININGS
            </Nav.Item>
            <Nav.Item
              as={NavLink}
              href="adminStudentList"
              eventKey="4"
              icon={<GroupIcon />}
            >
              STUDENTS
            </Nav.Item>
            <Nav.Item
              as={NavLink}
              href="coordinatorList"
              eventKey="5"
              icon={<AdminIcon />}
            >
              COORDINATORS
            </Nav.Item>
            <Nav.Item
              as={NavLink}
              href="adminSettings"
              eventKey="6"
              icon={<GearIcon />}
            >
              SETTINGS
            </Nav.Item>
          </Nav>
        </Sidenav.Body>
      </Sidenav>
    </div>
  );
};

export default SideNavBar;
