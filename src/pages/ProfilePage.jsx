import React, { useEffect, useRef, useState } from "react";
import useFetch from "../hooks/useFetch";
import { myContext } from "../components/MyContext";

const ProfilePage = () => {
  const [company, setCompany] = useState("");
  const [selectedRole, setSelectedRole] = useState();
  const [role, setRole] = useState("");
  const [updateUser, setUpdateUser] = useState({});

  const fetchData = useFetch();
  const { userInfo, setUserInfo, roles } = myContext();

  const getCompanyName = async () => {
    if (userInfo.company_id === null) return;
    try {
      const res = await fetchData("/companies/id", "POST", {
        id: userInfo.company_id,
      });

      if (res.ok) {
        setCompany(res.data.data.name);
      } else {
        console.warn(res);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getRoleName = async () => {
    if (userInfo.role_id === null) return;
    try {
      const res = await fetchData("/roles/id", "POST", {
        id: userInfo.role_id,
      });

      if (res.ok) {
        setRole(res.data.data.name);
      } else {
        console.warn(res);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateUserInfo = async () => {
    try {
      const res = await fetchData("/users/id", "PATCH", updateUser);

      if (res.ok) {
        setUserInfo((prevUser) => ({
          ...prevUser,
          ...updateUser,
        }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangeRole = (event) => {
    setSelectedRole(event.target.value);
    setUpdateUser((prevUser) => ({
      ...prevUser,
      role_id: event.target.value,
    }));
  };

  const handleUpdateUser = (key, value) => {
    setUpdateUser((prevUser) => ({
      ...prevUser,
      [key]: value,
    }));
  };

  useEffect(() => {
    getCompanyName();
    getRoleName();

    setUpdateUser((prevUser) => ({
      ...prevUser,
      ["id"]: userInfo.id,
    }));
  }, []);

  useEffect(() => {
    getRoleName();
  }, [userInfo]);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-sm-1" />

          <div className="col-sm-10 mx-auto my-1">
            <div className="card">
              <div className="card-header">Profile</div>
              <div className="card-body">
                <h5 className="card-title">{userInfo.name}</h5>
                <p className="card-text">
                  id: {userInfo.id} <br />
                  Contact Home: {userInfo.contact_home} <br />
                  Contact Mobile: {userInfo.contact_mobile} <br />
                  Email: {userInfo.email} <br />
                  username: {userInfo.username} <br />
                  Position: {userInfo.position_name} <br />
                  Company: {company} <br />
                  Role: {role} <br />
                </p>
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#profileModal"
                >
                  edit
                </button>
              </div>
            </div>
          </div>

          <div className="col-sm-1" />
        </div>
      </div>

      {/* PROFILE MODAL HERE */}
      <div
        className="modal fade"
        id="profileModal"
        tabIndex="-1"
        aria-labelledby="profileModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="profileModalLabel">
                Edit Profile:
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div className="row align-items-center">
                <div className="col-4">
                  <label className="col-form-label">Contact Home</label>
                </div>
                <div className="col-auto">
                  <input
                    type="tel"
                    id="contactHome"
                    className="form-control"
                    pattern="[0-9]{8}"
                    onChange={(e) =>
                      handleUpdateUser("contact_home", e.target.value)
                    }
                  />
                </div>
              </div>
              <div className="row align-items-center">
                <div className="col-4">
                  <label className="col-form-label">Contact Mobile</label>
                </div>
                <div className="col-auto">
                  <input
                    type="tel"
                    id="contactMobile"
                    className="form-control"
                    pattern="[0-9]{8}"
                    onChange={(e) =>
                      handleUpdateUser("contact_mobile", e.target.value)
                    }
                  />
                </div>
              </div>
              <div className="row align-items-center">
                <div className="col-4">
                  <label className="col-form-label">Email</label>
                </div>
                <div className="col-auto">
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    onChange={(e) => handleUpdateUser("email", e.target.value)}
                  />
                </div>
              </div>
              <div className="row align-items-center">
                <div className="col-4">
                  <label className="col-form-label">Username</label>
                </div>
                <div className="col-auto">
                  <input
                    type="text"
                    id="username"
                    className="form-control"
                    onChange={(e) =>
                      handleUpdateUser("username", e.target.value)
                    }
                  />
                </div>
              </div>
              <div className="row align-items-center">
                <div className="col-4">
                  <label className="col-form-label">Position Title</label>
                </div>
                <div className="col-auto">
                  <input
                    type="text"
                    id="position"
                    className="form-control"
                    onChange={(e) =>
                      handleUpdateUser("position_name", e.target.value)
                    }
                  />
                </div>
              </div>
              <div className="row align-items-center">
                <div className="col-4">
                  <label className="col-form-label">Role</label>
                </div>
                <div className="col-auto">
                  <select
                    className="form-select col-auto"
                    aria-label="Default select example"
                    value={selectedRole}
                    onChange={handleChangeRole}
                  >
                    <option>Select a role...</option>
                    {roles.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={updateUserInfo}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
