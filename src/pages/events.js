import React, { useState, useEffect } from "react";
import {
  useHistory,
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import EventList from "../eventsList";

import Modal from "../modal/modal";

export default function Events() {
  useEffect(() => {
    eventsfetch();
  }, []);

  let history = useHistory();

  let [eventsList, setEventsList] = useState([{}]);
  let [loading, setLoading] = useState(false);

  const eventsfetch = () => {
    setLoading(true);
    const requestBody = {
      query: `query {
          events 
          {_id
          title
          description
          date
          price
          }
      }
    `,
    };
    fetch("http://localhost:8080/graphql  ", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then((resData) => {
        // console.log(resData.data.events);
        setEventsList(resData.data.events);
        // console.log(resData.data.events);
        // console.log(eventsList);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <>
      {/* <div className="container"> */}
      <Modal></Modal>
      {window.localStorage.getItem("app_token") && (
        <button
          type="button"
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Create Event
        </button>
      )}
      {/* </div> */}
      {window.localStorage.getItem("app_token") && (
        <button
          className="btn btn-danger"
          onClick={() => {
            window.localStorage.removeItem("app_token");
            window.localStorage.removeItem("userId");

            history.push(`/`);
          }}
        >
          Logout
        </button>
      )}
      <br />
      <br />
      <br />
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <EventList eventslist={eventsList}></EventList>
      )}
    </>
  );
}
