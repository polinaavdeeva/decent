import React from "react";
import { Route, Routes } from "react-router-dom";
import CountryPage from "../CountryPage/CountryPage";
import Country from "../Country/Country";

function App() {
  return (
    <Routes>
      <Route path="/" element={<CountryPage />}></Route>
      <Route path="/:name" element={<Country />}></Route>
    </Routes>
  );
}

export default App;
