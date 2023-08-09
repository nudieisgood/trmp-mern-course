import { FaTimes } from "react-icons/fa";
import Wrapper from "../assets/wrappers/SmallSidebar";
import { useDashboardContext } from "../pages/DashboardLayout";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import links from "../utils/links";

const SmallSidebar = () => {
  const { showSidebar, toggleSidebar } = useDashboardContext();

  return (
    <Wrapper>
      <div
        className={
          showSidebar ? "show-sidebar sidebar-container " : "sidebar-container"
        }
      >
        <div className="content">
          <button onClick={toggleSidebar} type="button" className="close-btn">
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <div className="nav-links">
            <NavLinks links={links} />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSidebar;
