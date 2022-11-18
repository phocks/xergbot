import * as dotenv from "dotenv";
dotenv.config();

import { to as wrap } from "await-to-js";

import { getMasto, getAllFollowing } from "./lib/masto";
import {
  muteAll,
  unmuteAll,
  unfollowNotFollowing,
  unfollowAll,
} from "./lib/actions";
import { sleep } from "./utils/common";

const id: string = process.env.MyId as string;

async function main() {
  const [mastoErr, masto] = await wrap(getMasto());

  await unfollowAll(masto, id);
}

main().catch((error) => {
  console.error(error);
});
