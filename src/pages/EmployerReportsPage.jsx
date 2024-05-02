import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { myContext } from "../components/MyContext";
import Formats from "../components/Formats";
import Reports from "../components/Reports";
import ReportBuilder from "../components/ReportBuilder";

const EmployerReportsPage = () => {
  const [selectedFormat, setSelectedFormat] = useState();
  const [selectedReport, setSelectedReport] = useState();
  const [data, setData] = useState([[]]);
  const [formatWasLoaded, setFormatWasLoaded] = useState(false);
  const [reportWasLoaded, setReportWasLoaded] = useState(false);

  const fetchData = useFetch();
  const { access } = myContext();

  const loadFormatDatabase = async () => {
    if (!selectedFormat) return;
    try {
      const res = await fetchData(
        "/formats/id",
        "POST",
        {
          id: selectedFormat,
        },
        access
      );

      if (res.ok) {
        setData(res.data.data.format);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const loadReportDatabase = async () => {
    if (!selectedReport) return;
    try {
      const res = await fetchData(
        "/reports/id",
        "POST",
        {
          id: selectedReport,
        },
        access
      );

      if (res.ok) {
        setData(res.data.data.reports);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadFormatDatabase();
  }, [selectedFormat]);

  useEffect(() => {
    loadReportDatabase();
  }, [selectedReport]);

  return (
    <div>
      <div className="accordion" id="accordionExample">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="false"
              aria-controls="collapseOne"
            >
              Formats
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <Formats select={setSelectedFormat} setter={setFormatWasLoaded} />
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              Reports
            </button>
          </h2>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <Reports select={setSelectedReport} setter={setReportWasLoaded} />
            </div>
          </div>
        </div>
      </div>

      <ReportBuilder
        props={data}
        format={selectedFormat}
        report={selectedReport}
        formatLoadState={formatWasLoaded}
        formatSetter={setFormatWasLoaded}
        reportLoadState={reportWasLoaded}
        reportSetter={setReportWasLoaded}
      />
    </div>
  );
};

export default EmployerReportsPage;
