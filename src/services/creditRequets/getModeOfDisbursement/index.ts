import {
  enviroment,
  fetchTimeoutServices,
  maxRetriesServices,
} from "@config/environment";
import { ICreditRequest } from "@services/types";

//import { mapCreditRequestToEntities } from "./mapper";

export const getModeOfDisbursement = async (
  businessUnitPublicCode: string,
  creditRequestId: string
): Promise<ICreditRequest[]> => {
  const maxRetries = maxRetriesServices;
  const fetchTimeout = fetchTimeoutServices;
  console.log(
    "businessUnitPublicCode",
    businessUnitPublicCode,
    creditRequestId
  );
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), fetchTimeout);
      const queryParams = new URLSearchParams({
        creditRequestCode: creditRequestId,
      });
      const options: RequestInit = {
        method: "GET",
        headers: {
          "X-Action": "SearchAllModeOfDisbursementById",
          "X-Business-Unit": businessUnitPublicCode,
          "Content-type": "application/json; charset=UTF-8",
        },
        signal: controller.signal,
      };

      const res = await fetch(
        `${enviroment.ICOREBANKING_API_URL_QUERY}/credit-requests?${queryParams.toString()}`,
        options
      );

      clearTimeout(timeoutId);

      if (res.status === 204) {
        return [];
      }

      const data = await res.json();

      if (!res.ok) {
        throw {
          message: "Error al obtener los ",
          status: res.status,
          data,
        };
      }

      return [];
    } catch (error) {
      if (attempt === maxRetries) {
        throw new Error(
          "Todos los intentos fallaron. No se pudieron obtener los procesos de consulta."
        );
      }
    }
  }

  return [];
};
