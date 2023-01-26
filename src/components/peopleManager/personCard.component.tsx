import React from "react";
import { Person } from "../../models/Person";
import { PossibleMatch } from "./possibleMatch.component";
import { Tooltip } from "flowbite-react";

export type PeopleCardProps = {
  person: Person;
  deletePerson: Function;
  addRestriction: Function;
  deleteRestriction: Function;
  showRestrictions: boolean;
};

function PeopleCard(props: PeopleCardProps) {
  return (
    <div className="flex flex-col items-center w-fit m-2 h-fit bg-slate-600 p-4 rounded-lg">
      <div className="flex w-60 h-fit items-center pb-2">
        <div className="flex">
          <div className="text-base font-bold">
            <p className="text-zinc-200 leading-none">{props.person.name}</p>
            <p className="text-zinc-400">{props.person.email}</p>
          </div>
        </div>
        <div className="flex justify-end w-full">
          <div className="">
            <button
              className="p-1"
              onClick={() => props.deletePerson(props.person)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 hover:text-red-500"
              >
                <path
                  fillRule="evenodd"
                  d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="w-full mb-4 p-4 bg-slate-500 rounded-lg">
        <div className="flex items-center">
          <div>Can match with</div>
          <Tooltip
            content="Toggle to remove from possible matches"
            // eslint-disable-next-line react/style-prop-object
            style="dark"
          >
            <div className="flex ml-2 items-center justify-center rounded-full bg-slate-600 text-sm h-4 w-4">
              <div>?</div>
            </div>
          </Tooltip>
        </div>
        <ul className="flex flex-col p-2">
          {props.person.possibleMatches.map((possibleMatchName) => {
            return (
              <li key={possibleMatchName}>
                <PossibleMatch
                  {...{
                    name: possibleMatchName,
                    addRestriction: props.addRestriction,
                    deleteRestriction: props.deleteRestriction,
                    showRestrictions: props.showRestrictions,
                  }}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default PeopleCard;
