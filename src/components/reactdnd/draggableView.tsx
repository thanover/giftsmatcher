import React, { useState, useEffect } from "react";
import { DropArea } from "./dropArea";

export interface DraggableViewProps {}

export function DraggableView(props: DraggableViewProps) {
  const [box1names, setBox1Names] = useState<{ name: string }[]>([
    { name: "Bob" },
    { name: "Sally" },
  ]);
  const [box2names, setBox2Names] = useState<{ name: string }[]>([
    { name: "Jill" },
    { name: "Joe" },
  ]);

  const updateBox1 = (item: { name: string }) => {
    setBox1Names([...box1names, item]);
    setBox2Names(box2names.filter((_item) => _item.name !== item.name));
  };

  const updateBox2 = (item: { name: string }) => {
    setBox2Names([...box2names, item]);
    setBox1Names(box1names.filter((_item) => _item.name !== item.name));
  };

  useEffect(() => {}, [box1names, box2names]);

  return (
    <>
      {/* <div className="bg-slate-500 h-96 w-96 p-6 m-6">
        Area 1
        <br />
        {box1names.map((item) => (
          <div>{item.name}</div>
        ))}
      </div> */}

      <DropArea items={box1names} setItems={updateBox1} />

      <DropArea items={box2names} setItems={updateBox2} />

      {/* <div className="bg-slate-500 h-96 w-96 p-6 m-6">
        Area 2<br />
        {box2names.map((item) => (
          <div>{item.name}</div>
        ))}
      </div> */}
    </>
  );
}
