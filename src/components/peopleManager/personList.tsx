import React, { useEffect } from "react";
import { Person } from "../../models/Person";

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
        <li className="p-2" key={person.name}>
          Name: {person.name} Email: {person.email}
          {appFlowStateIsPeople && (
            <button
              className="bg-red-600 rounded-full px-1 ml-3 hover:bg-red-800"
              onClick={() => deletePerson(person.name)}
            >
              Delete
            </button>
          )}
        </li>
      ))}
    </>
  );
}

export default PeopleList;
