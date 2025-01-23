/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { fetchJob, deleteJob } from "../features/JobSlice";
import { useDispatch, useSelector } from "react-redux";
import useDebounce from "../customHooks/useDebounce";

function JobPostings() {
  const _ = useLoaderData();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const { JobArr } = useSelector((state) => state.Job);
  const debouncedSearch = useDebounce(search, () => {}, 500);
  const navigate = useNavigate();

  const renderList = (ele) => (
    <div className="col-12 col-sm-6 col-lg-4" key={ele._id}>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{ele.jobTitle}</h5>
          <p>
            <strong>Company Name :</strong>
            {ele.companyName}
          </p>
          <p>
            <strong>Location :</strong>
            {ele.location}
          </p>
          <p>
            <strong> Job Type :</strong>
            {ele.companyName}
          </p>
          <div>
            <button
              onClick={() => {
                navigate(`/details`, {
                  state: ele,
                });
                sessionStorage.setItem("job", JSON.stringify(ele));
              }}
              className="btn btn-primary me-4"
            >
              See Details
            </button>
            <button
              onClick={() => dispatch(deleteJob(ele._id))}
              className="btn btn-danger"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container py-3">
      <label htmlFor="search" className="fw-bold">
        Search Box
      </label>
      <input
        id="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="form-control mt-1 mb-4"
      />
      <div className="row g-2">
        <h1>All Jobs</h1>
        {debouncedSearch == "" && JobArr.map(renderList)}
        {debouncedSearch != "" &&
          JobArr.filter((ele) => {
            return ele.jobTitle
              .toLowerCase()
              .includes(debouncedSearch.toLowerCase());
          }).map(renderList)}
        {JobArr.length == 0 && <p>No Job Postings</p>}
      </div>
    </div>
  );
}

export default JobPostings;
