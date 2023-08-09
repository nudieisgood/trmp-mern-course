import Wrapper from "../assets/wrappers/Job";
import { Link, Form } from "react-router-dom";
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import JobInfo from "./JobInfo";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
day.extend(advancedFormat);

const Job = ({
  _id,
  position,
  company,
  jobStatus,
  jobType,
  createdAt,
  jobLocation,
}) => {
  const date = day(createdAt).format("MMM Do, YYYY");

  return (
    <Wrapper>
      <header>
        <div className="main-icon">{company.charAt(0)}</div>
        <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <JobInfo text={jobLocation} icon={<FaLocationArrow />} />
          <JobInfo text={date} icon={<FaCalendarAlt />} />
          <JobInfo text={jobType} icon={<FaBriefcase />} />
          <div className={`status ${jobStatus}`}>{jobStatus}</div>
        </div>

        <footer className="actions">
          <Link className="btn edit-btn" to={`/dashboard/edit-job/${_id}`}>
            Edit
          </Link>
          {/* 這個Form 會 post to AllJobs comp by default,we can fetch delete API
          there but we need to refer _id value to delete. so, we post this Form to
          DeleteJob comp but we dont need any JSX just post to that comp and
          execute action to fetch API to delete*/}
          <Form method="post" action={`/dashboard/delete-job/${_id}`}>
            <button type="submit" className="btn delete-btn">
              Delete
            </button>
          </Form>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Job;
