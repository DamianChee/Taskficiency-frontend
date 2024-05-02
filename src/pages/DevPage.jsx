import React, { useEffect, useState } from "react";
import ReportBuilder from "../components/ReportBuilder";
import Display from "../components/Display";
import Seeder from "../components/Seeder";
import Formats from "../components/Formats";
import Reports from "../components/Reports";
import useFetch from "../hooks/useFetch";

const DevPage = () => {
  const [selectedFormat, setSelectedFormat] = useState();
  const [selectedReport, setSelectedReport] = useState();
  const [data, setData] = useState([[]]);

  const fetchData = useFetch();

  const loadFormatDatabase = async () => {
    if (!selectedFormat) return;
    try {
      const res = await fetchData("/formats/id", "POST", {
        id: selectedFormat,
      });

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
      const res = await fetchData("/reports/id", "POST", {
        id: selectedReport,
      });

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
      <Formats select={setSelectedFormat} />
      <hr />
      <Reports select={setSelectedReport} />
      <hr />
      <ReportBuilder props={data} />
      <Seeder />
      <Display />
    </div>
  );
};

export default DevPage;
