import { FaUserCircle, FaCaretDown } from "react-icons/fa";
import { useState } from "react";
import { useDashboardContext } from "../pages/DashboardLayout";
import Wrapper from "../assets/wrappers/LogoutContainer";

function LogoutContainer() {
  const [showLogout, setShowLogout] = useState(false);
  const { user, logoutUser } = useDashboardContext();
  return (
    <Wrapper>
      <button
        type="button"
        className="btn logout-btn"
        onClick={() => {
          setShowLogout(!showLogout);
        }}
      >
        {user.avatar ? (
          <img src={user.avatar} alt="avatar" className="img" />
        ) : (
          <FaUserCircle />
        )}

        {/* ?. 會回傳undefined 而不是error */}
        {user?.name}
        <FaCaretDown />
      </button>
      <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
        <button onClick={logoutUser} type="button" className="dropdown-btn">
          logout
        </button>
      </div>
    </Wrapper>
  );
}

export default LogoutContainer;
