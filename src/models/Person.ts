export class Person {
  public possibleMatches: string[];
  constructor(public name: string, public email?: string) {
    this.possibleMatches = [];
  }

  public addPossibleMatch(name: string) {
    this.possibleMatches.push(name);
  }

  public removePossibleMatch(name: string) {
    this.possibleMatches = this.possibleMatches.filter(
      (possibleMatches) => possibleMatches !== name
    );
  }

  public getCloneForMatching() {
    const newPerson = new Person(this.name);
    this.possibleMatches.forEach((possibleMatch) =>
      newPerson.addPossibleMatch(possibleMatch)
    );
    console.log(newPerson);
    return newPerson;
  }
}
