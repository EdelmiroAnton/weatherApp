/* eslint-disable react/prop-types */
import { useContext } from "react";

//React-icons
import { MdNightlight } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";

//Context
import ThemeContext from "../context/themeContext";

//Styles
import "../Styles/darkMode.css";

const DarkMode = ({ changeTheme }) => {
  const theme = useContext(ThemeContext);

  const handleDarkMode = () => {
    //Show the sun and the moon icon
    if (theme) {
      document.getElementById("moon").style.display = "none";
      document.getElementById("sun").style.display = "block";
    } else {
      document.getElementById("moon").style.display = "block";
      document.getElementById("sun").style.display = "none";
    }
    changeTheme(); //true or false

    Object.assign(document.getElementsByTagName("body")[0].style, {
      backgroundColor: theme ? "#0c151d" : "whitesmoke",
      color: theme ? "whitesmoke" : "black",
    });
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
