import React from "react";

export default function BookingsList(props) {
  return (
    <>
      {props.bookings.map((item) => {
        return (
          <>
            <tr>
              <td>{item.event.title}</td>
              <td>{new Date(item.event.date).toLocaleDateString()}</td>

              <td>{new Date(item.createdAt).toLocaleDateString()}</td>
              <td>@mdo</td>
            </tr>
          </>
        );
        {
          /* console.log(item); */
        }
      })}
    </>
  );
}
