import { API_URL } from "../utils/constants";

//Player Schema
export interface Player {
  id: string;
  name: string;
  nickName: string;
  height: number;
  foot: "left" | "right" | "both";
  speed: number;
  stamina: number;
  pass: number;
  shoot: number;
  dribbling: number;
  defense: number;
  physics: number;
}

// const player: Player = {
//   id: String(Math.random()),
//   name: "Leonardo Braga Cunha",
//   nickName: "Teo Messi",
//   height: 169,
//   foot: "left",
//   speed: 60,
//   stamina: 80,
//   pass: 80,
//   shoot: 65,
//   dribbling: 60,
//   defense: 75,
//   physics: 70,
// };

export const getPlayers = async () => {
  try {
    const response = await fetch(`${API_URL}/players`, { method: "GET" });

    if (!response.ok) {
      throw new Error("RESPONSE ERROR");
    }

    const data: Player = await response.json();

    return data;
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error.";
    console.error(`Error fetching data 9${errorMessage}`);
    throw errorMessage;
  }
};

export const createPlayer = async (player: Player) => {
  try {
    const response = await fetch(`${API_URL}/players`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(player),
    });

    if (!response.ok) {
      throw new Error("RESPONSE ERROR!");
    }

    const data = await response.json();

    // console.log(data);

    return data;
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error(`Error: ${errorMessage}`);
    throw errorMessage;
  }
};
