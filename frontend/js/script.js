"use strict";
document.addEventListener("DOMContentLoaded", function () {
  const baseUrl = "http://localhost:4000/api";
  window.baseUrl = baseUrl;

  // Close all submenus and remove all active classes
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

  function getFileName(url) {
    if (!url) return "";
    return url.split("/").pop().split("?")[0].split("#")[0];
  }

  const lastActiveSubmenu = localStorage.getItem("lastActiveSubmenu");
  const currentPage = getFileName(window.location.pathname);
  if (lastActiveSubmenu && currentPage !== "dashboard.php") {
    document.querySelectorAll(".submenu li a").forEach(function (link) {
      if (
        getFileName(link.getAttribute("href")) ===
        getFileName(lastActiveSubmenu)
      ) {
        link.classList.add("active");
        link.style.background = "#2563eb";
        link.style.color = "#fff";
        // Always open the parent submenu
        var parentSubmenu = link.closest(".submenu");
        if (parentSubmenu) {
          parentSubmenu.classList.add("open");
          var chevron =
            parentSubmenu.parentElement.querySelector(".fa-chevron-down");
          if (chevron) {
            chevron.style.transform = "rotate(180deg)";
          }
        }
      }
    });
  }

  // On click of any submenu link
  document.querySelectorAll(".submenu li a").forEach(function (link) {
    link.addEventListener("click", function (e) {
      // Remove active from all
      document.querySelectorAll(".submenu li a").forEach(function (l) {
        l.classList.remove("active");
        l.style.background = "";
        l.style.color = "";
      });
      // Add active to clicked
      link.classList.add("active");
      link.style.background = "#2563eb";
      link.style.color = "#fff";
      // Store only the filename in localStorage
      localStorage.setItem(
        "lastActiveSubmenu",
        getFileName(link.getAttribute("href"))
      );
      // Keep the parent submenu open
      var parentSubmenu = link.closest(".submenu");
      if (parentSubmenu) {
        parentSubmenu.classList.add("open");
        // Rotate only the parent chevron
        var chevron =
          parentSubmenu.parentElement.querySelector(".fa-chevron-down");
        if (chevron) {
          chevron.style.transform = "rotate(180deg)";
        }
      }
      // Force sidebar open (for mobile)
      var sidebar = document.querySelector(".sidebar");
      if (sidebar) {
        sidebar.classList.add("open");
      }
      // Remove overlay if present (for mobile)
      var overlay = document.querySelector(".sidebar-overlay");
      if (overlay) {
        overlay.classList.remove("hide");
        overlay.style.display = "none";
      }
      // Reset all other chevrons
      document
        .querySelectorAll(".sidebar .fa-chevron-down")
        .forEach(function (chevron) {
          if (
            !parentSubmenu ||
            chevron !==
              parentSubmenu.parentElement.querySelector(".fa-chevron-down")
          ) {
            chevron.style.transform = "rotate(0deg)";
          }
        });
      // --- PATCH: Show open effect before navigation ---
      e.preventDefault();
      setTimeout(function () {
        window.location.href = link.getAttribute("href");
      }, 120); // 120ms for visual feedback
    });
  });

  // Ensure all submenus close when clicking Dashboard main menu item
  var dashboardLink = document.querySelector(
    '.sidebar a[href="dashboard.php"]'
  );
  if (dashboardLink) {
    dashboardLink.addEventListener("click", function () {
      document
        .querySelectorAll(".sidebar .submenu")
        .forEach(function (submenu) {
          submenu.classList.remove("open");
        });
      document
        .querySelectorAll(".sidebar .fa-chevron-down")
        .forEach(function (chevron) {
          chevron.style.transform = "rotate(0deg)";
        });
    });
  }

  // Remove all code related to .submenu, .open, menu-btn, and sidebar toggling to avoid conflicts with common.js
});
