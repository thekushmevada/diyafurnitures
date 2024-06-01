import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

export default function AdminHome() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getAllUser();
  }, []);

  const getAllUser = () => [
    fetch("https://productssapi.onrender.com/getAllUser", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
      }),
  ];

  const deleteUser = (id, name) => {
    if (window.confirm(`Are you sure want to delete User : ${name} ?`)) {
      fetch("https://productssapi.onrender.com/deleteUser", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          userID: id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.data);
          getAllUser();
        });
    } else {
    }
  };

  const StyledTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  `;

  const StyledTh = styled.th`
    background-color: ${({ theme }) => theme.colors.footer_bg};
    color: #fff;
    padding: 10px;
    text-align: center;
    font-size: 18px;
  `;

  const StyledTd = styled.td`
    border: 1px solid #dddddd;
    padding: 10px;
    font-size: 16px;
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
      <StyledTable>
        <thead>
          <tr>
            <StyledTh>First Name</StyledTh>
            <StyledTh>Last Name</StyledTh>
            <StyledTh>Email</StyledTh>
            <StyledTh>Mobile</StyledTh>
            <StyledTh>UserType</StyledTh>
            <StyledTh>Delete</StyledTh>
          </tr>
        </thead>
        <tbody>
          {data.map((i) => (
            <StyledTr key={i._id}>
              <StyledTd>{i.fname}</StyledTd>
              <StyledTd>{i.lname}</StyledTd>
              <StyledTd>{i.email}</StyledTd>
              <StyledTd>{i.mobile}</StyledTd>
              <StyledTd>{i.userType}</StyledTd>
              <StyledTd>
              <FontAwesomeIcon
                        icon={faTrash}
                        onClick={() => deleteUser(i._id, i.fname)}
                      />
              </StyledTd>
            </StyledTr>
          ))}
        </tbody>
      </StyledTable>
    </div>
  );
}
