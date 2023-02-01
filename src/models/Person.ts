export class Person {
  public possibleMatches: string[];
  public restrictedMatches: string[];
  public matchName: string | undefined;
  constructor(public name: string, public email?: string) {
    this.possibleMatches = [];
    this.restrictedMatches = [];
  }

  public addRestrictedName(name: string) {
    this.possibleMatches = this.possibleMatches.filter(
      (possibleMatches) => possibleMatches !== name
    );
    this.restrictedMatches.push(name);
  }

  public removeRestrictedName(name: string) {
    this.restrictedMatches = this.restrictedMatches.filter(
      (restrictedMatche) => restrictedMatche !== name
    );
    this.possibleMatches.push(name);
  }

  public updateDueToAddedPerson(addedPersonName: string) {
    this.possibleMatches.push(addedPersonName);
  }

  public updateDueToDeletedPerson(deletedPersonName: string) {
    this.possibleMatches = this.possibleMatches.filter(
      (possibleMatches) => possibleMatches !== deletedPersonName
    );
    this.restrictedMatches = this.restrictedMatches.filter(
      (restrictedMatch) => restrictedMatch !== deletedPersonName
    );
  }

  public addMatch(matchName: string) {
    this.matchName = matchName;
  }

  public getCloneForMatching() {
    const newPerson = new Person(this.name);
    this.possibleMatches.forEach((possibleMatch) =>
      newPerson.possibleMatches.push(possibleMatch)
    );
    return newPerson;
  }
}
