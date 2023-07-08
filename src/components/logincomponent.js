import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "../styles/Button";
import axios from "axios";

export const Login = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("https://productssapi.onrender.com/login", state)
      .then((data) => {
        // console.log(data.data.data, "userRegister");
        if (data.data.status === "ok") {
          alert("login successful");
          window.localStorage.setItem("token", data.data.data);
          window.localStorage.setItem("loggedIn", true);
          // console.log(data.userType);
          window.location.href = "./userdetails"
        } else {
          alert("wrong email or password!");
        }
      })
      .catch((e) => {
        console.log("error", e);
      });
  };

  return (
    <Wrapper>
      <div className="container contact-form">
        <form onSubmit={handleSubmit} className="contact-inputs">
          <h2 className="common-heading">Sign In</h2>

          <div className="mb-3">
            {/* <label>Email address</label> */}
            {/* <br></br> */}
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={(e) => setState({ ...state, email: e.target.value })}
            />
          </div>

          <div className="mb-3">
            {/* <label className="common-heading">Password</label> */}
            <br></br>
            <br></br>

            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={(e) => setState({ ...state, password: e.target.value })}
            />
          </div>

          {/* <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div> */}
          <br></br>
          <br></br>
          <div className="d-grid">
            <Button type="submit">Submit</Button>
          </div>
          <br></br>
          <p className="forgot-password text-right">
            Forgot <a href=" ./reset ">password?</a>
          </p>
          <p className="forgot-password text-right">
            Don't have an <a href="./register">account?</a>
          </p>
        </form>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  padding: 9rem 0 5rem 0;
  text-align: center;

  .container {
    margin-top: 6rem;

    .contact-form {
      max-width: 50rem;
      margin: auto;

      .contact-inputs {
        display: flex;
        flex-direction: column;
        gap: 3rem;

        input[type="submit"] {
          cursor: pointer;
          transition: all 0.2s;

          &:hover {
            background-color: ${({ theme }) => theme.colors.white};
            border: 1px solid ${({ theme }) => theme.colors.btn};
            color: ${({ theme }) => theme.colors.btn};
            transform: scale(0.9);
          }
        }
      }
    }
  }
`;
