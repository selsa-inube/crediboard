import { Route, Routes } from "react-router-dom";

import { ErrorPage } from "@components/layout/ErrorPage";
import { Board } from "@pages/board";
import { AddPosition } from "@pages/add-position";

function AssistedRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Board />}>
        <Route path="/:id" element={<AddPosition />} />
      </Route>
      <Route path="/*" element={<ErrorPage />} />
    </Routes>
  );
}

export { AssistedRoutes };
