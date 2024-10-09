document.addEventListener("DOMContentLoaded", function () {
  let tableRows = document.querySelectorAll(".datatable tbody tr");
  const editFormContainer = document.getElementById("crees");
  const closeBtn = document.querySelector(".Btnfermer");
  const editForm = document.getElementById("edit-form");

  // Fonction pour ouvrir le formulaire d'édition et pré-remplir les champs
  function openEditForm(rowData, prospectId) {
    // Remplir le formulaire avec les données de la ligne sélectionnée
    document.getElementById("prospect").value = rowData[2]; // Prospect
    document.getElementById("Adresse").value = rowData[3]; // Adresse
    document.getElementById("Contact").value = rowData[4]; // Contact
    document.getElementById("Referant").value = rowData[5]; // Référant
    document.getElementById("contact_referant").value = rowData[6]; // Contact Référant
    document.getElementById("objet_courier").value = rowData[7]; // Email
    document.getElementById("date_depot").value = formatDate(rowData[8]); // Date Dépôt

    // Mettre à jour le champ caché avec l'ID du prospect
    document.getElementById("prospect_id").value = prospectId;

    // Afficher le formulaire d'édition
    editFormContainer.classList.add("show");
  }

  // Fonction pour formater une date
  function formatDate(dateStr) {
    if (!dateStr) return "";

    const monthMapping = {
      janvier: "01",
      février: "02",
      mars: "03",
      avril: "04",
      mai: "05",
      juin: "06",
      juillet: "07",
      août: "08",
      septembre: "09",
      octobre: "10",
      novembre: "11",
      décembre: "12",
    };

    const regex = /(\d+)\s+([a-zéû]+)\s+(\d{4})/i;
    const match = dateStr.match(regex);

    if (match) {
      const day = match[1].padStart(2, "0");
      const monthText = match[2].toLowerCase();
      const year = match[3];
      const month = monthMapping[monthText];

      if (month) {
        return `${year}-${month}-${day}`;
      }
    }
    return "";
  }

  // Fonction pour ajouter des événements de clic à chaque ligne du tableau
  function addRowClickEvents() {
    tableRows.forEach((row) => {
      row.addEventListener("click", function () {
        // Désélectionner les autres lignes
        tableRows.forEach((r) => r.classList.remove("selected"));
        this.classList.add("selected");

        // Extraire les données de la ligne sélectionnée
        const rowData = Array.from(this.children).map((td) =>
          td.textContent.trim()
        );
        const prospectId = this.getAttribute("data-id");

        // Ouvrir le formulaire d'édition avec les données de la ligne
        openEditForm(rowData, prospectId);
      });
    });
  }

  // Initialiser les événements de clic
  addRowClickEvents();

  // Re-assigner les événements de clic lorsque la fenêtre est redimensionnée
  window.addEventListener("resize", function () {
    tableRows = document.querySelectorAll(".datatable tbody tr");
    addRowClickEvents(); // Réinitialiser les événements de clic
  });

  // Gérer la fermeture du formulaire d'édition
  closeBtn.addEventListener("click", function () {
    editFormContainer.classList.remove("show");
  });

  //----------------------------gestion des confirmations ---------------------------------------------

  document.addEventListener("DOMContentLoaded", function () {
    const deleteButton = document.getElementById("delete-button");
    const deleteForm = document.getElementById("delete-client-form");
    const clientIdInput = document.getElementById("client_id");

    deleteButton.addEventListener("click", function () {
      const clientId = document.getElementById("prospect_id").value; // Assure-toi que cet ID est correctement défini ailleurs dans ton code

      if (
        confirm(
          "Êtes-vous sûr de vouloir supprimer ce client et mettre à jour les dossiers associés ?"
        )
      ) {
        clientIdInput.value = clientId;
        deleteForm.submit();
      }
    });
  });

  //--------------------------------------------------verification
});
