import { to as wrap } from "await-to-js";
import { MastoClient } from "masto";
import { sleep } from "../utils/common";

const muteAll = async (masto: MastoClient, id: string) => {
  for await (const batch of masto.accounts.getFollowingIterable(id, {})) {
    const idsInBatch = batch.map((account) => account.id);
    console.log(idsInBatch);
    const rels = await masto.accounts.fetchRelationships(idsInBatch);
    console.log(rels);

    for (const rel of rels) {
      const { id } = rel;

      console.log("Is muting?", rel?.muting);
      if (rel?.muting) {
        console.log("Muting already ok continue!!!");
        continue;
      }

      console.log("Let's mute...");

      const [unmuteError, relationship] = await wrap(
        masto.accounts.mute(id, {
          notifications: false,
        })
      );
      if (unmuteError) console.error(unmuteError);

      console.log("Now muting??", relationship?.muting);
    }
  }
};

const unmuteAll = async (masto: MastoClient, id: string) => {
  for await (const batch of masto.accounts.getFollowingIterable(id, {})) {
    const idsInBatch = batch.map((account) => account.id);
    console.log(idsInBatch);
    const rels = await masto.accounts.fetchRelationships(idsInBatch);
    console.log(rels);

    for (const rel of rels) {
      const { id } = rel;

      console.log("Is muting?", rel?.muting);
      if (!rel?.muting) {
        console.log("Unmuted already ok continue!!!");
        continue;
      }

      console.log("Let's unmute...");

      const [unmuteError, relationship] = await wrap(masto.accounts.unmute(id));
      if (unmuteError) console.error(unmuteError);

      console.log("Now muting??", relationship?.muting);
    }
  }
};

const unfollowNotFollowing = async (masto: MastoClient, id: string) => {
  for await (const batch of masto.accounts.getFollowingIterable(id, {})) {
    const idsInBatch = batch.map((account) => account.id);
    const rels = await masto.accounts.fetchRelationships(idsInBatch);

    for (const rel of rels) {
      if (!rel) continue;
      const { id } = rel;

      console.log("Now checking", id);

      await sleep(100);

      if (rel.followedBy) {
        console.log("Already being followed by... ");
        continue;
      }

      console.log("They don't follow!");

      const [unfollowError, relationship] = await wrap(
        masto.accounts.unfollow(id)
      );
      if (unfollowError) console.error(unfollowError);

      await sleep(100);

      console.log(
        `Should now be not following ${id}? Right? ${relationship?.muting}`
      );
    }
  }
};

const unfollowAll = async (masto: MastoClient, myId: string) => {
  for await (const batch of masto.accounts.getFollowingIterable(myId, {})) {
    for (const account of batch) {
      const { id } = account;
      console.log(`Unfollowing: ${account?.acct}`);
      const [unfollowError, relationship] = await wrap(
        masto.accounts.unfollow(id)
      );
      if (unfollowError) console.error(unfollowError);
    }
  }
};

export { muteAll, unmuteAll, unfollowNotFollowing, unfollowAll };
