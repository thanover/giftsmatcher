import React, { useEffect, useState } from "react";
import { Person } from "../../models/person";
import NewPersonForm from "./addPersonForm.component";

function People() {
  const [people, setPeople] = useState<Person[]>([]);

  const addPerson = (name: string, email?: string) => {
    const newPerson = email ? new Person(name, email) : new Person(name);

    people.forEach((person) => {
      newPerson.possibleMatches.push(person.name);
      person.possibleMatches.push(newPerson.name);
    });
    setPeople([...people, newPerson]);
  };

  function removePerson(nameToRemove: string) {
    people.forEach((person) => {
      person.possibleMatches = person.possibleMatches.filter((name) => {
        name !== nameToRemove;
      });
      person.restrictedMatches = person.restrictedMatches.filter((name) => {
        name !== nameToRemove;
      });
    });
    setPeople(people.filter((person) => person.name !== nameToRemove));
  }

  const validateField = (field: "email" | "name", value: string) => {
    return people.filter((person) => person[field] === value).length < 1;
  };

  useEffect(() => {}, [people]);

  return (
    <div className="flex-col bg-slate-700 h-fit m-2 rounded-lg border-2 border-slate-700 shadow-xlg shadow-slate-800/50">
      <div className="flex flex-col">
        <div className="p-6 pb-0">
          <h1 className="text-xl font-bold m-2">Add Participant</h1>
          <NewPersonForm {...{ validateField, addPerson }} />
        </div>

        {/* {people.length > 0 && (
          <div className="p-6 flex flex-wrap h-fit">
            {people.map((person) => (
              <PersonCard
                key={person.name}
                {...{
                  people,
                  person,
                  deletePerson,
                  addRestriction,
                  deleteRestriction,
                  showRestrictions,
                }}
              />
            ))}
          </div>
        )} */}
      </div>
      <div className="p-6 flex flex-row-reverse">
        <div className="text-red-800">
          {/* {people.length < minNumOfPeople && (
            <div>You must have atleast 3 people to continue</div>
          )} */}
        </div>
      </div>
    </div>
  );
}

export default People;
