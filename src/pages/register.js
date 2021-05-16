import React, { useState } from "react";
import { BrowserRouter as Link, useHistory } from "react-router-dom";
// import { PostUserRegister } from "../api";

export default function Register() {
  let history = useHistory();
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const userData = { userEmail, userName, userPassword };
  function handleSubmit(e) {
    e.preventDefault();

    const requestBody = {
      query: `mutation { createUser(userInput: {name: "${userName}",email: "${userEmail}", password: "${userPassword}"}) {_id email}}`,
    };

    fetch("https://eventbookingappback.herokuapp.com/graphql", {
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
        console.log(resData);
      })
      .catch((err) => {
        console.log(err);
      });
    history.push(`/login`);
  }
  return (
    <>
      <form className="mt-5" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            placeholder="name@example.com"
            value={userEmail}
            onChange={(e) => {
              setUserEmail(e.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            name="name"
            type="text"
            className="form-control"
            placeholder="John Doe"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Password" className="form-label">
            Password
          </label>
          <input
            name="Password"
            type="Password"
            className="form-control"
            placeholder="Enter password"
            value={userPassword}
            onChange={(e) => {
              setUserPassword(e.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <Link to="/login" exact>
            <button type="submit" className="form-control btn btn-warning">
              Submit
            </button>
          </Link>
        </div>
        <div className="mb-3">
          <h6 className="offset-1 offset-sm-3 offset-md-4 offset-lg-4 mt-5">
            Already Signed up!{" "}
            <Link to="/login" exact>
              click here
            </Link>{" "}
            to login
          </h6>
        </div>
      </form>
    </>
  );
}
