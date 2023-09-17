import { useState } from "react";

const Search = () => {
  const [disable, setDisable] = useState(true); //Disable search btn

  // Catch the value when the user write the city in the Input
  let inputValue = document.getElementById("input_currentCity");
  const searchCurrentCity = () => {};

  const resetSearch = () => {
    inputValue.value = "";
    setDisable(true)
  };

  const disableSearchBtn = () => {
    if (inputValue.value.length >= 3) {
      setDisable(false);
    }

    if (inputValue.value.length < 3) {
      setDisable(true);
    }
  };

  return (
    <>
      <input type="text" id="input_currentCity" onChange={disableSearchBtn} />
      <button onClick={searchCurrentCity} disabled={disable}>
        Search
      </button>
      <button onClick={resetSearch}>Reset</button>
    </>
  );
};

export default Search;
