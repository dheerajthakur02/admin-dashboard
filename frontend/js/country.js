// Country Management JavaScript

document.addEventListener("DOMContentLoaded", function () {
  console.log("Country management JS loaded");

  const baseUrl = window.baseUrl;

  // Country form/list functionality
  const showFormBtn = document.getElementById("showFormBtn");
  const showListBtn = document.getElementById("showListBtn");
  const formDiv = document.getElementById("formDiv");
  const listDiv = document.getElementById("listDiv");
  const countryForm = document.getElementById("countryForm");
  const countryTable = document.getElementById("countryTable");

  let countries = [];
  let editMode = false;
  let editId = null;

  // Button event listeners
  if (showFormBtn) {
    showFormBtn.onclick = () => {
      editMode = false;
      editId = null;
      countryForm.reset();
      formDiv.style.display = "";
      listDiv.style.display = "none";
      // Focus the Country Name input
      const nameInput = countryForm.querySelector('input[name="name"]');
      if (nameInput) {
        nameInput.focus();
      }
    };
  }

  if (showListBtn) {
    showListBtn.onclick = () => {
      editMode = false;
      editId = null;
      countryForm.reset();
      formDiv.style.display = "none";
      listDiv.style.display = "";
      fetchCountries();
    };
  }

  // Form submission handler with API integration
  if (countryForm) {
    countryForm.onsubmit = async function (e) {
      e.preventDefault();
      const formData = new FormData(countryForm);
      try {
        let response, result;
        if (editMode && editId) {
          response = await fetch(`${baseUrl}/country/edit-country/${editId}`, {
            method: "PUT",
            body: formData,
          });
          result = await response.json();
          alert(result.message || "Country updated!");
        } else {
          response = await fetch(`${baseUrl}/country/add-country`, {
            method: "POST",
            body: formData,
          });
          result = await response.json();
          alert(result.message || "Country added!");
        }
        countryForm.reset();
        formDiv.style.display = "none";
        listDiv.style.display = "block";
        editMode = false;
        editId = null;
        fetchCountries();
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("Failed to submit country.");
      }
    };
  }

  // Fetch countries from API
  async function fetchCountries() {
    try {
      const res = await fetch(`${baseUrl}/country/all-countries`);
      const data = await res.json();
      countries = data;
      renderTable();
    } catch (err) {
      console.error("Fetch error:", err);
    }
  }

  // Render table function with image support
  function renderTable() {
    if (countryTable) {
      countryTable.innerHTML = countries
        .map(
          (c, i) => `
        <tr style="border-bottom: 1px solid #f3f4f6; transition: background-color 0.2s;">
          <td style="padding: 16px 12px; font-weight: 500; color: #6b7280;">${
            i + 1
          }</td>
          <td style="padding: 16px 12px; font-weight: 600; color: #111827;">${
            c.name
          }</td>
          <td style="padding: 16px 12px; font-weight: 500; color: #374151; font-family: monospace; background: #f9fafb; border-radius: 4px;">${
            c.code
          }</td>
          <td style="padding: 16px 12px; color: #6b7280; max-width: 300px; word-wrap: break-word;">${
            c.description
          }</td>
          <td style="padding: 16px 12px; text-align: center;">
            ${
              c.logo
                ? `<img src="http://localhost:4000/${c.logo}" alt="logo" style="width: 50px; height: 50px; object-fit: cover; border-radius: 6px; border: 2px solid #e5e7eb;" />`
                : "<span style='color: #9ca3af; font-style: italic;'>N/A</span>"
            }
          </td>
          <td style="padding: 16px 12px; text-align: center;">
            ${
              c.flag
                ? `<img src="http://localhost:4000/${c.flag}" alt="flag" style="width: 50px; height: 35px; object-fit: cover; border-radius: 4px; border: 1px solid #e5e7eb;" />`
                : "<span style='color: #9ca3af; font-style: italic;'>N/A</span>"
            }
          </td>
          <td style="padding: 16px 12px; text-align: center;">
            <button class="edit-btn" data-id="${
              c._id
            }" style="background:#fbbf24; color:#fff; border:none; border-radius:6px; padding:6px 14px; margin-right:6px; cursor:pointer; font-size:0.95rem;"><i class="fa fa-edit"></i> Edit</button>
            <button class="delete-btn" data-id="${
              c._id
            }" style="background:#ef4444; color:#fff; border:none; border-radius:6px; padding:6px 14px; cursor:pointer; font-size:0.95rem;"><i class="fa fa-trash"></i> Delete</button>
          </td>
        </tr>
      `
        )
        .join("");
      // Add event listeners for edit and delete buttons
      document.querySelectorAll(".edit-btn").forEach((btn) => {
        btn.addEventListener("click", function () {
          const id = this.getAttribute("data-id");
          const country = countries.find((c) => c._id === id);
          if (country) openEditForm(country);
        });
      });
      document.querySelectorAll(".delete-btn").forEach((btn) => {
        btn.addEventListener("click", function () {
          const id = this.getAttribute("data-id");
          if (confirm("Are you sure you want to delete this country?")) {
            deleteCountry(id);
          }
        });
      });
    }
  }

  // Open main form for editing
  function openEditForm(country) {
    editMode = true;
    editId = country._id;
    formDiv.style.display = "";
    listDiv.style.display = "none";
    countryForm.querySelector('input[name="name"]').value = country.name;
    countryForm.querySelector('input[name="code"]').value = country.code;
    countryForm.querySelector('textarea[name="description"]').value =
      country.description;
    // Logo and flag: user can upload new ones if desired
    // (file inputs cannot be pre-filled for security reasons)
  }

  // Modal logic
  const editModal = document.getElementById("editCountryModal");
  const closeEditModalBtn = document.getElementById("closeEditModal");
  const cancelEditBtn = document.getElementById("cancelEditBtn");
  function openEditModal(country) {
    document.getElementById("editCountryId").value = country._id;
    document.getElementById("editCountryName").value = country.name;
    document.getElementById("editCountryCode").value = country.code;
    document.getElementById("editCountryDescription").value =
      country.description;
    if (editModal) editModal.style.display = "flex";
  }
  function closeEditModal() {
    if (editModal) editModal.style.display = "none";
  }
  if (closeEditModalBtn) closeEditModalBtn.onclick = closeEditModal;
  if (cancelEditBtn) cancelEditBtn.onclick = closeEditModal;
  window.onclick = function (event) {
    if (event.target === editModal) closeEditModal();
  };

  // Edit form submit
  const editCountryForm = document.getElementById("editCountryForm");
  if (editCountryForm) {
    editCountryForm.onsubmit = async function (e) {
      e.preventDefault();
      const id = document.getElementById("editCountryId").value;
      const formData = new FormData(editCountryForm);
      try {
        const response = await fetch(`${baseUrl}/country/edit-country/${id}`, {
          method: "PUT",
          body: formData,
        });
        const result = await response.json();
        alert(result.message || "Country updated!");
        closeEditModal();
        fetchCountries();
      } catch (error) {
        alert("Failed to update country.");
      }
    };
  }

  // Delete country
  async function deleteCountry(id) {
    try {
      const response = await fetch(`${baseUrl}/country/delete-country/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();
      alert(result.message || "Country deleted!");
      fetchCountries();
    } catch (error) {
      alert("Failed to delete country.");
    }
  }

  // Auto-open Location Directory submenu on country page
  const locationDropdown = document.getElementById("locationDirectoryDropdown");
  const locationChevron = document.getElementById("locationChevron");
  if (locationDropdown && !locationDropdown.classList.contains("open")) {
    locationDropdown.classList.add("open");
    if (locationChevron) {
      locationChevron.style.transform = "rotate(180deg)";
    }
  }

  // Highlight the Country link in the sidebar as active
  const countrySidebarLink = document.querySelector('a[href="country.php"]');
  if (countrySidebarLink) {
    countrySidebarLink.classList.add("active");
    countrySidebarLink.style.background = "#2563eb";
    countrySidebarLink.style.color = "#fff";
    // Remove active from siblings
    const submenuLinks =
      countrySidebarLink.parentElement.parentElement.querySelectorAll("a");
    submenuLinks.forEach((link) => {
      if (link !== countrySidebarLink) {
        link.classList.remove("active");
        link.style.background = "";
        link.style.color = "";
      }
    });
  }

  fetchCountries();
});
