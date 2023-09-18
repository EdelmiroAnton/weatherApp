import { Routes, Route } from "react-router-dom";

//Components
import Current from "./assets/Components/Current";
import SearchedCity from "./assets/Components/SearchedCity";

import "./App.css"
const App = () => {
  return (
    <div className="app_container">
      <Routes>
        <Route path="/" element={<Current />} />
        <Route path="/city/:city" element={<SearchedCity />} />
        <Route path="*" element={<Current />} />
      </Routes>
    </div>
  );
};

export default App;
