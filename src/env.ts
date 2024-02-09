declare global {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    env: any
  }
}

// change with your own variables
export type EnvType = {
  NODE_ENV: string;
  PUBLIC_URL: string;

  REACT_APP_NAME: string;
  REACT_APP_VERSION: string;

  REACT_APP_LOCALE?: string;
  REACT_APP_DEMO?: string;
  REACT_APP_REQUIRE_LOGIN?: string;

  REACT_APP_API_URL?: string;
  REACT_APP_ADMIN_URL?: string;
  REACT_APP_LEGAL_URL?: string;
  REACT_APP_PRIVACY_URL?: string;

  REACT_APP_DISABLE_NEWS?: string;
  REACT_APP_DISABLE_RECIPE_DISCOVERY?: string;
}
const env: EnvType = { ...process.env, ...window.env };
export default env;
