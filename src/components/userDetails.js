import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AdminHome from "./AdminHome";
import QueryList from "./QueryList";
import UserHome from "./UserHome";
import axios from "axios";

export const UserDetails = () => {
  const [state, setState] = useState({
    userData: "",
    pageType: "",
  });

  useEffect(() => {
    axios
      .post("https://productssapi.onrender.com/userData", {
        token: window.localStorage.getItem("token"),
      })
      .then((res) => {
        const data = res.data;
        setState((prevState) => ({
          ...prevState,
          userData: data.data,
        }));

        if (data.data.userType === "user") {
          window.location.href = "./";
        }

        if (data.data === "token expired") {
          alert("Token expired, Please login again!");
          window.localStorage.clear();
          window.location.href = "./login";
        }
      })
      .catch((error) => {
        console.error(error);
        // Handle error if needed
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { pageType } = state;
    console.log(pageType);
  };

  return (
    <Wrapper>
      <div className="container">
        {state.userData.userType === "admin" ? (
          <div>
            <h3>Welcome, Admin!</h3>
            <div>
              <form onSubmit={handleSubmit}>
                <RadioButton>
                  <input
                    type="radio"
                    id="users"
                    name="userType"
                    value="admins"
                    onChange={(e) =>
                      setState({ ...state, pageType: e.target.value })
                    }
                  />
                  <label htmlFor="users">Users</label>
                </RadioButton>
                <RadioButton>
                  <input
                    type="radio"
                    id="queries"
                    name="userType"
                    value="queries"
                    defaultChecked
                    onChange={(e) =>
                      setState({ ...state, pageType: e.target.value })
                    }
                  />
                  <label htmlFor="queries">Queries</label>
                </RadioButton>
              </form>
            </div>
            <div>
              {state.pageType === "admins" ? <AdminHome /> : <QueryList />}
            </div>
          </div>
        ) : (
          <UserHome />
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .container {
    padding: 9rem 0;
    text-align: center;
    h3 {
      font-size: 4.2rem;
    }
  }
`;

const RadioButton = styled.div`
  display: inline-block; /* Display inline */
  margin-right: 1rem;

  input[type="radio"] {
    display: none;
  }

  label {
    display: inline-block;
    cursor: pointer;
    font-size: 2.3rem;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    margin-right: 1rem;
    background-color: #f0f0f0;
    color: #333;
    transition: all 0.3s ease;
  }

  input[type="radio"]:checked + label {
    background-color: #007bff;
    color: #fff;
  }
`;
