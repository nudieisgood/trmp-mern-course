import { useState, createContext, useContext } from "react";
import { Outlet, redirect, useLoaderData, useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/Dashboard";
import { SmallSidebar, BigSidebar, Navbar } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

const DashboardContext = createContext();

export const loader = async () => {
  try {
    const res = await customFetch("/users/current-user");
    return res.data;
  } catch (error) {
    redirect("/");
    return error;
  }
};

const DashboardLayout = ({ isDarkThemeEnabled }) => {
  const { user } = useLoaderData();
  const navigate = useNavigate();

  const [showSidebar, setShowSidebar] = useState(false);

  //取用在localStorage 的 "dark-theme"(在app取得 並props down)
  const [isDarkTheme, setIsDarkTheme] = useState(isDarkThemeEnabled);

  const toggleDarkTheme = () => {
    const newTheme = !isDarkTheme;
    document.body.classList.toggle("dark-theme", newTheme);
    localStorage.setItem("darkTheme", newTheme);
    setIsDarkTheme(newTheme);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const logoutUser = async () => {
    navigate("/");
    await customFetch.get("/auth/logout");
    toast.success("Logging out...");
  };

  const contextValue = {
    user,
    showSidebar,
    isDarkTheme,
    toggleDarkTheme,
    toggleSidebar,
    logoutUser,
  };
  return (
    <DashboardContext.Provider value={contextValue}>
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              <Outlet context={{ user }} />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);
export default DashboardLayout;
