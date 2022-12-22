import React, { useState } from "react";
import { Person } from "../../models/Person";

export type PersonSelectorProps = {
  peopleChoices: Person[];
  setPerson: React.Dispatch<React.SetStateAction<Person>>;
};

function PersonSelector(props: PersonSelectorProps) {
  const [value, setValue] = useState<string>("null");

  const handleChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    const person = props.peopleChoices.find(
      (person) => person.name === e.target.value
    );
    if (!person) return;
    props.setPerson(person);
    setValue(person.name);
  };

  return (
    <>
      <label htmlFor="person">Choose a Person to create a Rule For:</label>
      <select onChange={handleChange} value={value}>
        <option value="null">Select A Person</option>
        {props.peopleChoices.map((person) => (
          <option value={person.name} key={person.name}>
            {person.name}
          </option>
        ))}
      </select>
      );
    </>
  );
}

export default PersonSelector;
