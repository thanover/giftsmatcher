import React from "react";
import { useDrag } from "react-dnd";

export interface DraggablePersonProps {
  name: string;
}

export function DraggablePerson(props: DraggablePersonProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "personBox",
    item: { name: props.name },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} className={isDragging ? "border-2 border-fuchsia-700" : ""}>
      {props.name}
    </div>
  );
}
