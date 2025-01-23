/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postJob } from "../features/JobSlice";

let jobTypes = [
  "Full - time(On - site)",
  "Part - time(On - site)",
  "Full - time(Remote)",
  "Part - time(Remote)",
];

function PostAJob() {
  const initialData = {
    jobTitle: "",
    companyName: "",
    location: "",
    salary: "",
    jobType: jobTypes[0],
    jobDescription: "",
    requiredQualifications: "",
  };

  const [data, setData] = useState(initialData);
  const [verified, setVerified] = useState(false);

  const { JobArr, status, error } = useSelector((state) => state.Job);
  const dispatch = useDispatch();

  const handler = (e) => {
    const { name, value } = e.target;
    setData((data) => ({
      ...data,
      [name]: name == "salary" ? parseInt(value) : value,
    }));
  };

  useEffect(() => {
    if (
      data.jobTitle != "" &&
      data.companyName != "" &&
      data.location != "" &&
      data.salary != "" &&
      data.jobType != "" &&
      data.jobDescription != "" &&
      data.jobQualification != ""
    ) {
      setVerified(true);
    } else {
      if (verified) {
        setVerified(false);
      }
    }
  }, [data, verified]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (verified) {
      dispatch(postJob(data));
    }
    setData(initialData);
  };

  return (
    <div className="mt-5 container">
      <h1>Post A Job</h1>
      <form onSubmit={submitHandler} className="my-4">
        <div className="mb-3">
          <label htmlFor="jobTitle" className="form-label">
            Job Title:
          </label>
          <input
            type="text"
            className="form-control"
            id="jobTitle"
            name="jobTitle"
            value={data.jobTitle}
            onChange={handler}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="companyName" className="form-label">
            Company Name
          </label>
          <input
            type="text"
            className="form-control"
            id="companyName"
            name="companyName"
            value={data.companyName}
            onChange={handler}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">
            Location
          </label>
          <input
            type="text"
            className="form-control"
            id="location"
            name="location"
            value={data.location}
            onChange={handler}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="salary" className="form-label">
            Salary
          </label>
          <input
            type="number"
            className="form-control"
            id="salary"
            name="salary"
            value={data.salary}
            onChange={handler}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="jobType" className="form-label">
            Job Type
          </label>
          <select
            id="jobType"
            className="form-select"
            aria-label="Default select example"
            name="jobType"
            onChange={handler}
          >
            {jobTypes.map((ele, index) => (
              <option key={index} value={ele}>
                {ele}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="jobDescription" className="form-label">
            Job Description
          </label>
          <textarea
            className="form-control"
            rows="3"
            id="jobDescription"
            name="jobDescription"
            value={data.jobDescription}
            onChange={handler}
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="requiredQualifications" className="form-label">
            Job Qualifications
          </label>
          <textarea
            className="form-control"
            rows="3"
            id="requiredQualifications"
            name="requiredQualifications"
            value={data.requiredQualifications}
            onChange={handler}
          ></textarea>
        </div>
        <span
          style={{ display: "block", marginBlock: "20px" }}
          className="text-danger"
        >
          Fill all the boxes to submit
        </span>
        <button
          type="submit"
          className={`btn ${verified ? "btn-success" : "btn-danger"}`}
        >
          Submit
        </button>
      </form>
      {status === "successfull" && (
        <p className="text-success">Job has been successfully posted</p>
      )}
      {!error && <p className="">{error}</p>}
    </div>
  );
}

export default PostAJob;
