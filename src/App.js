import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import "./index.scss";
import ImageUpload from "@/view/imageUpload";

export default () => (
  <Router basename="/ps">
    <Switch>
      <Redirect exact from="/" to="/imageUpload" />
      <Route path="/imageUpload" component={ImageUpload} />
    </Switch>
  </Router>
);
