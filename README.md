# M.K AUTOS - Car Inventory Management System
This is single-page web application for managing a car inventory, built with HTML, CSS, and JavaScript. The app interacts with a local `db.json` file using json-server to persist data.

*** ## Key Features ## ***
✔ **Single Page Application** - No page reloads/redirects  
✔ **JSON-Server Backend** - Persistent data storage with `db.json`  
✔ **CRUD Operations** - Create, Read, Update, Delete car entries  
✔ **Image Uploads** - Base64 image storage in JSON  


## HTML
<!-- Version inputs will be added here -->
  ***   <div class="form-buttons">
          <button type="button" id="add-version-btn">+ Add Version</button>
          <button type="submit" id="save-car-btn">Save Car</button>
        </div> ***

### index.js
** line 2-->// DOM Elements
document.addEventListener("DOMContentLoaded", () => {
  const carsContainer = document.getElementById("cars-container");
  const addCarForm = document.getElementById("add-car-form");
  const versionInputs = document.querySelector(".version-inputs");
  const addVersionBtn = document.getElementById("add-version-btn");
  let currentCarId = null;})
line 9-->// single version initializing
line 12-->// event Listeners
line 16-->// to load initial data
** line 19-->//  MAJOR FUNCTIONS
function addVersionInput(version = { condition: "", price: "", image: "" }) {
      const versionId = Date.now();
      const group = document.createElement("div");}
line 42-->// image preview handler
line 61-->// remove version handler
line 77-->// rrocess all versions
line 105-->// reset form
line 156-->// attaching the event listeners
line 191-->// the event Listeners


