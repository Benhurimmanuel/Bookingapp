import React from "react";

export default function BookingsList(props) {
  return (
    <>{""}
      {props.bookings.map((item) => {
        return (
          <>
            <tr>
              <td>{item.event.title}</td>
              <td>{new Date(item.event.date).toLocaleDateString()}</td>

              <td>{new Date(item.createdAt).toLocaleDateString()}</td>

              <td>
                <button
                  className="btn btn-danger"
                  onClick={props.onDelete.bind(this, item._id)}
                >
                  Cancel
                </button>
              </td>
            </tr>
            {
          console.log(props)
        }
          </>
        );
       
      })}
    </>
  );
}