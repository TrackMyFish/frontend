import React, { useState } from "react";
import { observer } from "mobx-react";

import ReactTable from "react-table-6";
import "react-table-6/react-table.css";

const FishTable = observer((props) => {
  const [type, setType] = useState("");
  const [subtype, setSubtype] = useState("");
  const [color, setColor] = useState("");
  const [gender, setGender] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [count, setCount] = useState(0);

  const [err, setErr] = useState("");

  const addFish = (e) => {
    e.preventDefault();

    const uppercaseGender = gender.toUpperCase();

    props.addFish({
      type,
      subtype,
      color,
      gender,
      uppercaseGender,
      purchaseDate,
      count,
    });
  };

  const error = props.fishError || err;

  return (
    <div className="container-fluid">
      <h3 className="text-center">Fish</h3>
      <ReactTable
        data={props.fish}
        sortable={true}
        pageSize={props.fish.length}
        columns={[
          {
            Header: "ID",
            accessor: "id",
            headerClassName: "text-start",
          },
          {
            Header: "Type",
            accessor: "type",
            headerClassName: "text-start",
          },
          {
            Header: "Subtype",
            accessor: "subtype",
            headerClassName: "text-start",
          },
          {
            Header: "Color",
            accessor: "color",
            headerClassName: "text-start",
          },
          {
            Header: "Gender",
            accessor: "gender",
            headerClassName: "text-start",
            Cell: ({ value }) => (value === "UNSPECIFIED" ? "" : value),
          },
          {
            Header: "Purchase Date",
            accessor: "purchaseDate",
            headerClassName: "text-start",
          },
          {
            Header: "Count",
            accessor: "count",
            headerClassName: "text-start",
          },
          {
            className: "text-center",
            Cell: (row) => (
              <button
                className="btn btn-danger ml-2"
                onClick={() => props.removeFish(row.original.id)}
              >
                Remove
              </button>
            ),
          },
        ]}
      />
      <div className="accordion" id="create-fish-accordion">
        <div className="accordion-item">
          <h2 className="accordion-header" id="fish-heading">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapse-fish"
              aria-expanded="false"
              aria-controls="collapse-fish"
            >
              Add Fish
            </button>
          </h2>
          <div
            id="collapse-fish"
            className="accordion-collapse collapse"
            aria-labelledby="fish-heading"
            data-bs-parent="#create-fish-accordion"
          >
            <div className="accordion-body">
              <form>
                <div className="container-fluid ps-0 pe-0">
                  <div className="row">
                    <div className="col">
                      <div className="mb-3">
                        <label htmlFor="inputType" className="form-label">
                          Type
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="inputType"
                          onChange={(e) =>
                            setErr("") || setType(e.target.value)
                          }
                          value={type}
                        />
                      </div>
                    </div>
                    <div className="col">
                      <div className="mb-3">
                        <label htmlFor="inputSubtype" className="form-label">
                          Subtype
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="inputSubtype"
                          onChange={(e) =>
                            setErr("") || setSubtype(e.target.value)
                          }
                          value={subtype}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row"></div>
                  <div className="row">
                    <div className="col">
                      <div className="mb-3">
                        <label htmlFor="inputColor" className="form-label">
                          Color
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="inputColor"
                          onChange={(e) =>
                            setErr("") || setColor(e.target.value)
                          }
                          value={color}
                        />
                      </div>
                    </div>
                    <div className="col">
                      <div className="mb-3">
                        <label htmlFor="inputGender" className="form-label">
                          Gender
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="inputGender"
                          onChange={(e) =>
                            setErr("") || setGender(e.target.value)
                          }
                          value={gender}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className="mb-3">
                          <label
                            htmlFor="inputPurchaseDate"
                            className="form-label"
                          >
                            Purchase Date
                          </label>
                          <input
                            type="date"
                            className="form-control"
                            id="inputPurchaseDate"
                            onChange={(e) =>
                              setErr("") || setPurchaseDate(e.target.value)
                            }
                            value={purchaseDate}
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className="mb-3">
                          <label htmlFor="inputCount" className="form-label">
                            Count
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            id="inputCount"
                            min="0"
                            onChange={(e) =>
                              setErr("") || setCount(e.target.value)
                            }
                            value={count}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={addFish}
                >
                  Submit
                </button>
              </form>
              {error && (
                <div className="alert alert-danger mt-3" role="alert">
                  {error}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default FishTable;
