import { Route, Routes } from "react-router-dom";

import { ErrorPage } from "@components/layout/ErrorPage";
import { Board } from "@pages/board";
import { EditProspect } from "@pages/editProspect";

function EditProspectRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Board />}>
        <Route path="/:id" element={<EditProspect/>} />
      </Route>
      <Route path="/*" element={<ErrorPage />} />
    </Routes>
  );
}

export { EditProspectRoutes };
