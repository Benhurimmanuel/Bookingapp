import React from "react";

import {
  useHistory,
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

export default function Welcome() {
  let history = useHistory();
  return (
    <>
      <div className="container">
        <Link to="events/createEvent">
          <button className="btn btn-danger">Create Event</button>
        </Link>
      </div>
    </>
  );
}
