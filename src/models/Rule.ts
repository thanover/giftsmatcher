import { Person } from "./Person";

export class Rule {
  public key: string;
  constructor(
    public person1: Person,
    public person2: Person,
    public ruleType: RuleType
  ) {
    this.key = `${person1.name}${person2.name}`;
  }
}

export type RuleType = "hasToMatch" | "cantMatch";
