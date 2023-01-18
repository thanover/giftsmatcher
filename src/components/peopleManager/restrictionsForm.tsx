import React from "react";
import { Person } from "../../models/Person";

export type RestrictionsFormsProps = {
  person: Person;
  addRestriction: Function;
};

function RestrictionsForm(props: RestrictionsFormsProps) {
  const handleChange = (event: any) => {
    if (event.target.value !== "default") {
      props.addRestriction(props.person.name, event.target.value);
    }
  };

  return (
    <div className="pt-2">
      <span>Add a Restriction</span>
      <br />
      <span> {props.person.name} can't match with:</span>
      <select
        name="nameToRestrict"
        onChange={handleChange}
        className="bg-slate-400 pl-1 pt-0 pb-0 text-base"
      >
        <option key="" value="default"></option>
        {props.person.possibleMatches.map((possibleMatch) => {
          return (
            <option key={possibleMatch} value={possibleMatch}>
              {possibleMatch}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default RestrictionsForm;
