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
  finalResult,
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
  const [finalResults, setFinalResults] = useState<finalResult>([]);
  const [resultsLoading, setResultsLoading] = useState<boolean>(false);

  const updatePossibilities = (
    newRule: Rule,
    addOrRemoved: "added" | "deleted"
  ) => {
    if (addOrRemoved === "added")
      updatePossibilitiesDueToRuleAdded(people, newRule);
    if (addOrRemoved === "deleted")
      updatePossibilitiesDueToRuleDeleted(people, newRule);
  };

  const setPossibilies = async () => {
    setPeople(await setPossibiliesOnPeople(people));
  };

  const generateResults = async () => {
    setResultsLoading(true);
    setFinalResults(await createMatches(people));
    setResultsLoading(false);
    setAppFlowState("results");
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
    finalResults,
  };

  return (
    <div className="h-screen flex flex-col h-screen justify-between">
      {/* HEADER */}
      <header className="h-64 flex justify-center">
        <div>HEADER</div>
      </header>
      {/* MAIN SECTION */}
      <main className="w-full mb-auto flex-col justify-center pl-60 pr-60">
        {/* PEOPLE MANAGER */}
        <div className="flex-col bg-slate-700 h-fit m-2 rounded-lg">
          {<PeopleManager {...peopleManagerProps} />}
        </div>

        {/* RESTRICTONS MANAGER */}

        {appFlowState !== "start" &&
          appFlowState !== "people" &&
          people.length >= 3 && (
            <div className="flex-col bg-slate-700 h-fit m-2 rounded-lg">
              <RulesManager {...rulesManagerProps} />
              <button onClick={generateResults}>Generate Results</button>
            </div>
          )}

        {/* RESULTS */}

        {appFlowState === "results" && !resultsLoading && (
          <div className="flex-col bg-slate-700 h-fit m-2 rounded-lg">
            <ResultsView {...resultsViewProps} />
          </div>
        )}
      </main>

      <footer className="h-32 flex justify-center">
        <div>FOOTER STUFF</div>
      </footer>
    </div>
  );
}

export default App;
