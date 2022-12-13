abstract class Player {
  /** New player stats: HP, ATK, and SPD */
  pstats: [number, number, boolean, number];
  constructor(pstats: [number, number, boolean, number]) {
    this.pstats = pstats;
  }
  setStats(): [number, number, number] {
    return this.pstats;
  }
}

abstract class Enemy {
  enstats: [number, number, boolean, number];
  skills: (string | boolean)[];
  constructor(enstats: [number, number, boolean, number]) {
    this.enstats = enstats;
  }
  setStats(): [number, number, boolean, number] {
    return this.enstats;
  }
  setSkills(): (string | boolean)[] {
    return this.skills;
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

export class Infantry extends Player {
  constructor(pstats: [number, number, boolean, number]) {
    super(pstats);
  }
}

export class Trainee extends Enemy {
  constructor(enstats: [number, number, boolean, number]) {
    super(enstats);
    this.skills = ["fssdf", false];
  }
}
