import React from "react";
import { myContext } from "./MyContext";
import useFetch from "../hooks/useFetch";

const Formats = ({ select }) => {
  const { formats } = myContext();
  const fetchData = useFetch();
  const { getAllFormats, userInfo } = myContext();

  const deleteFormat = async (format) => {
    try {
      const res = await fetchData("/formats/id", "DELETE", { id: format.id });

      if (res.ok) {
        alert(`Format "${format.name}" deleted!`);
        getAllFormats(userInfo.company_id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        {formats.map((format, key) => {
          return (
            <div key={key}>
              ID: {format.id} <br />
              Name: {format.name} <br />
              Created: {format.createdAt} <br />
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={() => select(format.id)}
              >
                Load
              </button>
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={() => deleteFormat(format)}
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

export default Formats;
