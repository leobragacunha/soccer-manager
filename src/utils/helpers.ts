import { v4 as uuidv4 } from "uuid";
import { CloudinaryResponse, Player, PostObject, UpdateObject } from "./typing";

const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const calculateRank = (player: Player): number => {
  const { speed, stamina, pass, shoot, dribble, defense } = player;

  const rank = Math.ceil(
    (Number(speed) +
      Number(stamina) +
      Number(pass) +
      Number(shoot) +
      Number(dribble) +
      Number(defense)) /
      6,
  );

  return rank;
};

export const shapeObjectForPost = (player: Player): PostObject => {
  const id = uuidv4();

  const rank = calculateRank(player);

  let kind = "";

  if (player?.islegend) {
    kind = "legend";
  } else if (rank >= 90) {
    kind = "diamond";
  } else if (rank >= 80) {
    kind = "gold";
  } else if (rank >= 70) {
    kind = "silver";
  } else {
    kind = "bronze";
  }

  const entries = Object.entries(player).filter(
    ([key, value]) =>
      value !== undefined &&
      value !== null &&
      value !== "" &&
      key !== "profilePic",
  );

  const keysArray = [
    "id",
    "rank",
    "kind",
    ...entries.map(([key]) => key), // Adjusting keys array to pass kind instead of isLegend.
  ];
  const sqlArray = ["$1", "$2", "$3", ...entries.map((_, i) => `$${i + 4}`)]; // $1 is for id, 2 for rank
  const valuesArray = [id, rank, kind, ...entries.map(([_, value]) => value)];

  console.log("keysArray", keysArray);
  console.log("sqlArray", sqlArray);
  console.log("valuesArray", valuesArray);

  return {
    keysArray,
    sqlArray,
    valuesArray,
  };
};

export const shapeObjectForUpdate = (player: Player): UpdateObject => {
  // Recalculating kind and rank, in case of grade changes
  const rank = calculateRank(player);

  if (player?.islegend) {
    player.kind = "legend";
  } else if (rank >= 90) {
    player.kind = "diamond";
  } else if (rank >= 80) {
    player.kind = "gold";
  } else if (rank >= 70) {
    player.kind = "silver";
  } else {
    player.kind = "bronze";
  }

  // if (player.removePic) player.imageurl = null;
  player.rank = rank;

  // If the user send a new profilePic, we need to remove the imageurl attribute (it will be replaced in the ediPlayer function). Otherwise, we need to maintain this attribute, in case the user decides to remove the profilePic.
  const entries = player.profilePic
    ? Object.entries(player).filter(
        ([key, _]) =>
          key !== "removePic" && key !== "profilePic" && key !== "imageurl",
      )
    : Object.entries(player).filter(
        ([key, _]) => key !== "removePic" && key !== "profilePic",
      );

  // console.log("entries:", entries);

  const updateArray = [...entries.map(([key, _], i) => `${key} = $${i + 1}`)]; // $1 will be for id, in the where clause

  const valuesArray = [...entries.map(([_, value]) => value)]; // Adjusting values array to use 'legend' or kind, depending on the value.

  // console.log("updateArray", updateArray);
  // console.log("valuesArray", valuesArray);

  return {
    updateArray,
    valuesArray,
  };
};

// Function to remove background from images
export const removeBg = async (blob: Blob): Promise<Blob> => {
  const formData = new FormData();
  formData.append("size", "auto");
  formData.append("image_file", blob);

  const response = await fetch("https://api.remove.bg/v1.0/removebg", {
    method: "POST",
    headers: { "X-Api-Key": import.meta.env.VITE_REMOVE_BG_API_KEY },
    body: formData,
  });

  if (response.ok) {
    // Getting response as an arrayBuffer
    const arrayBuffer = await response.arrayBuffer();
    // Creating a png Blob from it
    const pngBlob = new Blob([arrayBuffer], { type: "image/png" });
    return pngBlob;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

// Function for file uploading
export const uploadFile = async (file: File): Promise<CloudinaryResponse> => {
  const url = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`;
  const fd = new FormData();
  fd.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
  fd.append("file", file);

  try {
    const response = await fetch(url, {
      method: "POST",
      body: fd,
    });

    if (!response.ok) {
      // Get error details from the response
      const errorText = await response.text();
      console.error("Cloudinary Error:", {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
      });

      throw new Error(
        `Error during upload: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();

    console.log("Upload successfully finished:", data);

    return data;
  } catch (error) {
    console.error("Error during upload:", error);
    throw error;
  }
};
