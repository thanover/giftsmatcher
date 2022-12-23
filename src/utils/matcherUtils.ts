import { Person } from "../models/Person";
import { Rule } from "../models/Rule";
var _ = require("lodash");

export function setPossibiliesOnPeople(people: Person[]): void {
  people.forEach((person) => {
    const peopleArrayWithoutThisPerson = people
      .filter((_person) => _person.name !== person.name)
      .map((_person) => _person.name);
    person.possibleMatches = peopleArrayWithoutThisPerson;
  });
}

export function updatePossibilitiesDueToRuleAdded(
  people: Person[],
  rule: Rule
) {
  people.forEach((person) => {
    if (person.name === rule.person1.name)
      person.removePossibleMatch(rule.person2.name);
    if (person.name === rule.person2.name)
      person.removePossibleMatch(rule.person1.name);
  });
}

export function updatePossibilitiesDueToRuleDeleted(
  people: Person[],
  rule: Rule
) {
  people.forEach((person) => {
    if (person.name === rule.person1.name)
      person.addPossibleMatch(rule.person2.name);
    if (person.name === rule.person2.name)
      person.addPossibleMatch(rule.person1.name);
  });
}

export function createMatches(people: Person[]) {
  const copiedPeopleArray: Person[] = [];

  people.forEach((person) => {
    copiedPeopleArray.push(person.getCloneForMatching());
  });

  console.log(copiedPeopleArray);

  const orderedPeopleArray = copiedPeopleArray.sort(
    (a, b) => a.possibleMatches.length - b.possibleMatches.length
  );

  const finalResult: string[] = [];

  console.log(orderedPeopleArray);

  orderedPeopleArray.forEach((person) => {
    const match = pickMatch(person);
    finalResult.push(match);

    const nameToRemove = match.split("=>")[1];
    orderedPeopleArray.forEach((person) => {
      person.removePossibleMatch(nameToRemove);
    });
  });

  console.log(finalResult);
}

function pickMatch(person: Person) {
  let indexOfMatch = Math.floor(Math.random() * person.possibleMatches.length);
  // while (!person.possibleMatches[indexOfMatch]) {
  //   indexOfMatch = Math.floor(Math.random() * person.possibleMatches.length);
  // }

  return `${person.name}=>${person.possibleMatches[indexOfMatch]}`;
}
