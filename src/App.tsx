import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import People from "./components/people/people.component";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="bg-slate-900 flex flex-col h-screen justify-between text-zinc-100">
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
  );
}

export default App;
