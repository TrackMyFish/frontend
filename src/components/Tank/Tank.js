import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Navbar } from "../";
import { TankStatisticsTable } from "../";
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
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={tankState.stats}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="testDate" padding={{ left: 30, right: 30 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            connectNulls
            type="monotone"
            dataKey="ammonia"
            stroke="#ff7300"
          />
          <Line connectNulls type="monotone" dataKey="ph" stroke="#387908" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
});

export default Tank;
