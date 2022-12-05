import * as dotenv from "dotenv";
dotenv.config();
import * as fs from "fs";

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

async function main(): Promise<void> {
  const [mastoErr, masto] = await wrap(getMasto());

  if (mastoErr) {
    console.error(mastoErr);
    return;
  }

  await unfollowNotFollowing(masto, id);
}

main().catch((error) => {
  console.error(error);
});

async function testToot(masto) {
  // Upload the image
  const attachment = await masto.mediaAttachments.create({
    file: fs.createReadStream("src/img/test.png"),
    description: "Some image",
  });

  // Toot!
  const status = await masto.statuses.create({
    status: "test toot from my toaster again...",
    visibility: "public",
    mediaIds: [attachment.id],
  });

  console.log(status);
}
