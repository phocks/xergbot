import * as dotenv from "dotenv";
dotenv.config();

import { to as wrap } from "await-to-js";

import { getMasto } from "./lib/masto";
import { sleep } from "./utils/common";

const id: string = process.env.MyId as string;

async function main() {
  const [_, masto] = await wrap(getMasto());
}

main().catch((error) => {
  console.error(error);
});
