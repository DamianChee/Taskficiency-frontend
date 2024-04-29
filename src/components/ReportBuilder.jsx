import React, { useState } from "react";
import Spreadsheet from "react-spreadsheet";
import Papa from "papaparse";

const ReportBuilder = () => {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [data, setData] = useState([[]]);

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

  return (
    <div>
      <input type="file" accept=".csv" onChange={importFromCSV} />
      <button onClick={exportToCSV}>Export to CSV</button>
      <br />
      <input type="file" accept=".json" onChange={importFromJSON} />
      <button onClick={exportToJSON}>Export to JSON</button>
      <br />
      <br />
      <button onClick={addColumn}>Add Column</button>
      <button onClick={addRow}>Add Row</button>
      <button onClick={removeLastColumn}>Remove Column</button>
      <button onClick={removeLastRow}>Remove Row</button>
      <div style={{ height: 250, width: 800, overflow: "auto" }}>
        <Spreadsheet
          data={data}
          columns={columns}
          rows={rows}
          onChange={setData}
        />
      </div>
    </div>
  );
};

export default ReportBuilder;
