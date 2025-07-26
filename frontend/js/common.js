// common.js

// --- API Utility ---
async function apiRequest(url, options = {}) {
  try {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(res.statusText);
    return await res.json();
  } catch (err) {
    console.error("API error:", err);
    throw err;
  }
}

// --- Table Rendering Utility ---
function renderTable(container, data, columns) {
  if (!container) return;
  if (!Array.isArray(data) || data.length === 0) {
    container.innerHTML = `<tr><td colspan="${columns.length}" style="text-align:center; color:#9ca3af;">No data found</td></tr>`;
    return;
  }
  container.innerHTML = data
    .map(
      (row, i) =>
        `<tr>` +
        columns
          .map(
            (col) =>
              `<td>${
                typeof col.render === "function"
                  ? col.render(row, i)
                  : row[col.key] || ""
              }</td>`
          )
          .join("") +
        `</tr>`
    )
    .join("");
}

// --- Form Handling Utility ---
function handleForm(form, onSubmit) {
  if (!form) return;
  form.onsubmit = async function (e) {
    e.preventDefault();
    await onSubmit(new FormData(form));
  };
}

// --- Sidebar/Menu Utility ---
function initSidebar() {
  document.querySelectorAll(".sidebar .submenu").forEach(function (submenu) {
    submenu.classList.remove("open");
  });
  document.querySelectorAll(".submenu li a").forEach(function (link) {
    link.classList.remove("active");
    link.blur();
    link.style.background = "";
    link.style.color = "";
  });
  document
    .querySelectorAll(".sidebar .fa-chevron-down")
    .forEach(function (chevron) {
      chevron.style.transform = "rotate(0deg)";
      chevron.style.transition = "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
    });
  // Add more sidebar logic as needed...
}

// --- Sidebar Submenu Toggle (Event Delegation) ---
document.addEventListener("DOMContentLoaded", function () {
  // Ensure all submenus are closed on load
  document.querySelectorAll(".sidebar .submenu").forEach(function (submenu) {
    submenu.classList.remove("open");
  });
  // Remove previous individual listeners (if any)
  const sidebarNav = document.querySelector(".sidebar nav");
  if (sidebarNav) {
    sidebarNav.addEventListener("click", function (e) {
      const btn = e.target.closest(".menu-btn");
      if (!btn) return;
      const parent = btn.closest(".menu-item.has-submenu");
      if (!parent) return;
      const submenu = parent.querySelector(".submenu");
      const chevron = btn.querySelector(".submenu-chevron");
      const isOpen = submenu.classList.contains("open");
      console.log("Toggling submenu:", submenu, "Currently open:", isOpen);
      // Close all other submenus
      document
        .querySelectorAll(".sidebar .submenu.open")
        .forEach(function (openSub) {
          if (openSub !== submenu) openSub.classList.remove("open");
        });
      document
        .querySelectorAll(".sidebar .submenu-chevron")
        .forEach(function (chev) {
          if (chev !== chevron) chev.style.transform = "rotate(0deg)";
        });
      // Toggle this submenu
      submenu.classList.toggle("open");
      if (submenu.classList.contains("open")) {
        if (chevron) chevron.style.transform = "rotate(180deg)";
      } else {
        if (chevron) chevron.style.transform = "rotate(0deg)";
      }
    });
  }
});

// --- Image Preview Utility ---
function previewImage(inputId, previewId) {
  const input = document.getElementById(inputId);
  const preview = document.getElementById(previewId);
  if (input && preview) {
    input.addEventListener("change", function () {
      const file = this.files[0];
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = function (e) {
          preview.src = e.target.result;
          preview.style.display = "block";
        };
        reader.readAsDataURL(file);
      } else {
        preview.src = "";
        preview.style.display = "none";
      }
    });
  }
}

// --- Export to window for global access ---
window.apiRequest = apiRequest;
window.renderTable = renderTable;
window.handleForm = handleForm;
window.initSidebar = initSidebar;
window.previewImage = previewImage;
