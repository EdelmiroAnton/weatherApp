//Components
import { Routes, Route } from "react-router-dom";
import Current from "./assets/Components/Current";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Current />} />
        <Route path="*" element={<Current />} />
      </Routes>
    </>
  );
};

export default App;
