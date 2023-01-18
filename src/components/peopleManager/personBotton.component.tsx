import React, { useState } from "react";
import Toggle from "./toggleButton.component";

export interface PersonButtonProps {
  name: string;
  addRestriction: Function;
  deleteRestriction: Function;
  showRestrictions: boolean;
}

export function PersonButton({ name }: { name: string }) {
  return (
    <div className="flex items-center p-2 m-2 h-fit w-fit rounded-lg">
      <div className="pr-4">{name}?</div>
      <Toggle />
    </div>
  );
}
