import React, { Component } from "react";
import styled from "styled-components";
import { Button } from "../styles/Button";

export default class Reset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    const { email } = this.state;
    fetch("https://productssapi.onrender.com/forgotpassword", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "Hello");
        alert(data.status);
        alert("Mail sent Succesfully");
      });
  }

  render() {
    return (
      <Wrapper>
        <div className="container contact-form">
          <form onSubmit={this.handleSubmit} className="contact-inputs">
            <h2 className="common-heading">Reset Password</h2>

            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                onChange={(e) => this.setState({ email: e.target.value })}
              />
            </div>

            <br></br>
            <br></br>

            <div className="d-grid">
              <Button type="submit">Submit</Button>
            </div>
            <br></br>
          </form>
        </div>
      </Wrapper>
    );
  }
}
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
