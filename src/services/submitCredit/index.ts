import { enviroment } from "@config/environment";

import { ISubmitCredit } from "./types";

const postSubmitCredit = async (
  businessUnitPublicCode: string,
  userAccount: string,
  submitData: ISubmitCredit
): Promise<ISubmitCredit | undefined> => {
  const requestUrl = `${enviroment.ICOREBANKING_API_URL_PERSISTENCE}/credit-requests`;

  try {
    const options: RequestInit = {
      method: "POST",
      headers: {
        "X-Action": "SubmitCreditApplication",
        "X-Business-Unit": businessUnitPublicCode,
        "X-User-Name": userAccount,
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(submitData),
    };

    const res = await fetch(requestUrl, options);

    if (res.status === 204) {
      return;
    }

    let data;
    try {
      data = await res.json();
    } catch (error) {
      throw new Error("Failed to parse response JSON");
    }

    if (!res.ok) {
      const errorMessage = `Error al crear el rol. Status: ${
        res.status
      }, Data: ${JSON.stringify(data)}`;
      throw new Error(errorMessage);
    }
    return data;
  } catch (error) {
    console.error("Failed to add roles:", error);
    throw error;
  }
};

export { postSubmitCredit };
