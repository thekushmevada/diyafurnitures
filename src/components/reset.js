import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "../styles/Button";
import axios from "axios";

const Reset = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("https://productssapi.onrender.com/forgotpassword", {
        email,
      })
      .then((res) => {
        console.log("Hello");
        const data = res.data;
        console.log(data);
        alert(data.status);

        if (data.data.status !== "user not exists!") {
          console.log(data.status);
          alert("Mail sent Successfully");
        }
      })
      .catch((error) => {
        console.error(error);
        // Handle error if needed
      });
  };

  return (
    <Wrapper>
      <div className="container contact-form">
        <form onSubmit={handleSubmit} className="contact-inputs">
          <h2 className="common-heading">Reset Password</h2>

          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <br />
          <br />

          <div className="d-grid">
            <Button type="submit">Submit</Button>
          </div>
          <br />
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
};`

export default Reset;
