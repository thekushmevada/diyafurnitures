import React, { useEffect, useState } from "react";
import styled from "styled-components";
import app from "../firebaseConfig";
import { Button } from "../styles/Button";

import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import axios from "axios";

const auth = getAuth(app);

export const SignUp = () => {
  const [state, setState] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    password: "",
    verifyButton: false,
    verifyOTP: false,
    OTP: "",
    userType: "",
    secretKey: "",
  });

  function onCaptchVerify() {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {
          onSignInSubmit();
        },
      },
      auth
    );
  }

  function onSignInSubmit() {
    onCaptchVerify();
    const phoneNumber = "+91" + state.mobile;
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        alert("OTP Sended");
        setState({ ...state, verifyOTP: true });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function verifyCode() {
    window.confirmationResult
      .confirm(state.OTP)
      .then((result) => {
        // User signed in successfully.
        const user = result.user;
        console.log(user);
        alert("Verification Done");
        setState({
          ...state,
          verified: true,
        });
      })
      .catch((error) => {
        console.log(error);
        alert("Invalid OTP");
        setState({
          ...state,
          verified: false,
          verifyOTP: false,
        });
      });
  }

  const changeMobile = (e) => {
    setState((prevState) => ({
      ...prevState,
      mobile: e.target.value,
    }));
  };
  useEffect(() => {
    // console.log(state.mobile);

    if (state.mobile.length === 10) {
      setState((prevState) => ({
        ...prevState,
        verifyButton: true,
      }));
    }
  }, [state.mobile]);
  // function changeMobile(e) {
  //   setState({ ...state, mobile: e.target.value }, function () {
  //     console.log(state.mobile);
  //     if (state.mobile.length === 10) {
  //       setState({
  //         ...state,
  //         verifyButton: true,
  //       });
  //     }
  //   });
  // }

  

  const handleSubmit = (e) => {
    if (state.userType === "admin" && state.secretKey !== "Mevada") {
      e.preventDefault();
      alert("Invalid Admin");
    } else {
      e.preventDefault();
      if (state.verified) {
        // const { fname, lname, email, mobile, password, userType, secretKey } =
        //   state;
        // console.log(fname, lname, email, password, userType, secretKey);
        // fetch("https://productssapi.onrender.com/register", {
        //   method: "POST",
        //   crossDomain: true,
        //   headers: {
        //     "Content-Type": "application/json",
        //     Accept: "application/json",
        //     "Access-Control-Allow-Origin": "*",
        //   },
        //   body: JSON.stringify({
        //     fname,
        //     lname,
        //     email,
        //     mobile,
        //     password,
        //     userType,
        //     secretKey,
        //   }),
        // })
        //   .then((res) => res.json())
        //   .then((data) => {
        //     //console.log(data, "userRegister");
        //     if (data.status === "ok") {
        //       alert("User Registered successful");
        //       window.location.href = "./login";
        //     }
        //   });

        axios
          .post("https://productssapi.onrender.com/register", state)
          .then((data) => {
            if (data.data.status === "ok") {
              alert("User Registered successful");
              window.location.href = "./login";
            }
          });
      } else {
        alert("Please verify Mobile");
      }
    }
  };

  return (
    <Wrapper>
      <div className="container contact-form">
        <form onSubmit={handleSubmit}>
          <h2 className="common-heading">Sign Up</h2>
          <div id="sign-in-button"></div>
          <div className="mb-3">
            <h3>Register as</h3>
            <input
              type="radio"
              name="userType"
              value="user"
              onChange={(e) => setState({ ...state, userType: e.target.value })}
            />
            <h3>User</h3>
            <input
              type="radio"
              name="userType"
              value="admin"
              onChange={(e) => setState({ ...state, userType: e.target.value })}
            />
            <h3>Admin</h3>
          </div>

          {state.userType === "admin" ? (
            <div>
              <br></br>
              <input
                type="text"
                className="form-control"
                placeholder="Secret Key"
                onChange={(e) =>
                  setState({ ...state, secretKey: e.target.value })
                }
              />
            </div>
          ) : null}

          <br></br>
          <br></br>
          <div className="mb-3">
            {/* <label>First name</label> */}
            <input
              type="text"
              className="form-control"
              placeholder="First name"
              onChange={(e) => setState({ ...state, fname: e.target.value })}
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
              onChange={(e) => setState({ ...state, lname: e.target.value })}
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
              onChange={(e) => setState({ ...state, email: e.target.value })}
            />
          </div>

          <br></br>
          <br></br>

          <div className="mb-3">
            {/* <label>Email address</label> */}
            <input
              type="mobile"
              className="form-control"
              placeholder="Enter Mobile"
              onChange={(e) => changeMobile(e)}
            />
            {state.verifyButton ? (
              <input
                type="button"
                value={state.verified ? "verified" : "verify"}
                style={{
                  backgroundColor: "0163d2",
                }}
                onClick={onSignInSubmit}
              />
            ) : null}
          </div>

          <br></br>
          <br></br>

          <div className="mb-3">
            {/* <label>Email address</label> */}
            <input
              type="number"
              className="form-control"
              placeholder="Enter OTP"
              onChange={(e) => setState({ ...state, OTP: e.target.value })}
            />
            {state.verifyOTP ? (
              <input
                type="button"
                value={state.verified ? "verified" : "verify"}
                style={{
                  backgroundColor: "0163d2",
                }}
                onClick={verifyCode}
              />
            ) : null}
          </div>

          <br></br>
          <br></br>

          <div className="mb-3">
            {/* <label>Password</label> */}
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={(e) => setState({ ...state, password: e.target.value })}
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
