import React from "react";
import logo from "./logo.svg";
import "./App.css";
import DeleteButton from "./DeleteButton";
import { ConfirmationDialogProvider } from "./ConfirmationDialog";

function App() {
  return (
    <ConfirmationDialogProvider>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <DeleteButton />
        </header>
      </div>
    </ConfirmationDialogProvider>
  );
}

export default App;
