import React, { useEffect } from "react";
import { finalResult } from "../../utils/matcherUtils";

export type ResultsViewProps = {
  finalResults: finalResult;
};

function ResultsView(props: ResultsViewProps) {
  useEffect(() => {}, [props.finalResults]);
  return (
    <>
      {props.finalResults.length > 0 &&
        props.finalResults.map((person) => (
          <li className="p-2" key={person.name}>
            <div>Person: {person.name}</div>
            Match: {person.match}
          </li>
        ))}
    </>
  );
}

export default ResultsView;
