abstract class Player {
  /** Player Stats to be passed to redux reducer:  */
  pstats: {
    health: number;
    attack: number;
    reloadSpeed: number;
  };
  constructor(pstats: { health: number; attack: number; reloadSpeed: number }) {
    this.pstats = pstats;
  }
  setStats(): { health: number; attack: number; reloadSpeed: number } {
    return this.pstats;
  }
}

type spawnPointType = {
  top: number;
  left: number;
};

type EnStatsType = {
  health: number;
  attack: number;
  reloadSpeed: number;
};

abstract class Enemy {
  enstats: EnStatsType;
  spawnPoint: spawnPointType[];
  constructor(enstats: EnStatsType, spawnPoint: spawnPointType[]) {
    this.enstats = enstats;
    this.spawnPoint = spawnPoint;
  }
  setStats(): EnStatsType {
    return this.enstats;
  }
  setSpawnPoint(): spawnPointType[] {
    return this.spawnPoint;
  }
  /** playerUp: neg, playerdown: s, left: neg, right: pos */
  shouldMove(
    p1loc: number[],
    enloc: number[],
    isAdj: boolean
  ): [boolean, "up" | "down" | "left" | "right" | ""] {
    let commands: [boolean, "up" | "down" | "left" | "right" | ""];
    if (enloc[0] < p1loc[0] && !isAdj) {
      /** If the enemy location is 60 (two spaces below) player, enemy must rise */
      commands = [true, "down"];
      return commands;
    } else if (enloc[0] > p1loc[0] && !isAdj) {
      /** If the enemy location is 60 above the player, enemy must go down */
      commands = [true, "up"];
      return commands;
    } else if (enloc[1] < p1loc[1] && !isAdj) {
      commands = [true, "right"];
      return commands;
    } else if (enloc[1] > p1loc[1] && !isAdj) {
      commands = [true, "left"];
      return commands;
    } else {
      commands = [false, ""];
      return commands;
    }
  }
}

export class PatrolBoat extends Player {
  constructor(pstats: { health: number; attack: number; reloadSpeed: number }) {
    super(pstats);
  }
}

export class Trainee extends Enemy {
  constructor(enstats: EnStatsType, spawnPoint: spawnPointType[]) {
    super(enstats, spawnPoint);
  }
}
