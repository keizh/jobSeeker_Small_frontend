/* eslint-disable no-unused-vars */
import React from "react";
import { useLocation } from "react-router-dom";

function Details() {
  const location = useLocation();
  const ele = location.state;
  return (
    <div className="container">
      <div className="p-3">
        <h1>{ele.jobTitle}</h1>
        <div className="card">
          <div className="card-body">
            <p>
              <strong>Company Name</strong> : {ele.companyName}
            </p>
            <p>
              <strong>Location</strong> : {ele.location}
            </p>
            <p>
              <strong>Salary</strong> : {ele.salary}
            </p>
            <p>
              <strong>Job Type</strong> : {ele.jobType}
            </p>
            <p>
              <strong>Description</strong> : {ele.jobDescription}
            </p>
            <div>
              <strong>Qualifications</strong> :
              <ol>
                {ele.requiredQualifications
                  .split(". ")
                  .filter((ele) => ele.length > 4)
                  .map((ele, index) => (
                    <li key={index}>{ele}</li>
                  ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
