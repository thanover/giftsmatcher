import { Dispatch, SetStateAction } from "react";
import { Person } from "./Person";
import { Rule } from "./Rule";

export class Matcher {
  owner: Person;
  people: Person[];
  rules: Rule[];
  matchResult: Record<string, string>[] | undefined;

  constructor(owner: Person) {
    this.owner = owner;
    this.people = [];
    this.rules = [];
  }
}

export type MatcherProps = {
  matcher: Matcher;
  setMatcher: Dispatch<SetStateAction<Matcher>>;
};
