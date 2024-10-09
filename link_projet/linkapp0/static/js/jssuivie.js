document.addEventListener("DOMContentLoaded", function () {
  const tableRows = document.querySelectorAll(".datatable tbody tr");
  const editFormContainer = document.getElementById("crees");
  const closeBtn = document.querySelector(".Btnfermer");
  const formInputs = {
    idincident: document.getElementById("idincident"),
    rechargeDate: document.getElementById("rechargeDate"),
    heureincident: document.querySelector("input[name='heureincident']"),
    client: document.querySelector("select[name='client']"),
    Site: document.getElementById("Site"),
    description: document.querySelector("textarea"),
    responsabilite: document.querySelector("select[name='responsabilite']"),
  };

  // Fonction pour ouvrir le formulaire de modification et remplir les champs
  function openEditForm(rowData) {
    formInputs.idincident.value = rowData[0];
    formInputs.rechargeDate.value = convertDate(rowData[1]);
    formInputs.heureincident.value = rowData[2];
    setSelectValue(formInputs.client, rowData[3]);
    formInputs.Site.value = rowData[4];
    formInputs.description.value = rowData[5];
    setSelectValue(formInputs.responsabilite, rowData[6]);

    editFormContainer.classList.add("show");
  }

  // Fonction pour sélectionner la bonne valeur dans un élément <select>
  function setSelectValue(selectElement, value) {
    const options = selectElement.options;
    for (let i = 0; i < options.length; i++) {
      if (options[i].text.trim() === value.trim()) {
        selectElement.selectedIndex = i;
        break;
      }
    }
  }

  // Convertir le format de date au format requis par l'input type date
  function convertDate(dateStr) {
    const [jour, mois, annee] = dateStr.split("/");
    return `${annee}-${mois}-${jour.padStart(2, "0")}`;
  }

  // Ajouter les événements de clic à chaque ligne du tableau
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

  // Fermer le formulaire lorsque le bouton de fermeture est cliqué
  closeBtn.addEventListener("click", function () {
    editFormContainer.classList.remove("show");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const editForm = document.getElementById("edit-form");

  // Gestion de la modification
  editForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const incidentId = document.getElementById("idincident").value;
    const url = `/update-incident/${incidentId}/`; // URL de modification

    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRFToken": "{{ csrf_token }}",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Date_incident: editForm.rechargeDate.value,
        heureincident: editForm.heureincident.value,
        client: editForm.client.value,
        Site: editForm.Site.value,
        description: editForm.description.value,
        responsabilite: editForm.responsabilite.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Modification réussie !");
          location.reload();
        }
      });
  });

  // Gestion de la suppression avec confirmation
  const deleteBtn = document.querySelector(".delete-btn");

  deleteBtn.addEventListener("click", function () {
    const incidentId = document.getElementById("idincident").value;
    if (confirm("Êtes-vous sûr de vouloir supprimer cet incident ?")) {
      const url = `/delete-incident/${incidentId}/`; // URL de suppression

      fetch(url, {
        method: "POST",
        headers: {
          "X-CSRFToken": "{{ csrf_token }}",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            alert("Suppression réussie !");
            location.reload();
          }
        });
    }
  });
});
