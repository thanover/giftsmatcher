import React from "react";
import { checkCircleIcon } from "./checkCircle.icon";
import { ToggleButton, ToggleButtonProps } from "./toggleButton.component";
import { xCircleIcon } from "./xCircle.icon";

export interface CheckOrXToggleButtonProps {
  isActive: boolean;
  actionOnClick: Function;
}

export function CheckOrXToggleButton(props: CheckOrXToggleButtonProps) {
  const toggleButtonProps: ToggleButtonProps = {
    isActive: props.isActive,
    activeOnStyle:
      "bg-lime-800 text-lime-600  hover:bg-lime-600 hover:text-lime-800",
    inactiveOnStyle: "text-lime-700 ",
    activeOffStyle:
      "bg-red-900 text-red-600  hover:bg-red-600 hover:text-red-900",
    inactiveOffStyle: "text-red-600 ",
    isOnIcon: checkCircleIcon,
    isOffIcon: xCircleIcon,
    actionOnClick: props.actionOnClick,
  };

  return <ToggleButton {...toggleButtonProps}></ToggleButton>;
}
