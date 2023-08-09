import { FaSuitcaseRolling, FaCalendarCheck } from "react-icons/fa";
import { redirect, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import Wrapper from "../assets/wrappers/StatsContainer";
import StatItem from "../components/StatItem";

export const loader = async () => {
  try {
    const res = await customFetch.get("/users/admin/app-stats");
    console.log(res);
    return res.data;
  } catch (error) {
    toast.error("you can not access this page");
    return redirect("/dashboard");
  }
};

const Admin = () => {
  const { jobs, users } = useLoaderData();
  return (
    <Wrapper>
      <StatItem
        title="current users"
        count={users}
        color="#e9b949"
        bcg="#fcefc7"
        icon={<FaSuitcaseRolling />}
      />
      <StatItem
        title="total jobs"
        count={jobs}
        color="#647acb"
        bcg="#e0e8f9"
        icon={<FaCalendarCheck />}
      />
    </Wrapper>
  );
};

export default Admin;
