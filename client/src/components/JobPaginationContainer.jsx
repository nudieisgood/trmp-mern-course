import { useAllJobsContext } from "../pages/AllJobs";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import Wrapper from "../assets/wrappers/PageBtnContainer";
import { useLocation, useNavigate } from "react-router-dom";

const JobPaginationContainer = () => {
  const { search, pathname } = useLocation();
  console.log(search, pathname);
  const navigate = useNavigate();

  const {
    data: { totalPages, currentPage },
  } = useAllJobsContext();

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePageChange = (pageNum) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("currentPage", pageNum);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  return (
    <Wrapper>
      <button
        onClick={() => {
          let prevPage = currentPage - 1;
          if (prevPage < 1) prevPage = 1;
          handlePageChange(prevPage);
        }}
        className="btn prev-btn"
      >
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className="btn-container">
        {pages.map((pageNum) => (
          <button
            onClick={() => handlePageChange(pageNum)}
            key={pageNum}
            className={`btn page-btn ${pageNum === currentPage && "active"}`}
          >
            {pageNum}
          </button>
        ))}
      </div>
      <button
        onClick={() => {
          let nextPage = currentPage + 1;
          if (nextPage > totalPages) nextPage = totalPages;
          handlePageChange(nextPage);
        }}
        className="btn next-btn"
      >
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};

export default JobPaginationContainer;
