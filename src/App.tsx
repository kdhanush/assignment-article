import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Articles from "./pages/Articles";
import "./App.css";
import { Toaster } from "sonner";

function App() {
  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/articles/:id" Component={Articles} />
        </Routes>
      </Router>
      {/*added react sonner toast and position*/}
      <Toaster position="top-right" richColors />
    </div>
  );
}

export default App;
