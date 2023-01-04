import React, { useEffect } from "react";
import { Person } from "../../models/Person";
import PeopleCard from "./peopleCard";

function PeopleList({
  people,
  deletePerson,
  appFlowStateIsPeople,
}: {
  people: Person[];
  deletePerson: Function;
  appFlowStateIsPeople: boolean;
}) {
  useEffect(() => {}, [appFlowStateIsPeople]);

  return (
    <>
      {people.map((person) => (
        <PeopleCard
          {...{
            name: person.name,
            email: person.email,
            deletePerson,
            appFlowStateIsPeople,
          }}
        />
      ))}
    </>
  );
}

export default PeopleList;
