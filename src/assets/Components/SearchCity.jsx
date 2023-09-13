import { useState } from "react";

const SearchCity = () => {
  const [disable, setDisable] = useState(true); //Disable search btn

  let inputValue = document.getElementById("input_currentCity");

  // Catch the value when the user write the city in the Input
  const searchCurrentCity = () => {
    console.log(inputValue.value)
    setCity(inputValue.value);
  };

  const resetSearch = () => {
    inputValue.value = "";
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

export default SearchCity;
