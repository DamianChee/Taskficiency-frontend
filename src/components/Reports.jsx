import React from "react";
import { myContext } from "./MyContext";
import useFetch from "../hooks/useFetch";

const Reports = ({ select, setter }) => {
  const { reports } = myContext();
  const fetchData = useFetch();
  const { getAllReports, userInfo } = myContext();

  const deleteReport = async (report) => {
    try {
      const res = await fetchData("/reports/id", "DELETE", { id: report.id });

      if (res.ok) {
        alert(`Report "${report.name}" deleted!`);
        getAllReports(userInfo.company_id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        {reports.map((report, key) => {
          return (
            <div key={key}>
              ID: {report.id} <br />
              Name: {report.name} <br />
              Created: {report.createdAt} <br />
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={() => {
                  select(report.id);
                  setter(true);
                }}
              >
                Load
              </button>
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={() => deleteReport(report)}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Reports;
