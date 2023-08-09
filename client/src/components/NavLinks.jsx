import { NavLink } from "react-router-dom";
import { useDashboardContext } from "../pages/DashboardLayout";

const NavLinks = ({ links, isBigSidebar }) => {
  const { toggleSidebar, user } = useDashboardContext();
  return links.map((link) => {
    const { text, path, icon } = link;
    if (path === "admin" && user.role !== "admin") return;
    return (
      <NavLink
        onClick={isBigSidebar ? null : toggleSidebar}
        to={path}
        key={text}
        className="nav-link"
        //NavLink 會在當前path的NavLink加上active
        //我們可以custom css 來達到active link效果
        //而Add Job index: true 任何dashboard path
        //都會相符 而active 要用end 來取消
        end
      >
        <span className="icon">{icon}</span>
        {text}
      </NavLink>
    );
  });
};

export default NavLinks;
