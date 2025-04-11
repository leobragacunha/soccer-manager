import axios from "axios";
import { API_URL } from "../utils/constants";

//Player Schema
interface Player {
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

// export const createPlayer = async (player: Player) => {
//   try {
//     const response = await fetch(`${API_URL}/players`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(player),
//     });

//     console.log(response);

//     if (!response.ok) {
//       throw new Error("Erro na requisição");
//     }
//     console.log(JSON.stringify(player));

//     const data = await response.json();

//     console.log(data);

//     return data;
//   } catch (error: any) {
//     console.error(`Error: ${error.message}`);
//     throw error;
//   }
// };

export const createPlayer = async (player: Player) => {
  try {
    const response = await axios.post(`${API_URL}/players`, player, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // console.log("Status da resposta:", response.status);
    // if (response.status === 302 || response.status === 301) {
    //   console.log(
    //     "Redirecionamento detectado:",
    //     response.headers.get("Location"),
    //   );
    // }

    if (!response.data) {
      throw new Error(`Erro na requisição: ${response.statusText}`);
    }

    const data = await response.data;
    return data;
  } catch (error: any) {
    console.error("Erro em createPlayer:", error);
    throw error;
  }
};
