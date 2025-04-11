// import { createPlayer } from "../../services/API";
import { API_URL } from "../../utils/constants";

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

const Players = () => {
  const player: Player = {
    id: "777777",
    name: "Leonardo Braga Cunha",
    nickName: "Teo Messi",
    height: 169,
    foot: "left",
    speed: 60,
    stamina: 80,
    pass: 80,
    shoot: 65,
    dribbling: 60,
    defense: 75,
    physics: 70,
  };

  const createPlayer = async (player: Player) => {
    try {
      const response = await fetch(`http://localhost:3000/players`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(player),
      });

      console.log(response);

      if (!response.ok) {
        throw new Error("Erro na requisição");
      }
      console.log(JSON.stringify(player));

      const data = await response.json();

      console.log(data);

      return data;
    } catch (error: any) {
      console.error(`Error: ${error.message}`);
      throw error;
    }
  };

  const handleCreatePlayer = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    console.log("clicked");
    try {
      const result = await createPlayer(player);
      console.log("Resultado:", result);
    } catch (error: any) {
      console.error("Erro ao criar jogador:", error.message);
    }
  };

  //
  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <div>
            <button
              type="button"
              onClick={(event) => handleCreatePlayer(event)}
              className="bg-red-900"
            >
              teste
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Players;
