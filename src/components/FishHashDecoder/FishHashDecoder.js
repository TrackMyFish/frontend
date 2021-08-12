import React, { useState } from "react";

import { Navbar, FishTable } from "../";

export const FishHashDecoder = () => {
  const [hash, setHash] = useState("");
  const [showTable, setShowTable] = useState(false);
  const [fish, setFish] = useState([]);

  const [errs, setErrs] = useState(["Only paste hashes from people you trust"]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Don't do anything if there isn't a hash
    if (hash === "") {
      setErrs([...errs, "Hash not provided"]);
      return;
    }

    console.log(hash.length);

    // There's an artifical limit of 100,000
    // to prevent performance issues
    if (hash.length > 100000) {
      setErrs([...errs, "Hash exceeds the 100,000 character limit"]);
      return;
    }

    try {
      setFish(JSON.parse(atob(hash)));
    } catch (e) {
      setErrs([...errs, "Error parsing hash: " + e]);
    }

    setShowTable(true);
  };

  return (
    <div>
      <Navbar />
      <div className="mt-3 mb-3" />
      <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
        <symbol
          id="exclamation-triangle-fill"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
        </symbol>
      </svg>
      <div className="container">
        {errs.map((err, idx) => (
          <div
            key={idx}
            className="alert alert-danger d-flex align-items-center alert-dismissible fade show"
            role="alert"
          >
            <svg
              className="bi flex-shrink-0 me-2"
              width="24"
              height="24"
              role="img"
              aria-label="Danger:"
            >
              <use xlinkHref="#exclamation-triangle-fill" />
            </svg>
            <div>{err}</div>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        ))}
      </div>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="inputHash" className="form-label">
              Fish Hash
            </label>
            <textarea
              value={hash}
              onChange={(e) => setHash(e.target.value)}
              className="form-control"
              id="inputHash"
              rows="3"
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
        <div className="mt-3 mb-3" />
        {showTable && <FishTable fish={fish} />}
      </div>
    </div>
  );
};

export default FishHashDecoder;
