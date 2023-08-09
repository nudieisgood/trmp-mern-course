import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { ChartsContainer, StatsContainer } from "../components";
import customFetch from "../utils/customFetch";

export const loader = async () => {
  try {
    const res = await customFetch.get("/jobs/stats");
    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error;
  }
};

const Stats = () => {
  const { defaultStats, monthlyApplications } = useLoaderData();

  console.log(defaultStats, monthlyApplications);
  return (
    <>
      <StatsContainer defaultStats={defaultStats} />
      {monthlyApplications?.length ? (
        <ChartsContainer data={monthlyApplications} />
      ) : null}
    </>
  );
};

export default Stats;
