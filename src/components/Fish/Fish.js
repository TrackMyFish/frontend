import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react";

import { Navbar } from "../";
import { FishTable } from "../";
import { FishStoreContext } from "../../stores";

export const Fish = observer(() => {
  const { fishState, heartbeat, listFish, addFish, removeFish } =
    useContext(FishStoreContext);

  useEffect(() => {
    listFish();
    heartbeat();
  }, [fishState]);

  const fishbaseDown = fishState.heartbeat.fishbase.status.toLowerCase();

  return (
    <div>
      <Navbar />
      <div className="mt-3 mb-3" />
      {fishbaseDown && (
        <div className="container">
          <div className="alert alert-danger alert-dismissible" role="alert">
            <h4 className="alert-heading">Fishbase Down</h4>
            <p>
              Fishbase appears to be down, meaning certain functions such as the
              auto-population of the Ecosystem information will not be
              completed.
            </p>
            <hr />
            <p className="mb-0">
              This is unlikely to be an issue with TrackMyFish and you should
              check the{" "}
              <a href="https://fishbase.ropensci.org/" className="alert-link">
                Fishbase API
              </a>{" "}
              for further details.
            </p>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
          <div className="mt-3 mb-3" />
        </div>
      )}
      <FishTable
        fish={fishState.fish}
        addFish={addFish}
        removeFish={removeFish}
        fishError={fishState.error}
      />
    </div>
  );
});

export default Fish;
