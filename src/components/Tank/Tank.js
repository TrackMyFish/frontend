import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react";

import { Navbar } from "../";
import { TankStatisticsTable, TankStatisticsGraph } from "../";
import { TankStoreContext } from "../../stores";

export const Tank = observer(() => {
  const {
    tankState,
    resetError,
    listTankStatistics,
    addTankStatistic,
    removeTankStatistic,
  } = useContext(TankStoreContext);

  useEffect(() => {
    listTankStatistics();
  }, [tankState]);

  return (
    <div>
      <Navbar />
      <div className="mt-3 mb-3" />
      <TankStatisticsTable
        tankStatistics={tankState.stats}
        addTankStatistic={addTankStatistic}
        removeTankStatistic={removeTankStatistic}
        tankStatisticsError={tankState.error}
        resetError={resetError}
      />
      <div className="mt-3 mb-3" />
      <TankStatisticsGraph tankStatistics={tankState.stats} />
    </div>
  );
});

export default Tank;
