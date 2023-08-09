import styled from "styled-components";
import { Link } from "react-router-dom";

import main from "../assets/images/main.svg";

import { Logo } from "../components";
import Wrapper from "../assets/wrappers/LandingPage";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
            maiores quod error, explicabo modi dolore voluptates, adipisci
            reprehenderit quia aliquam ratione delectus. Cumque consequatur vel,
            eius sed deleniti commodi quod!
          </p>
          <Link to="/register" className="btn register-link">
            Register
          </Link>
          <Link to="/login" className="btn">
            Login
          </Link>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
