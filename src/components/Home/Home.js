import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react";

import { Navbar } from "../";
import { FishTable } from "../";
import { RootStoreContext } from "../../stores";

export const Home = observer(() => {
  const { rootState, heartbeat, listFish, addFish, removeFish } =
    useContext(RootStoreContext);

  useEffect(() => {
    listFish();
    heartbeat();
  }, [rootState]);

  const fishbaseDown = rootState.heartbeat.fishbase.status.toLowerCase();

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
              <a href="https://fishbase.ropensci.org/" class="alert-link">
                Fishbase API
              </a>{" "}
              for further details.
            </p>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
          <div className="mt-3 mb-3" />
        </div>
      )}
      <FishTable
        fish={rootState.fish}
        addFish={addFish}
        removeFish={removeFish}
      />
    </div>
  );
});

export default Home;
