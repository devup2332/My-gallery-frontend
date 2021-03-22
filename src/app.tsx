import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import PublicRoutesComponent from "./guards/public-routes";
import "./styles.scss";

const HomePage = React.lazy(() => import("./pages/home/Home"));
const RegisterPage = React.lazy(() => import("./pages/register/Register"));

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/home">
          <Suspense fallback="loading">
            <HomePage />
          </Suspense>
        </Route>
        <PublicRoutesComponent Component={RegisterPage} path="/register" />
        <Redirect exact from="/" to="/home"/>
        <Redirect exact from="/**" to="/404"/>
      </Switch>
    </Router>
  );
};

export default App;
