import { Puff } from "react-loader-spinner";
import "../Styles/loader.css";

const Loader = () => {
  return (
    <div className="loader">
      <div className="loader_text">Buscando tu ubicación</div>
      <div className="loader_spinner">
        <Puff />
      </div>
    </div>
  );
};

export default Loader;
