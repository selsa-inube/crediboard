import {
  enviroment,
  fetchTimeoutServices,
  maxRetriesServices,
} from "@config/environment";

import { IDecisionsToDo } from "@services/types";

export const getSearchDecisionByTaskToBeDone = async (
  creditRequestId: string
): Promise<IDecisionsToDo> => {
  const maxRetries = maxRetriesServices;
  const fetchTimeout = fetchTimeoutServices;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), fetchTimeout);
      const queryParams = new URLSearchParams({
        sort: "decision",
      });
      const options: RequestInit = {
        method: "GET",
        headers: {
          "X-Action": "SearchDecisionByTaskToBeDone",
          "X-Business-Unit": enviroment.BUSINESS_UNIT,
          "Content-type": "application/json; charset=UTF-8",
        },
        signal: controller.signal,
      };

      const res = await fetch(
        `${enviroment.ICOREBANKING_API_URL_QUERY}/credit-requests/${creditRequestId}?${queryParams.toString()}`,
        options
      );

      clearTimeout(timeoutId);

      if (res.status === 204) {
        throw new Error("No hay tarea disponible.");
      }

      const data = await res.json();

      if (!res.ok) {
        throw {
          message: "Error al obtener la tarea.",
          status: res.status,
          data,
        };
      }

      return data;
    } catch (error) {
      console.error(`Intento ${attempt} fallido:`, error);
      if (attempt === maxRetries) {
        throw new Error(
          "Todos los intentos fallaron. No se pudo obtener la tarea."
        );
      }
    }
  }

  throw new Error("No se pudo obtener la tarea después de varios intentos.");
};