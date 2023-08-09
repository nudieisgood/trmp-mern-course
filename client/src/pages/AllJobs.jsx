import { createContext, useContext } from "react";
import { toast } from "react-toastify";
import { JobsContainer, SearchJobContainer } from "../components";

import { useLoaderData } from "react-router-dom";
import customFetch from "../utils/customFetch";

export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);

  try {
    const { data } = await customFetch.get("/jobs", { params });
    return { data, searchValues: { ...params } };
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error;
  }
};

const AllJobsContext = createContext();

const AllJobs = () => {
  const { data, searchValues } = useLoaderData();
  console.log(data);

  return (
    <AllJobsContext.Provider value={{ data, searchValues }}>
      <SearchJobContainer />
      <JobsContainer />
    </AllJobsContext.Provider>
  );
};

export const useAllJobsContext = () => useContext(AllJobsContext);

export default AllJobs;
