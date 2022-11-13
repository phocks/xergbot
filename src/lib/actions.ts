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

const unmuteAll = async (masto: MastoClient, id) => {
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

export { muteAll, unmuteAll };
