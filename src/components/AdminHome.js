import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

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
      })
  ]

  const deleteUser = (id , name) => {
    if(window.confirm(`Are you sure want to delete User : ${name} ?`)){
      fetch("https://productssapi.onrender.com/deleteUser", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        userID : id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.data);
        getAllUser();
      });
    }else {

    }
  };

  return (
    <div>
      <div>
        <h3>Welcome Admin</h3>
        <br></br>
        <br></br>
        <table style={{ width: "100%" }}>
          <tr>
            <th>
              <h4>FName</h4>
            </th>
            <th>
              <h4>LName</h4>
            </th>
            <th>
              <h4>Email</h4>
            </th>
            <th>
              <h4>Mobile</h4>
            </th>
            <th>
              <h4>UserType</h4>
            </th>
            <th>
              <h4>Delete</h4>
            </th>
          </tr>
          {data.map((i) => {
            return (
              <tr>
                <td>
                  <h5>{i.fname}</h5>{" "}
                </td>
                <td>
                  <h5>{i.lname}</h5>{" "}
                </td>
                <td>
                  <h5>{i.email}</h5>{" "}
                </td>
                <td>
                  <h5>{i.mobile}</h5>{" "}
                </td>
                <td>
                  <h5>{i.userType}</h5>{" "}
                </td>
                <td>
                  <h5>
                    <FontAwesomeIcon
                      icon={faTrash}
                      onClick={() => deleteUser(i._id, i.fname)}
                    />
                  </h5>
                </td>
              </tr>
            );
          })}
        </table>
        <br/>
        <br/>
        <br/>
        <input type="submit" value="queries" onClick={() => {window.location.href = "./login";}}/>
      </div>
    </div>
  );
}
