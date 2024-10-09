document.addEventListener("DOMContentLoaded", function () {
  let tableRows = document.querySelectorAll(".cdg.table tbody tr");
  const editFormContainer = document.getElementById("crees");
  const closeBtn = document.querySelector(".Btnfermer");
  const formInputs = {
    iddossier: document.getElementById("iddossier"),
    prospect: document.getElementById("prospect"),
    projet: document.getElementById("Projet"),
    commercial: document.getElementById("Commercial"),
    service: document.getElementById("Service"),
    statut: document.getElementById("Statut"),
    courrierReference: document.getElementById("courrierreference"),
    description: document.querySelector("textarea"),
    dateDepot: document.getElementById("date_depot"),
    dateRelance: document.getElementById("date_relance"),
  };

  // Fonction pour ouvrir le formulaire de modification et remplir les champs
  function openEditForm(rowData) {
    formInputs.iddossier.value = rowData[0];
    formInputs.prospect.value = rowData[1];
    formInputs.projet.value = rowData[2];
    formInputs.commercial.value = rowData[3];
    formInputs.service.value = rowData[4];
    formInputs.statut.value = rowData[5];
    formInputs.courrierReference.value = rowData[6];
    formInputs.description.value = rowData[7];
    formInputs.dateDepot.value = convertDate(rowData[8]);
    formInputs.dateRelance.value = convertDate(rowData[9]);

    setSelectValue(formInputs.prospect, rowData[1]);
    setSelectValue(formInputs.commercial, rowData[3]);
    setSelectValue(formInputs.service, rowData[4]);
    setSelectValue(formInputs.statut, rowData[5]);

    editFormContainer.classList.add("show");
  }

  function setSelectValue(selectElement, value) {
    const options = selectElement.options;
    for (let i = 0; i < options.length; i++) {
      if (options[i].text === value) {
        selectElement.selectedIndex = i;
        break;
      }
    }
  }

  function convertDate(dateStr) {
    if (!dateStr) return "";

    const mois = {
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

    const [jour, moisTexte, annee] = dateStr.split(" ");
    const moisNumerique = mois[moisTexte.toLowerCase()];
    return `${annee}-${moisNumerique}-${jour.padStart(2, "0")}`;
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

  window.addEventListener("resize", function () {
    tableRows = document.querySelectorAll(".cdg.table tbody tr");
    addRowClickEvents();
  });

  closeBtn.addEventListener("click", function () {
    editFormContainer.classList.remove("show");
  });
});

document.getElementById("delete-button").addEventListener("click", function () {
  // Récupérer l'ID du dossier à partir du champ caché
  var dossierId = document.getElementById("iddossier").value;

  // Vérifier si un ID est présent
  if (!dossierId) {
    alert("L'ID du dossier est introuvable.");
    return;
  }

  

  // Demander une confirmation avant de supprimer
  if (confirm("Êtes-vous sûr de vouloir supprimer ce dossier ?")) {
    // Si confirmé, faire la requête AJAX pour supprimer le dossier
    fetch(`/supprimer-dossier/${dossierId}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"), // Pour ajouter le token CSRF
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          alert("Dossier supprimé avec succès.");
          // Optionnel : Rediriger ou mettre à jour la page après la suppression
          window.location.reload();
        } else {
          alert("Erreur lors de la suppression du dossier : " + data.message);
        }
      })
      .catch((error) => {
        console.error("Erreur:", error);
        alert("Une erreur s'est produite lors de la suppression.");
      });
  }
});

// Fonction pour récupérer le token CSRF dans les cookies
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

document.getElementById("edit-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(this);

  fetch("/modifier_dossier/", {
    method: "POST",
    headers: {
      "X-CSRFToken": formData.get("csrfmiddlewaretoken"),
    },
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert(data.message);
        window.location.reload(); // Recharge la page après confirmation
      } else {
        alert(data.message);
      }
    })
    .catch((error) => console.error("Erreur:", error));
});
