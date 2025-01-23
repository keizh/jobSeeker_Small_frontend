import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <nav className="navbar navbar-expand-lg bg-primary ">
      <div className="container ">
        <span className="navbar-brand text-white">Navbar</span>
        <button
          className="navbar-toggler bg-white"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ">
            <NavLink className="nav-link text-light" aria-current="page" to="/">
              Job Postings
            </NavLink>
            <NavLink className="nav-link text-light" to="postAJob">
              Post A Job
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
