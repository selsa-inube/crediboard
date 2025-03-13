import { enviroment } from "@config/environment";

import { IMoneyDestination } from "./types";
import { mapMoneyDestinationToEntity } from "./mappers";

const getMoneyDestination = async (
  businessUnitPublicCode: string
): Promise<IMoneyDestination[]> => {
  const requestUrl = `${enviroment.ICOREBANKING_API_URL_QUERY}/money-destinations`;

  try {
    const options: RequestInit = {
      method: "GET",
      headers: {
        "X-Action": "SearchAllMoneyDestination",
        "Content-type": "application/json; charset=UTF-8",
        "X-Business-Unit": businessUnitPublicCode,
      },
    };

    const res = await fetch(requestUrl, options);
    if (res.status === 204) {
      return [];
    }

    const data = await res.json();

    if (!res.ok) {
      throw new Error(`Error al obtener los datos: ${res.status}`);
    }

    return data.map((item: Record<string, string | number | object>) =>
      mapMoneyDestinationToEntity(item)
    );
  } catch (error) {
    console.error(error);
  }

  return [];
};

export { getMoneyDestination };
