export default interface AppState {
  /** Player 1 location [top , left]*/
  p1loc: number[];
  /** Enemy location */
  enloc: number[];
  /** showbool for weapons */
  weaponView: boolean[];
  /** Opacity for playaers and enemies. Changes when either attacks */
  opacity: [number, number];
  /** Player { health: number; attack: number; reloadSpeed: number; } */
  pstats: { health: number; attack: number; reloadSpeed: number; };
  /** Enemy { health: number; attack: number; reloadSpeed: number; }  */
  enstats: { health: number; attack: number; reloadSpeed: number; };
  /** Logs */
  log: string[];
  /** Bool that shows, not controlls, if the player is selected or not */
  pIsSelect: boolean;
  /** animations: {shipmove: boolean, cannonfire: boolean} */
  anims: { move: boolean; fire: boolean };
  /** Bool to detect whether a video animation is playing or not */
  playing: boolean;
  /** Checks if the player is pressed or not */
  playerIsPressed: boolean;
}

export type Directions = "up" | "down" | "left" | "right";

export interface PlayerSelectsType {
  p1: boolean;
  p2: boolean;
  p3: boolean;
}
