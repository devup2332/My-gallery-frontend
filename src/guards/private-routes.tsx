import React, { Suspense } from "react";
import { Redirect, Route } from "react-router";

const PrivateRoutes = ({ Component, path }: any) => {
  const token = localStorage.getItem("t1ks1ehn");
  if (token) {
    return (
      <Route path={path}>
        <Suspense fallback="Loading">
          <Component />
        </Suspense>
      </Route>
    );
  }

  return <Redirect to="/login" />;
};

export default PrivateRoutes;
