import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";

const Display = () => {
  const [companies, setCompanies] = useState([]);
  const [users, setUsers] = useState([]);
  const [attendances, setAttendances] = useState([]);
  const fetchData = useFetch();

  const getAllCompanies = async () => {
    const res = await fetchData("/companies/all", "GET");

    if (res.ok) {
      setCompanies(res.data.data);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  const getAllUsers = async () => {
    const res = await fetchData("/users/all", "GET");

    if (res.ok) {
      setUsers(res.data.data);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  const getAllAttendances = async () => {
    const res = await fetchData("/attendances/all", "GET");

    if (res.ok) {
      setAttendances(res.data.data);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  const clockIn = async () => {
    const res = await fetchData("/attendances/clockin", "PUT", {
      user_id: 1,
      company_id: 1,
    });

    if (res.ok) {
      getAllAttendances();
    } else {
      alert(JSON.stringify(res.data));
      console.log(res);
    }
  };

  const clockOut = async () => {
    const now = new Date();
    const formattedDate = `${now.getFullYear().toString()}/${(
      now.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${now.getDate().toString().padStart(2, "0")}`;

    const formattedTime = `${now.getHours().toString().padStart(2, "0")}:${now
      .getMinutes()
      .toString()
      .padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;

    const res = await fetchData("/attendances/clockout", "PUT", {
      user_id: 1,
      clock_out: formattedTime,
      date: formattedDate,
    });

    if (res.ok) {
      getAllAttendances();
    } else {
      alert(JSON.stringify(res.data));
      console.log(res);
    }
  };

  useEffect(() => {
    getAllCompanies();
    getAllUsers();
    getAllAttendances();
  }, []);

  return (
    <div>
      <hr />
      {companies.map((item, key) => {
        return (
          <div key={key}>
            <div>{item.name}</div>{" "}
          </div>
        );
      })}
      <hr />
      {users.map((item, key) => {
        return (
          <div key={key}>
            <div>{item.name}</div>{" "}
          </div>
        );
      })}
      <hr />
      <button onClick={clockIn}>Clock in</button>
      <button onClick={clockOut}>Clock out</button>
      {attendances.map((item, key) => {
        return (
          <div key={key}>
            <div>{item.date}</div> <div>{item.clock_in}</div>{" "}
            <div>{item.clock_out}</div> <div>{item.OT_clock_in}</div>{" "}
            <div>{item.OT_clock_out}</div> <div>{item.user_id}</div>{" "}
            <div>{item.company_id}</div>{" "}
          </div>
        );
      })}
    </div>
  );
};

export default Display;
