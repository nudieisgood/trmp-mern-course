import { Link, Form, redirect, useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo, SubmitBtn } from "../components";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    const res = await customFetch.post("/auth/login", data);
    toast.success(res.data.message);
    return redirect("/dashboard");
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error;
  }
};

const Login = () => {
  //comp裡不用redirect 用navigate = useNavigate();
  const navigate = useNavigate();
  const loginDemoUser = async () => {
    const data = {
      email: "test@test.com",
      password: "secret123",
    };
    try {
      await customFetch.post("/auth/login", data);
      toast.success("take a test drive");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
  };

  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Login</h4>
        <FormRow name="email" type="email" />
        <FormRow name="password" type="text" />
        <SubmitBtn />
        <button type="button" className="btn btn-block" onClick={loginDemoUser}>
          Explore the app
        </button>
        <p>
          Not a member ?
          <Link className="member-btn" to="/register">
            Register Now
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Login;
