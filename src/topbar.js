import React from "react";
import { Link } from "react-router-dom";

function Topbar() {
  // handleLogout(()=> {

  //     // history.push(`/`);
  //   })

  let token = window.localStorage.getItem("app_token");
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            BookingApp
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/events">
                  Event
                </Link>
              </li>

              {!token && (
                <div className="d-flex justify-content-end">
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      Register/Login
                    </Link>
                  </li>
                </div>
              )}
              {token && (
                <li className="nav-item">
                  <Link className="nav-link" to="/bookings">
                    Bookings
                  </Link>
                </li>
              )}
              {token && (
                <div className="d-flex justify-content-end">
                  <li className="nav-item">
                    <Link className="nav-link" to="/" type="button">
                      Logout
                    </Link>
                  </li>
                </div>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Topbar;
