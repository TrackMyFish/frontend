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

const getBiggest = (acc, cv) => {
  if (!cv) {
    return acc;
  }

  if (!acc) {
    return cv;
  }

  if (cv > acc) {
    return cv;
  }

  return acc;
};

const TankStatisticsGraph = observer((props) => {
  const sorted = props.tankStatistics
    .filter((e) => e.testDate !== "")
    .sort((a, b) => new Date(a.testDate) - new Date(b.testDate))
    .reduce((acc, cv) => {
      for (let i = 0; i < acc.length; i++) {
        if (acc[i].testDate === cv.testDate) {
          console.log(cv.ph, acc[i].ph);

          let obj = {
            testDate: cv.testDate,
            ammonia: cv.ammonia
              ? cv.ammonia > acc[i].ammonia
                ? cv.ammonia
                : acc[i].ammonia
              : acc[i].ammonia,
            // ph: cv.ph ? (cv.ph > acc[i].ph ? cv.ph : acc[i].ph) : acc[i].ph,
            ph: getBiggest(cv.ph, acc[i].ph),
            nitrite: cv.nitrite
              ? cv.nitrite > acc[i].nitrite
                ? cv.nitrite
                : acc[i].nitrite
              : acc[i].nitrite,
            nitrate: cv.nitrate
              ? cv.nitrate > acc[i].nitrate
                ? cv.nitrate
                : acc[i].nitrate
              : acc[i].nitrate,
            gh: cv.gh ? (cv.gh > acc[i].gh ? cv.gh : acc[i].gh) : acc[i].gh,
            kh: cv.kh ? (cv.kh > acc[i].kh ? cv.kh : acc[i].kh) : acc[i].kh,
            phosphate: cv.phosphate
              ? cv.phosphate > acc[i].phosphate
                ? cv.phosphate
                : acc[i].phosphate
              : acc[i].phosphate,
          };

          acc[i] = obj;
          return acc;
        }
      }

      acc.push(cv);
      return acc;
    }, []);

  console.log(sorted);

  return (
    <ResponsiveContainer width="100%" height="50%">
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
