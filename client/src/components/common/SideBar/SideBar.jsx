import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  sidebarClasses,
} from "react-pro-sidebar";
import { equipmentAtom, userAtom } from "../../../utilities/atom-jotai/atom";
import { useAtom } from "jotai";
import { logOutUserService } from "../../../utilities/users/users-service";
import { MdLogout, MdClear } from "react-icons/md";
import {
  GiHamburgerMenu,
  GiMissileLauncher,
  GiRadarSweep,
  GiPocketRadio,
} from "react-icons/gi";
// import { FaPeopleGroup, FaPeopleCarryBox } from "react-icons/fa6";
// import { FaHome } from "react-icons/fa";
// import { BsBoxes } from "react-icons/bs";
import Swal from "sweetalert2";
import _ from "lodash";
import { swalSettings } from "../../../utilities/swal/swalSettings";

const SideBar = ({ collapsed, handleCollapseSidebar }) => {
  const [user, setUser] = useAtom(userAtom);
  const [equipment] = useAtom(equipmentAtom);
  const location = useLocation();
  const navigate = useNavigate();
  const rootStyles = {
    [`.${sidebarClasses.container}`]: {
      backgroundColor: "#1c1c24",
      borderRight: "black",
    },
  };

  if (_.isEmpty(equipment)) {
    return;
  }

  const icons = {
    "RBS 70": (
      <img
        src={"/assets/RBS70.png"}
        width={23}
        alt={<GiMissileLauncher className="text-2xl fill-lime-700 stroke-2" />}
      />
    ),
    PSTAR: (
      <img
        src={"/assets/radar.png"}
        width={30}
        alt={<GiRadarSweep className="text-2xl fill-emerald-600 stroke-2" />}
      />
    ),
    Signal: (
      <img
        src={"/assets/signalset.png"}
        width={28}
        alt={<GiPocketRadio className="text-2xl fill-stone-400 stroke-2" />}
      />
    ),
  };

  const isSubMenuActive = (categories) => {
    return categories.some((category) => {
      return (
        location.pathname ===
          `/dashboard/equipment/${encodeURIComponent(category)}` ||
        location.pathname === "/dashboard/equipment"
      );
    });
  };

  const handleLogout = async () => {
    const result = await Swal.fire({
      ...swalSettings("Are you sure? 😢", "warning"),
      text: "You will be logged out",
      showCancelButton: true,
      focusCancel: true,
      confirmButtonText: "Yes, log me out!",
      cancelButtonText: "No, I want to stay!",
    });

    if (result.isConfirmed) {
      logOutUserService();
      setUser(null);
      Swal.fire({
        ...swalSettings("Logged Out", "success"),
        text: "You have been logged out",
      });
      navigate("/login");
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar
        collapsed={collapsed}
        width="230px"
        rootStyles={rootStyles}
        style={{
          position: "fixed",
          top: "0",
          bottom: "0",
          borderRightColor: "#27272f",
          borderRightWidth: "2px",
          minHeight: "100vh",
          zIndex: 100,
        }}
      >
        <Menu
          closeOnClick={true}
          menuItemStyles={{
            button: ({ level, active }) => {
              if (level === 0)
                return {
                  borderRightColor: active ? "#6f8ae9" : "",
                  borderRightWidth: active ? "3px" : "",
                  borderRightStyle: active ? "solid" : "",
                  color: active ? "#e3e3e4" : "#5e5e64",
                  fontFamily: "Roboto",
                  letterSpacing: "0.5px",
                  fontWeight: active ? "400" : "300",
                  "&:hover": {
                    backgroundColor: "#32323a",
                    color: "#e3e3e4",
                  },
                };
              if (level === 1)
                return {
                  backgroundColor: "#222329",
                  borderRightColor: active ? "#a4c1f1" : "",
                  borderRightWidth: active ? "3px" : "",
                  borderRightStyle: active ? "solid" : "",
                  color: active ? "#e3e3e4" : "#5e5e64",
                  fontFamily: "Roboto",
                  letterSpacing: "0.5px",
                  fontWeight: active ? "400" : "300",
                  "&:hover": {
                    backgroundColor: "#32323a",
                    color: "#e3e3e4",
                  },
                };
            },
          }}
        >
          <div
            className={`flex ${
              collapsed ? "justify-center" : "justify-end"
            } items-center p-2`}
          >
            {collapsed && (
              <GiHamburgerMenu
                className="text-2xl cursor-pointer my-4"
                onClick={handleCollapseSidebar}
              />
            )}
            {!collapsed && (
              <div className="flex items-center my-4 w-full justify-between">
                <span className="mx-5 text-base text-white flex items-center justify-start font-raleway font-medium">
                  <div className="w-7 h-7 bg-[#7097ee] flex items-center justify-center rounded-full mr-3">
                    <img src={"/assets/RBS70.png"} width={18} />
                  </div>
                  RBiS
                </span>
                <MdClear
                  className="text-3xl cursor-pointer"
                  onClick={handleCollapseSidebar}
                />
              </div>
            )}
          </div>

          <SubMenu
            label={`${user.rank} ${user.formattedFullName.split(" ")[0]}`}
            icon={<img src={"/assets/military.png"} width={25} />}
            style={{
              marginTop: "10px",
              fontFamily: "Roboto",
              fontWeight: "400",
              color: "#8B7E74",
              marginBottom: `${collapsed ? "10px" : ""}`,
            }}
          >
            <MenuItem
              icon={<MdLogout className="text-2xl fill-neutral-content" />}
              onClick={handleLogout}
            >
              Log Out
            </MenuItem>
          </SubMenu>
          {collapsed ? null : (
            <div className="divider divider-vertical after:bg-[#282829] before:bg-[#282829]"></div>
          )}
          <MenuItem
            active={location.pathname === "/dashboard"}
            // icon={<FaHome className="text-2xl fill-amber-700" />}
            icon={<img src={"/assets/dashboard.png"} width={26} />}
            component={<Link to="/dashboard" />}
          >
            {" "}
            Dashboard{" "}
          </MenuItem>

          {user.role === "trainee" && (
            <MenuItem
              active={location.pathname === "/dashboard/trainee"}
              // icon={<FaPeopleGroup className="text-2xl fill-info" />}
              icon={<img src={"/assets/trainees.png"} width={28} />}
              component={<Link to="/dashboard/trainee" />}
            >
              {" "}
              Course{" "}
            </MenuItem>
          )}
          {(user.role === "instructor" || user.role === "admin") && (
            <MenuItem
              active={location.pathname === "/dashboard/instructor"}
              // icon={<MdPeopleAlt className="text-2xl fill-info" />}
              icon={<img src={"/assets/trainees.png"} width={28} />}
              component={<Link to="/dashboard/instructor" />}
            >
              {" "}
              Trainees{" "}
            </MenuItem>
          )}

          <SubMenu
            label="Equipment"
            // icon={
            //   <FaPeopleCarryBox className="text-2xl fill-teal-300 stroke='#000' " />
            // }
            icon={<img src={"/assets/equipmentStore.png"} width={26} />}
            active={isSubMenuActive(equipment.categories)}
            defaultOpen={true}
          >
            <MenuItem
              active={location.pathname === "/dashboard/equipment"}
              // icon={<BsBoxes className="text-2xl fill-error" />}
              icon={<img src={"/assets/mainequipment.png"} width={32} />}
              component={<Link to="/dashboard/equipment" />}
            >
              {" "}
              Main{" "}
            </MenuItem>
            {equipment.categories.map((category) => (
              <MenuItem
                key={category}
                active={
                  location.pathname ===
                  `/dashboard/equipment/${encodeURIComponent(category)}`
                }
                icon={icons[category]}
                component={
                  <Link
                    to={`/dashboard/equipment/${encodeURIComponent(category)}`}
                  />
                }
              >
                {category}
              </MenuItem>
            ))}
          </SubMenu>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default SideBar;
