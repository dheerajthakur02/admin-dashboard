document.addEventListener("DOMContentLoaded", function () {
  const baseUrl = window.baseUrl || "http://localhost:4000/api";
  if (typeof initSidebar === "function") initSidebar();

  const stateDropdown = document.getElementById("districtStateDropdown");
  const districtForm = document.getElementById("districtForm");
  const formDiv = document.getElementById("formDiv");
  const listDiv = document.getElementById("listDiv");
  const districtTable = document.getElementById("districtTable");
  let allDistricts = [];
  let pagination = null; // Added for pagination

  // Populate state dropdown
  async function populateStateDropdown(dropdown, selectedStateId) {
    try {
      const states = await apiRequest(`${baseUrl}/state/all-states`);
      dropdown.innerHTML = '<option value="">-- Select State --</option>';
      states.forEach((state) => {
        const option = document.createElement("option");
        option.value = state._id;
        option.textContent = state.name;
        if (selectedStateId && state._id === selectedStateId)
          option.selected = true;
        dropdown.appendChild(option);
      });
    } catch (err) {
      dropdown.innerHTML = '<option value="">Failed to load</option>';
    }
  }

  // Custom render function for districts (for pagination)
  function renderDistrictTable(data, startIndex) {
    if (!districtTable) return;

    districtTable.innerHTML = data
      .map(
        (d, i) => `
      <tr>
        <td>${startIndex + i + 1}</td>
        <td>${d.districtName || ""}</td>
        <td>${d.state?.name || ""}</td>
        <td class="action-buttons">
          <button class="edit-district-btn" data-id="${
            d._id
          }"><i class="fa fa-edit"></i></button>
          <button class="delete-district-btn" data-id="${
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
    if (districtTable) {
      // Remove existing listener to prevent duplicates
      districtTable.removeEventListener("click", handleTableClick);
      districtTable.addEventListener("click", handleTableClick);
    }
  }

  // Event handler function using event delegation
  function handleTableClick(event) {
    const target = event.target;

    // Handle edit button clicks
    if (target.closest(".edit-district-btn")) {
      const btn = target.closest(".edit-district-btn");
      const id = btn.getAttribute("data-id");
      const district = allDistricts.find((d) => d._id === id);
      if (district) openEditDistrictModal(district);
    }

    // Handle delete button clicks
    if (target.closest(".delete-district-btn")) {
      const btn = target.closest(".delete-district-btn");
      const id = btn.getAttribute("data-id");
      if (confirm("Are you sure you want to delete this district?")) {
        deleteDistrict(id);
      }
    }
  }

  // Fetch all districts
  async function fetchDistricts() {
    try {
      allDistricts = await apiRequest(`${baseUrl}/district/all-districts`);
      initPaginationForDistricts(); // Changed from renderDistrictTable(allDistricts)
    } catch (err) {
      districtTable.innerHTML =
        '<tr><td colspan="4" style="text-align:center; color:#ef4444;">Failed to load data</td></tr>';
    }
  }

  // Initialize pagination for districts
  function initPaginationForDistricts() {
    // Create pagination container if it doesn't exist
    let paginationContainer = document.getElementById("pagination-container");
    if (!paginationContainer) {
      paginationContainer = document.createElement("div");
      paginationContainer.id = "pagination-container";
      paginationContainer.className = "pagination-wrapper";
      // Insert after the table container
      const tableContainer = districtTable.closest(".table-container");
      if (tableContainer) {
        tableContainer.parentNode.insertBefore(
          paginationContainer,
          tableContainer.nextSibling
        );
      } else {
        districtTable.parentNode.appendChild(paginationContainer);
      }
    }

    // Initialize pagination
    pagination = initPagination({
      container: districtTable,
      data: allDistricts,
      itemsPerPage: 10,
      renderFunction: renderDistrictTable,
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

  // Add district using common form handler
  handleForm(districtForm, async (formData) => {
    if (!stateDropdown.value) {
      alert("Please select a state.");
      stateDropdown.focus();
      return;
    }
    try {
      await apiRequest(`${baseUrl}/district/add-district`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          state: stateDropdown.value,
          districtName: districtForm.districtName.value.trim(),
        }),
      });
      alert("District added!");
      districtForm.reset();
      formDiv.style.display = "none";
      listDiv.style.display = "block";
      // Show both buttons
      showFormBtn.style.display = "inline-block";
      showListBtn.style.display = "inline-block";
      fetchDistricts();
    } catch (error) {
      alert("Failed to submit district.");
    }
  });

  // Delete district using common API utility
  async function deleteDistrict(id) {
    try {
      await apiRequest(`${baseUrl}/district/delete-district/${id}`, {
        method: "DELETE",
      });
      alert("District deleted!");
      fetchDistricts();
    } catch (error) {
      alert("Failed to delete district.");
    }
  }

  // Edit modal logic
  const editDistrictModal = document.getElementById("editDistrictModal");
  const closeEditDistrictModalBtn = document.getElementById(
    "closeEditDistrictModal"
  );
  const cancelEditDistrictBtn = document.getElementById(
    "cancelEditDistrictBtn"
  );
  function openEditDistrictModal(district) {
    document.getElementById("editDistrictId").value = district._id;
    document.getElementById("editDistrictName").value = district.districtName;
    populateStateDropdown(
      document.getElementById("editDistrictState"),
      district.state?._id || district.state
    );
    if (editDistrictModal) editDistrictModal.style.display = "flex";
  }
  function closeEditDistrictModal() {
    if (editDistrictModal) editDistrictModal.style.display = "none";
  }
  if (closeEditDistrictModalBtn)
    closeEditDistrictModalBtn.onclick = closeEditDistrictModal;
  if (cancelEditDistrictBtn)
    cancelEditDistrictBtn.onclick = closeEditDistrictModal;
  window.onclick = function (event) {
    if (event.target === editDistrictModal) closeEditDistrictModal();
  };

  // Edit form submit using common form handler
  const editDistrictForm = document.getElementById("editDistrictForm");
  handleForm(editDistrictForm, async (formData) => {
    const id = document.getElementById("editDistrictId").value;
    try {
      await apiRequest(`${baseUrl}/district/edit-district/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          state: document.getElementById("editDistrictState").value,
          districtName: document
            .getElementById("editDistrictName")
            .value.trim(),
        }),
      });
      alert("District updated!");
      closeEditDistrictModal();
      fetchDistricts();
    } catch (error) {
      alert("Failed to update district.");
    }
  });

  // Initial population
  populateStateDropdown(stateDropdown);
  fetchDistricts();
});
