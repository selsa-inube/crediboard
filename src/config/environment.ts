const IS_PRODUCTION = import.meta.env.PROD;
const AUTH_REDIRECT_URI = import.meta.env.VITE_AUTH0_REDIRECT_URI;

const enviroment = {
  CLIENT_ID: import.meta.env.VITE_AUTH0_CLIENT_ID,
  CLIENT_SECRET: import.meta.env.VITE_AUTH0_CLIENT_SECRET,
  AUTH0_DOMAIN: import.meta.env.VITE_AUTH0_DOMAIN,
  REDIRECT_URI: IS_PRODUCTION ? AUTH_REDIRECT_URI : window.location.origin,
  TEMP_BUSINESS_UNIT: "test",
};

export { enviroment };
