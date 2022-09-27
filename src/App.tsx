import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Export from "./pages/Export";
import Import from "./pages/Import";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Export />} />
      <Route path="/import" element={<Import />} />
    </Routes>
  );
};

export default App;
