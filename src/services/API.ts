import { neon } from "@neondatabase/serverless";
import { put } from "@vercel/blob";

import {
  // removeBg,
  shapeObjectForPost,
  shapeObjectForUpdate,
} from "../utils/helpers";
import { Player } from "../utils/typing";

// IMPORTING ENV VARIABLE WITH VITE
const API_URL = import.meta.env.VITE_DATABASE_URL;
const BLOB_URL = import.meta.env.VITE_BLOB_BASE_URL;
const BLOB_TOKEN = import.meta.env.VITE_BLOB_READ_WRITE_TOKEN;

//Player Schema
export const getPlayers = async (): Promise<Player[]> => {
  try {
    const sql = neon(`${API_URL}`);
    const data = (await sql`SELECT * FROM players`) as Player[];
    // console.log(data);

    return data;
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error.";
    console.error(`Error fetching data ${errorMessage}`);
    throw errorMessage;
  }
};

export const getSinglePlayer = async (id: string): Promise<Player> => {
  try {
    const sql = neon(`${API_URL}`);
    const data =
      (await sql`SELECT * FROM players WHERE id = ${id}`) as Player[];
    // console.log(data);
    return data[0];
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error.";
    console.error(errorMessage);
    throw errorMessage;
  }
};

export const createPlayer = async (player: Player): Promise<void> => {
  const { profilePic } = player;
  const { keysArray, sqlArray, valuesArray } = shapeObjectForPost(player);
  const id = valuesArray[0];

  if (!profilePic) return;

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
      // const profilePicNoBg = await removeBg(profilePic?.[0]); // reached API Limits (return in may 27th)

      // await put(`playerImages/${fileName}`, profilePicNoBg, {
      //   access: "public",
      //   token: `${BLOB_TOKEN}`,
      // });
      await put(`playerImages/${fileName}`, profilePic?.[0], {
        access: "public",
        token: `${BLOB_TOKEN}`,
      });
    }

    // Posting info in players table
    const sql = neon(`${API_URL}`);
    await sql.query(
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

export const editPlayer = async (player: Player): Promise<void> => {
  // console.log(player);
  const { id, profilePic } = player;
  const { updateArray, valuesArray } = shapeObjectForUpdate(player);

  // Deleting old profilePic

  // Getting file extension to rename file
  const dotIndex = profilePic && profilePic?.[0].name.lastIndexOf(".");

  const fileName = profilePic && `${id}${profilePic?.[0].name.slice(dotIndex)}`;

  const imageurl = `${BLOB_URL}/playerImages/${fileName}`;

  console.log(imageurl);

  // await del(imageurl, { token: `${BLOB_TOKEN}` });
  // console.log("CHEGUEI AQUI!");

  if (profilePic) {
    const lastIndex = updateArray.length;
    updateArray[lastIndex] = `imageurl = $${updateArray.length + 1}`;
    valuesArray[lastIndex] = imageurl;
  }

  console.log(updateArray, valuesArray);

  try {
    // Uploading profile picture
    if (profilePic?.[0]) {
      // await del(imageurl, { token: `${BLOB_TOKEN}` });
      // const profilePicNoBg = await removeBg(profilePic?.[0]);
      // await put(`playerImages/${fileName}`, profilePicNoBg, {
      //   access: "public",
      //   token: `${BLOB_TOKEN}`,
      //   allowOverwrite: true,
      // });
      await put(`playerImages/${fileName}`, profilePic?.[0], {
        access: "public",
        token: `${BLOB_TOKEN}`,
        allowOverwrite: true,
      });
    }

    // Posting info in players table
    const sql = neon(`${API_URL}`);
    await sql.query(
      `UPDATE players 
      SET ${updateArray.join(",")} 
      WHERE id=$1`,
      valuesArray,
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error(`Error: ${errorMessage}`);
    throw errorMessage;
  }
};

export const deletePlayer = async (id: string): Promise<void> => {
  try {
    const sql = neon(`${API_URL}`);
    await sql`DELETE FROM players WHERE id=${id}`;
    // console.log(data);
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error.";
    console.error(`Error fetching data ${errorMessage}`);
    throw errorMessage;
  }
};
