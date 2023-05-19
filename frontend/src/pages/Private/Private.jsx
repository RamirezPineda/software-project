import { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { PrivateRoutes } from "../../constants/routes";
import MainContent from "../../components/MainContent";

const Dashboard = lazy(() => import("./Dashboard/Dashboard"));
const Users = lazy(() => import("./Users/Users"));

function Private() {
  return (
    <Routes>
      <Route element={<MainContent />}>
        <Route
          path="/"
          element={
            <Navigate
              to={`${PrivateRoutes.PRIVATE}${PrivateRoutes.DASHBOARD}`}
              replace={true}
            />
          }
        />
        <Route path={PrivateRoutes.DASHBOARD} element={<Dashboard />} />
        <Route path={PrivateRoutes.USERS} element={<Users />} />
      </Route>
      <Route path="*" element={<div>PAGE NOT FOUNT</div>} />
    </Routes>
  );
}

export default Private;
