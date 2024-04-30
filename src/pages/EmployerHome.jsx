import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";

const EmployerHome = () => {
  const [users, setUsers] = useState([]);
  const [attendances, setAttendances] = useState([]);
  const fetchData = useFetch();

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

  useEffect(() => {
    getAllUsers();
    getAllAttendances();
  }, []);

  return (
    <div className="container">
      <div className="row">
        {users.map((item, key) => {
          return (
            <div className="col-sm-10 mx-auto my-1">
              <div class="card" key={key}>
                <div class="card-header">{item.id}</div>
                <div class="card-body">
                  <h5 class="card-title">{item.name}</h5>
                  <p class="card-text">
                    username: {item.username} <br />
                    password: {item.password}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EmployerHome;
