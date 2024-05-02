import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { myContext } from "../components/MyContext";

const AttendanceListPage = () => {
  const [users, setUsers] = useState([]);
  const [attendances, setAttendances] = useState([]);

  const [selectedUserInfo, setSelectedUserInfo] = useState({});
  const [selectedUserAttendance, setSelectedUserAttendance] = useState([]);
  const [selectedAttendanceInfo, setSelectedAttendanceInfo] = useState({});

  const fetchData = useFetch();
  const { userInfo, roleNames, access } = myContext();

  const getAllUsers = async () => {
    try {
      const res = await fetchData(
        "/users/all/company",
        "POST",
        {
          company_id: userInfo.company_id,
        },
        access
      );

      if (res.ok) {
        setUsers(res.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getAllAttendanceByUser = async (user_id) => {
    try {
      const res = await fetchData(
        "/attendances/user",
        "POST",
        {
          user_id: user_id,
        },
        access
      );

      if (res.ok) {
        setSelectedUserAttendance(res.data.data);
      }
    } catch (error) {
      console.log(error);
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
    } catch (error) {
      console.error(error);
    }
  };

  const updateAttendance = async (id) => {
    try {
      const res = await fetchData(
        "/attendances/id",
        "PATCH",
        {
          id: selectedAttendanceInfo.id,
          date: selectedAttendanceInfo.date,
          clock_in: selectedAttendanceInfo.clock_in,
          clock_out: selectedAttendanceInfo.clock_out,
          OT_clock_in: selectedAttendanceInfo.OT_clock_in,
          OT_clock_out: selectedAttendanceInfo.OT_clock_out,
        },
        access
      );

      if (res.ok) {
        getAllAttendanceByUser(selectedUserInfo.id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteAttendance = async (id) => {
    try {
      const res = await fetchData(
        "/attendances/id/",
        "DELETE",
        {
          id: id,
        },
        access
      );

      if (res.ok) {
        getAllAttendanceByUser(selectedUserInfo.id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  function findMatchingUserId(targetUserId, array) {
    const matchingUser = array.find((item) => item.user_id === targetUserId);
    return matchingUser;
  }

  const handleUpdateAttendance = (key, value) => {
    setSelectedAttendanceInfo((prevUser) => ({
      ...prevUser,
      [key]: value,
    }));
  };

  useEffect(() => {
    getAllUsers();
    getAttendanceToday();
  }, []);

  return (
    <>
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
              <div key={key}>
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
                        position: {item.position_name} <br />
                        role: {roleNames[item.role_id - 1]} <br />
                        <button
                          type="button"
                          className="btn btn-outline-primary col-auto"
                          data-bs-toggle="modal"
                          data-bs-target="#attendanceModal"
                          onClick={() => {
                            setSelectedUserInfo(item);
                            getAllAttendanceByUser(item.id);
                          }}
                        >
                          Check Attendance
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div
        className="modal fade"
        id="attendanceModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="attendanceNameLabel">
                {selectedUserInfo.name}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  setSelectedUserInfo({});
                  setSelectedUserAttendance([]);
                }}
              />
            </div>
            <div className="modal-body">
              <div className="container align-items-center">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Clock In</th>
                      <th>Clock Out</th>
                      <th>OT In</th>
                      <th>OT Out</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedUserAttendance.length &&
                      selectedUserAttendance.map((attendance, key) => {
                        return (
                          <tr key={key}>
                            <td>{attendance.date}</td>
                            <td>{attendance.clock_in}</td>
                            <td>{attendance.clock_out}</td>
                            <td>{attendance.OT_clock_in}</td>
                            <td>{attendance.OT_clock_out}</td>
                            <td className="input-group">
                              <button
                                className="btn btn-outline-primary input-group-btn"
                                data-bs-toggle="modal"
                                data-bs-target="#editAttendanceModal"
                                onClick={() =>
                                  setSelectedAttendanceInfo(attendance)
                                }
                              >
                                Edit
                              </button>
                              <button
                                className="btn btn-outline-primary input-group-btn"
                                onClick={() => deleteAttendance(attendance.id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => {
                  setSelectedUserInfo({});
                  setSelectedUserAttendance([]);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="editAttendanceModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="attendanceNameLabel">
                {selectedUserInfo.name}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  setSelectedUserInfo({});
                  setSelectedUserAttendance([]);
                  setSelectedAttendanceInfo({});
                }}
              />
            </div>
            <div className="modal-body">
              <div className="container align-items-center">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Clock In</th>
                      <th>Clock Out</th>
                      <th>OT In</th>
                      <th>OT Out</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{selectedAttendanceInfo.date}</td>
                      <td>{selectedAttendanceInfo.clock_in}</td>
                      <td>{selectedAttendanceInfo.clock_out}</td>
                      <td>{selectedAttendanceInfo.OT_clock_in}</td>
                      <td>{selectedAttendanceInfo.OT_clock_out}</td>
                    </tr>
                    <tr>
                      <td>
                        <input
                          type="date"
                          id="date"
                          onChange={(e) =>
                            handleUpdateAttendance("date", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="time"
                          id="clockIn"
                          onChange={(e) =>
                            handleUpdateAttendance("clock_in", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="time"
                          id="clockOut"
                          onChange={(e) =>
                            handleUpdateAttendance("clock_out", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="time"
                          id="OTIn"
                          onChange={(e) =>
                            handleUpdateAttendance(
                              "OT_clock_in",
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="time"
                          id="OTOut"
                          onChange={(e) =>
                            handleUpdateAttendance(
                              "OT_clock_out",
                              e.target.value
                            )
                          }
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => {
                  setSelectedUserInfo({});
                  setSelectedUserAttendance([]);
                  setSelectedAttendanceInfo({});
                }}
              >
                Close
              </button>

              <button
                className="btn btn-outline-primary input-group-btn"
                data-bs-toggle="modal"
                data-bs-target="#attendanceModal"
                onClick={() => updateAttendance(selectedAttendanceInfo.id)}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AttendanceListPage;
