import { Route, Routes } from "react-router-dom";

import { ErrorPage } from "@components/layout/ErrorPage";
import { Board } from "@pages/board";
import { AddProspect } from "@src/pages/addProspect";

function AddProspectRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Board />}>
        <Route path="/:id" element={<AddProspect />} />
      </Route>
      <Route path="/*" element={<ErrorPage />} />
    </Routes>
  );
}

export { AddProspectRoutes };
