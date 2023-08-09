import { useLoaderData, Form, redirect } from "react-router-dom";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { FormRow, FormRowSelect, SubmitBtn } from "../components";
import { JOB_STATUS, JOB_TYPE } from "../../../utlities/constants";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const loader = async ({ params }) => {
  try {
    const { id } = params;
    const data = await customFetch.get(`jobs/${id}`);
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return redirect("/dashboard/all-jobs");
  }
};

export const action = async ({ request, params }) => {
  const { id } = params;
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    const res = await customFetch.patch(`jobs/${id}`, data);
    toast.success(res.data.message);
    return redirect("/dashboard/all-jobs");
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error;
  }
};

const EditJob = () => {
  const { data } = useLoaderData();
  const { job } = data;
  return (
    <Wrapper>
      <Form method="patch" className="form">
        <h4 className="form-title">Edit Job</h4>
        <div className="form-center">
          <FormRow
            type="text"
            name="position"
            id="position"
            defaultValue={job.position}
          />
          <FormRow
            type="text"
            name="company"
            id="company"
            defaultValue={job.company}
          />
          <FormRow
            type="text"
            name="jobLocation"
            id="jobLocation"
            labelText="job location"
            defaultValue={job.jobLocation}
          />
          <FormRowSelect
            name="jobStatus"
            labelText="Job Status"
            defaultValue={job.jobStatus}
            list={Object.values(JOB_STATUS)}
          />
          <FormRowSelect
            name="jobType"
            labelText="Job Type"
            defaultValue={job.jobType}
            list={Object.values(JOB_TYPE)}
          />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export default EditJob;
