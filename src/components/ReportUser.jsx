import React, { useEffect, useState } from "react";
import Spreadsheet from "react-spreadsheet";
import Papa from "papaparse";
import useFetch from "../hooks/useFetch";
import { myContext } from "./MyContext";

const ReportUser = ({
  props,
  format,
  report,
  formatLoadState,
  formatSetter,
  reportLoadState,
  reportSetter,
}) => {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [data, setData] = useState([[]]);
  const [formatName, setFormatName] = useState("");
  const [reportName, setReportName] = useState("");
  const fetchData = useFetch();
  const { getAllFormats, getAllReports, userInfo, access } = myContext();

  // Function to export from csv file
  const exportToCSV = () => {
    const csvRows = [];
    // Add column labels
    csvRows.push(columns.join(","));
    // Add data rows
    data.forEach((row) => {
      const rowData = row.map((cell) => cell.value).join(",");
      csvRows.push(rowData);
    });
    // Convert to CSV string
    const csvString = csvRows.join("\n");
    // Create a Blob from the CSV string
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    // Create a temporary anchor element to trigger the download
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "spreadsheet.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Function to import from csv file
  const importFromCSV = (event) => {
    const file = event.target.files[0];
    Papa.parse(file, {
      header: false,
      complete: (results) => {
        // If the CSV has a header row, use it as column labels
        if (results.data[0]) {
          setColumns(results.data[0].map((label) => label.trim()));
          results.data.shift(); // Remove the header row from the data
        }
        // Convert the rest of the data to the spreadsheet format
        const newData = results.data.map((row) =>
          row.map((value) => ({ value }))
        );
        setData(newData);
      },
    });
    event.target.value = "";
  };

  // Function to export into json file
  const exportToJSON = () => {
    const jsonData = JSON.stringify(data);
    // Trigger download or save the JSON string as needed
    // For example, using a temporary anchor element to trigger a download
    const blob = new Blob([jsonData], {
      type: "application/json;charset=utf-8;",
    });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "spreadsheet.json");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Function to import from json file
  const importFromJSON = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const jsonData = JSON.parse(e.target.result);
      setData(jsonData);
    };
    reader.readAsText(file);
    event.target.value = "";
  };

  // Function to save as json to database
  const saveFormatToDatabase = async () => {
    try {
      const res = await fetchData(
        "/formats/create",
        "PUT",
        {
          name: formatName,
          format: data,
        },
        access
      );

      if (res.ok) {
        setFormatName("");
        getAllFormats(userInfo.company_id);
        formatSetter(false);
        reportSetter(false);
        alert("Format Saved!");
      } else {
        console.log(res);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Function to save as json to database
  const saveReportToDatabase = async () => {
    try {
      const res = await fetchData(
        "/reports/create",
        "PUT",
        {
          name: reportName,
          reports: data,
        },
        access
      );

      if (res.ok) {
        setReportName("");
        getAllReports(userInfo.company_id);
        formatSetter(false);
        reportSetter(false);
        alert("Report Saved!");
      } else {
        console.log(res);
      }
    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
  };

  // Function to save as json to database
  const overwriteFormatToDatabase = async () => {
    try {
      const res = await fetchData(
        "/formats/id",
        "PATCH",
        {
          id: format,
          format: data,
        },
        access
      );

      if (res.ok) {
        setFormatName("");
        getAllFormats(userInfo.company_id);
        formatSetter(false);
        reportSetter(false);
        alert("Format Saved!");
      } else {
        console.log(res);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Function to save as json to database
  const overwriteReportToDatabase = async () => {
    try {
      const res = await fetchData(
        "/reports/id",
        "PATCH",
        {
          id: report,
          reports: data,
        },
        access
      );

      if (res.ok) {
        setReportName("");
        getAllReports(userInfo.company_id);
        formatSetter(false);
        reportSetter(false);
        alert("Report Saved!");
      } else {
        console.log(res);
      }
    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
  };

  // Function to add a new column
  const addColumn = () => {
    const newColumn = `Column ${columns.length + 1}`;
    setColumns([...columns, newColumn]);
    setData(data.map((row) => [...row, { value: "" }]));
  };

  // Function to add a new row
  const addRow = () => {
    const newRow = `Row ${rows.length + 1}`;
    setRows([...rows, newRow]);
    setData([...data, data[0].map(() => ({ value: "" }))]);
  };

  // Function to remove last column
  const removeLastColumn = () => {
    if (columns.length > 0) {
      setColumns(columns.slice(0, -1));
      setData(data.map((row) => row.slice(0, -1)));
    }
  };

  // Function to remove last row
  const removeLastRow = () => {
    if (rows.length > 0) {
      setRows(rows.slice(0, -1));
      setData(data.slice(0, -1));
    }
  };

  useEffect(() => {
    if (props) {
      setData([[]]);
      setData(props);
    }
  }, [props]);

  return (
    <>
      <div className="container">
        <h3 className="p-3 my-3 bg-info bg-opacity-10 border border-info rounded">
          Report Builder
        </h3>

        <div className="input-group px-3 mt-1 row">
          <label className="input-group-text col-md-1">CSV</label>
          <input
            className="form-control col-md-4 rounded-end"
            type="file"
            accept=".csv"
            onChange={importFromCSV}
          />
          <div className="col-md-1" />
          <button
            className="btn btn-outline-primary col-md-2 rounded-start"
            onClick={importFromCSV}
          >
            Import
          </button>
          <button
            className="btn btn-outline-primary col-md-2 rounded-end"
            onClick={exportToCSV}
          >
            Export
          </button>
          <div className="col-md-2" />
        </div>
        <br />
        <div
          className="input-group px-3 mb-3 row"
          role="group"
          aria-label="Basic outlined example"
        >
          <button
            className="btn btn-outline-primary col-md-2"
            onClick={addColumn}
            disabled
          >
            Add Column
          </button>
          <button
            className="btn btn-outline-primary col-md-2"
            onClick={addRow}
            disabled
          >
            Add Row
          </button>
          <button
            className="btn btn-outline-primary col-md-2"
            onClick={removeLastColumn}
            disabled
          >
            Remove Column
          </button>
          <button
            className="btn btn-outline-primary col-md-2"
            onClick={removeLastRow}
            disabled
          >
            Remove Row
          </button>
          {formatLoadState ? (
            <>
              <button
                type="button"
                className="btn btn-outline-primary col-md-2"
                data-bs-toggle="modal"
                data-bs-target="#overwriteFormatModal"
                disabled
              >
                Save format
              </button>
              <button
                type="button"
                className="btn btn-outline-primary col-md-2"
                data-bs-toggle="modal"
                data-bs-target="#reportNameModal"
              >
                Save report
              </button>
            </>
          ) : reportLoadState ? (
            <>
              <button
                type="button"
                className="btn btn-outline-primary col-md-2"
                data-bs-toggle="modal"
                data-bs-target="#formatNameModal"
                disabled
              >
                Save format
              </button>
              <button
                type="button"
                className="btn btn-outline-primary col-md-2"
                data-bs-toggle="modal"
                data-bs-target="#overwriteReportModal"
              >
                Save report
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className="btn btn-outline-primary col-md-2"
                data-bs-toggle="modal"
                data-bs-target="#formatNameModal"
                disabled
              >
                Save format
              </button>
              <button
                type="button"
                className="btn btn-outline-primary col-md-2"
                data-bs-toggle="modal"
                data-bs-target="#reportNameModal"
              >
                Save report
              </button>
            </>
          )}
        </div>
        <div
          style={{ height: 500, overflow: "auto" }}
          className="border border-primary-subtle w-100 p-0 m-5"
        >
          <Spreadsheet
            data={data}
            columns={columns}
            rows={rows}
            onChange={setData}
          />
        </div>
      </div>

      <div
        className="modal fade"
        id="overwriteFormatModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="formatNameLabel">
                Save as:
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
                  <label className="col-form-label">
                    Overwrite or Save as new?
                  </label>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={overwriteFormatToDatabase}
              >
                Overwrite
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#formatNameModal"
              >
                Save New
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="overwriteReportModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="formatNameLabel">
                Save as:
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
                  <label className="col-form-label">
                    Overwrite or Save as new?
                  </label>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={overwriteReportToDatabase}
              >
                Overwrite
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#reportNameModal"
              >
                Save New
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="formatNameModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="formatNameLabel">
                Enter filename to save:
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
                  <label className="col-form-label">Name: </label>
                </div>
                <div className="col-auto">
                  <input
                    type="text"
                    id="filename"
                    className="form-control"
                    value={formatName}
                    onChange={(e) => setFormatName(e.target.value)}
                  />
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
                onClick={saveFormatToDatabase}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="reportNameModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="formatNameLabel">
                Enter filename to save:
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
                  <label className="col-form-label">Name: </label>
                </div>
                <div className="col-auto">
                  <input
                    type="text"
                    id="filename"
                    className="form-control"
                    value={reportName}
                    onChange={(e) => setReportName(e.target.value)}
                  />
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
                onClick={saveReportToDatabase}
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

export default ReportUser;
