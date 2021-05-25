import React, { useState } from "react";

import {
  useHistory,
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

export default function CreateEvent() {
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventPrice, setEventPrice] = useState("");
  const [eventDate, setEventDate] = useState("");
  const event = { eventTitle, eventDescription, eventDate, eventPrice };
  let history = useHistory();

  let token = window.localStorage.getItem("app_token");

  if (token != null) {
    <div className="d-flex justify-content-end">
      <button
        className="btn btn-warning"
        onClick={() => {
          window.localStorage.removeItem("app_token");
          window.localStorage.removeItem("userId");
          history.push(`/`);
        }}
      >
        Logout
      </button>
    </div>;
    function handleSubmit(e) {
      e.preventDefault();

      const requestBody = {
        query: `mutation { createEvent(eventInput: {title: "${eventTitle}",description: "${eventDescription}",
       price:${eventPrice}, date: "${eventDate}"}) {_id email}}`,
      };

      fetch("https://eventbookingappback.herokuapp.com/graphql", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer" + token,
        },
      })
        .then((res) => {
          if (res.status !== 200 && res.status !== 201) {
            throw new Error("Failed!");
          }
          return res.json();
        })
        .then((resData) => {
          console.log(resData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    return (
      <>
        <div className="container">
          <form onSubmit={handleSubmit}>
            <div class="mb-3">
              <label for=" Title" class="form-label">
                Title
              </label>
              <input
                type="text"
                class="form-control"
                id=" title"
                value={eventTitle}
                onChange={(e) => {
                  setEventTitle(e.target.value);
                }}
              />
            </div>

            <div class="mb-3">
              <label for="price" class="form-label">
                Price
              </label>
              <input
                type="number"
                class="form-control"
                id="Price"
                value={+eventPrice}
                onChange={(e) => {
                  setEventPrice(e.target.value);
                }}
              />
            </div>
            <div class="mb-3">
              <label for="datetime-local" class="form-label">
                Date
              </label>
              <input
                type="date"
                class="form-control"
                id="date"
                value={eventDate}
                onChange={(e) => {
                  setEventDate(e.target.value);
                }}
              />
              <div class="mb-3">
                <label for="description" class="form-label">
                  Description
                </label>
                <input
                  type="textarea"
                  class="form-control"
                  id="Description"
                  value={eventDescription}
                  onChange={(e) => {
                    setEventDescription(e.target.value);
                  }}
                />
              </div>
            </div>

            <button type="submit" class="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </>
    );
  }
  return <>{history.push("/login")}</>;
}
