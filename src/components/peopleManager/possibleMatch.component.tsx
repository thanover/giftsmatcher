import React from "react";
import { CheckOrXToggleButton } from "../common/checkOrXToggleButton.component";

export interface PossibleMatchProps {
  name: string;
  addRestriction: Function;
  deleteRestriction: Function;
  showRestrictions: boolean;
}

export function PossibleMatch({ name }: { name: string }) {
  return (
    <div className="flex h-fit rounded-lg p-1">
      <div className="">
        <CheckOrXToggleButton
          isActive={true}
          actionOnClick={(isOn: boolean) => {
            console.log(`clicked and ${isOn ? "is On" : "is Off"}`);
          }}
        />
      </div>
      <div className="pl-2">{name}</div>
    </div>
  );
}
