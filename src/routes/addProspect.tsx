import { Route, Routes } from "react-router-dom";

import { ErrorPage } from "@components/layout/ErrorPage";
import { Board } from "@pages/board";
import { AddProspect } from "@pages/addProspect";
import { CustomerContextProvider } from "@context/CustomerContext";

function AddProspectRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Board />}>
        <Route
          path="/:id"
          element={
            <CustomerContextProvider>
              <AddProspect />
            </CustomerContextProvider>
          }
        />
      </Route>
      <Route path="/*" element={<ErrorPage />} />
    </Routes>
  );
}

export { AddProspectRoutes };
