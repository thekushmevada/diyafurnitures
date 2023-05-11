import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faMailBulk } from "@fortawesome/free-solid-svg-icons";

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
        if(data.status === "ok") {
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

  return (
    <div>
      <div>
        <h3>Welcome, Admin!</h3>
        <h4>Here are some queries for you!</h4>
        <br></br>
        <br></br>
        <table style={{ width: "100%" }}>
          <tr>
            <th>
              <h4>UserName</h4>
            </th>
            <th>
              <h4>Email</h4>
            </th>
            <th>
              <h4>Message</h4>
            </th>
            <th>
              <h4>Mail</h4>
            </th>
            <th>
              <h4>Delete Query</h4>
            </th>
            <th>
              <h4>Responsed</h4>
            </th>
          </tr>
          {data.map((i) => {
            return (
              <tr>
                <td>
                  <h5>{i.username}</h5>{" "}
                </td>
                <td>
                  <h5>{i.email}</h5>{" "}
                </td>
                <td>
                  <h5>{i.Message}</h5>{" "}
                </td>
                <td>
                  <h5>
                    <FontAwesomeIcon
                      icon={faMailBulk}
                      onClick={() => getSingleQuery(i._id)}
                    />
                  </h5>
                </td>
                <td>
                  <h5>
                    <FontAwesomeIcon
                      icon={faTrash}
                      onClick={() => deleteUser(i._id, i.fname)}
                    />
                  </h5>
                </td>
                <td>
                  <h5>{i.Response}</h5>
                </td>
              </tr>
            );
          })}
        </table>
        <br />
        <br />
        <br />
        <input
          type="submit"
          value="View Admins"
          onClick={() => {
            window.location.href = "./login";
          }}
        />
      </div>
    </div>
  );
}
