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
  dribble: number;
  defense: number;
  physics: number;
  rank: number;
  kind: string;
  profilePic?: FileList;
}

// Creating a new interface to work with imageUrl instead of profilePic
export interface PlayerFromDB extends Omit<Player, "profilePic" | "nickName"> {
  imageurl?: string;
  nickname: string; // nickName was modeled wrong. Just correcting since we need another interface anyway
}
