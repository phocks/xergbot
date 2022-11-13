import * as dotenv from "dotenv";
dotenv.config();

import { to as wrap } from "await-to-js";

import { getMasto, getAllFollowing } from "./lib/masto";
import { muteAll } from "./lib/actions";
import { sleep } from "./utils/common";

const id: string = process.env.MyId as string;

async function main() {
  const [mastoErr, masto] = await wrap(getMasto());

  // const [allFollowingErr, allFollowing] = await wrap(
  //   getAllFollowing({ masto, id })
  // );

  // console.log(allFollowing);

  // const allFollowingIds = allFollowing.map((account) => account.id);
  // console.log(allFollowingIds);

  // const rels = await masto.accounts.fetchRelationships(allFollowingIds);
  // console.log(rels);

  await muteAll(masto, id);
}

main().catch((error) => {
  console.error(error);
});
