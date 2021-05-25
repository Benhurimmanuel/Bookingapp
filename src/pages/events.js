import React, { useState, useEffect } from "react";
import {
  useHistory,
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

import Modal from "../modal";

export default function Events() {
  useEffect(() => {
    eventsfetch();
  }, []);

  let history = useHistory();

  let [eventsList, setEventsList] = useState([{}]);

  const eventsfetch = () => {
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
        console.log(resData.data.events);
        console.log(eventsList);
      })
      .catch((err) => {
        console.log(err);
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
      {eventsList.map((event) => {
        return (
          <>
            <div class="card col-3 mr-2">
              <div class="card-header">{event.title}</div>
              <div class="card-body">
                <div class="d-flex justify-content-between">
                  <h5 class="card-title">{event.date}</h5>
                  <h5 class="card-title">Rs.{event.price}</h5>
                </div>
                <p class="card-text">{event.description}</p>
                <a href="#" class="btn btn-primary">
                  Go somewhere
                </a>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
}
