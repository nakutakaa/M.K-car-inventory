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



    function addVersionInput(version = { condition: "", price: "", image: "" }) {
    const versionId = Date.now();
    const group = document.createElement("div");
    group.className = "version-group";
    group.innerHTML = `
      <input type="text" placeholder="Condition (e.g., clean)" value="${
        version.condition
      }" required>
      <input type="number" placeholder="Price" value="${
        version.price
      }" required>
      <input type="file" class="image-upload" accept="image/*">
      <button type="button" class="remove-version">REMOVE</button>
      ${
        version.image
          ? `<img src="${version.image}" class="image-preview">`
          : ""
      }
    `;
    versionInputs.appendChild(group);

        
    group
      .querySelector(".image-upload")
      .addEventListener("change", function (e) {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            const img =
              group.querySelector(".image-preview") ||
              document.createElement("img");
            img.className = "image-preview";
            img.src = event.target.result;
            group.appendChild(img);
          };
          reader.readAsDataURL(file);
        }
      });
});    