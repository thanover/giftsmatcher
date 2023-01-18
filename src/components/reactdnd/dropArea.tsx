import React, { useEffect } from "react";
import { useDrop } from "react-dnd";
import { DraggablePerson } from "./draggablePerson";

export interface DropAreaProps {
  items: { name: string }[];
  setItems: Function;
}

export function DropArea(props: DropAreaProps) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "personBox",
    drop: (item: { name: string }) => {
      props.setItems(item);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`${
        isOver ? "bg-slate-300" : "bg-slate-500"
      } h-96 w-96 p-6 m-6`}
    >
      {props.items.map((item) => (
        <DraggablePerson name={item.name} key={item.name} />
      ))}
    </div>
  );
}
