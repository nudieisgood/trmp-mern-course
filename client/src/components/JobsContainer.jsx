import { useAllJobsContext } from "../pages/AllJobs";
import Wrapper from "../assets/wrappers/JobsContainer";
import Job from "./Job";
import JobPaginationContainer from "./JobPaginationContainer";
const JobsContainer = () => {
  const { data } = useAllJobsContext();

  if (data.jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>
        {data.totalJobs} job{data.jobs.length > 1 && "s"} found
      </h5>
      <div className="jobs">
        {data.jobs.map((job) => (
          <Job key={job._id} {...job} />
        ))}
      </div>
      {data.jobs.length > 1 && <JobPaginationContainer />}
    </Wrapper>
  );
};

export default JobsContainer;
