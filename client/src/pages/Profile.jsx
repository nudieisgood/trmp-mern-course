import { Form, useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { FormRow, SubmitBtn } from "../components";
import customFetch from "../utils/customFetch";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const file = formData.get("avatar");
  if (file && file.size > 500000) {
    toast.error("Image size is too large");
    return null;
  }

  try {
    await customFetch.patch("/users/update-user", formData);
    toast.success("successfully updated profile");
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
  return null;
};

const Profile = () => {
  const { user } = useOutletContext();
  const { email, lastName, location, name } = user;

  return (
    <Wrapper>
      {/* if we wnat to send the file to server, we re not going to be sending
         it as JSON, we need to send it as form data */}
      <Form method="post" className="form" encType="multipart/form-data">
        <h4 className="form-title">Profile</h4>
        <div className="form-center">
          <div className="form-row">
            <label htmlFor="avatar" className="form-label">
              Select an image file (max 0.5 MB):
            </label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              className="form-input"
              accept="image/*"
            />
          </div>
          <FormRow type="text" name="name" id="name" defaultValue={name} />
          <FormRow
            type="text"
            name="lastName"
            id="lastName"
            labelText="Last Name"
            defaultValue={lastName}
          />
          <FormRow type="email" name="email" id="email" defaultValue={email} />
          <FormRow
            type="text"
            name="location"
            id="location"
            defaultValue={location}
          />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export default Profile;
