import React from "react";
import ViewEventModal from "./modal/viewEventModal";
export default function EventList(props) {
  return (
    <>
      {props.eventslist.map((event) => {
        return (
          <>
            {" "}
            <ViewEventModal value={event}></ViewEventModal>
            <div class="col-12 card col-md-3 m-4">
              <div class="card-header">{event.title}</div>
              <div class="card-body">
                <div class="d-flex justify-content-between">
                  <h5 class="card-title">
                    {" "}
                    Event Date: {new Date(event.date).toLocaleDateString()}
                  </h5>
                  <h5 class="card-title">Cost per person: Rs.{event.price}</h5>
                </div>
                {/* <p class="card-text">{event.description}</p> */}
                <button
                  class="btn btn-warning "
                  data-bs-toggle="modal"
                  data-bs-target="#eventModal"
                  //   onClick={handleEvent}
                >
                  View Event
                </button>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
}
