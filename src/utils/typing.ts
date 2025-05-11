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
  islegend: boolean;
  profilePic?: FileList;
  imageurl?: string | null;
}

export interface PlayerCard {
  player: Player;
  onClick?: () => void | Promise<void>;
}

export interface PostObject {
  keysArray: string[];
  sqlArray: string[];
  valuesArray: (string | number)[];
}

export interface UpdateObject {
  updateArray: string[];
  valuesArray: (string | number)[];
}

export interface CloudinaryResponse {
  secure_url: string;
  public_id: string;
  asset_id: string;
  format: string;
  version: number;
  resource_type: string;
  created_at: string;
  tags?: string[];
  bytes: number;
  width: number;
  height: number;
  url: string;
}
