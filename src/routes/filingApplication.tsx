import { Route, Routes } from "react-router-dom";

import { ErrorPage } from "@components/layout/ErrorPage";
import { Board } from "@pages/board";
import { FilingApplication } from "@pages/filingApplication";

function FilingApplicationRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Board />}>
        <Route path="/:id" element={<FilingApplication />} />
      </Route>
      <Route path="/*" element={<ErrorPage />} />
    </Routes>
  );
}

export { FilingApplicationRoutes };
