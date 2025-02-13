import { enviroment } from "@config/environment";
import CryptoJS from "crypto-js";

const secretKey = CryptoJS.enc.Hex.parse(enviroment.VITE_SECRET_KEY_PORTAL_ID);
const iv = CryptoJS.enc.Hex.parse(enviroment.VITE_SECRET_KEY_PORTAL_NAME);

const encrypt = (data: string) => {
  return CryptoJS.AES.encrypt(data, secretKey, { iv }).toString();
};

const decrypt = (data: string) => {
  const bytes = CryptoJS.AES.decrypt(data, secretKey, { iv: iv });
  return bytes.toString(CryptoJS.enc.Utf8);
};

export { encrypt, decrypt };
