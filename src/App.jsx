import { Routes, Route } from "react-router-dom";

//Components
import CurrentLocation from "./assets/Components/CurrentLocation";
import SearchedCity from "./assets/Components/SearchedCity";

import "./App.css";
const App = () => {
  return (
    <div className="app_container">
      <Routes>
        <Route path="/" element={<CurrentLocation />} />
        <Route path="/city/:city" element={<SearchedCity />} />
        <Route path="*" element={<CurrentLocation />} />
      </Routes>
    </div>
  );
};

export default App;
