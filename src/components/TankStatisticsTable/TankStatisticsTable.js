import React, { useRef, useState } from "react";
import { observer } from "mobx-react";

import ReactTable from "react-table-6";
import "react-table-6/react-table.css";

const TankStatisticsTable = observer((props) => {
  const [testDate, setTestDate] = useState("");

  const ph = useRef(null);
  const ammonia = useRef(null);
  const nitrate = useRef(null);
  const nitrite = useRef(null);
  const gh = useRef(null);
  const kh = useRef(null);
  const phosphate = useRef(null);

  const addTankStatistic = (e) => {
    e.preventDefault();

    props.addTankStatistic({
      testDate,
      ammonia: ammonia.current.value ? ammonia.current.value : null,
      ph: ph.current.value ? ph.current.value : null,
      nitrate: nitrate.current.value ? nitrate.current.value : null,
      nitrite: nitrite.current.value ? nitrite.current.value : null,
      gh: gh.current.value ? gh.current.value : null,
      kh: kh.current.value ? kh.current.value : null,
      phosphate: phosphate.current.value ? phosphate.current.value : null,
    });
  };

  return (
    <div className="container-fluid">
      <h3 className="text-center">Tank Statistics</h3>
      <ReactTable
        data={props.tankStatistics}
        sortable={true}
        pageSize={props.tankStatistics.length}
        columns={[
          {
            Header: "ID",
            accessor: "id",
            headerClassName: "text-start",
          },
          {
            Header: "Test Date",
            accessor: "testDate",
            headerClassName: "text-start",
          },
          {
            Header: "Ammonia",
            accessor: "ammonia",
            headerClassName: "text-start",
          },
          {
            Header: "pH",
            accessor: "ph",
            headerClassName: "text-start",
          },
          {
            Header: "Nitite",
            accessor: "nitrite",
            headerClassName: "text-start",
          },
          {
            Header: "Nitrate",
            accessor: "nitrate",
            headerClassName: "text-start",
          },
          {
            Header: "GH",
            accessor: "gh",
            headerClassName: "text-start",
          },
          {
            Header: "KH",
            accessor: "kh",
            headerClassName: "text-start",
          },
          {
            Header: "Phosphate",
            accessor: "phosphate",
            headerClassName: "text-start",
          },
          {
            className: "text-center",
            Cell: (row) => (
              <button
                className="btn btn-danger ml-2"
                onClick={() => props.removeTankStatistic(row.original.id)}
              >
                Remove
              </button>
            ),
          },
        ]}
      />
      <div className="accordion" id="create-tank-statistic-accordion">
        <div className="accordion-item">
          <h2 className="accordion-header" id="fish-heading">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapse-tank-statistic"
              aria-expanded="false"
              aria-controls="collapse-tank-statistic"
            >
              Add Tank Statistics
            </button>
          </h2>
          <div
            id="collapse-tank-statistic"
            className="accordion-collapse collapse"
            aria-labelledby="fish-heading"
            data-bs-parent="#create-tank-statistic-accordion"
          >
            <div className="accordion-body">
              <form>
                <div className="container-fluid ps-0 pe-0">
                  <div className="row">
                    <div className="col">
                      <div className="mb-3">
                        <label htmlFor="inputTestDate" className="form-label">
                          Test Date
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          id="inputTestDate"
                          onChange={(e) => setTestDate(e.target.value)}
                          value={testDate}
                        />
                      </div>
                    </div>
                    <div className="col">
                      <div className="mb-3">
                        <label htmlFor="inputPH" className="form-label">
                          pH
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          className="form-control"
                          id="inputPH"
                          placeholder="pH"
                          ref={ph}
                          onChange={() =>
                            props.tankStatisticsError && props.resetError()
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="mb-3">
                        <label htmlFor="inputAmmonia" className="form-label">
                          Ammonia
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          className="form-control"
                          id="inputAmmonia"
                          placeholder="Ammonia (ppm)"
                          ref={ammonia}
                          onChange={() =>
                            props.tankStatisticsError && props.resetError()
                          }
                        />
                      </div>
                    </div>
                    <div className="col">
                      <div className="mb-3">
                        <label htmlFor="inputNitrite" className="form-label">
                          Nitrite (NO2)
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          className="form-control"
                          id="inputNitrite"
                          placeholder="Nitrite (ppm)"
                          ref={nitrite}
                          onChange={() =>
                            props.tankStatisticsError && props.resetError()
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="mb-3">
                        <label htmlFor="inputNitrate" className="form-label">
                          Nitrate (NO3)
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          className="form-control"
                          id="inputNitrate"
                          placeholder="Nitrate (ppm)"
                          ref={nitrate}
                          onChange={() =>
                            props.tankStatisticsError && props.resetError()
                          }
                        />
                      </div>
                    </div>
                    <div className="col">
                      <div className="mb-3">
                        <label htmlFor="inputPhosphate" className="form-label">
                          Phosphate (PO4)
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          className="form-control"
                          id="inputPhosphate"
                          placeholder="Phosphate (ppm)"
                          ref={phosphate}
                          onChange={() =>
                            props.tankStatisticsError && props.resetError()
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="mb-3">
                        <label htmlFor="inputGH" className="form-label">
                          GH
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          className="form-control"
                          id="inputGH"
                          placeholder="GH"
                          ref={gh}
                          onChange={() =>
                            props.tankStatisticsError && props.resetError()
                          }
                        />
                      </div>
                    </div>
                    <div className="col">
                      <div className="mb-3">
                        <label htmlFor="inputKH" className="form-label">
                          KH
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          className="form-control"
                          id="inputKH"
                          placeholder="KH"
                          ref={kh}
                          onChange={() =>
                            props.tankStatisticsError && props.resetError()
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={addTankStatistic}
                >
                  Submit
                </button>
              </form>
              {props.tankStatisticsError && (
                <div className="alert alert-danger mt-3" role="alert">
                  {props.tankStatisticsError}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default TankStatisticsTable;
