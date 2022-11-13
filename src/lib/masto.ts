import { login } from "masto";
import { MastoClient, Account } from "masto";

const getMasto = async () => {
  const masto = await login({
    url: process.env.Server as string,
    accessToken: process.env.AccessToken,
  });

  return masto;
};

const getAllFollowing = async ({
  masto,
  id,
}: {
  masto: MastoClient;
  id: string;
}) => {
  let allFollowing: Account[] = [];
  for await (const batch of masto.accounts.getFollowingIterable(id, {})) {
    allFollowing = [...allFollowing, ...batch];
  }
  return allFollowing;
};

export { getMasto, getAllFollowing };
