document.addEventListener("DOMContentLoaded", function () {
  const baseUrl = window.baseUrl || "http://localhost:4000/api";
  if (typeof initSidebar === "function") initSidebar();

  const degreeForm = document.getElementById("degreeForm");
  const formDiv = document.getElementById("formDiv");
  const listDiv = document.getElementById("listDiv");
  const degreeTable = document.getElementById("degreeTable");
  let allDegrees = [];
  let pagination = null; // Added for pagination

  // Custom render function for degrees (for pagination)
  function renderDegreeTable(data, startIndex) {
    if (!degreeTable) return;

    degreeTable.innerHTML = data
      .map(
        (d, i) => `
      <tr>
        <td>${startIndex + i + 1}</td>
        <td>${d.name || ""}</td>
        <td class="action-buttons">
          <button class="edit-state-btn" data-id="${
            d._id
          }"><i class="fa fa-edit"></i></button>
          <button class="delete-state-btn" data-id="${
            d._id
          }"><i class="fa fa-trash"></i></button>
        </td>
      </tr>
    `
      )
      .join("");

    // Add event listeners for edit and delete buttons
    addEventListeners();
  }

  // Add event listeners for edit and delete buttons (separate function)
  function addEventListeners() {
    // Use event delegation for better reliability
    if (degreeTable) {
      // Remove existing listener to prevent duplicates
      degreeTable.removeEventListener("click", handleTableClick);
      degreeTable.addEventListener("click", handleTableClick);
    }
  }

  // Event handler function using event delegation
  function handleTableClick(event) {
    const target = event.target;

    // Handle edit button clicks
    if (target.closest(".edit-state-btn")) {
      const btn = target.closest(".edit-state-btn");
      const id = btn.getAttribute("data-id");
      const degree = allDegrees.find((d) => d._id === id);
      if (degree) openEditDegreeModal(degree);
    }

    // Handle delete button clicks
    if (target.closest(".delete-state-btn")) {
      const btn = target.closest(".delete-state-btn");
      const id = btn.getAttribute("data-id");
      if (confirm("Are you sure you want to delete this degree?")) {
        deleteDegree(id);
      }
    }
  }

  // Fetch all degrees
  async function fetchDegrees() {
    try {
      const response = await fetch(`${baseUrl}/degree/all`);
      if (!response.ok) throw new Error("Failed to fetch degrees");
      const data = await response.json();
      allDegrees = data.degrees || [];
      initPaginationForDegrees(); // Changed from renderDegreeTable(allDegrees)
    } catch (err) {
      degreeTable.innerHTML =
        '<tr><td colspan="3" style="text-align:center; color:#ef4444;">Failed to load data</td></tr>';
    }
  }

  // Initialize pagination for degrees
  function initPaginationForDegrees() {
    // Create pagination container if it doesn't exist
    let paginationContainer = document.getElementById("pagination-container");
    if (!paginationContainer) {
      paginationContainer = document.createElement("div");
      paginationContainer.id = "pagination-container";
      paginationContainer.className = "pagination-wrapper";
      // Insert after the table container
      const tableContainer = degreeTable.closest(".table-container");
      if (tableContainer) {
        tableContainer.parentNode.insertBefore(
          paginationContainer,
          tableContainer.nextSibling
        );
      } else {
        degreeTable.parentNode.appendChild(paginationContainer);
      }
    }

    // Initialize pagination
    pagination = initPagination({
      container: degreeTable,
      data: allDegrees,
      itemsPerPage: 10,
      renderFunction: renderDegreeTable,
      onPageChange: (currentData, currentPage) => {
        // Re-add event listeners after page change
        setTimeout(() => {
          addEventListeners();
        }, 50);
      },
    });
  }

  // Show/hide form and list with button toggle
  const showFormBtn = document.getElementById("showFormBtn");
  const showListBtn = document.getElementById("showListBtn");
  if (showFormBtn && showListBtn && formDiv && listDiv) {
    showFormBtn.addEventListener("click", function () {
      formDiv.style.display = "block";
      listDiv.style.display = "none";
      // Show both buttons
      showFormBtn.style.display = "inline-block";
      showListBtn.style.display = "inline-block";
    });
    showListBtn.addEventListener("click", function () {
      formDiv.style.display = "none";
      listDiv.style.display = "block";
      // Show both buttons
      showFormBtn.style.display = "inline-block";
      showListBtn.style.display = "inline-block";
    });
  }

  // Add degree using common form handler
  handleForm(degreeForm, async (formData) => {
    try {
      const name = formData.get("name");
      await fetch(`${baseUrl}/degree/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });
      alert("Degree added!");
      degreeForm.reset();
      formDiv.style.display = "none";
      listDiv.style.display = "block";
      // Show both buttons
      showFormBtn.style.display = "inline-block";
      showListBtn.style.display = "inline-block";
      fetchDegrees();
    } catch (error) {
      alert("Failed to submit degree.");
    }
  });

  // Delete degree using common API utility
  async function deleteDegree(id) {
    try {
      await fetch(`${baseUrl}/degree/delete?_id=${id}`, {
        method: "DELETE",
      });
      alert("Degree deleted!");
      fetchDegrees();
    } catch (error) {
      alert("Failed to delete degree.");
    }
  }

  // Edit modal logic
  const editDegreeModal = document.getElementById("editDegreeModal");
  const closeEditDegreeModalBtn = document.getElementById(
    "closeEditDegreeModal"
  );
  const cancelEditDegreeBtn = document.getElementById("cancelEditDegreeBtn");
  function openEditDegreeModal(degree) {
    document.getElementById("editDegreeId").value = degree._id;
    document.getElementById("editDegreeName").value = degree.name;
    if (editDegreeModal) editDegreeModal.style.display = "flex";
  }
  function closeEditDegreeModal() {
    if (editDegreeModal) editDegreeModal.style.display = "none";
  }
  if (closeEditDegreeModalBtn)
    closeEditDegreeModalBtn.onclick = closeEditDegreeModal;
  if (cancelEditDegreeBtn) cancelEditDegreeBtn.onclick = closeEditDegreeModal;
  window.onclick = function (event) {
    if (event.target === editDegreeModal) closeEditDegreeModal();
  };

  // Edit form submit using common form handler
  const editDegreeForm = document.getElementById("editDegreeForm");
  handleForm(editDegreeForm, async (formData) => {
    const id = document.getElementById("editDegreeId").value;
    try {
      const name = formData.get("name");
      await fetch(`${baseUrl}/degree/update?_id=${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });
      alert("Degree updated!");
      closeEditDegreeModal();
      fetchDegrees();
    } catch (error) {
      alert("Failed to update degree.");
    }
  });

  // Initial population
  fetchDegrees();
});
