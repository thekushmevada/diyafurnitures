import axios from "axios";
import React, { useEffect, useState } from "react";

export default function UserHome() {
  const [data, setData] = useState("");

  useEffect(() => {
    axios.post("https://productssapi.onrender.com/userData", {
      token: window.localStorage.getItem("token"),
    })
    .then((res) => {
      console.log("Hello");
      console.log(res);
      setData(res.data.data);
    })
    .catch((error) => {
      console.error(error);
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
