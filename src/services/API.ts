import { neon } from "@neondatabase/serverless";
import { put } from "@vercel/blob";

import { removeBg, shapeObjectForPost } from "../utils/helpers";
import { Player, PlayerFromDB } from "../utils/typing";

// IMPORTING ENV VARIABLE WITH VITE
const API_URL = import.meta.env.VITE_DATABASE_URL;
const BLOB_URL = import.meta.env.VITE_BLOB_BASE_URL;
const BLOB_TOKEN = import.meta.env.VITE_BLOB_READ_WRITE_TOKEN;

//Player Schema

export const getPlayers = async (): Promise<PlayerFromDB[]> => {
  try {
    const sql = neon(`${API_URL}`);
    const data = (await sql.query(`SELECT * FROM players`)) as PlayerFromDB[];

    console.log(data);

    return data;
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error.";
    console.error(`Error fetching data ${errorMessage}`);
    throw errorMessage;
  }
};

export const createPlayer = async (player: Player): Promise<void> => {
  const { profilePic } = player;
  const { keysArray, sqlArray, valuesArray } = shapeObjectForPost(player);
  const id = valuesArray[0];

  // Getting file extension to rename file
  const dotIndex = profilePic && profilePic?.[0].name.lastIndexOf(".");

  const fileName = profilePic && `${id}${profilePic?.[0].name.slice(dotIndex)}`;

  const imageurl = `${BLOB_URL}/playerImages/${fileName}`;

  if (profilePic) {
    const lastIndex = keysArray.length - 1;
    keysArray[lastIndex] = "imageurl";
    valuesArray[lastIndex] = imageurl;
  }

  // console.log(keysArray, sqlArray, valuesArray);

  try {
    // Uploading profile picture
    if (profilePic?.[0]) {
      const profilePicNoBg = await removeBg(profilePic?.[0]);

      await put(`playerImages/${fileName}`, profilePicNoBg, {
        access: "public",
        token: `${BLOB_TOKEN}`,
      });
    }

    // Posting info in players table

    const sql = neon(`${API_URL}`);
    const record = await sql.query(
      `INSERT INTO players (${keysArray.join(",")}) VALUES (${sqlArray.join(",")})`,
      valuesArray,
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error(`Error: ${errorMessage}`);
    throw errorMessage;
  }
};
