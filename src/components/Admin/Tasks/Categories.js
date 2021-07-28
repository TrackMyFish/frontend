import React, { useState } from "react";
import { observer } from "mobx-react";
import { withRouter } from "react-router-dom";

import ReactTable from "react-table-6";
import "react-table-6/react-table.css";

const Categories = withRouter(
  observer((props) => {
    const [name, setName] = useState("");
    const [color, setColor] = useState("");
    const [description, setDescription] = useState("");

    const [err, setErr] = useState("");

    const createCategry = (e) => {
      e.preventDefault();
      if (!name) {
        setErr("Name must be set");
        return;
      }

      if (!description) {
        setErr("Description must be set");
        return;
      }

      props.createCategory({
        token: props.loginState.authToken,
        name,
        color,
        description,
      });
    };

    const error = props.categoryError || err;

    return (
      <div className="container">
        <h3 className="text-center">Categories</h3>
        <ReactTable
          data={props.categories}
          sortable={true}
          pageSize={props.categories.length}
          columns={[
            {
              Header: "ID",
              accessor: "id",
              headerClassName: "text-start",
            },
            {
              Header: "Name",
              accessor: "name",
              headerClassName: "text-start",
            },
            {
              Header: "Color",
              accessor: "color",
              headerClassName: "text-start",
            },
            {
              Header: "Description",
              accessor: "description",
              headerClassName: "text-start",
            },
          ]}
        />
        <div className="accordion" id="create-category-accordion">
          <div className="accordion-item">
            <h2 className="accordion-header" id="category-heading">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapse-category"
                aria-expanded="false"
                aria-controls="collapse-category"
              >
                Create Category
              </button>
            </h2>
            <div
              id="collapse-category"
              className="accordion-collapse collapse"
              aria-labelledby="category-heading"
              data-bs-parent="#create-category-accordion"
            >
              <div className="accordion-body">
                <form>
                  <div className="container-fluid ps-0 pe-0">
                    <div className="row">
                      <div className="col">
                        <div className="mb-3">
                          <label htmlFor="inputName" className="form-label">
                            Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputName"
                            onChange={(e) =>
                              setErr("") || setName(e.target.value)
                            }
                            value={name}
                          />
                        </div>
                      </div>
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
                    </div>
                  </div>
                  <div className="container-fluid ps-0 pe-0">
                    <div className="row">
                      <div className="col">
                        <div className="mb-3">
                          <label
                            htmlFor="inputDescription"
                            className="form-label"
                          >
                            Description
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputDescription"
                            onChange={(e) =>
                              setErr("") || setDescription(e.target.value)
                            }
                            value={description}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={createCategry}
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
  })
);

export default Categories;
