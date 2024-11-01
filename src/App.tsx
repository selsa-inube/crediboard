import { useContext, useEffect } from "react";
import { FlagProvider } from "@inubekit/flag";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import { Login } from "@pages/login";
import { initializeDataDB } from "@mocks/utils/initializeDataDB";
import { ErrorPage } from "@components/layout/ErrorPage";
import AppContextProvider, { AppContext } from "@context/AppContext";

import { LoginRoutes } from "./routes/login";
import { BoardRoutes } from "./routes/board";
import { AddProspectRoutes } from "./routes/addProspect";
import { GlobalStyles } from "./styles/global";
import { enviroment } from "./config/environment";

function LogOut() {
  localStorage.clear();
  const { logout } = useAuth0();
  logout({ logoutParams: { returnTo: enviroment.REDIRECT_URI } });
  return <BoardRoutes />;
}

function FirstPage() {
  const { user } = useContext(AppContext);
  initializeDataDB(user.company);
  return user.company.length === 0 ? <Login /> : <BoardRoutes />;
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="*" element={<FirstPage />} errorElement={<ErrorPage />} />
      <Route path="login/*" element={<LoginRoutes />} />
      <Route path="/*" element={<BoardRoutes />} />
      <Route path="add-prospect/*" element={<AddProspectRoutes />} />
      <Route path="logout" element={<LogOut />} />
    </>
  )
);

function App() {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect();
    }
  }, [isLoading, isAuthenticated, loginWithRedirect]);

  if (!isAuthenticated) {
    return null;
  }
  return (
    <AppContextProvider>
      <FlagProvider>
        <GlobalStyles />
        <RouterProvider router={router} />
      </FlagProvider>
    </AppContextProvider>
  );
}

export default App;
