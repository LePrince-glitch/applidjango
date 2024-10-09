/********************************************************** */
document.addEventListener("DOMContentLoaded", function () {
  // Sélectionner les éléments
  let tableRows = document.querySelectorAll(".datatable tbody tr");
  const editFormContainer = document.getElementById("crees");
  const closeBtn = document.querySelector(".Btnfermer");
  const editForm = document.getElementById("edit-form");
  const formInputs = editForm.querySelectorAll(".form-control");

  // Fonction pour ouvrir le formulaire d'édition
  function openEditForm(rowData) {
    // Remplir le formulaire avec les données de la ligne sélectionnée
    formInputs[0].value = rowData[1]; // Site
    formInputs[1].value = rowData[2]; // Numéro Sim
    formInputs[2].value = rowData[3]; // Client
    formInputs[3].value = rowData[4]; // Volume
    formInputs[4].value = formatDate(rowData[5]); // Recharge
    formInputs[5].value = formatDate(rowData[6]); // Expiration

    // Afficher le formulaire d'édition avec animation
    editFormContainer.classList.add("show");
  }

  // Fonction pour formater la date en 'YYYY-MM-DD'
  function formatDate(dateStr) {
    const [month, day, year] = dateStr.split("/");
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  }

  // Fonction pour ajouter les événements de clic aux lignes de la table
  function addRowClickEvents() {
    tableRows.forEach((row) => {
      row.addEventListener("click", function () {
        // Supprimer la classe de sélection des autres lignes
        tableRows.forEach((r) => r.classList.remove("selected"));

        // Ajouter la classe de sélection à la ligne cliquée
        this.classList.add("selected");

        // Récupérer les données de la ligne
        const rowData = Array.from(this.children).map((td) => td.textContent);

        // Ouvrir le formulaire d'édition avec les données de la ligne sélectionnée
        openEditForm(rowData);
      });
    });
  }

  // Ajouter les événements de clic aux lignes de la table au chargement initial
  addRowClickEvents();

  // Réappliquer les événements de clic lors du redimensionnement de l'écran
  window.addEventListener("resize", function () {
    tableRows = document.querySelectorAll(".datatable tbody tr");
    addRowClickEvents();
  });

  // Ajouter un événement click au bouton de fermeture
  closeBtn.addEventListener("click", function () {
    // Fermer le formulaire d'édition
    editFormContainer.classList.remove("show");
  });
});
