//Components
import { Routes, Route } from "react-router-dom";

//Components
import Current from "./assets/Components/Current";
import SearchedCity from "./assets/Components/SearchedCity";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Current />} />
        <Route path="/searched-city" element={<SearchedCity />} />
        <Route path="*" element={<Current />} />
      </Routes>
    </>
  );
};

export default App;
