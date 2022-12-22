import React, { useState, useEffect } from "react";
import { Person } from "../../models/Person";
import { Rule } from "../../models/Rule";
import PersonSelector from "./personSelector";

export type RuleCreatorProps = {
  people: Person[];
  addRule: (newRule: Rule) => void;
};

function RuleCreator(props: RuleCreatorProps) {
  const [person1, setPerson1] = useState<Person>(new Person("null"));
  const [person2, setPerson2] = useState<Person>(new Person("null"));

  useEffect(() => {}, [person1, person2]);

  const createRule = () => {
    const newRule = new Rule(person1, person2, "cantMatch");
    props.addRule(newRule);
    setPerson1(new Person("null"));
    setPerson2(new Person("null"));
  };

  const inputStyle: string =
    "form-input px-1 py-1 rounded text-slate-300 bg-slate-700 border-0";

  return (
    <>
      Person 1: {JSON.stringify(person1)} Person 2: {JSON.stringify(person2)}
      <div className={inputStyle}>
        <PersonSelector
          peopleChoices={props.people.filter(
            (person) => person.possibleMatches.length > 2
          )}
          setPerson={setPerson1}
        />
      </div>
      <div className={inputStyle}>
        {person1.name !== "null" && (
          <PersonSelector
            peopleChoices={props.people.filter((person) =>
              person1.possibleMatches.includes(person.name)
            )}
            setPerson={setPerson2}
          />
        )}
      </div>
      {person1.name !== "null" && person2.name !== "null" && (
        <button onClick={createRule}>Create Rule</button>
      )}
    </>
  );
}

export default RuleCreator;
