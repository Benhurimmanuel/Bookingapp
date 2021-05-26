import React, { useState } from "react";
import {
  useHistory,
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

export default function ViewEventModal(props) {
  console.log(props);

  const token = window.localStorage.getItem("app_token");
  function handleBooking() {
    // let history = useHistory();
    // const [eventTitle, setEventTitle] = useState("");
    // const [eventDescription, setEventDescription] = useState("");
    // let [eventPrice, setEventPrice] = useState();
    // const [eventDate, setEventDate] = useState("");
    // eventPrice = parseFloat(eventPrice);
    // const event = { eventTitle, eventDescription, eventDate, eventPrice };

    // const handleSubmit = (e) => {
    //   e.preventDefault();
    //   console.log(event);
    //   if (
    //     eventTitle.trim().length === 0 ||
    //     eventPrice < 0 ||
    //     eventDescription.trim().length === 0 ||
    //     eventDate.trim().length === 0
    //   ) {
    //     return;
    //   }
    const requestBody = {
      query: `mutation {
          bookEvent(eventId:"${props.value._id}")
       {_id
       
        createdAt
        updatedAt
       }
      }
      `,
    };

    fetch("http://localhost:8080/graphql  ", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
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
    // };  console.log("asdasd");
  }
  return (
    <>
      <div
        class="modal fade"
        id="eventModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                {props.value.title}
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="d-flex justify-content-between">
                <h6>
                  Date Of Event:{" "}
                  {new Date(props.value.date).toLocaleDateString()}
                </h6>
                <h6>Cost per Person: Rs {props.value.price}</h6>
              </div>
              <p class="eventdes">{props.value.description}</p>
            </div>
            <div class="modal-footer">
              {!token?null:(<button
                type="submit"
                class="btn btn-primary"
                onClick={handleBooking}
              >
                Book Event
              </button>)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
