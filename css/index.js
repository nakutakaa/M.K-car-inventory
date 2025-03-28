document.addEventListener("DOMContentLoaded", () => {
  const carsContainer = document.getElementById("cars-container");
  const addCarForm = document.getElementById("add-car-form");
  const versionInputs = document.querySelector(".version-inputs");
  const addVersionBtn = document.getElementById("add-version-btn");
  let currentCarId = null;

    addVersionInput();
    



    addVersionBtn.addEventListener("click", addVersionInput);
    addCarForm.addEventListener("submit", handleFormSubmit);


    loadCars();
});    