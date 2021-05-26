import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import BookingsList from "../bookingsList";

export default function Welcome() {
  useEffect(() => {
    bookingsfetch();
  }, []);
  let [bookingsList, setBookingsList] = useState([{}]);
  let [loading, setLoading] = useState(false);
  const bookingsfetch = () => {
    setLoading(true);
    const requestBody = {
      query: `query {
        bookings 
          {_id
         createdAt
         event{
           _id
           title
           date
         }
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
        setBookingsList(resData.data.bookings);
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
      <div className="container">bookings page</div>
      <BookingsList bookings={bookingsList}></BookingsList>
    </>
  );
}
