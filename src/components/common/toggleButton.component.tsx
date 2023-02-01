import React, { useState } from "react";

export interface ToggleButtonProps {
  isActive: boolean;
  activeOnStyle: string;
  inactiveOnStyle: string;
  activeOffStyle: string;
  inactiveOffStyle: string;
  isOnIcon: JSX.Element;
  isOffIcon: JSX.Element;
  actionOnClick: Function;
}

export function ToggleButton(props: ToggleButtonProps) {
  const [isOn, setIsOn] = useState<boolean>(true);

  const style = `${
    props[
      `${props.isActive ? "active" : "inactive"}${isOn ? "On" : "Off"}Style`
    ]
  } w-fit h-fit rounded-full ${props.isActive && "cursor-pointer"}`;

  const onClick = () => {
    setIsOn(!isOn);
    props.actionOnClick(!isOn);
  };

  return (
    <div onClick={props.isActive ? onClick : undefined} className={style}>
      {isOn ? props.isOnIcon : props.isOffIcon}
    </div>
  );
}
