import { useEffect, useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { AppContext } from "@context/AppContext";
import { validateBusinessUnits } from "@pages/login/utils";

const useLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { eventData, setBusinessUnitsToTheStaff } = useContext(AppContext);
  const [hasError, setHasError] = useState(false);
  const [codeError, setCodeError] = useState<number>();

  useEffect(
    () => {
      if (eventData.portal.publicCode) {
        validateBusinessUnits(
          eventData.portal.publicCode,
          eventData.user.userAccount
        ).then((data) => {
          setBusinessUnitsToTheStaff(data);
          if (!setBusinessUnitsToTheStaff) {
            setHasError(true);
            return;
          }
        });
        if (hasError) {
          setCodeError(1003);
          return;
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      eventData.portal.publicCode,
      eventData.user.userAccount,
      setBusinessUnitsToTheStaff,
    ]
  );

  useEffect(() => {
    if (
      location.pathname === "/login" ||
      location.pathname === "/login/" ||
      location.pathname === "/"
    ) {
      navigate(`/login/${eventData.user.userAccount}/checking-credentials/`);
    }
  }, [location, navigate, eventData.user.userAccount]);

  return { eventData, codeError, hasError };
};

export { useLogin };
