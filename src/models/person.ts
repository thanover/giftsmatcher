export class Person {
  public possibleMatches: string[];
  public restrictedMatches: string[];
  public matchName: string | undefined;
  constructor(public name: string, public email?: string) {
    this.possibleMatches = [];
    this.restrictedMatches = [];
  }
}
