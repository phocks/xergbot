import { to as wrap } from "await-to-js";
import { MastoClient } from "masto";

const muteAll = async (masto: MastoClient, id: string) => {
  for await (const batch of masto.accounts.getFollowingIterable(id, {})) {
    const idsInBatch = batch.map((account) => account.id);
    console.log(idsInBatch);
    const rels = await masto.accounts.fetchRelationships(idsInBatch);
    console.log(rels);

    for (const rel of rels) {
      const { id } = rel;

      // const [relError, rels] = await wrap(
      //   masto.accounts.fetchRelationships([id])
      // );
      // await sleep(1000);
      // if (relError) console.error(relError);
      // if (!rels) continue;
      // const rel = rels[0];

      console.log("Is muting?", rel?.muting);
      if (rel?.muting) {
        console.log("Muting already ok continue!!!");
        continue;
      }

      console.log("Let's mute...");

      const [unmuteError, relationship] = await wrap(masto.accounts.mute(id));
      if (unmuteError) console.error(unmuteError);
      // const relationship = await masto.accounts.unmute(id, {
      //   notifications: false,
      // });
      // await sleep(1000);
      console.log("Now muting??", relationship?.muting);
    }
  }
};

const unmuteAll = async (masto: MastoClient, id) => {
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

      const [relError, rels] = await wrap(
        masto.accounts.fetchRelationships([id])
      );
      // await sleep(1000);
      if (relError) console.error(relError);
      if (!rels) continue;
      const rel = rels[0];

      console.log("Is muting?", rel?.muting);
      if (!rel?.muting) {
        console.log("Not muting ok continue");
        continue;
      }

      console.log("Let's unute");

      const [unmuteError, relationship] = await wrap(masto.accounts.unmute(id));
      if (unmuteError) console.error(unmuteError);
      // const relationship = await masto.accounts.unmute(id, {
      //   notifications: false,
      // });
      // await sleep(1000);
      console.log("Now muting?", relationship?.muting);
    }
  }
};

export { muteAll, unmuteAll };
