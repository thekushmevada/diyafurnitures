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
    axios.post("https://productssapi.onrender.com/userData", {
      token: window.localStorage.getItem("token"),
    })
    .then((res) => {
      const data = res.data;
      setState(prevState => ({
        ...prevState,
        userData: data.data
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
                <input
                  type="radio"
                  name="userType"
                  value="admins"
                  onChange={(e) => setState({ ...state,pageType: e.target.value })}
                />
                <h4>Users</h4>
                <input
                  type="radio"
                  name="userType"
                  value="queries"
                  onChange={(e) => setState({ ...state,pageType: e.target.value })}
                />
                <h4>Queries</h4>
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
    h2 {
      font-size: 10rem;
    }
    h3 {
      font-size: 4.2rem;
    }
    h4 {
      font-size: 2.3rem;
    }
    h5 {
      font-size: 1.9rem;
    }
    p {
      margin: 2rem 0;
    }
  }
`;
