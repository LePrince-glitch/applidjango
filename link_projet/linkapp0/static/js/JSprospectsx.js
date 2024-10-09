document.addEventListener("DOMContentLoaded", function () {
  let tableRows = document.querySelectorAll(".cdg.table tbody tr");
  const editFormContainer = document.getElementById("crees");
  const closeBtn = document.querySelector(".Btnfermer");
  const deleteForm = document.getElementById("delete-client-form");

  const formInputs = {
    idclient: document.getElementById("idclient"),
    prospect: document.getElementById("prospect"),
    Adresse: document.getElementById("Adresse"),
    Contact: document.getElementById("Contact"),
    Referant: document.getElementById("Referant"),
    contact_referant: document.getElementById("contact_referant"),
    Email: document.getElementById("Email"),
    nombre_dossier: document.getElementById("nombre_dossier"),
    date_eng: document.getElementById("date_eng"),
  };

  function openEditForm(rowData) {
    const clientId = rowData[0];
    formInputs.idclient.value = clientId;
    formInputs.prospect.value = rowData[2];
    formInputs.Adresse.value = rowData[3];
    formInputs.Contact.value = rowData[4];
    formInputs.Referant.value = rowData[5];
    formInputs.contact_referant.value = rowData[6];
    formInputs.Email.value = rowData[7];
    formInputs.nombre_dossier.value = rowData[8];
    formInputs.date_eng.value = rowData[9];

    deleteForm.action = `/supprimer_client/${clientId}/`;
    editFormContainer.classList.add("show");
  }

  function addRowClickEvents() {
    tableRows.forEach((row) => {
      row.addEventListener("click", function () {
        tableRows.forEach((r) => r.classList.remove("selected"));
        this.classList.add("selected");
        const rowData = Array.from(this.children).map((td) =>
          td.textContent.trim()
        );
        openEditForm(rowData);
      });
    });
  }

  addRowClickEvents();

  closeBtn.addEventListener("click", function () {
    editFormContainer.classList.remove("show");
  });

  window.addEventListener("resize", function () {
    tableRows = document.querySelectorAll(".cdg.table tbody tr");
    addRowClickEvents();
  });

  function deleteClient(event) {
    event.preventDefault();

    if (!formInputs.idclient.value) {
      alert("Veuillez d'abord sélectionner un client.");
      return;
    }

    const confirmation = confirm(
      "Êtes-vous sûr de vouloir supprimer ce client ?"
    );

    if (confirmation) {
      deleteForm.submit();
    }
  }

  // Attache deleteClient au formulaire de suppression ou au bouton
  const deleteButton = document.getElementById("delete-button");
  if (deleteButton) {
    deleteButton.addEventListener("click", deleteClient);
  }
});
