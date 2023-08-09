import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Form, Link, useSubmit } from "react-router-dom";
import { FormRow, FormRowSelect } from ".";
import { JOB_SORT_BY, JOB_TYPE, JOB_STATUS } from "../../../utlities/constants";
import { useAllJobsContext } from "../pages/AllJobs";

const SearchJobContainer = () => {
  const submit = useSubmit();
  const { searchValues } = useAllJobsContext();
  const { search, jobStatus, jobType, sort } = searchValues;

  const debounce = (fn) => {
    let timeout;
    return (e) => {
      clearTimeout(timeout);
      const form = e.currentTarget.form;
      timeout = setTimeout(() => {
        fn(form);
      }, 2000);
    };
  };

  return (
    <Wrapper>
      <Form className="form">
        <h5 className="form-title">search form</h5>
        <div className="form-center">
          <FormRow
            type="search"
            name="search"
            defaultValue={search}
            onChange={debounce((form) => {
              submit(form);
            })}
          />
          <FormRowSelect
            name="jobStatus"
            labelText="job status"
            defaultValue={jobStatus}
            list={["all", ...Object.values(JOB_STATUS)]}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />
          <FormRowSelect
            name="jobType"
            labelText="job type"
            defaultValue={jobType}
            list={["all", ...Object.values(JOB_TYPE)]}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />
          <FormRowSelect
            name="sort"
            defaultValue={sort}
            list={Object.values(JOB_SORT_BY)}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />
          <Link to="/dashboard/all-jobs" className="btn form-btn delete-btn">
            Reset Search Values
          </Link>
        </div>
      </Form>
    </Wrapper>
  );
};

export default SearchJobContainer;
