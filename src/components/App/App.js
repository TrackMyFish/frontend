import React from "react";
import { observer } from "mobx-react";
import {
  // HashRouter because it works better with backend routing
  // https://github.com/gorilla/mux/issues/464
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import "./App.scss";

import { Fish, Tank, FishHashDecoder } from "../";

const App = observer(() => {
  return (
    <Router>
      <Switch>
        <Redirect exact from="/" to="/fish" />
        <Route path="/fish" component={Fish} />
        <Route path="/tank" component={Tank} />
        <Route path="/hash-decode" component={FishHashDecoder} />
      </Switch>
    </Router>
  );
});

export default App;
