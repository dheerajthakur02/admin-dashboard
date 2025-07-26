// === Sidebar Submenu Toggle ===
if (typeof initSidebar === "function") initSidebar();

function toggleSubmenu(dropdownId, chevronId) {
  const dropdown = document.getElementById(dropdownId);
  const chevron = document.getElementById(chevronId);

  if (dropdown) {
    const isOpen = dropdown.classList.toggle("open");
    if (chevron) {
      chevron.style.transform = isOpen ? "rotate(180deg)" : "rotate(0deg)";
      chevron.style.transition = "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
    }
  }
}

function keepSubmenuOpen(dropdownId, chevronId) {
  const dropdown = document.getElementById(dropdownId);
  const chevron = document.getElementById(chevronId);

  if (dropdown && !dropdown.classList.contains("open")) {
    dropdown.classList.add("open");
    if (chevron) {
      chevron.style.transform = "rotate(180deg)";
      chevron.style.transition = "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
    }
  }
}

const submenuToggles = {
  locationDirectory: ["locationDirectoryDropdown", "locationChevron"],
  masterData: ["masterDataDropdown", "masterChevron"],
  collegeMaster: ["collegeMasterDropdown", "collegeChevron"],
  examMaster: ["examMasterDropdown", "examChevron"],
  advMaster: ["advMasterDropdown", "advChevron"],
  enquiryData: ["enquiryDataDropdown", "enquiryChevron"],
  extraPages: ["extraPagesDropdown", "extraPagesChevron"],
};

Object.entries(submenuToggles).forEach(([key, [dropdownId, chevronId]]) => {
  window[`toggle${key.charAt(0).toUpperCase() + key.slice(1)}`] = () =>
    toggleSubmenu(dropdownId, chevronId);
});

// === Sidebar (Mobile) ===
const sidebar = document.querySelector(".sidebar");
const sidebarToggle = document.getElementById("sidebarToggle");
const sidebarOverlay = document.getElementById("sidebarOverlay");

function openSidebar() {
  sidebar?.classList.add("open");
  sidebarOverlay?.classList.remove("hide");
}

function closeSidebar() {
  sidebar?.classList.remove("open");
  sidebarOverlay?.classList.add("hide");
}

sidebarToggle?.addEventListener("click", openSidebar);
sidebarOverlay?.addEventListener("click", closeSidebar);

// === Fetch Dashboard Counts ===
async function countForDashboard() {
  try {
    const data = await apiRequest("http://localhost:4000/api/get-counts");
    document.getElementById("countryCountForDashboard").textContent =
      data.data?.countryCount ?? "-";
    document.getElementById("StateCountForDashboard").textContent =
      data.data?.stateCount ?? "-";
    document.getElementById("districtCountForDashboard").textContent =
      data.data?.districtCount ?? "-";
  } catch (err) {
    console.error("Dashboard count fetch failed:", err);
    [
      "countryCountForDashboard",
      "StateCountForDashboard",
      "districtCountForDashboard",
    ].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.textContent = "-";
    });
  }
}

// === Stream & Degree Count ===
async function streamCountForDashboard() {
  try {
    const res = await fetch("http://localhost:4000/api/stream/all");
    const res2 = await fetch("http://localhost:4000/api/degree/all");
    const res3 = await fetch(
      "http://localhost:4000/api/course-duration/all-course-duration"
    );
    const res4 = await fetch("http://localhost:4000/api/course/all");

    const res5 = await fetch(
      "http://localhost:4000/api/affilication/all-affilication"
    );

    const res6 = await fetch(
      "http://localhost:4000/api/exam-type/all-exam-type"
    );

    const res7 = await fetch("http://localhost:4000/api/ranking/all-ranking");

    const res8 = await fetch(
      "http://localhost:4000/api/ownership/all-ownership"
    );

    const res9 = await fetch(
      "http://localhost:4000/api/college-facility/all-college-facility"
    );
    const data = await res.json();
    const data2 = await res2.json();
    const data3 = await res3.json();
    const data4 = await res4.json();
    const data5 = await res5.json();
    const data6 = await res6.json();
    const data7 = await res7.json();
    const data8 = await res8.json();
    const data9 = await res9.json();

    console.log(data9.length);
    const streamCountForDashboard = document.getElementById(
      "streamCountForDashboard"
    );
    const degreeCountForDashboard = document.getElementById(
      "degreeCountForDashboard"
    );

    const collegeFacilityCountForDashboard = document.getElementById(
      "collegeFacilityCountForDashboard"
    );
    streamCountForDashboard.textContent = data.data.length;
    degreeCountForDashboard.textContent = data2.degrees.length;
    courseDurationCountForDashboard.textContent = data3.length;
    courseCountForDashboard.textContent = data4.courses.length;
    affiliationCountForDashboard.textContent = data5.length;
    examTypeCountForDashboard.textContent = data6.length;
    rankingCountForDashboard.textContent = data7.length;
    ownershipCountForDashboard.textContent = data8.length;
    collegeFacilityCountForDashboard.textContent = data9.length;
  } catch (err) {
    console.error("Fetch error:", err);
  }
}
streamCountForDashboard();

// === Fullscreen Handling ===
const fullscreenToggle = document.getElementById("fullscreenToggle");

fullscreenToggle?.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

document.addEventListener("fullscreenchange", () => {
  document.body.classList.toggle(
    "fullscreen-active",
    !!document.fullscreenElement
  );
  if (!document.fullscreenElement) return;
  closeSidebar();
});

// === Init on DOMContentLoaded ===
document.addEventListener("DOMContentLoaded", () => {
  // Auto-expand Location Directory submenu on specific page
  if (window.location.pathname.includes("country.php")) {
    keepSubmenuOpen("locationDirectoryDropdown", "locationChevron");
  }

  countForDashboard();
  streamCountForDashboard();
});

// === Prevent Sidebar Close on Submenu Click ===
document.querySelectorAll(".sidebar nav .submenu li a").forEach((link) => {
  link.addEventListener("click", function () {
    document.querySelectorAll(".sidebar nav .submenu li a").forEach((l) => {
      l.classList.remove("active");
    });
    this.classList.add("active");
    if (window.innerWidth < 900) {
      document.querySelector(".sidebar").classList.remove("open");
      document.querySelector(".overlay").classList.remove("show");
    }
  });
});
