import { v4 as uuidv4 } from "uuid";
import { Player } from "./typing";

interface PostObject {
  keysArray: string[];
  sqlArray: string[];
  valuesArray: (string | number)[];
}

interface UpdateObject {
  updateArray: string[];
  valuesArray: (string | number)[];
}

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

  if (rank >= 90) {
    kind = "diamond";
  } else if (rank >= 80) {
    kind = "gold";
  } else if (rank >= 70) {
    kind = "silver";
  } else {
    kind = "bronze";
  }

  const entries = Object.entries(player).filter(
    ([_, value]) => value !== undefined && value !== null && value !== "",
  );

  const keysArray = [
    "id",
    "rank",
    ...entries.map(([key]) => (key === "isLegend" ? "kind" : key)), // Adjusting keys array to pass kind instead of isLegend.
  ];
  const sqlArray = ["$1", "$2", ...entries.map((_, i) => `$${i + 3}`)]; // $1 is for id, 2 for rank
  const valuesArray = [
    id,
    rank,
    ...entries.map(([_, value]) => (value === false ? kind : value)),
  ]; // Adjusting values array to use 'legend' or kind, depending on the value.

  return {
    keysArray,
    sqlArray,
    valuesArray,
  };
};

export const shapeObjectForUpdate = (player: Player): UpdateObject => {
  // Recalculating kind and rank, in case of grade changes
  const rank = calculateRank(player);

  if (player.kind !== "legend") {
    if (rank >= 90) {
      player.kind = "diamond";
    } else if (rank >= 80) {
      player.kind = "gold";
    } else if (rank >= 70) {
      player.kind = "silver";
    } else {
      player.kind = "bronze";
    }
  }

  // if (player.removePic) player.imageurl = null;
  player.rank = rank;

  const entries = Object.entries(player).filter(
    ([key, _]) => key !== "removePic",
  );

  console.log("entries:", entries);

  const updateArray = [...entries.map(([key, _], i) => `${key} = $${i + 2}`)]; // $1 will be for id, in the where clause

  const valuesArray = [player.id, ...entries.map(([_, value]) => value)]; // Adjusting values array to use 'legend' or kind, depending on the value.

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
