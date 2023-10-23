import { Link } from "react-router-dom";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  sidebarClasses,
} from "react-pro-sidebar";
import { setUserAtom } from "../../../utilities/atom-jotai/atom";
import { useAtom } from "jotai";
import { logOutUserService } from "../../../utilities/users/users-service";

const NavBar = () => {
  const [, setUser] = useAtom(setUserAtom);
  const rootStyles = {
    [`.${sidebarClasses.container}`]: {
      backgroundColor: "#27272a",
    },
  };
  const handleLogout = () => {
    logOutUserService();
    setUser(null);
  };

  return (
    <Sidebar width="200px" rootStyles={rootStyles}>
      <Menu>
        {/* <SubMenu label="Charts">
          <MenuItem> Pie charts </MenuItem>
          <MenuItem> Line charts </MenuItem>
        </SubMenu> */}
        <MenuItem component={<Link to="/dashboard" />}> Trainees </MenuItem>
        <MenuItem component={<Link to="/dashboard/equipment" />}>
          {" "}
          Equipment{" "}
        </MenuItem>
        <MenuItem component={<Link to="/login" onClick={handleLogout} />}>
          {" "}
          Log Out{" "}
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default NavBar;
