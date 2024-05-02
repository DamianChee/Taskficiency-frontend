import React, { useState } from "react";
import useFetch from "../hooks/useFetch";
import { myContext } from "../components/MyContext";

const LoginPage = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const fetchData = useFetch();
  const {
    login,
    setUserInfo,
    getAllFormats,
    getAllReports,
    setPermissionLevel,
  } = myContext();

  const loginUser = async () => {
    try {
      const res = await fetchData("/users/login", "POST", user);

      if (res.ok) {
        setUser({
          username: "",
          password: "",
        });
        console.log(res.data);
        const temp = res.data.data;
        login(res.data.access, res.data.refresh);
        setUserInfo(temp);
        getAllFormats(temp.company_id);
        getAllReports(temp.company_id);
        if (temp.role_id === null || temp.role_id === undefined) return;
        setPermissionLevel(temp.role_id);
      } else {
        alert(JSON.stringify(res.data));
        console.log(res);
      }
    } catch (error) {
      alert(error.message);
      console.log(error);
    }
  };

  const handleUpdateUser = (key, value) => {
    setUser((prevUser) => ({
      ...prevUser,
      [key]: value,
    }));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-10 mx-auto my-1">
          <div className="card">
            <div className="card-header">
              <h4>Login</h4>
            </div>
            <div className="card-body">
              <h5 className="card-title">Login Portal</h5>
              <div className="card-text">
                <div className="form-floating mb-3">
                  <input
                    type="username"
                    className="form-control mb-3"
                    id="username"
                    value={user.username}
                    placeholder="TheLegend27"
                    onChange={(e) =>
                      handleUpdateUser("username", e.target.value)
                    }
                  />
                  <label htmlFor="floatingInput">Username</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={user.password}
                    placeholder="Password"
                    onChange={(e) =>
                      handleUpdateUser("password", e.target.value)
                    }
                  />
                  <label htmlFor="floatingPassword">Password</label>
                </div>
                <br />
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={loginUser}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
