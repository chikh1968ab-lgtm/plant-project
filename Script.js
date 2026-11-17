
// GET HTML ELEMENTS

const addButton = document.getElementById("add-equipment-btn");

const equipmentForm = document.getElementById("equipment-form");

const cancelButton = document.getElementById("cancel-btn");

const equipmentList = document.getElementById("equipment-list");

const formMessage = document.getElementById("form-message");


// SHOW OR HIDE THE FORM

addButton.addEventListener("click", function () {

    equipmentForm.hidden = !equipmentForm.hidden;

    formMessage.textContent = "";

});


// CANCEL FORM

cancelButton.addEventListener("click", function () {

    equipmentForm.reset();

    equipmentForm.hidden = true;

    formMessage.textContent = "";

});


// ADD NEW EQUIPMENT

equipmentForm.addEventListener("submit", function (event) {

    // Prevent the page from reloading

    event.preventDefault();


    // GET USER INPUTS

    const equipmentId = document
        .getElementById("equipment-id")
        .value.trim();

    const equipmentType = document
        .getElementById("equipment-type")
        .value.trim();

    const equipmentLocation = document
        .getElementById("equipment-location")
        .value.trim();

    const equipmentStatus = document
        .getElementById("equipment-status")
        .value;


    // CHECK FOR DUPLICATE EQUIPMENT ID

    const existingRows = equipmentList.querySelectorAll("tr");

    const duplicate = Array.from(existingRows).some(function (row) {

        const existingId = row.cells[0].textContent.trim();

        return existingId.toLowerCase() === equipmentId.toLowerCase();

    });


    if (duplicate) {

        formMessage.textContent = "This Equipment ID already exists.";

        formMessage.className = "form-message message-error";

        return;

    }


    // CREATE A NEW TABLE ROW

    const newRow = document.createElement("tr");


    // CREATE TABLE CELLS

    const idCell = document.createElement("td");
    idCell.textContent = equipmentId;

    const typeCell = document.createElement("td");
    typeCell.textContent = equipmentType;

    const locationCell = document.createElement("td");
    locationCell.textContent = equipmentLocation;


    // CREATE STATUS LABEL

    const statusCell = document.createElement("td");

    const statusBadge = document.createElement("span");

    statusBadge.classList.add("status");

    if (equipmentStatus === "Operational") {

        statusBadge.classList.add("status-operational");

    } else {

        statusBadge.classList.add("status-maintenance");

    }

    statusBadge.textContent = equipmentStatus;

    statusCell.appendChild(statusBadge);


    // ADD CELLS TO THE NEW ROW

    newRow.append(
        idCell,
        typeCell,
        locationCell,
        statusCell
    );


    // ADD NEW ROW TO THE TABLE

    equipmentList.appendChild(newRow);


    // RESET FORM

    equipmentForm.reset();

    equipmentForm.hidden = true;


    // DISPLAY SUCCESS MESSAGE

    formMessage.textContent = "Equipment added successfully.";

    formMessage.className = "form-message message-success";

});
