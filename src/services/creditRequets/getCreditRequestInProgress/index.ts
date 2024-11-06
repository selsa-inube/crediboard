import { enviroment, fetchTimeoutServices, maxRetriesServices } from "@config/environment";
import { Requests } from "@src/services/types";
import { mapCreditRequestToEntities } from "./mapper";

export const getCreditRequestInProgress = async(): Promise<Requests[]> => {
    const maxRetries = maxRetriesServices;
    const fetchTimeout = fetchTimeoutServices;
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {  
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), fetchTimeout);
        const options: RequestInit = {
          method: "GET",
          headers: { 
            "X-Action": "SearchAllCreditRequestsInProgress",
            "X-Business-Unit": enviroment.BUSINESS_UNIT,
            "Content-type": "application/json; charset=UTF-8",
          },
          signal: controller.signal,
        };
  
        const res = await fetch(
          `${enviroment.ICOREBANKING_API_URL_QUERY}/credit-requests`,
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

        const normalizedCredit = Array.isArray(data)
        ? mapCreditRequestToEntities(data)
        : [];

        return normalizedCredit;
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