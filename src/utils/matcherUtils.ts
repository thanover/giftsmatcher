import { stringify } from "querystring";
import { Person } from "../models/Person";
import { Rule } from "../models/Rule";

export type finalResult = {
  name: string;
  match: string;
}[];

export async function setPossibiliesOnPeople(
  people: Person[]
): Promise<Person[]> {
  people.forEach((person) => {
    const peopleArrayWithoutThisPerson = people
      .filter((_person) => _person.name !== person.name)
      .map((_person) => _person.name);
    person.possibleMatches = peopleArrayWithoutThisPerson;
  });

  return people;
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

export async function createMatches(people: Person[]): Promise<finalResult> {
  let possibleMatchesArray: { name: string; possibleMatches: string[] }[] = [];
  const finalMatches: finalResult = [];

  for (const person of people) {
    const _possibleMatches: string[] = [];
    for (const possibleMatch of person.possibleMatches) {
      _possibleMatches.push(possibleMatch);
    }
    possibleMatchesArray.push({
      name: person.name,
      possibleMatches: _possibleMatches,
    });
  }

  console.log(possibleMatchesArray);

  possibleMatchesArray = possibleMatchesArray.sort(
    (a, b) => a.possibleMatches.length - b.possibleMatches.length
  );

  console.log(possibleMatchesArray);

  for (const person of possibleMatchesArray) {
    const indexOfMatch = Math.floor(
      Math.random() * person.possibleMatches.length
    );
    const matchName = person.possibleMatches[indexOfMatch];

    if (!matchName) return await createMatches(people);

    finalMatches.push({ name: person.name, match: matchName });

    for (const person of possibleMatchesArray) {
      person.possibleMatches = person.possibleMatches.filter(
        (name) => name !== matchName
      );
    }
  }

  return finalMatches;
}

// async function pickMatch(person: Person) {
//   let indexOfMatch = Math.floor(Math.random() * person.possibleMatches.length);
//   // while (!person.possibleMatches[indexOfMatch]) {
//   //   indexOfMatch = Math.floor(Math.random() * person.possibleMatches.length);
//   // }
//   const matchName = person.possibleMatches[indexOfMatch];
//   // const matchedPerson = people.filter((person) => person.name !== matchName);
//   // person.addMatch(matchName);

//   return `${person.name}=>${person.possibleMatches[indexOfMatch]}`;
// }
