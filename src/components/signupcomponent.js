import React, { Component } from "react";
import styled from "styled-components";
import { Button } from "../styles/Button";

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      lname: "",
      email: "",
      password: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { fname, lname, email, password } = this.state;
    // console.log(fname , lname , email , password);
    fetch("https://productssapi.onrender.com/register", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        fname,
        lname,
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
      });
  }

  render() {
    return (
      <Wrapper>
        <div className="container contact-form">
          <form onSubmit={this.handleSubmit}>
            <h2 className="common-heading">Sign Up</h2>

            <div className="mb-3">
              {/* <label>First name</label> */}
              <input
                type="text"
                className="form-control"
                placeholder="First name"
                onChange={(e) => this.setState({ fname: e.target.value })}
              />
            </div>

            <br></br>
              <br></br>

            <div className="mb-3">
              {/* <label>Last name</label> */}
              <input
                type="text"
                className="form-control"
                placeholder="Last name"
                onChange={(e) => this.setState({ lname: e.target.value })}
              />
            </div>

            <br></br>
              <br></br>

            <div className="mb-3">
              {/* <label>Email address</label> */}
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                onChange={(e) => this.setState({ email: e.target.value })}
              />
            </div>

            <br></br>
              <br></br>

            <div className="mb-3">
              {/* <label>Password</label> */}
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                onChange={(e) => this.setState({ password: e.target.value })}
              />
            </div>

            <br></br>
              <br></br>

            <div className="d-grid">
              <Button type="submit" className="btn btn-primary">
                Sign Up
              </Button>
            </div>

            <br></br>
              
            <p className="forgot-password text-right">
              Already registered <a href="./login">sign in?</a>
            </p>
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
