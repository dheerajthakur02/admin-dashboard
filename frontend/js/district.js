document.addEventListener("DOMContentLoaded", function () {
  const baseUrl = window.baseUrl || "http://localhost:4000/api";
  if (typeof initSidebar === "function") initSidebar();

  const countryDropdown = document.getElementById("districtCountryDropdown");
  const stateDropdown = document.getElementById("districtStateDropdown");
  const districtForm = document.getElementById("districtForm");
  const districtTable = document.getElementById("districtTable");
  const formDiv = document.getElementById("districtFormDiv");
  const listDiv = document.getElementById("districtListDiv");

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
  async function populateStateDropdown(countryId, dropdown, selectedStateId) {
    try {
      const states = await apiRequest(`${baseUrl}/state/all-states`);
      dropdown.innerHTML = '<option value="">-- Select State --</option>';
      states
        .filter((s) => s.country && (s.country._id || s.country) === countryId)
        .forEach((state) => {
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

  // Render district table using common utility
  function renderDistrictTable(districts) {
    renderTable(districtTable, districts, [
      { key: null, render: (d, i) => i + 1 },
      { key: "districtName" },
      { key: "stateName" },
      { key: "countryName" },
      {
        key: null,
        render: (d) =>
          `<button class='edit-district-btn' data-id='${d._id}' style='background:#fbbf24; color:#fff; border:none; border-radius:6px; padding:6px 14px; margin-right:6px; cursor:pointer; font-size:0.95rem;'><i class='fa fa-edit'></i> Edit</button><button class='delete-district-btn' data-id='${d._id}' style='background:#ef4444; color:#fff; border:none; border-radius:6px; padding:6px 14px; cursor:pointer; font-size:0.95rem;'><i class='fa fa-trash'></i> Delete</button>`,
      },
    ]);
    document.querySelectorAll(".edit-district-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        const id = this.getAttribute("data-id");
        fetchDistrictById(id);
      });
    });
    document.querySelectorAll(".delete-district-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        const id = this.getAttribute("data-id");
        if (confirm("Are you sure you want to delete this district?")) {
          deleteDistrict(id);
        }
      });
    });
  }

  // Fetch and render all districts
  async function fetchAndRenderDistricts() {
    try {
      const data = await apiRequest(`${baseUrl}/district/all-districts`);
      renderDistrictTable(
        data.map((d) => ({
          _id: d._id,
          districtName: d.districtName,
          stateName: d.state?.name || "",
          countryName: d.country?.name || "",
        }))
      );
    } catch (err) {
      renderDistrictTable([]);
    }
  }

  // Add district using common form handler
  handleForm(districtForm, async (formData) => {
    const country = countryDropdown.value;
    const state = stateDropdown.value;
    const districtName = districtForm.districtName.value.trim();
    if (!country || !state || !districtName) {
      alert("Please fill all required fields.");
      return;
    }
    try {
      await apiRequest(`${baseUrl}/district/add-district`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country, state, districtName }),
      });
      alert("District added successfully!");
      districtForm.reset();
      fetchAndRenderDistricts();
      if (formDiv && listDiv) {
        formDiv.style.display = "none";
        listDiv.style.display = "block";
      }
    } catch (err) {
      alert("Failed to add district.");
    }
  });

  // Delete district using common API utility
  async function deleteDistrict(id) {
    try {
      await apiRequest(`${baseUrl}/district/delete-district/${id}`, {
        method: "DELETE",
      });
      alert("District deleted!");
      fetchAndRenderDistricts();
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
    const countrySelect = document.getElementById("editDistrictCountry");
    const stateSelect = document.getElementById("editDistrictState");
    populateCountryDropdown(
      countrySelect,
      district.country?._id || district.country
    ).then(() => {
      populateStateDropdown(
        district.country?._id || district.country,
        stateSelect,
        district.state?._id || district.state
      );
    });
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
        body: formData,
      });
      alert("District updated!");
      closeEditDistrictModal();
      fetchAndRenderDistricts();
    } catch (error) {
      alert("Failed to update district.");
    }
  });

  // On country change, update state dropdown
  countryDropdown.addEventListener("change", function () {
    populateStateDropdown(countryDropdown.value, stateDropdown);
  });

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

  // Initial population
  populateCountryDropdown(countryDropdown);
  fetchAndRenderDistricts();
});
