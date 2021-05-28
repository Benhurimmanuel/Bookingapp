import React from "react";

export default function ViewEventModal(props) {
  const token = window.localStorage.getItem("app_token");
  function handleBooking() {
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
        Authorization: token,
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
      {console.log(props)}
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
                {props.title}
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
                  Date Of Event: {new Date(props.date).toLocaleDateString()}
                </h6>
                <h6>Cost per Person: Rs {props.price}</h6>
              </div>
              <p class="eventdes">{props.description}</p>
            </div>
            <div class="modal-footer">
              {!token ? null : (
                <button
                  type="submit"
                  class="btn btn-outline-danger"
                  onClick={handleBooking}
                >
                  Book Event
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
