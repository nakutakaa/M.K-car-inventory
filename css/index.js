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

      
      
        group.querySelector(".remove-version").addEventListener("click", () => {
        if (document.querySelectorAll(".version-group").length > 1) {
          group.remove();
        } else {
          alert("At least one version is required");
        }
      });
    }

    async function handleFormSubmit(e) {
      e.preventDefault();

      const make = document.getElementById("car-make").value;
      const model = document.getElementById("car-model").value;

      const versionGroups = document.querySelectorAll(".version-group");
      const versions = [];

      for (const group of versionGroups) {
        const inputs = group.querySelectorAll("input");
        const fileInput = group.querySelector(".image-upload");
        const previewImg = group.querySelector(".image-preview");

        versions.push({
          condition: inputs[0].value,
          price: Number(inputs[1].value),
          image: previewImg ? previewImg.src : "",
        });
      }

      const carData = { make, model, versions };
      const url = currentCarId
        ? `http://localhost:3000/cars/${currentCarId}`
        : "http://localhost:3000/cars";

      try {
        await fetch(url, {
          method: currentCarId ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(carData),
        });

        addCarForm.reset();
        versionInputs.innerHTML = "";
        addVersionInput();
        currentCarId = null;
        loadCars();
      } catch (error) {
        console.error("Error saving car:", error);
        alert("Error saving car. Check console for details.");
      }
    }



    
    async function loadCars() {
      try {
        const response = await fetch("http://localhost:3000/cars");
        renderCars(await response.json());
      } catch (error) {
        console.error("Error loading cars:", error);
      }
    }

    function renderCars(cars) {
      carsContainer.innerHTML = cars
        .map(
          (car) => `
      <div class="car-model" data-id="${car.id}">
        <h3>${car.make} ${car.model}</h3>
        <div class="car-actions">
          <button class="edit-btn">EDIT</button>
          <button class="delete-btn">DELETE</button>
        </div>
        <div class="versions-container">
          ${car.versions
            .map(
              (version) => `
            <div class="version">
              <div class="image-container">
                ${version.image ? `<img src="${version.image}">` : "No Image"}
              </div>
              <p>Condition: ${version.condition}</p>
              <p>Price: $${version.price.toLocaleString()}</p>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
    `
        )
        .join("");

      document.querySelectorAll(".delete-btn").forEach((btn) => {
        btn.addEventListener("click", deleteCar);
      });

      document.querySelectorAll(".edit-btn").forEach((btn) => {
        btn.addEventListener("click", editCar);
      });
    }

    async function deleteCar(e) {
        const carId = e.target.closest(".car-model").dataset.id;
        if (confirm("Delete this car permanently?")) {
            await fetch(`http://localhost:3000/cars/${carId}`, {
                method: "DELETE",
            });
            loadCars();
        }
    }
    async function editCar(e) {
      const carId = e.target.closest(".car-model").dataset.id;
      const response = await fetch(`http://localhost:3000/cars/${carId}`);
      const car = await response.json();

      currentCarId = car.id;
      document.getElementById("car-make").value = car.make;
      document.getElementById("car-model").value = car.model;

      versionInputs.innerHTML = "";
      car.versions.forEach((version) => {
        addVersionInput(version);
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

});    