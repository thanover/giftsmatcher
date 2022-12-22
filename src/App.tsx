import React, { useState, useEffect } from "react";
import "./App.css";
import PeopleManager, {
  PeopleManagerProps,
} from "./components/peopleManager/peopleManager";
import ResultsView, {
  ResultsViewProps,
} from "./components/results/resultsView";
import RulesManager, {
  RulesManagerProps,
} from "./components/rulesManager/rulesManager";
import { Person } from "./models/Person";
import { Rule } from "./models/Rule";
import {
  setPossibiliesOnPeople,
  updatePossibilitiesDueToRuleAdded,
  updatePossibilitiesDueToRuleDeleted,
} from "./utils/matcherUtils";
import { createMatches } from "./utils/matcherUtils";

export type AppFlowState = "start" | "people" | "rules" | "results" | "end";

function App() {
  // const owner: Person = new Person("Admin", "admin@email.com");
  // const [matcher, setMatcher] = useState<Matcher>(new Matcher(owner));
  const [appFlowState, setAppFlowState] = useState<AppFlowState>("people");
  const [people, setPeople] = useState<Person[]>([
    new Person("Bill", "Bill@email.com"),
    new Person("Tom", "Tom@email.com"),
    new Person("Rachel", "Rachel@email.com"),
    new Person("Joe", "Joe@email.com"),
  ]);
  const [rules, setRules] = useState<Rule[]>([]);

  const updatePossibilities = (
    newRule: Rule,
    addOrRemoved: "added" | "deleted"
  ) => {
    if (addOrRemoved === "added")
      updatePossibilitiesDueToRuleAdded(people, newRule);
    if (addOrRemoved === "deleted")
      updatePossibilitiesDueToRuleDeleted(people, newRule);
  };

  const setPossibilies = () => {
    setPossibiliesOnPeople(people);
  };

  const generateResults = () => {
    createMatches(people);
  };

  useEffect(() => {
    if (appFlowState === "start") {
      setPeople([]);
      setRules([]);
    }
    if (appFlowState === "people") setRules([]);
  }, [appFlowState]);

  const peopleManagerProps: PeopleManagerProps = {
    people,
    setPeople,
    appFlowState,
    setAppFlowState,
    setPossibilies,
  };

  const rulesManagerProps: RulesManagerProps = {
    people,
    setPeople,
    rules,
    setRules,
    appFlowState,
    setAppFlowState,
    updatePossibilities,
  };

  const resultsViewProps: ResultsViewProps = {
    people,
  };

  return (
    <div className="bg-slate-900 text-white">
      {<PeopleManager {...peopleManagerProps} />}
      {appFlowState !== "start" && appFlowState !== "people" && (
        <RulesManager {...rulesManagerProps} />
      )}
      {appFlowState !== "start" && appFlowState !== "people" && (
        <button onClick={generateResults}>Generate Results</button>
      )}
      {appFlowState === "results" && <ResultsView {...resultsViewProps} />}
    </div>
  );
}

export default App;
