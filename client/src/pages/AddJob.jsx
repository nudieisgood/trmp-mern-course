import { useOutletContext, Form, redirect } from "react-router-dom";
import { FormRow, FormRowSelect, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { JOB_TYPE, JOB_STATUS } from "../../../utlities/constants";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/jobs", data);
    toast.success("job created");
    return redirect("all-jobs");
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error;
  }
};

const AddJob = () => {
  const { user } = useOutletContext();

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">Add Job</h4>
        <div className="form-center">
          <FormRow type="text" name="position" id="position" />
          <FormRow type="text" name="company" id="company" />
          <FormRow
            type="text"
            name="jobLocation"
            id="jobLocation"
            labelText="job location"
            defaultValue={user.location}
          />
          <FormRowSelect
            name="jobStatus"
            labelText="Job Status"
            defaultValue={JOB_STATUS.PENDING}
            list={Object.values(JOB_STATUS)}
          />
          <FormRowSelect
            name="jobType"
            labelText="Job Type"
            defaultValue={JOB_TYPE.FULLTIME}
            list={Object.values(JOB_TYPE)}
          />
          {/* here */}
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export default AddJob;
