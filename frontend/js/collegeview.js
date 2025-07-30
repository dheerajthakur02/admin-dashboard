// Country Management JavaScript

document.addEventListener("DOMContentLoaded", function () {
  const baseUrl = window.baseUrl;

  // Sidebar/menu logic
  if (typeof initSidebar === "function") initSidebar();

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

  // Button event listeners with toggle functionality
  if (showFormBtn) {
    showFormBtn.onclick = () => {
      editMode = false;
      editId = null;
      countryForm.reset();
      formDiv.style.display = "";
      listDiv.style.display = "none";
      // Hide Add Record button, show Record List button
      showFormBtn.style.display = "none";
      showListBtn.style.display = "inline-block";
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
      // Hide Record List button, show Add Record button
      showListBtn.style.display = "none";
      showFormBtn.style.display = "inline-block";
      fetchCountries();
    };
  }

  // Form submission handler with API integration
  handleForm(countryForm, async (formData) => {
    try {
      let result;
      if (editMode && editId) {
        result = await apiRequest(`${baseUrl}/country/edit-country/${editId}`, {
          method: "PUT",
          body: formData,
        });
        alert(result.message || "Country updated!");
      } else {
        result = await apiRequest(`${baseUrl}/country/add-country`, {
          method: "POST",
          body: formData,
        });
        alert(result.message || "Country added!");
      }
      countryForm.reset();
      formDiv.style.display = "none";
      listDiv.style.display = "block";
      editMode = false;
      editId = null;
      fetchCountries();
    } catch (error) {
      alert("Failed to submit country.");
    }
  });

  // Fetch countries from API and render table
  async function fetchCountries() {
    try {
      countries = await apiRequest(`${baseUrl}/country/all-countries`);
      renderCountryTable();
    } catch (err) {
      countryTable.innerHTML =
        '<tr><td colspan="7" style="text-align:center; color:#ef4444;">Failed to load data</td></tr>';
    }
  }

  // Render table function with image support using common utility
  function renderCountryTable() {
    renderTable(countryTable, countries, [
      { key: null, render: (c, i) => i + 1 },
      { key: "name" },
      { key: "code" },
      { key: "description" },
      {
        key: "logo",
        render: (c) =>
          c.logo
            ? `<img src=\"http://localhost:4000/${c.logo}\" alt=\"logo\" style=\"width: 50px; height: 50px; object-fit: cover; border-radius: 6px; border: 2px solid #e5e7eb;\" />`
            : "<span style='color: #9ca3af; font-style: italic;'>N/A</span>",
      },
      {
        key: "flag",
        render: (c) =>
          c.flag
            ? `<img src=\"http://localhost:4000/${c.flag}\" alt=\"flag\" style=\"width: 50px; height: 35px; object-fit: cover; border-radius: 4px; border: 1px solid #e5e7eb;\" />`
            : "<span style='color: #9ca3af; font-style: italic;'>N/A</span>",
      },
      {
        key: null,
        render: (c) => `
        <button class='edit-btn' data-id='${c._id}' style='background:#fbbf24; color:#fff; border:none; border-radius:6px; padding:6px 14px; margin-right:6px; cursor:pointer; font-size:0.95rem;'><i class='fa fa-edit'></i> Edit</button>
        <button class='delete-btn' data-id='${c._id}' style='background:#ef4444; color:#fff; border:none; border-radius:6px; padding:6px 14px; cursor:pointer; font-size:0.95rem;'><i class='fa fa-trash'></i> Delete</button>
      `,
      },
    ]);
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

  // Delete country using common API utility
  async function deleteCountry(id) {
    try {
      await apiRequest(`${baseUrl}/country/delete-country/${id}`, {
        method: "DELETE",
      });
      alert("Country deleted!");
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
