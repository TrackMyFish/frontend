import { makeAutoObservable, runInAction } from "mobx";
import React from "react";

import axios from "axios";

import config from "../../config.json";

class TankStore {
  constructor() {
    makeAutoObservable(this);
  }

  tankState = {
    stats: [],

    error: null,
  };

  resetError = () => {
    this.tankState.error = null;
  };

  listTankStatistics = () => {
    axios({
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
      url: config.server.baseURL + "/tank/statistics",
    })
      .then((res) => {
        runInAction(() => {
          this.tankState.stats = res.data.tankStatistics;
        });
      })
      .catch((err) => {
        console.log(err?.response?.data);
      });
  };

  addTankStatistic = ({
    testDate,
    ammonia,
    ph,
    nitrate,
    nitrite,
    gh,
    kh,
    phosphate,
  }) => {
    this.resetError();

    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      url: config.server.baseURL + "/tank/statistics",
      data: {
        testDate,
        ammonia,
        ph,
        nitrate,
        nitrite,
        gh,
        kh,
        phosphate,
      },
    })
      .then((res) => {
        runInAction(() => {
          this.tankState.stats.push(res?.data?.tankStatistic);
        });
      })
      .catch((err) => {
        runInAction(() => {
          console.log(err);
          this.tankState.error = err?.response?.data?.message;
        });
      });
  };

  removeTankStatistic = (id) => {
    axios({
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
      url: config.server.baseURL + "/tank/statistics/" + id,
    })
      .then(() => {
        runInAction(() => {
          this.tankState.stats = this.tankState.stats.filter(
            (e) => e.id !== id
          );
        });
      })
      .catch((err) => {
        runInAction(() => {
          console.log(err);
          this.tankState.error = err?.response?.data?.message;
        });
      });
  };
}

const tankStore = new TankStore();
const TankStoreContext = React.createContext(tankStore);
export default TankStoreContext;
