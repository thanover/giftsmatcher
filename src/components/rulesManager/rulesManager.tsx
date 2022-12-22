import React, { useState, useEffect } from "react";
import { AppFlowState } from "../../App";
import { Person } from "../../models/Person";
import { Rule } from "../../models/Rule";
import RuleCreator, { RuleCreatorProps } from "./ruleCreator";

export type RulesManagerProps = {
  people: Person[];
  setPeople: React.Dispatch<React.SetStateAction<Person[]>>;
  rules: Rule[];
  setRules: React.Dispatch<React.SetStateAction<Rule[]>>;
  appFlowState: AppFlowState;
  setAppFlowState: React.Dispatch<React.SetStateAction<AppFlowState>>;
  updatePossibilities: (
    newRule: Rule,
    addOrRemove: "added" | "deleted"
  ) => void;
};

function RulesManager(props: RulesManagerProps) {
  const [creatingRule, setCreatingRule] = useState<boolean>(false);
  const [maxNumOfRules, setMaxNumOfRules] = useState<number>(0);

  const deleteRule = (ruleToDelete: Rule) => {
    props.setRules(props.rules.filter((rule) => rule.key !== ruleToDelete.key));
    props.updatePossibilities(ruleToDelete, "deleted");
  };

  const addRule = (ruleToAdd: Rule) => {
    props.setRules([...props.rules, ruleToAdd]);
    props.updatePossibilities(ruleToAdd, "added");
    setCreatingRule(false);
  };

  useEffect(() => {
    setMaxNumOfRules(props.people.length - props.rules.length);
    if (props.people.length === 4) setMaxNumOfRules(2 - props.rules.length);
    if (props.people.length <= 3) setMaxNumOfRules(0);
  }, [props.people, props.rules]);

  const ruleCreatorProps: RuleCreatorProps = {
    people: props.people,
    addRule,
  };

  return (
    <>
      <h1 className="text-xl font-bold p-3">Rules Manager</h1>
      <p>maxNumOfRules: {maxNumOfRules}</p>
      {props.rules.length > 0 &&
        props.rules.map((rule) => (
          <li className="p-2" key={rule.key}>
            Person1: {rule.person1.name} Person2: {rule.person2.name}
            <button
              className="bg-red-600 rounded-full px-1 ml-3 hover:bg-red-800"
              onClick={() => deleteRule(rule)}
            >
              Delete
            </button>
          </li>
        ))}
      {maxNumOfRules > 0 && (
        <>
          <button onClick={() => setCreatingRule(true)}>Create New Rule</button>
          <div>{creatingRule && <RuleCreator {...ruleCreatorProps} />}</div>
        </>
      )}
    </>
  );
}

export default RulesManager;
