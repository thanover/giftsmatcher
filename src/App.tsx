import React from "react";
import "./App.css";
import People from "./components/peopleManager/people.component";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="bg-slate-900 flex flex-col h-screen justify-between text-zinc-100">
        {/* HEADER */}
        <header className="h-64 flex justify-center">
          <div>HEADER</div>
        </header>
        <main className="w-full mb-auto flex-col justify-center pl-60 pr-60">
          <People />
        </main>
        <footer className="h-32 flex justify-center">
          <div>FOOTER STUFF</div>
        </footer>
      </div>
    </DndProvider>
  );
}

export default App;
