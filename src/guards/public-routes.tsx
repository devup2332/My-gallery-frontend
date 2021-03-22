import React, { Suspense } from "react";
import { Redirect, Route } from "react-router";
import { PublicRoutes } from "../models/publicRoutes";

const PublicRoutesComponent = ({ Component, path }: PublicRoutes) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return ( 
      <Route exact path={path}>
        <Suspense fallback="loading">
          <Component />
        </Suspense>
      </Route>
    );
  }

  return <Redirect to="/admin" />;
};

export default PublicRoutesComponent;
