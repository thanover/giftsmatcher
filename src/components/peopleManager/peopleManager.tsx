import React, { useEffect, useState } from "react";
import { AppFlowState } from "../../App";
import { Person } from "../../models/Person";
import NewPersonForm, { NewPersonFormProps } from "./newPersonForm";
import PeopleList from "./personList";

export type PeopleManagerProps = {
  people: Person[];
  setPeople: React.Dispatch<React.SetStateAction<Person[]>>;
  appFlowState: AppFlowState;
  setAppFlowState: React.Dispatch<React.SetStateAction<AppFlowState>>;
  setPossibilies: () => void;
};

function PeopleManager(props: PeopleManagerProps) {
  const minNumOfPeople = 3;
  const maxNumOfPeople = 10;

  const [appFlowStateIsPeople, setAppFlowStateIsPeople] = useState<boolean>(
    props.appFlowState === "people"
  );

  const addPerson = (newPerson: Person) => {
    props.setPeople([...props.people, newPerson]);
  };

  const deletePerson = (name: string) => {
    props.setPeople(props.people.filter((person) => person.name !== name));
  };

  const validateField = (field: "email" | "name", value: string) => {
    return props.people.filter((person) => person[field] === value).length < 1;
  };

  const newPersonFormProps: NewPersonFormProps = {
    validateField,
    addPerson,
  };

  const setPeople = () => {
    props.setPossibilies();
    props.setAppFlowState("rules");
  };

  const moveToPeopleAppFlowState = () => {
    props.setAppFlowState("people");
  };

  useEffect(() => {
    setAppFlowStateIsPeople(props.appFlowState === "people");
  }, [props.appFlowState, props.people]);

  return (
    <>
      <h1 className="text-xl font-bold p-3">People Manager</h1>
      {appFlowStateIsPeople && props.people.length < maxNumOfPeople && (
        <NewPersonForm {...newPersonFormProps} />
      )}
      {props.people.length > 0 && (
        <PeopleList
          people={props.people}
          deletePerson={deletePerson}
          appFlowStateIsPeople={appFlowStateIsPeople}
        />
      )}
      {props.people.length >= minNumOfPeople && appFlowStateIsPeople && (
        <button onClick={setPeople}>Set People</button>
      )}
      {props.people.length < minNumOfPeople && (
        <div>You must have atleast 3 people to continue</div>
      )}
      {!appFlowStateIsPeople && (
        <button onClick={moveToPeopleAppFlowState}>
          Edit People (you will loose any rules you have created)
        </button>
      )}
      {props.people.length >= maxNumOfPeople && (
        <div>Max number of 10 people reached!</div>
      )}
    </>
  );
}

export default PeopleManager;
