import React from "react";
import useFetch from "../hooks/useFetch";
import { myContext } from "./MyContext";

const Seeder = () => {
  const fetchData = useFetch();
  const { access } = myContext();

  const seedEverythingFromScratch = async () => {
    await fetchData("/companies/seed", "GET");
    await fetchData("/roles/seed", "GET");
    await fetchData("/attendancetypes/seed", "GET");
    await fetchData("/users/seed", "GET");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-5" />
        <button
          className="btn btn-outline-primary col-md-2"
          onClick={seedEverythingFromScratch}
        >
          SEEDER
        </button>
        <div className="col-md-5" />
      </div>
    </div>
  );
};

export default Seeder;
