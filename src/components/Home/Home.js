import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react";

import { Navbar } from "../";
import { FishTable } from "../";
import { RootStoreContext } from "../../stores";

export const Home = observer(() => {
  const { rootState, listFish, addFish, removeFish } =
    useContext(RootStoreContext);

  useEffect(() => {
    listFish();
  }, [rootState]);

  return (
    <div>
      <Navbar />
      <div className="mt-3 mb-3" />
      <FishTable
        fish={rootState.fish}
        addFish={addFish}
        removeFish={removeFish}
      />
    </div>
  );
});

export default Home;
