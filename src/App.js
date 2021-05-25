import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Topbar from "./topbar";
import Welcome from "./pages/welcome";
import Events from "./pages/events";
import Bookings from "./pages/bookings";
import Login from "./pages/login";
import Register from "./pages/register";
import CreateEvent from "./pages/createEvent";
import loginContext from "./context/login-context";

export default function App() {
  let [logstate, setlogState] = useState({ token: null, userId: null });

  // login(() => {
  //   setlogState({
  //     token: window.localStorage.getItem("app_token"),
  //     userId: window.localStorage.getItem("userId"),
  //   });
  // });
  // logout(() => {
  //   setlogState({
  //     token: window.localStorage.removeItem("app_token"),
  //     userId: window.localStorage.removeItem("userId"),
  //   });
  // });

  let token = window.localStorage.getItem("app_token");
  let userId = window.localStorage.getItem("userId");
  return (
    <>
      <Router>
        <loginContext.Provider
          value={{
            token: token,
            userId: userId,
          }}
        >
          <Topbar></Topbar>
          <div className="container">
            <Switch>
              {!token && <Route path="/login" component={Login} exact />}
              <Route path="/register" component={Register} exact />
              <Route path="/" component={Welcome} exact />
              <Route path="/events" component={Events} exact />
              {token && <Route path="/bookings" component={Bookings} exact />}
            </Switch>
          </div>
        </loginContext.Provider>
      </Router>
    </>
  );
}
