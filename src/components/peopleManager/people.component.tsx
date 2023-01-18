import React, { useEffect, useState } from "react";
import { Person } from "../../models/Person";
import NewPersonForm from "./newPersonForm.component";
import PersonCard from "./personCard.component";

function People() {
  const [people, setPeople] = useState<Person[]>([]);
  const [numOfRestrictions, setNumOfRestrictions] = useState<number>(0);
  // const [maxNumOfRestrictions, setMaxNumOfRestrictions] = useState<number>(0);
  const [showRestrictions, setShowRestrictions] = useState<boolean>(false);

  const minNumOfPeople = 3;
  const maxNumOfPeople = 10;

  const addPerson = (name: string, email?: string) => {
    const newPerson = email ? new Person(name, email) : new Person(name);
    people.forEach((person) => {
      person.updateDueToAddedPerson(name);
      newPerson.possibleMatches.push(person.name);
    });
    setPeople([...people, newPerson]);
  };

  const deletePerson = (person: Person) => {
    if (person.restrictedMatches.length > 1) {
      person.restrictedMatches.forEach((restrictedName) => {
        deleteRestriction(person.name, restrictedName);
      });
    }

    people.forEach((_person) => {
      _person.updateDueToDeletedPerson(person.name);
    });
    setPeople(people.filter((_person) => _person.name !== person.name));
  };

  const validateField = (field: "email" | "name", value: string) => {
    return people.filter((person) => person[field] === value).length < 1;
  };

  const addRestriction = (person1: string, person2: string) => {
    people.forEach((person) => {
      if (person.name === person1) person.addRestrictedName(person2);
      if (person.name === person2) person.addRestrictedName(person1);
    });
    setNumOfRestrictions(numOfRestrictions + 1);
  };

  const deleteRestriction = (person1: string, person2: string) => {
    people.forEach((person) => {
      if (person.name === person1) person.removeRestrictedName(person2);
      if (person.name === person2) person.removeRestrictedName(person1);
    });
    setNumOfRestrictions(numOfRestrictions - 1);
  };

  useEffect(() => {
    const updateShowRestrictions = () => {
      let maxRestrictions = people.length;
      if (people.length === 4) maxRestrictions = 2;
      if (people.length <= 3) maxRestrictions = 0;
      setShowRestrictions(maxRestrictions - numOfRestrictions > 0);
    };

    updateShowRestrictions();
  }, [people, numOfRestrictions]);

  return (
    <div className="flex-col bg-slate-700 h-fit m-2 rounded-lg border-2 border-slate-700 shadow-xlg shadow-slate-800/50">
      <div className="flex flex-col">
        <div className="p-6 pb-0">
          <h1 className="text-xl font-bold m-2">Add Participant</h1>
          {people.length < maxNumOfPeople && (
            <NewPersonForm {...{ validateField, addPerson }} />
          )}
          {people.length >= maxNumOfPeople && "There is a max of 10 people"}
        </div>

        {people.length > 0 && (
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
        )}
      </div>
      <div className="p-6 flex flex-row-reverse">
        <div className="text-red-800">
          {people.length < minNumOfPeople && (
            <div>You must have atleast 3 people to continue</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default People;
