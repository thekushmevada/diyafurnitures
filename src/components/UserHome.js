import React, { useEffect, useState } from "react";

export default function UserHome() {
  const [data, setData] = useState("");

  useEffect(() => {
    fetch("https://productssapi.onrender.com/userData", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.data);
        setData(data.data);
      });
  }, []);

  return (
    <div>
      <div>
        <h3>Welcome, {data.fname}</h3>
        <h3>Logged in as {data.userType}</h3>
        <h3>Redicting to Home Page</h3>
      </div>
    </div>
  );
}
