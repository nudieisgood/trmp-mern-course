import Wrapper from "../assets/wrappers/BigSidebar";
import { useDashboardContext } from "../pages/DashboardLayout";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import links from "../utils/links";

const BigSidebar = () => {
  const { showSidebar } = useDashboardContext();
  return (
    <Wrapper>
      <div
        className={
          //bigSidebar 做成當showSidebar true(refresh page) show bigside bar
          showSidebar ? "sidebar-container" : "sidebar-container show-sidebar"
        }
      >
        <div className="content">
          <header>
            <Logo />
          </header>
          <div className="nav-links">
            {/* 用isBigSidebar to tell NavLinks 不要有toggleSidebar func
            click Link 後不toggle toggleSidebar*/}
            <NavLinks links={links} isBigSidebar />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default BigSidebar;
