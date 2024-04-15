import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { useContext, useEffect } from "react";
import { useAuth } from "@inube/auth";

import { ErrorPage } from "@components/layout/ErrorPage";
import AppContextProvider, { AppContext } from "@context/AppContext";
import { Login } from "@pages/login";
import { Home } from "@pages/home";
import { initializeDataDB } from "@mocks/utils/initializeDataDB";

import { GlobalStyles } from "./styles/global";
import { LoginRoutes } from "./routes/login";
import { BoardRoutes } from "./routes/board";
import { ContainerSections } from "./components/layout/ContainerSections";

function LogOut() {
  localStorage.clear();
  const { logout } = useAuth();
  logout();
  return <Home />;
}

function FirstPage() {
  const { user } = useContext(AppContext);
  return user.company.length === 0 ? <Login /> : <Home />;
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<FirstPage />} errorElement={<ErrorPage />} />
      <Route path="login/*" element={<LoginRoutes />} />
      <Route path="board/*" element={<BoardRoutes />} />
      <Route path="logout" element={<LogOut />} />
      <Route path="sections" element={<ContainerSections />} />
    </>
  )
);

function App() {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect();
      initializeDataDB();
    }
  }, [isLoading, isAuthenticated, loginWithRedirect]);

  if (!isAuthenticated) {
    return null;
  }
  return (
    <AppContextProvider>
      <GlobalStyles />
      <RouterProvider router={router} />
    </AppContextProvider>
  );
}

export default App;
