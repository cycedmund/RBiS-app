import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  sidebarClasses,
} from "react-pro-sidebar";
import { userAtom } from "../../../utilities/atom-jotai/atom";
import { useAtom } from "jotai";
import { logOutUserService } from "../../../utilities/users/users-service";
import { useState } from "react";
import { MdPeopleAlt, MdLogout, MdClear } from "react-icons/md";
import {
  GiHamburgerMenu,
  GiMissileLauncher,
  GiFinishLine,
} from "react-icons/gi";
import { FaPeopleGroup } from "react-icons/fa6";

const SideBar = () => {
  const [user, setUser] = useAtom(userAtom);
  const [collapsed, setCollapsed] = useState(true);
  const location = useLocation();
  const rootStyles = {
    [`.${sidebarClasses.container}`]: {
      backgroundColor: "#1c1c24",
      borderRight: "black",
    },
  };

  const handleCollapseSidebar = () => {
    setCollapsed(!collapsed);
  };
  const handleLogout = () => {
    logOutUserService();
    setUser(null);
  };

  return (
    <Sidebar
      collapsed={collapsed}
      width="230px"
      rootStyles={rootStyles}
      style={{ borderRightColor: "#27272f", borderRightWidth: "2px" }}
    >
      <Menu
        menuItemStyles={{
          button: ({ level, active }) => {
            if (level === 0)
              return {
                backgroundColor: active ? "#6f8ae9" : undefined,
                color: active ? "#e3e3e4" : "#5e5e64",
                fontFamily: "Raleway",
                fontWeight: active ? "600" : "400",
              };
          },
        }}
      >
        {/* <SubMenu label="Charts">
          <MenuItem> Pie charts </MenuItem>
          <MenuItem> Line charts </MenuItem>
        </SubMenu> */}

        <div
          className={`flex ${
            collapsed ? "justify-center" : "justify-end"
          } items-center p-2`}
        >
          {collapsed && (
            <GiHamburgerMenu
              className="text-3xl cursor-pointer my-4"
              onClick={handleCollapseSidebar}
            />
          )}
          {!collapsed && (
            <div className="flex items-center my-4 w-full justify-between">
              <span className="mx-5 text-base text-white flex items-center justify-start font-raleway">
                <div className="w-7 h-7 bg-[#7097ee] flex items-center justify-center rounded-full mr-3">
                  <GiFinishLine
                    className="text-gray-800 text-lg"
                    strokeWidth={8}
                  />
                </div>
                RBiS
              </span>
              <MdClear
                className="text-4xl cursor-pointer"
                onClick={handleCollapseSidebar}
              />
            </div>
          )}
        </div>
        {!collapsed && (
          <div className="flex items-center justify-center mt-4 mb-8 font-raleway font-light text-sm">
            Welcome, {user.rank} {user.formattedFullName}
          </div>
        )}

        {user.role === "trainee" && (
          <MenuItem
            active={location.pathname === "/dashboard/trainee"}
            icon={<FaPeopleGroup className="text-2xl fill-info" />}
            component={<Link to="/dashboard/trainee" />}
          >
            {" "}
            Course{" "}
          </MenuItem>
        )}
        {(user.role === "instructor" || user.role === "admin") && (
          <MenuItem
            active={location.pathname === "/dashboard/instructor"}
            icon={<MdPeopleAlt className="text-2xl fill-info" />}
            component={<Link to="/dashboard/instructor" />}
          >
            {" "}
            Trainees{" "}
          </MenuItem>
        )}
        <MenuItem
          active={location.pathname === "/dashboard/equipment"}
          icon={<GiMissileLauncher className="text-2xl fill-error" />}
          component={<Link to="/dashboard/equipment" />}
        >
          {" "}
          Equipment{" "}
        </MenuItem>
        <MenuItem
          icon={<MdLogout className="text-2xl fill-neutral-content" />}
          component={<Link to="/login" onClick={handleLogout} />}
        >
          {" "}
          Log Out{" "}
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default SideBar;
