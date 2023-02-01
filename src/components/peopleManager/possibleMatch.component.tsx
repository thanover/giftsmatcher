import React from "react";
import { CheckOrXToggleButton } from "../common/checkOrXToggleButton.component";

export interface PossibleMatchProps {
  personName: string;
  possibleMatchName: string;
  addRestriction: Function;
  deleteRestriction: Function;
  showRestrictions: boolean;
}

export function PossibleMatch(props: PossibleMatchProps) {
  return (
    <div className="flex h-fit rounded-lg p-1">
      <div className="">
        <CheckOrXToggleButton
          isActive={true}
          actionOnClick={(isOn: boolean) => {
            if (isOn)
              return props.deleteRestriction(
                props.personName,
                props.possibleMatchName
              );

            return props.addRestriction(
              props.personName,
              props.possibleMatchName
            );
          }}
        />
      </div>
      <div className="pl-2">{props.possibleMatchName}</div>
    </div>
  );
}
