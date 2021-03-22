import React, { Suspense } from "react";
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import "./styles.scss";

const HomePage = React.lazy(() => import("./pages/home/Home"));

const App = () => {
  return (
    <Router>
      <Suspense fallback={"Loading"}>
        <HomePage />
      </Suspense>
      <Redirect to="/" />
    </Router>
  );
};

export default App;
