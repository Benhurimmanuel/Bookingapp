import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Topbar from "./topbar";
import Welcome from "./pages/welcome";
import Events from "./pages/events";
import Bookings from "./pages/bookings";
import Login from "./pages/login";
import Register from "./pages/register";
import CreateEvent from "./pages/createEvent";

export default function App() {
  return (
    <>
      <Router>
        <Topbar></Topbar>
        <div className="container">
          <Switch>
            {/* <Redirect from="/" to="/auth" exact /> */}
            <Route path="/login" component={Login} exact />
            <Route path="/register" component={Register} exact />
            <Route path="/" component={Welcome} exact />
            <Route path="/Events" component={Events} exact />
            <Route path="/bookings" component={Bookings} exact />
            <Route path="/events/createEvent" component={CreateEvent} exact />
          </Switch>
        </div>
      </Router>
    </>
  );
}
