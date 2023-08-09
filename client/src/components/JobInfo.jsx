import Wrapper from "../assets/wrappers/JobInfo";

const JobInfo = ({ text, icon }) => {
  return (
    <Wrapper>
      <div className="job-icon">{icon}</div>
      <div className="job-text">{text}</div>
    </Wrapper>
  );
};

export default JobInfo;
