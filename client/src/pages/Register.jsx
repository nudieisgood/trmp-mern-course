import customFetch from "../utils/customFetch.js";
import { Form, redirect, useNavigation, Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Logo, FormRow } from "../components";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post("/auth/register", data);
    //redirect is a function from "react-router-dom"
    toast.success("Registration successful");
    return redirect("/login");
  } catch (error) {
    //error不一定都是來自server response 故要用?.
    toast.error(error?.response?.data?.message);
    //return 就會是此async resolve or reject
    return error;
  }
};

const Register = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Register</h4>
        <FormRow type="text" name="name" labelText="Name" />
        <FormRow type="text" name="lastname" labelText="Last Name" />
        <FormRow type="text" name="location" labelText="Location" />
        <FormRow type="email" name="email" labelText="Email" />
        <FormRow type="text" name="password" labelText="Password" />
        <button type="submit" className="btn btn-block" disabled={isSubmitting}>
          {isSubmitting ? "submitting..." : "submit"}
        </button>
        <p>
          Already a member?
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Register;
