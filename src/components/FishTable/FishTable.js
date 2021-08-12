import React, { useState } from "react";
import { observer } from "mobx-react";

import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
import Toast from "react-bootstrap/Toast";

const FishTable = observer((props) => {
  const [type, setType] = useState("");
  const [subtype, setSubtype] = useState("");
  const [color, setColor] = useState("");
  const [gender, setGender] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [count, setCount] = useState(0);

  const [err, setErr] = useState("");

  const [showToast, setShowToast] = useState(false);
  const [hash, setHash] = useState("");

  const toggleShowToast = () => {
    // Only re-generate the hash when showing the toast
    if (!showToast) {
      setHash(btoa(JSON.stringify(props.fish)));
    }

    setShowToast(!showToast);
  };

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

  const handleCopy = (e) => {
    e.preventDefault();

    navigator.clipboard.writeText(hash);
  };

  const error = props.fishError || err;

  const columns = [];

  if (props.showID) {
    columns.push({
      Header: "ID",
      accessor: "id",
      headerClassName: "text-start",
    });
  }

  columns.push(
    { Header: "Type", accessor: "type", headerClassName: "text-start" },
    { Header: "Subtype", accessor: "subtype", headerClassName: "text-start" },
    { Header: "Color", accessor: "color", headerClassName: "text-start" },
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
    { Header: "Count", accessor: "count", headerClassName: "text-start" }
  );

  if (props.showDelete) {
    columns.push({
      className: "text-center",
      Cell: (row) => (
        <button
          className="btn btn-danger ml-2"
          onClick={() => props.removeFish(row.original.id)}
        >
          Remove
        </button>
      ),
    });
  }

  return (
    <div className="container-fluid">
      {props.enableHash && (
        <div>
          <div className="row text-start">
            <div className="col">
              <Toast show={showToast} onClose={toggleShowToast}>
                <Toast.Header>
                  <strong className="me-auto">TrackMyFish Hash</strong>
                  <small>
                    <button
                      type="button"
                      className="btn btn-outline-primary btn-sm"
                      onClick={handleCopy}
                    >
                      Copy to clipboard
                    </button>
                  </small>
                </Toast.Header>
                <Toast.Body className="fish-toast">{hash}</Toast.Body>
              </Toast>
            </div>
          </div>

          <h3 className="text-center">Fish</h3>
          <div className="container-fluid">
            <div className="row text-end">
              <div className="col pe-0">
                <button
                  onClick={toggleShowToast}
                  type="button"
                  className="btn btn-info"
                >
                  Share Fish
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {props.showAdd && (
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
      )}
      <ReactTable
        data={props.fish}
        sortable={true}
        pageSize={props.fish.length}
        columns={columns}
      />
    </div>
  );
});

export default FishTable;
