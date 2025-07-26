document.addEventListener("DOMContentLoaded", function () {
  const baseUrl = window.baseUrl || "http://localhost:4000/api";
  if (typeof initSidebar === "function") initSidebar();

  const countryDropdown = document.getElementById("countryDropdown");
  const stateForm = document.getElementById("stateForm");
  const formDiv = document.getElementById("formDiv");
  const listDiv = document.getElementById("listDiv");
  const stateDropdown = document.getElementById("stateDropdown");
  const stateTable = document.getElementById("stateTable");
  let allStates = [];

  // Populate country dropdown
  async function populateCountryDropdown(dropdown, selectedId) {
    try {
      const countries = await apiRequest(`${baseUrl}/country/all-countries`);
      dropdown.innerHTML = '<option value="">-- Select Country --</option>';
      countries.forEach((country) => {
        const option = document.createElement("option");
        option.value = country._id;
        option.textContent = country.name;
        if (selectedId && country._id === selectedId) option.selected = true;
        dropdown.appendChild(option);
      });
    } catch (err) {
      dropdown.innerHTML = '<option value="">Failed to load</option>';
    }
  }

  // Populate state dropdown based on country
  function populateStateDropdown(countryId, selectedStateId) {
    stateDropdown.innerHTML = '<option value="">-- Select State --</option>';
    if (!countryId) return;
    allStates
      .filter(
        (state) =>
          state.country && String(state.country._id) === String(countryId)
      )
      .forEach((state) => {
        const option = document.createElement("option");
        option.value = state._id;
        option.textContent = state.name;
        if (selectedStateId && state._id === selectedStateId)
          option.selected = true;
        stateDropdown.appendChild(option);
      });
  }

  // Render state table using common utility
  function renderStateTable(states) {
    renderTable(stateTable, states, [
      { key: null, render: (s, i) => i + 1 },
      { key: "name" },
      { key: "code" },
      { key: "country", render: (s) => s.country?.name || "" },
      { key: "description" },
      {
        key: "logo",
        render: (s) =>
          s.logo
            ? `<img src='http://localhost:4000/${s.logo}' alt='logo' style='width:40px;height:40px;object-fit:cover;border-radius:6px;border:1px solid #e5e7eb;' />`
            : "<span class='na'>N/A</span>",
      },
      {
        key: "flag",
        render: (s) =>
          s.flag
            ? `<img src='http://localhost:4000/${s.flag}' alt='map' style='width:40px;height:30px;object-fit:cover;border-radius:4px;border:1px solid #e5e7eb;' />`
            : "<span class='na'>N/A</span>",
      },
      {
        key: null,
        render: (s) =>
          `<button class='edit-state-btn' data-id='${s._id}' style='background:#fbbf24; color:#fff; border:none; border-radius:6px; padding:6px 14px; margin-right:6px; cursor:pointer; font-size:0.95rem;'><i class='fa fa-edit'></i> Edit</button><button class='delete-state-btn' data-id='${s._id}' style='background:#ef4444; color:#fff; border:none; border-radius:6px; padding:6px 14px; cursor:pointer; font-size:0.95rem;'><i class='fa fa-trash'></i> Delete</button>`,
      },
    ]);
    document.querySelectorAll(".edit-state-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        const id = this.getAttribute("data-id");
        const state = states.find((s) => s._id === id);
        if (state) openEditStateModal(state);
      });
    });
    document.querySelectorAll(".delete-state-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        const id = this.getAttribute("data-id");
        if (confirm("Are you sure you want to delete this state?")) {
          deleteState(id);
        }
      });
    });
  }

  // Fetch all states
  async function fetchStates() {
    try {
      allStates = await apiRequest(`${baseUrl}/state/all-states`);
      renderStateTable(allStates);
    } catch (err) {
      stateTable.innerHTML =
        '<tr><td colspan="8" style="text-align:center; color:#ef4444;">Failed to load data</td></tr>';
    }
  }

  // Show/hide form and list
  const showFormBtn = document.getElementById("showFormBtn");
  const showListBtn = document.getElementById("showListBtn");
  if (showFormBtn && showListBtn && formDiv && listDiv) {
    showFormBtn.addEventListener("click", function () {
      formDiv.style.display = "block";
      listDiv.style.display = "none";
    });
    showListBtn.addEventListener("click", function () {
      formDiv.style.display = "none";
      listDiv.style.display = "block";
    });
  }

  // Add state using common form handler
  handleForm(stateForm, async (formData) => {
    if (!countryDropdown.value) {
      alert("Please select a country.");
      countryDropdown.focus();
      return;
    }
    try {
      await apiRequest(`${baseUrl}/state/add-state`, {
        method: "POST",
        body: formData,
      });
      alert("State added!");
      stateForm.reset();
      formDiv.style.display = "none";
      listDiv.style.display = "block";
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
    populateCountryDropdown(
      document.getElementById("editStateCountry"),
      state.country?._id || state.country
    );
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

  // On country change, filter states
  countryDropdown.addEventListener("change", function () {
    populateStateDropdown(countryDropdown.value);
  });

  // Initial population
  populateCountryDropdown(countryDropdown);
  fetchStates();
});
