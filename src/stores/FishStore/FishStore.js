import { makeAutoObservable, runInAction } from "mobx";
import React from "react";

import axios from "axios";

import config from "../../config.json";

class FishStore {
  constructor() {
    makeAutoObservable(this);
  }

  fishState = {
    fish: [],

    heartbeat: {
      fishbase: {
        status: "",
      },
    },

    error: null,
  };

  heartbeat = () => {
    axios({
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
      url: config.server.baseURL + "/heartbeat",
    })
      .then((res) => {
        runInAction(() => {
          this.fishState.heartbeat.fishbase.status =
            res?.data?.fishbase?.status;
        });
      })
      .catch((err) => {
        console.log(err?.response?.data);
      });
  };

  listFish = () => {
    axios({
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
      url: config.server.baseURL + "/fish",
    })
      .then((res) => {
        runInAction(() => {
          this.fishState.fish = res.data.fish;
        });
      })
      .catch((err) => {
        console.log(err?.response?.data);
      });
  };

  addFish = ({ type, subtype, color, gender, purchaseDate, count }) => {
    if (gender === "") {
      gender = "UNSPECIFIED";
    }

    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      url: config.server.baseURL + "/fish",
      data: {
        type,
        subtype,
        color,
        gender: gender.toUpperCase(),
        purchaseDate,
        count,
      },
    })
      .then((res) => {
        runInAction(() => {
          this.fishState.fish.push(res?.data?.fish);
        });
      })
      .catch((err) => {
        runInAction(() => {
          console.log(err);
          this.fishState.error = err?.response?.data?.message;
        });
      });
  };

  removeFish = (id) => {
    axios({
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
      url: config.server.baseURL + "/fish/" + id,
    })
      .then(() => {
        runInAction(() => {
          this.fishState.fish = this.fishState.fish.filter((e) => e.id !== id);
        });
      })
      .catch((err) => {
        runInAction(() => {
          console.log(err);
          this.fishState.error = err?.response?.data?.message;
        });
      });
  };
}

const fishStore = new FishStore();
const FishStoreContext = React.createContext(fishStore);
export default FishStoreContext;
