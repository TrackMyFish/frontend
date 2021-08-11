import React from "react";
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

import "react-table-6/react-table.css";

const TankStatisticsGraph = observer((props) => {
  const sorted = props.tankStatistics
    .filter((e) => e.testDate !== "")
    .sort((a, b) => new Date(a.testDate) - new Date(b.testDate));

  return (
    <ResponsiveContainer width="50%" height="50%">
      <LineChart
        data={sorted}
        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="testDate" padding={{ left: 30, right: 30 }} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line connectNulls type="monotone" dataKey="ammonia" stroke="#ff7300" />
        <Line connectNulls type="monotone" dataKey="ph" stroke="#387908" />
        <Line connectNulls type="monotone" dataKey="nitrite" stroke="#ff008c" />
        <Line connectNulls type="monotone" dataKey="nitrate" stroke="#0077ff" />
        <Line connectNulls type="monotone" dataKey="gh" stroke="#aa00ff" />
        <Line connectNulls type="monotone" dataKey="kh" stroke="#ff0011" />
        <Line
          connectNulls
          type="monotone"
          dataKey="phosphate"
          stroke="#5c5c5c"
        />
      </LineChart>
    </ResponsiveContainer>
  );
});

export default TankStatisticsGraph;
