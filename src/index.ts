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

  for await (const batch of masto.accounts.getFollowingIterable(id, {})) {
    // const idsInBatch = batch.map((account) => account.id);
    // console.log(idsInBatch);
    // const rels = await masto.accounts.fetchRelationships([
    //   "109288805396558025",
    //   "109301500125171531",
    // ]);
    // console.log(rels);

    for (const item of batch) {
      const { id } = item;

      const [rel] = await masto.accounts.fetchRelationships([id]);
      await sleep(1000);
      console.log("Is muting?", rel?.muting);
      if (rel?.muting) {
        console.log("Already muting... continuing");
        continue;
      }

      console.log("Let's mute");

      const relationship = await masto.accounts.mute(id, {
        notifications: false,
      });
      await sleep(1000);
      console.log("Now muting?", relationship?.muting);
    }
  }
}

main().catch((error) => {
  console.error(error);
});
