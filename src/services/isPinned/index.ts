import {
  enviroment,
  fetchTimeoutServices,
  maxRetriesServices,
} from "@config/environment";

import { ICreditRequestPin } from "../types";

export const getCreditRequestPin = async (): Promise<ICreditRequestPin[]> => {
  const maxRetries = maxRetriesServices;
  const fetchTimeout = fetchTimeoutServices;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), fetchTimeout);

      const options: RequestInit = {
        method: "GET",
        headers: {
          "X-Action": "SearchAllCreditRequestPinned",
          "X-Business-Unit": enviroment.BUSINESS_UNIT,
          "Content-type": "application/json; charset=UTF-8",
        },
        signal: controller.signal,
      };

      const res = await fetch(
        `${enviroment.ICOREBANKING_API_URL_QUERY}/credit-requests/{AC:SearchAllCreditRequestPinned}`,
        options
      );

      clearTimeout(timeoutId);

      if (res.status === 204) {
        throw new Error("No hay datos disponibles.");
      }

      const data: ICreditRequestPin[] = await res.json();

      if (!res.ok) {
        throw {
          message: "Error al obtener el pin de la solicitud de crédito.",
          status: res.status,
          data,
        };
      }

      return data;
    } catch (error) {
      console.error(`Intento ${attempt} fallido:`, error);
      if (attempt === maxRetries) {
        throw new Error(
          "Todos los intentos fallaron. No se pudo obtener el pin de la solicitud de crédito."
        );
      }
    }
  }

  throw new Error("No se pudo obtener el pin después de varios intentos.");
};
