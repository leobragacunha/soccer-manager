export interface Player {
  id: string;
  name: string;
  nickname: string;
  height: number;
  foot: "left" | "right" | "both";
  speed: number;
  stamina: number;
  pass: number;
  shoot: number;
  dribble: number;
  defense: number;
  physics: number;
  rank: number;
  kind: string;
  profilePic?: FileList;
  imageurl?: string | null;
}

export interface PlayerCard {
  player: Player;
  onClick?: () => void | Promise<void>;
}
