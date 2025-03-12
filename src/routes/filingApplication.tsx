import { Route, Routes } from "react-router-dom";

import { ErrorPage } from "@components/layout/ErrorPage";
import { Board } from "@pages/board";
import { FilingApplication } from "@pages/filingApplication";
import { CustomerContextProvider } from "@context/CustomerContext";

function FilingApplicationRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Board />}>
        <Route
          path="/:id"
          element={
            <CustomerContextProvider>
              <FilingApplication />
            </CustomerContextProvider>
          }
        />
      </Route>
      <Route path="/*" element={<ErrorPage />} />
    </Routes>
  );
}

export { FilingApplicationRoutes };
