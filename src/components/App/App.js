import React from "react";
import { observer } from "mobx-react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import "./App.scss";

import { Fish, Tank } from "../";

const App = observer(() => {
  return (
    <Router>
      <Switch>
        <Redirect exact from="/" to="/fish" />
        <Route path="/fish" component={Fish} />
        <Route path="/tank" component={Tank} />
      </Switch>
    </Router>
  );
});

export default App;
