import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";

const RegistrationPage = () => {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState();
  const [user, setUser] = useState({
    name: "",
    username: "",
    password: "",
    company_id: "",
  });
  const fetchData = useFetch();

  const getAllCompanies = async () => {
    try {
      const res = await fetchData("/companies/all", "GET");

      if (res.ok) {
        setCompanies(res.data.data);
      } else {
        alert(JSON.stringify(res.data));
        console.log(res.data);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const registerUser = async () => {
    try {
      console.log(user);
      const res = await fetchData("/users/register", "PUT", {
        name: user.name,
        username: user.username,
        password: user.password,
        company_id: user.company_id,
      });

      if (res.ok) {
        setUser({
          name: "",
          username: "",
          password: "",
          company_id: "",
        });
        setSelectedCompany("Select a company...");
        console.log(res.data.data);
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

  const handleChangeCompany = (event) => {
    setSelectedCompany(event.target.value);
    setUser((prevUser) => ({
      ...prevUser,
      company_id: 1,
    }));
  };

  useEffect(() => {
    getAllCompanies();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-10 mx-auto my-1">
          <div className="card">
            <div className="card-header">
              <h4>Registration</h4>
            </div>
            <div className="card-body">
              <div className="card-title">
                <select
                  className="form-select mb-3"
                  aria-label="Default select example"
                  value={selectedCompany}
                  onChange={handleChangeCompany}
                >
                  <option>Select a company...</option>
                  {companies.map((company) => (
                    <option key={company.id} value={company.id}>
                      {company.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="card-text">
                <div className="form-floating mb-3">
                  <input
                    type="name"
                    className="form-control mb-3"
                    id="name"
                    value={user.name}
                    placeholder="Alvin Chee"
                    onChange={(e) => handleUpdateUser("name", e.target.value)}
                  />
                  <label htmlFor="floatingInput">Name</label>
                </div>

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
                  onClick={registerUser}
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

export default RegistrationPage;
