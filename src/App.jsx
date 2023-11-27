import { useState } from "react";
import { Routes, Route } from "react-router-dom";

//Components
import CurrentLocation from "./assets/Components/CurrentLocation";
import SearchedCity from "./assets/Components/SearchedCity";
import DarkMode from "./assets/Components/DarkMode";

//Context
import ThemeContext from "./assets/context/themeContext";

//Styles
import "./App.css";

const App = () => {
  const [theme, setTheme] = useState(true);

  const changeTheme = () => {
    return setTheme(!theme);
  };

  return (
    <>
      <ThemeContext.Provider value={theme}>
        <DarkMode changeTheme={changeTheme} />
        <div className="app_container">
          <Routes>
            <Route path="/" element={<CurrentLocation />} />
            <Route path="/city/:city" element={<SearchedCity />} />
            <Route path="*" element={<CurrentLocation />} />
          </Routes>
        </div>
      </ThemeContext.Provider>
    </>
  );
};

export default App;
