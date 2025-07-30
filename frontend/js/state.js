document.addEventListener("DOMContentLoaded", function () {
  const baseUrl = window.baseUrl || "http://localhost:4000/api";
  if (typeof initSidebar === "function") initSidebar();

  const stateForm = document.getElementById("stateForm");
  const formDiv = document.getElementById("formDiv");
  const listDiv = document.getElementById("listDiv");
  const stateTable = document.getElementById("stateTable");
  let allStates = [];
  let pagination = null; // Added for pagination

  // Custom render function for states (for pagination)
  function renderStateTable(data, startIndex) {
    if (!stateTable) return;

    stateTable.innerHTML = data
      .map(
        (s, i) => `
      <tr>
        <td>${startIndex + i + 1}</td>
        <td>${s.name || ""}</td>
        <td class="state-code">${s.code || ""}</td>
        <td class="image-cell">
          ${
            s.logo
              ? `<img src="http://localhost:4000/${s.logo}" alt="logo" class="state-logo" />`
              : "<span class='no-image'>N/A</span>"
          }
        </td>
        <td class="image-cell">
          ${
            s.flag
              ? `<img src="http://localhost:4000/${s.flag}" alt="map" class="state-map" />`
              : "<span class='no-image'>N/A</span>"
          }
        </td>
        <td class="action-buttons">
          <button class="edit-state-btn" data-id="${
            s._id
          }"><i class="fa fa-edit"></i></button>
          <button class="delete-state-btn" data-id="${
            s._id
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
    if (stateTable) {
      // Remove existing listener to prevent duplicates
      stateTable.removeEventListener("click", handleTableClick);
      stateTable.addEventListener("click", handleTableClick);
    }
  }

  // Event handler function using event delegation
  function handleTableClick(event) {
    const target = event.target;

    // Handle edit button clicks
    if (target.closest(".edit-state-btn")) {
      const btn = target.closest(".edit-state-btn");
      const id = btn.getAttribute("data-id");
      const state = allStates.find((s) => s._id === id);
      if (state) openEditStateModal(state);
    }

    // Handle delete button clicks
    if (target.closest(".delete-state-btn")) {
      const btn = target.closest(".delete-state-btn");
      const id = btn.getAttribute("data-id");
      if (confirm("Are you sure you want to delete this state?")) {
        deleteState(id);
      }
    }
  }

  // Fetch all states
  async function fetchStates() {
    try {
      allStates = await apiRequest(`${baseUrl}/state/all-states`);
      initPaginationForStates(); // Changed from renderStateTable(allStates)
    } catch (err) {
      stateTable.innerHTML =
        '<tr><td colspan="6" style="text-align:center; color:#ef4444;">Failed to load data</td></tr>';
    }
  }

  // Initialize pagination for states
  function initPaginationForStates() {
    // Create pagination container if it doesn't exist
    let paginationContainer = document.getElementById("pagination-container");
    if (!paginationContainer) {
      paginationContainer = document.createElement("div");
      paginationContainer.id = "pagination-container";
      paginationContainer.className = "pagination-wrapper";
      // Insert after the table container
      const tableContainer = stateTable.closest(".table-container");
      if (tableContainer) {
        tableContainer.parentNode.insertBefore(
          paginationContainer,
          tableContainer.nextSibling
        );
      } else {
        stateTable.parentNode.appendChild(paginationContainer);
      }
    }

    // Initialize pagination
    pagination = initPagination({
      container: stateTable,
      data: allStates,
      itemsPerPage: 10,
      renderFunction: renderStateTable,
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

  // Add state using common form handler
  handleForm(stateForm, async (formData) => {
    try {
      await apiRequest(`${baseUrl}/state/add-state`, {
        method: "POST",
        body: formData,
      });
      alert("State added!");
      stateForm.reset();
      formDiv.style.display = "none";
      listDiv.style.display = "block";
      // Show both buttons
      showFormBtn.style.display = "inline-block";
      showListBtn.style.display = "inline-block";
      fetchStates();
    } catch (error) {
      alert("Failed to submit state.");
    }
  });

  // Delete state using common API utility
  async function deleteState(id) {
    try {
      await apiRequest(`${baseUrl}/state/delete-state/${id}`, {
        method: "DELETE",
      });
      alert("State deleted!");
      fetchStates();
    } catch (error) {
      alert("Failed to delete state.");
    }
  }

  // Edit modal logic
  const editStateModal = document.getElementById("editStateModal");
  const closeEditStateModalBtn = document.getElementById("closeEditStateModal");
  const cancelEditStateBtn = document.getElementById("cancelEditStateBtn");
  function openEditStateModal(state) {
    document.getElementById("editStateId").value = state._id;
    document.getElementById("editStateName").value = state.name;
    document.getElementById("editStateCode").value = state.code;
    document.getElementById("editStateDescription").value = state.description;
    if (editStateModal) editStateModal.style.display = "flex";
  }
  function closeEditStateModal() {
    if (editStateModal) editStateModal.style.display = "none";
  }
  if (closeEditStateModalBtn)
    closeEditStateModalBtn.onclick = closeEditStateModal;
  if (cancelEditStateBtn) cancelEditStateBtn.onclick = closeEditStateModal;
  window.onclick = function (event) {
    if (event.target === editStateModal) closeEditStateModal();
  };

  // Edit form submit using common form handler
  const editStateForm = document.getElementById("editStateForm");
  handleForm(editStateForm, async (formData) => {
    const id = document.getElementById("editStateId").value;
    try {
      await apiRequest(`${baseUrl}/state/edit-state/${id}`, {
        method: "PUT",
        body: formData,
      });
      alert("State updated!");
      closeEditStateModal();
      fetchStates();
    } catch (error) {
      alert("Failed to update state.");
    }
  });

  // Initial population
  fetchStates();
});
