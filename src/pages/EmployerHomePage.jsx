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

  const getAttendanceToday = async () => {
    const now = new Date();
    const formattedDate = `${now.getFullYear().toString()}/${(
      now.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${now.getDate().toString().padStart(2, "0")}`;

    try {
      const res = await fetchData("/attendances/all/companydate", "PUT", {
        company_id: 1,
        startDate: formattedDate,
        endDate: formattedDate,
      });

      if (res.ok) {
        setAttendances(res.data.data);
      }
    } catch (error) {}
  };

  function findMatchingUserId(targetUserId, array) {
    // Use Array.prototype.find() to search for the targetUserId
    const matchingUser = array.find((item) => item.user_id === targetUserId);
    return matchingUser;
  }

  useEffect(() => {
    getAllUsers();
    getAttendanceToday();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <h3 className="p-3 m-3 bg-info bg-opacity-10 border border-info rounded">
          Employees
        </h3>

        <h3 className="p-3 m-3 bg-secondary bg-opacity-10 border border-secondary rounded text-center">
          Today's attendance <br /> {attendances.length} / {users.length}
        </h3>

        {users.map((item, key) => {
          return (
            <div className="col-sm-10 mx-auto my-1" key={key}>
              <div className="card" key={key}>
                <div className="card-header">{item.id}</div>
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <div className="card-text">
                    username: {item.username} <br />
                    {findMatchingUserId(item.id, attendances) ? (
                      <div className="text-success">Present</div>
                    ) : (
                      <div className="text-danger">Absent</div>
                    )}
                    <br />
                  </div>
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
