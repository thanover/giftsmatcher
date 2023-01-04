import React, { useEffect } from "react";
import { AppFlowState } from "../../App";
import { Person } from "../../models/Person";
import NewPersonForm, { NewPersonFormProps } from "./newPersonForm";
import PeopleCard from "./peopleCard";

export type PeopleManagerProps = {
  people: Person[];
  setPeople: React.Dispatch<React.SetStateAction<Person[]>>;
  appFlowState: AppFlowState;
  setAppFlowState: React.Dispatch<React.SetStateAction<AppFlowState>>;
  setPossibilies: () => Promise<void>;
};

function PeopleManager(props: PeopleManagerProps) {
  const minNumOfPeople = 3;
  const maxNumOfPeople = 10;

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

  const setPeople = async () => {
    await props.setPossibilies();
    props.setAppFlowState("rules");
  };

  const moveToPeopleAppFlowState = () => {
    props.setAppFlowState("people");
  };

  useEffect(() => {}, [props.appFlowState, props.people]);

  return (
    <div className="flex flex-col">
      <h1 className="text-xl font-bold p-6 text-center border-b-2">
        Participants
      </h1>
      <div className="flex flex-col p-6 pb-0">
        {props.appFlowState === "people" &&
          props.people.length < maxNumOfPeople && (
            <div className="bg-slate-800 rounded-xl p-4">
              <NewPersonForm {...newPersonFormProps} />
            </div>
          )}
        {props.people.length > 0 && (
          <div className="p-2 flex flex-wrap h-fit">
            {props.people.map((person) => (
              <PeopleCard
                {...{
                  name: person.name,
                  email: person.email,
                  deletePerson,
                  appFlowStateIsPeople: props.appFlowState === "people",
                }}
              />
            ))}
          </div>
        )}
      </div>
      <div className="p-6 flex flex-row-reverse">
        <div>
          {props.people.length >= minNumOfPeople &&
            props.appFlowState === "people" && (
              <button onClick={setPeople}>Set People</button>
            )}
          {!(props.appFlowState === "people") && (
            <button onClick={moveToPeopleAppFlowState}>
              Edit People (you will loose any rules you have created)
            </button>
          )}
        </div>
        <div className="text-red-800">
          {props.people.length < minNumOfPeople && (
            <div>You must have atleast 3 people to continue</div>
          )}

          {props.people.length >= maxNumOfPeople && (
            <div>Max number of 10 people reached!</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PeopleManager;
