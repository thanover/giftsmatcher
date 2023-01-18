import React from "react";

export type SectionProps = {
  title: string;
  subTitle?: string;
  children: JSX.Element;
};

function Section(props: SectionProps) {
  return (
    <div className="flex-col bg-slate-700 h-fit m-2 rounded-lg border-2 border-slate-700 shadow-xlg shadow-slate-800/50">
      <div className="flex flex-col">
        <h1 className="text-xl font-bold p-6 pb-0">{props.title}</h1>
        <h3 className="text-m p-6 pt-0 border-b-2">{props.subTitle}</h3>
        {props.children}
      </div>
    </div>
  );
}

export default Section;
