import { useState } from "react";

//React-icons
import { MdNightlight } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";

import "../Styles/darkMode.css";

const DarkMode = () => {
  const [dark, setDark] = useState(true);

  const handleDarkMode = () => {
    const toggleDark = document.getElementsByTagName("body")[0];
    toggleDark.classList.toggle("bodyBackground");

    if (dark) {
      document.getElementById("moon").style.display = "none";
      document.getElementById("sun").style.display = "block";
    } else {
      document.getElementById("moon").style.display = "block";
      document.getElementById("sun").style.display = "none";
    }
    setDark(!dark);
  };

  return (
    <>
      <div id="darkMode">
        <div id="moon">
          <MdNightlight size={"2em"} onClick={handleDarkMode} />
        </div>
        <div id="sun" className="sun">
          <MdOutlineLightMode size={"2em"} onClick={handleDarkMode} />
        </div>
      </div>
    </>
  );
};

export default DarkMode;
