import { login } from "masto";

const getMasto = async () => {
  const masto = await login({
    url: process.env.Server as string,
    accessToken: process.env.AccessToken,
  });

  return masto;
};

export { getMasto };
