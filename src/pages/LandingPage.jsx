import React, { useEffect, useState } from "react";
import { myContext } from "../components/MyContext";
import useFetch from "../hooks/useFetch";

const LandingPage = () => {
  const [todayAttendance, setTodayAttendance] = useState({
    clock_in: "",
    clock_out: "",
    OT_clock_in: "",
    OT_clock_out: "",
  });
  const { userInfo, access } = myContext();
  const fetchData = useFetch();

  const now = new Date();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dayOfMonth = now.getDate();
  const monthIndex = now.getMonth();
  const year = now.getFullYear();
  const ordinalSuffix =
    dayOfMonth > 3 && dayOfMonth < 21
      ? "th"
      : dayOfMonth % 10 === 1
      ? "st"
      : dayOfMonth % 10 === 2
      ? "nd"
      : dayOfMonth % 10 === 3
      ? "rd"
      : "th";

  const formattedDate = `${days[now.getDay()]}, ${dayOfMonth}${ordinalSuffix} ${
    months[monthIndex]
  }, ${year}`;

  const hours = now.getHours();
  const minutes = now.getMinutes();
  const amPm = hours >= 12 ? "PM" : "AM";
  const adjustedHours = hours % 12 || 12; // Convert to 12-hour format
  const formattedTime = `${adjustedHours}:${minutes
    .toString()
    .padStart(2, "0")} ${amPm}`;

  const getAttendanceToday = async () => {
    const now = new Date();
    const formattedDate = `${now.getFullYear().toString()}/${(
      now.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${now.getDate().toString().padStart(2, "0")}`;

    try {
      const res = await fetchData("/attendances/userdate", "PUT", {
        user_id: userInfo.id,
        startDate: formattedDate,
        endDate: formattedDate,
      });

      if (res.ok) {
        setTodayAttendance((prev) => ({ ...prev, ...res.data.data }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const clockIn = async () => {
    const res = await fetchData(
      "/attendances/clockin",
      "PUT",
      {
        user_id: userInfo.id,
        company_id: userInfo.company_id,
      },
      access
    );

    if (res.ok) {
      getAttendanceToday();
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

    const res = await fetchData(
      "/attendances/clockout",
      "PUT",
      {
        user_id: userInfo.id,
        clock_out: formattedTime,
        date: formattedDate,
      },
      access
    );

    if (res.ok) {
      getAttendanceToday();
    } else {
      alert(JSON.stringify(res.data));
      console.log(res);
    }
  };

  const otIn = async () => {
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

    const res = await fetchData(
      "/attendances/otin",
      "PUT",
      {
        OT_clock_in: formattedTime,
        user_id: userInfo.id,
        date: formattedDate,
      },
      access
    );

    if (res.ok) {
      getAttendanceToday();
    } else {
      alert(JSON.stringify(res.data));
      console.log(res);
    }
  };

  const otOut = async () => {
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

    const res = await fetchData(
      "/attendances/otout",
      "PUT",
      {
        OT_clock_out: formattedTime,
        user_id: userInfo.id,
        date: formattedDate,
      },
      access
    );

    if (res.ok) {
      getAttendanceToday();
    } else {
      alert(JSON.stringify(res.data));
      console.log(res);
    }
  };

  useEffect(() => {
    getAttendanceToday();
  }, []);

  return (
    <div className="float-center text-center">
      <div className="container">
        <div className="row">
          <h3>Welcome, {userInfo.name}!</h3>
          <h5>It's {formattedDate}</h5>
          <h5>{formattedTime}</h5>

          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Today's Timecard</h5>
            </div>
            <div className="row input-group m-1">
              <label className="input-group-text bg-secondary-subtle col-1">
                Clock in:
              </label>
              <label className="input-group-text col-md-2">
                {todayAttendance.clock_in}
              </label>
              {todayAttendance.clock_in === "" ? (
                <button
                  type="button"
                  className="btn btn-outline-primary col-1"
                  onClick={clockIn}
                >
                  Clock in
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-outline-primary col-1"
                  disabled
                >
                  Clock in
                </button>
              )}
            </div>
            <div className="row input-group m-1">
              <label className="input-group-text bg-secondary-subtle col-1">
                Clock out:
              </label>
              <label className="input-group-text col-md-2">
                {todayAttendance.clock_out !== undefined
                  ? todayAttendance.clock_out
                  : ""}
              </label>
              {todayAttendance.clock_in !== "" ? (
                <button
                  type="button"
                  className="btn btn-outline-primary col-1"
                  onClick={clockOut}
                >
                  Clock out
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-outline-primary col-1"
                  disabled
                >
                  Clock out
                </button>
              )}
            </div>
            <div className="row input-group m-1">
              <label className="input-group-text bg-secondary-subtle col-1">
                OT in:
              </label>
              <label className="input-group-text col-md-2">
                {todayAttendance.OT_clock_in !== undefined
                  ? todayAttendance.OT_clock_in
                  : ""}
              </label>
              {todayAttendance.clock_in !== "" ? (
                <button
                  type="button"
                  className="btn btn-outline-primary col-1"
                  onClick={otIn}
                >
                  OT in
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-outline-primary col-1"
                  disabled
                >
                  OT in
                </button>
              )}
            </div>
            <div className="row input-group m-1">
              <label className="input-group-text bg-secondary-subtle col-1">
                OT out:
              </label>
              <label className="input-group-text col-md-2">
                {todayAttendance.OT_clock_out !== undefined
                  ? todayAttendance.OT_clock_out
                  : ""}
              </label>
              {todayAttendance.OT_clock_in !== "" ? (
                <button
                  type="button"
                  className="btn btn-outline-primary col-1"
                  onClick={otOut}
                >
                  OT out
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-outline-primary col-1"
                  disabled
                >
                  OT out
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
