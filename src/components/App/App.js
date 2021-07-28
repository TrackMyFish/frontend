import React from "react";
import { observer } from "mobx-react";

import "./App.scss";

import { Home } from "../";

const App = observer(() => {
  return <Home />;
});

export default App;
