document.addEventListener("DOMContentLoaded", function () {
  const baseUrl = window.baseUrl || "http://localhost:4000/api";
  if (typeof initSidebar === "function") initSidebar();

  // Auto-open College Master submenu on addcollege.php
  const collegeDropdown = document.getElementById("collegeMasterDropdown");
  const collegeChevron = document.getElementById("collegeChevron");
  if (collegeDropdown && !collegeDropdown.classList.contains("open")) {
    collegeDropdown.classList.add("open");
    if (collegeChevron) {
      collegeChevron.style.transform = "rotate(180deg)";
    }
  }
  // Highlight the Add College link in the sidebar as active
  const addCollegeSidebarLink = document.querySelector(
    'a[href="addcollege.php"]'
  );
  if (addCollegeSidebarLink) {
    addCollegeSidebarLink.classList.add("active");
    addCollegeSidebarLink.style.background = "#2563eb";
    addCollegeSidebarLink.style.color = "#fff";
    // Remove active from siblings
    const submenuLinks =
      addCollegeSidebarLink.parentElement.parentElement.querySelectorAll("a");
    submenuLinks.forEach((link) => {
      if (link !== addCollegeSidebarLink) {
        link.classList.remove("active");
        link.style.background = "";
        link.style.color = "";
      }
    });
  }

  const form = document.querySelector("form");
  const mainContainer = document.querySelector(".main-container");
  const formDiv = document.getElementById("collegeFormDiv");
  const listDiv = document.getElementById("collegeListDiv");
  const showFormBtn = document.getElementById("showFormBtn");
  const showListBtn = document.getElementById("showListBtn");

  // Ensure only the college list is visible by default
  if (formDiv) formDiv.style.display = "none";
  if (listDiv) listDiv.style.display = "block";

  // Show/hide logic for form and list
  function showForm() {
    if (formDiv) formDiv.style.display = "block";
    if (listDiv) listDiv.style.display = "none";
  }
  function showList() {
    if (formDiv) formDiv.style.display = "none";
    if (listDiv) listDiv.style.display = "block";
  }
  if (showFormBtn) showFormBtn.addEventListener("click", showForm);
  if (showListBtn) showListBtn.addEventListener("click", showList);

  // Use common image preview utility
  previewImage("collegeLogoInput", "collegeLogoPreview");
  previewImage("collegeBannerInput", "collegeBannerPreview");
  previewImage("collegeBrochureInput", "collegeBrochurePreview");

  // Render table rows using only the columns in the screenshot
  function renderCollegeTable(colleges) {
    renderTable(document.getElementById("collegeTable"), colleges, [
      { key: null, render: (c, i) => i + 1 },
      { key: "name", render: (c) => c.name || "" },
      { key: "location", render: (c) => c.location || "" },
      {
        key: "collegeLogo",
        render: (c) =>
          c.collegeLogo
            ? `<img src='/${c.collegeLogo}' style='max-width:48px;max-height:48px;border-radius:6px;' />`
            : "",
      },
      {
        key: null,
        render: (c) =>
          `<button class='gallery-btn' title='Gallery' style='background:none; border:none; cursor:pointer;'><i class='fa fa-image' style='color:#22c55e; font-size:1.3rem;'></i></button>`,
      },
      {
        key: null,
        render: (c) =>
          `<button class='notify-btn' title='Notify' style='background:#fff; color:#ef4444; border:1.5px solid #ef4444; border-radius:6px; padding:6px 10px; margin-right:6px; cursor:pointer; font-size:1rem;'><i class='fa fa-bell'></i></button><button class='edit-btn' title='Edit' style='background:#2563eb; color:#fff; border:none; border-radius:6px; padding:6px 14px; cursor:pointer; font-size:1rem;'><i class='fa fa-edit'></i></button>`,
      },
    ]);
    // Add event listeners for gallery, notify, and edit as needed
  }

  // Fetch and render all colleges using common API utility
  async function fetchColleges() {
    try {
      const data = await apiRequest(`${baseUrl}/college/all-colleges`);
      renderCollegeTable(data);
    } catch (err) {
      document.getElementById("collegeTable").innerHTML =
        '<tr><td colspan="6" style="text-align:center; color:#ef4444;">Failed to load data</td></tr>';
    }
  }

  // Add college using common form handler
  handleForm(form, async (formData) => {
    try {
      await apiRequest(`${baseUrl}/college/add-college`, {
        method: "POST",
        body: formData,
      });
      alert("Added!");
      form.reset();
      document.getElementById("collegeLogoPreview").src = "";
      document.getElementById("collegeBannerPreview").src = "";
      document.getElementById("collegeBrochurePreview").src = "";
      fetchColleges();
      showList();
    } catch (err) {
      alert("Failed to save.");
    }
  });

  fetchColleges();
});
