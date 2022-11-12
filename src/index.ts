import * as dotenv from "dotenv";
dotenv.config();
import { login } from "masto";

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const id: string = "108274904351853384";

async function main() {
  const masto = await login({
    url: process.env.Server as string,
    accessToken: process.env.AccessToken,
  });

  let allFollowing: any = [];
  for await (const batch of masto.accounts.getFollowingIterable(id, {})) {
    for (const item of batch) {
      const { id } = item;

      const [rel] = await masto.accounts.fetchRelationships([id]);
      if (!rel?.muting) continue;

      const relationship = await masto.accounts.mute(id, {
        notifications: false,
      });
      console.log(relationship);
      allFollowing = [...allFollowing, item];

      await sleep(2000);
    }
  }

  console.log("Number of accounts:", allFollowing.length);

  for (const account of allFollowing) {
    // console.log(account.id)
  }
}

main().catch((error) => {
  console.error(error);
});
