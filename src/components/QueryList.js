import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faMailBulk } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

export default function AdminHome() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getAllQueries();
  }, []);

  const getAllQueries = () => [
    fetch("https://productssapi.onrender.com/getAllQueries", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
      }),
  ];

  const getSingleQuery = (_id) => {
    fetch("https://productssapi.onrender.com/getSingleQuery", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        userID: _id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        //   setData(data.data);
        // console.log(data.data.email);
        if (data.status === "ok") {
          // console.log(data.status );
          alert("Mail sent Succesfully");
          // deleteUser();
          // xyz = data.status;
        }
      });
  };

  const deleteUser = (_id) => {
    if (window.confirm(`Are you sure want to delete Query?`)) {
      fetch("https://productssapi.onrender.com/deleteQuery", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          userID: _id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.data);
          getAllQueries();
        });
    } else {
    }
  };

  const StyledTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    overflow-x: auto;
    @media screen and (max-width: 768px) {
      font-size: 12px; /* Decrease font size for smaller screens */
    }
  `;

  const StyledTh = styled.th`
    background-color: ${({ theme }) => theme.colors.footer_bg};
    color: #fff;
    padding: 12px;
    text-align: center;
    font-size: 18px; /* Increased font size for table headers */
  `;

  const StyledTd = styled.td`
    border: 1px solid #dddddd;
    padding: 12px;
    font-size: 16px; /* Increased font size for table data cells */
  `;

  const StyledTr = styled.tr`
    &:nth-child(even) {
      background-color: #f2f2f2;
    }

    &:hover {
      background-color: #e2e2e2;
    }
  `;

  return (
    <div>
      <h4>Here are some queries for you!</h4>
      <StyledTable>
        <thead>
          <tr>
            <StyledTh>Username</StyledTh>
            <StyledTh>Email</StyledTh>
            <StyledTh>Message</StyledTh>
            <StyledTh>Mail</StyledTh>
            <StyledTh>Delete Query</StyledTh>
            <StyledTh>Responsed</StyledTh>
          </tr>
        </thead>
        <tbody>
          {data.map((i) => (
            <StyledTr key={i._id}>
              <StyledTd>{i.username}</StyledTd>
              <StyledTd>{i.email}</StyledTd>
              <StyledTd>{i.Message}</StyledTd>
              <StyledTd>
                <FontAwesomeIcon
                  icon={faMailBulk}
                  onClick={() => getSingleQuery(i._id)}
                />
              </StyledTd>
              <StyledTd>
                <FontAwesomeIcon
                  icon={faTrash}
                  onClick={() => deleteUser(i._id, i.fname)}
                />
              </StyledTd>
              <StyledTd>{i.Response}</StyledTd>
            </StyledTr>
          ))}
        </tbody>
      </StyledTable>
    </div>
  );
}
