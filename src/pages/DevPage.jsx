import React from "react";
import ReportBuilder from "../components/ReportBuilder";
import Display from "../components/Display";
import Seeder from "../components/Seeder";

const DevPage = () => {
  return (
    <div>
      <ReportBuilder />
      <Seeder />
      <Display />
    </div>
  );
};

export default DevPage;
