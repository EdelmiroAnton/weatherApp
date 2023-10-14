import { MdNightlight } from "react-icons/md";
import "../Styles/darkMode.css";
const DarkMode = () => {

  const handleDarkMode = () => {
    const toggleDark = document.getElementsByTagName("body")[0];
    toggleDark.classList.toggle("bodyBackground");
  };

  return (
    <>
      <div id="darkMode">
        <MdNightlight size={"2em"} onClick={handleDarkMode} />
      </div>
    </>
  );
};

export default DarkMode;
