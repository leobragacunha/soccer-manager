import { neon } from "@neondatabase/serverless";
import { put } from "@vercel/blob";

import {
  // removeBg,
  shapeObjectForPost,
  shapeObjectForUpdate,
  uploadFile,
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

export const getSinglePlayer = async (id?: string): Promise<Player> => {
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

export const createPlayer = async ({
  player,
}: {
  player: Player;
}): Promise<void> => {
  const { profilePic } = player;
  const { keysArray, sqlArray, valuesArray } = shapeObjectForPost(player);

  try {
    // Uploading profile picture in Cloudinary
    if (profilePic?.[0]) {
      const { secure_url: imageurl } = await uploadFile(profilePic[0]);
      const lastIndex = keysArray.length;
      keysArray[lastIndex] = "imageurl";
      sqlArray[lastIndex] = `$${lastIndex + 1}`; // +1 is because $1 is for id
      valuesArray[lastIndex] = imageurl;
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

export const editPlayer = async ({
  player,
}: {
  player: Player;
}): Promise<void> => {
  // console.log(player);
  const { id, profilePic } = player;
  const { updateArray, valuesArray } = shapeObjectForUpdate(player);

  // console.log(updateArray, valuesArray);

  try {
    if (profilePic?.[0]) {
      const { secure_url: imageurl } = await uploadFile(profilePic[0]);
      const lastIndex = updateArray.length - 1;
      updateArray[lastIndex] = `imageurl = $${lastIndex + 1}`; // +1 is because $1 is for id
      valuesArray[lastIndex] = imageurl;
    }

    // Posting info in players table
    console.log(
      "QUERY:" + `UPDATE players SET ${updateArray.join(",")} WHERE id=$1`,
    );
    console.log("VALUES:", valuesArray);

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
