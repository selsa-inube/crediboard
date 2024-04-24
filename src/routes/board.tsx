import { Route, Routes } from "react-router-dom";

import { ErrorPage } from "@src/components/layout/ErrorPage";
import { ContainerSections } from "@src/components/layout/ContainerSections";
import { Board } from "@src/pages/board";
import { BoardLayout } from "@pages/board/outlets/boardlayout";

function BoardRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Board />}>
        <Route path="/" element={<BoardLayout />} />
        <Route
          path="/solicitud/:solicitud_id"
          element={<ContainerSections />}
        />
      </Route>
      <Route path="/*" element={<ErrorPage />} />
    </Routes>
  );
}

export { BoardRoutes };
