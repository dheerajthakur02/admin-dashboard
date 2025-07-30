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
      { key: "popularName", render: (c) => c.popularName || "" },
      { key: "shortName", render: (c) => c.shortName || "" },
      { key: "establishedYear", render: (c) => c.establishedYear || "" },
      { key: "typeMode", render: (c) => c.typeMode || "" },
      {
        key: "affiliation",
        render: (c) => c.affiliation?.affliciationName || "",
      },
      {
        key: "approvedThrough",
        render: (c) =>
          c.approvedThrough
            ? Array.isArray(c.approvedThrough)
              ? c.approvedThrough.map((a) => a.approvesThroughName).join(", ")
              : c.approvedThrough.approvesThroughName
            : "N/A",
      },
      {
        key: "facilities",
        render: (c) => {
          if (!c.facilities) return "";
          if (Array.isArray(c.facilities)) {
            return c.facilities.map((f) => f.name).join(", ");
          } else {
            return c.facilities.name || "";
          }
        },
      },
      {
        key: "collegeCourses",
        render: (c) => {
          if (!c.collegeCourses) return "";
          if (Array.isArray(c.collegeCourses)) {
            return c.collegeCourses.map((course) => course.name).join(", ");
          } else {
            return c.collegeCourses.name || "";
          }
        },
      },
      {
        key: null,
        render: (c) =>
          `<button class='edit-btn' title='Edit' data-college-id="${c._id}" style='background:#2563eb; color:#fff; border:none; border-radius:6px; padding:6px 14px; cursor:pointer; font-size:1rem;'><i class='fa fa-edit'></i></button>`,
      },
    ]);

    // Add event listeners for edit buttons
    const editButtons = document.querySelectorAll(".edit-btn");
    editButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const collegeId = this.getAttribute("data-college-id");
        handleEditCollege(collegeId);
      });
    });
  }

  // Fetch and render all colleges using common API utility
  async function fetchColleges() {
    try {
      console.log("Fetching colleges from:", `${baseUrl}/college/all-colleges`);
      const data = await apiRequest(`${baseUrl}/college/all-colleges`);
      console.log("Colleges data received:", data);

      if (Array.isArray(data)) {
        renderCollegeTable(data);
      } else {
        console.error("Invalid data format received:", data);
        const tableElement = document.getElementById("collegeTable");
        if (tableElement) {
          tableElement.innerHTML =
            '<tr><td colspan="11" style="text-align:center; color:#ef4444;">Invalid data format received</td></tr>';
        }
      }
    } catch (err) {
      console.error("Error fetching colleges:", err);
      const tableElement = document.getElementById("collegeTable");
      if (tableElement) {
        tableElement.innerHTML =
          '<tr><td colspan="11" style="text-align:center; color:#ef4444;">Failed to load data: ' +
          err.message +
          "</td></tr>";
      }
    }
  }

  async function populateDropdowns() {
    try {
      // Fetch affiliation data
      const affiliationResponse = await fetch(
        `${baseUrl}/affilication/all-affilication`
      );
      const affiliationData = await affiliationResponse.json();

      // Fetch approved through data
      const approvedResponse = await fetch(
        `${baseUrl}/approved-through/all-approved-through`
      );
      const approvedData = await approvedResponse.json();

      // Fetch facilities data
      const facilitiesResponse = await fetch(
        `${baseUrl}/college-facility/all-college-facility`
      );
      const facilitiesData = await facilitiesResponse.json();

      // Fetch courses data
      const coursesResponse = await fetch(`${baseUrl}/course/all`);
      const coursesData = (await coursesResponse.json()).courses;

      // Populate affiliation dropdowns
      const affiliationSelect = document.getElementById("affiliation");
      const editAffiliationSelect = document.getElementById("editAffiliation");

      if (affiliationSelect) {
        affiliationSelect.innerHTML =
          '<option value="">-- Select Affiliation --</option>';
        affiliationData.forEach((item) => {
          const option = document.createElement("option");
          option.value = item._id;
          option.textContent = item.affliciationName;
          affiliationSelect.appendChild(option);
        });
      }

      if (editAffiliationSelect) {
        editAffiliationSelect.innerHTML =
          '<option value="">-- Select Affiliation --</option>';
        affiliationData.forEach((item) => {
          const option = document.createElement("option");
          option.value = item._id;
          option.textContent = item.affliciationName;
          editAffiliationSelect.appendChild(option);
        });
      }

      // Populate approved through dropdowns
      const approvedSelect = document.getElementById("approvedThrough");
      const editApprovedSelect = document.getElementById("editApprovedThrough");

      if (approvedSelect) {
        approvedSelect.innerHTML =
          '<option value="">-- Select Approval Body --</option>';
        approvedData.forEach((item) => {
          const option = document.createElement("option");
          option.value = item._id;
          option.textContent = item.approvesThroughName;
          approvedSelect.appendChild(option);
        });
      }

      if (editApprovedSelect) {
        editApprovedSelect.innerHTML =
          '<option value="">-- Select Approval Body --</option>';
        approvedData.forEach((item) => {
          const option = document.createElement("option");
          option.value = item._id;
          option.textContent = item.approvesThroughName;
          editApprovedSelect.appendChild(option);
        });
      }

      // Populate facilities dropdowns
      const facilitiesSelect = document.getElementById("facilities");
      const editFacilitiesSelect = document.getElementById("editFacilities");

      if (facilitiesSelect) {
        facilitiesSelect.innerHTML =
          '<option value="">-- Select Facility --</option>';
        facilitiesData.forEach((item) => {
          const option = document.createElement("option");
          option.value = item._id;
          option.textContent = item.name;
          facilitiesSelect.appendChild(option);
        });
      }

      if (editFacilitiesSelect) {
        editFacilitiesSelect.innerHTML =
          '<option value="">-- Select Facility --</option>';
        facilitiesData.forEach((item) => {
          const option = document.createElement("option");
          option.value = item._id;
          option.textContent = item.name;
          editFacilitiesSelect.appendChild(option);
        });
      }

      // Populate courses dropdowns
      const coursesSelect = document.getElementById("collegeCourses");
      const editCoursesSelect = document.getElementById("editCollegeCourses");

      if (coursesSelect) {
        coursesSelect.innerHTML =
          '<option value="">-- Select Course --</option>';
        coursesData.forEach((item) => {
          const option = document.createElement("option");
          option.value = item._id;
          option.textContent = item.name;
          coursesSelect.appendChild(option);
        });
      }

      if (editCoursesSelect) {
        editCoursesSelect.innerHTML =
          '<option value="">-- Select Course --</option>';
        coursesData.forEach((item) => {
          const option = document.createElement("option");
          option.value = item._id;
          option.textContent = item.name;
          editCoursesSelect.appendChild(option);
        });
      }
    } catch (error) {
      console.error("Error populating dropdowns:", error);
    }
  }

  // Add college using common form handler
  handleForm(form, async (formData) => {
    try {
      // Get address fields
      const addressLine1 = document.getElementById("addressLine1").value;
      const addressLine2 = document.getElementById("addressLine2").value;
      const pincode = document.getElementById("pincode").value;

      console.log("Form data before processing:", formData);
      console.log("Address fields:", {
        addressLine1,
        addressLine2,
        pincode,
      });

      // Add address fields
      if (addressLine1) formData.append("address[line1]", addressLine1);
      if (addressLine2) formData.append("address[line2]", addressLine2);
      if (pincode) formData.append("address[pincode]", pincode);

      // Add gallery and video files from custom arrays
      selectedGalleryFiles.forEach((file) => {
        formData.append("collegeGallery", file);
      });
      selectedVideoFiles.forEach((file) => {
        formData.append("collegeVideo", file);
      });

      console.log("Form data after processing:", formData);
      console.log("Making API request to:", `${baseUrl}/college/add-college`);

      const response = await apiRequest(`${baseUrl}/college/add-college`, {
        method: "POST",
        body: formData,
      });

      alert("College added successfully!");
      form.reset();

      // Clear image previews with null checks
      const logoPreview = document.getElementById("collegeLogoPreview");
      const bannerPreview = document.getElementById("collegeBannerPreview");
      const brochurePreview = document.getElementById("collegeBrochurePreview");

      if (logoPreview) logoPreview.src = "";
      if (bannerPreview) bannerPreview.src = "";
      if (brochurePreview) brochurePreview.src = "";

      // Clear custom file arrays
      selectedGalleryFiles = [];
      selectedVideoFiles = [];

      // Clear file previews
      const galleryPreview = document.getElementById("galleryPreview");
      const videoPreview = document.getElementById("videoPreview");
      if (galleryPreview) galleryPreview.innerHTML = "";
      if (videoPreview) videoPreview.innerHTML = "";

      fetchColleges();
      showList();
    } catch (err) {
      console.error("Error in form submission:", err);
      let errorMessage = "Failed to save college.";
      if (err.message.includes("district")) {
        errorMessage = "Please select a valid district or leave it empty.";
      } else if (err.message.includes("validation")) {
        errorMessage = "Please check all required fields.";
      }
      alert(errorMessage + " Please check the console for details.");
    }
  });

  // Handle edit college functionality
  function handleEditCollege(collegeId) {
    // Fetch college data and populate edit form
    fetch(`${baseUrl}/college/get-college/${collegeId}`)
      .then((response) => response.json())
      .then((college) => {
        // Populate edit form fields
        document.getElementById("editCollegeId").value = college._id;
        document.getElementById("editName").value = college.name || "";
        document.getElementById("editPopularName").value =
          college.popularName || "";
        document.getElementById("editShortName").value =
          college.shortName || "";
        document.getElementById("editTypeMode").value =
          college.typeMode || "fullTime";

        // Set affiliation
        if (college.affiliation) {
          document.getElementById("editAffiliation").value =
            college.affiliation._id;
        }

        // Set approved through (single selection)
        const editApprovedSelect = document.getElementById(
          "editApprovedThrough"
        );
        if (college.approvedThrough && college.approvedThrough.length > 0) {
          editApprovedSelect.value = college.approvedThrough[0]._id;
        }

        // Set facilities (single selection)
        const editFacilitiesSelect = document.getElementById("editFacilities");
        if (college.facilities) {
          if (
            Array.isArray(college.facilities) &&
            college.facilities.length > 0
          ) {
            editFacilitiesSelect.value = college.facilities[0]._id;
          } else if (college.facilities._id) {
            editFacilitiesSelect.value = college.facilities._id;
          }
        }

        // Set courses (single selection)
        const editCoursesSelect = document.getElementById("editCollegeCourses");
        if (college.collegeCourses) {
          if (
            Array.isArray(college.collegeCourses) &&
            college.collegeCourses.length > 0
          ) {
            editCoursesSelect.value = college.collegeCourses[0]._id;
          } else if (college.collegeCourses._id) {
            editCoursesSelect.value = college.collegeCourses._id;
          }
        }

        // Show edit modal
        document.getElementById("editCollegeModal").style.display = "flex";
      })
      .catch((error) => {
        console.error("Error fetching college data:", error);
        alert("Failed to load college data for editing.");
      });
  }

  // Handle edit form submission
  const editForm = document.getElementById("editCollegeForm");
  if (editForm) {
    editForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(editForm);

      try {
        const collegeId = document.getElementById("editCollegeId").value;
        await apiRequest(`${baseUrl}/college/edit-college/${collegeId}`, {
          method: "PUT",
          body: formData,
        });
        alert("College updated successfully!");
        document.getElementById("editCollegeModal").style.display = "none";
        fetchColleges();
      } catch (err) {
        alert("Failed to update college.");
      }
    });
  }

  // Handle modal close
  const closeModal = document.getElementById("closeEditCollegeModal");
  const cancelEditBtn = document.getElementById("cancelEditCollegeBtn");

  if (closeModal) {
    closeModal.addEventListener("click", () => {
      document.getElementById("editCollegeModal").style.display = "none";
    });
  }

  if (cancelEditBtn) {
    cancelEditBtn.addEventListener("click", () => {
      document.getElementById("editCollegeModal").style.display = "none";
    });
  }

  // Close modal when clicking outside
  window.addEventListener("click", (e) => {
    const modal = document.getElementById("editCollegeModal");
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  // Initialize dropdowns and fetch colleges
  populateDropdowns();
  fetchColleges();

  // Populate dropdowns with data
  // populateDropdowns(); // This line is now redundant as populateDropdowns is called in DOMContentLoaded
});

// --- File name preview for College Gallery and Video ---
function setupFileNamePreview(inputId, previewId) {
  const input = document.getElementById(inputId);
  const preview = document.getElementById(previewId);
  if (!input || !preview) return;
  input.addEventListener("change", function () {
    preview.innerHTML = "";
    if (input.files && input.files.length > 0) {
      const ul = document.createElement("ul");
      ul.style.margin = "0";
      ul.style.padding = "0";
      ul.style.listStyle = "none";
      for (let i = 0; i < input.files.length; i++) {
        const li = document.createElement("li");
        li.textContent = input.files[i].name;
        li.style.fontSize = "0.97em";
        li.style.color = "#2563eb";
        li.style.marginBottom = "2px";
        ul.appendChild(li);
      }
      preview.appendChild(ul);
    }
  });
}

// --- Maintain custom arrays for gallery and video files ---
let selectedGalleryFiles = [];
let selectedVideoFiles = [];

function setupFileAppendPreview(inputId, previewId, selectedFilesArr) {
  const input = document.getElementById(inputId);
  const preview = document.getElementById(previewId);
  if (!input || !preview) return;

  function renderPreview() {
    preview.innerHTML = "";
    if (selectedFilesArr.length > 0) {
      const ul = document.createElement("ul");
      ul.style.margin = "0";
      ul.style.padding = "0";
      ul.style.listStyle = "none";
      for (let i = 0; i < selectedFilesArr.length; i++) {
        const li = document.createElement("li");
        li.style.display = "flex";
        li.style.alignItems = "center";
        li.style.fontSize = "0.97em";
        li.style.color = "#2563eb";
        li.style.marginBottom = "2px";
        li.textContent = selectedFilesArr[i].name;
        // Add remove button
        const removeBtn = document.createElement("button");
        removeBtn.type = "button";
        removeBtn.innerHTML = "&times;";
        removeBtn.title = "Remove";
        removeBtn.style.marginLeft = "10px";
        removeBtn.style.background = "none";
        removeBtn.style.border = "none";
        removeBtn.style.color = "#ef4444";
        removeBtn.style.fontSize = "1.2em";
        removeBtn.style.cursor = "pointer";
        removeBtn.onmouseover = () => (removeBtn.style.color = "#b91c1c");
        removeBtn.onmouseout = () => (removeBtn.style.color = "#ef4444");
        removeBtn.onclick = () => {
          selectedFilesArr.splice(i, 1);
          renderPreview();
        };
        li.appendChild(removeBtn);
        ul.appendChild(li);
      }
      preview.appendChild(ul);
    }
  }

  input.addEventListener("change", function () {
    // Add new files to the array (avoid duplicates by name+size)
    for (let i = 0; i < input.files.length; i++) {
      const file = input.files[i];
      if (
        !selectedFilesArr.some(
          (f) => f.name === file.name && f.size === file.size
        )
      ) {
        selectedFilesArr.push(file);
      }
    }
    // Clear input so user can add same file again if needed
    input.value = "";
    renderPreview();
  });

  // Initial render (in case of edit modal in future)
  renderPreview();
}

setupFileAppendPreview(
  "collegeGallery",
  "galleryPreview",
  selectedGalleryFiles
);
setupFileAppendPreview("collegeVideo", "videoPreview", selectedVideoFiles);

// --- On form submit, append all files from custom arrays to FormData ---
const originalHandleForm = handleForm;
window.handleForm = function (form, submitFn) {
  originalHandleForm(form, async (formData) => {
    // Remove any existing files from FormData
    formData.delete("collegeGallery[]");
    formData.delete("collegeVideo[]");
    // Append all gallery files
    selectedGalleryFiles.forEach((file) => {
      formData.append("collegeGallery[]", file);
    });
    // Append all video files
    selectedVideoFiles.forEach((file) => {
      formData.append("collegeVideo[]", file);
    });
    // Call the original submit function
    await submitFn(formData);
  });
};

// --- Fetch and populate Country, State, and District dropdowns ---
async function populateCountryStateDistrictDropdowns() {
  // Fetch countries
  // const countrySelect = document.getElementById("country");
  // if (countrySelect) {
  //   try {
  //     const countryRes = await fetch(`${baseUrl}/country/all`);
  //     const countries = await countryRes.json();
  //     countrySelect.innerHTML =
  //       '<option value="">-- Select Country --</option>';
  //     countries.forEach((c) => {
  //       const option = document.createElement("option");
  //       option.value = c._id;
  //       option.textContent = c.name;
  //       countrySelect.appendChild(option);
  //     });
  //   } catch (e) {
  //     countrySelect.innerHTML =
  //       '<option value="">Failed to load countries</option>';
  //   }
  // }
  // Fetch states
  const stateSelect = document.getElementById("state");
  if (stateSelect) {
    try {
      console.log("Loading all states");
      const stateRes = await fetch(
        `http://localhost:4000/api/state/all-states`
      );
      console.log("State response", stateRes);
      console.log("All states", stateRes);
      const states = await stateRes.json();
      stateSelect.innerHTML = '<option value="">-- Select State --</option>';
      states.forEach((s) => {
        const option = document.createElement("option");
        option.value = s._id;
        option.textContent = s.name;
        stateSelect.appendChild(option);
      });
    } catch (e) {
      stateSelect.innerHTML = '<option value="">Failed to load states</option>';
    }
  }
  // Remove initial fetch for all districts
  // const districtSelect = document.getElementById("district");
  // if (districtSelect) {
  //   try {
  //     const districtRes = await fetch(
  //       `http://localhost:4000/api/district/all-districts`
  //     );
  //     const districts = await districtRes.json();
  //     districtSelect.innerHTML =
  //       '<option value="">-- Select District --</option>';
  //     districts.forEach((d) => {
  //       const option = document.createElement("option");
  //       option.value = d._id;
  //       option.textContent = d.name;
  //       districtSelect.appendChild(option);
  //     });
  //   } catch (e) {
  //     districtSelect.innerHTML =
  //       '<option value="">Failed to load districts</option>';
  //   }
  // }

  // Add event listener to fetch districts for selected state only
  const districtSelect = document.getElementById("district");
  if (stateSelect && districtSelect) {
    stateSelect.addEventListener("change", async function () {
      const stateId = this.value;
      if (!stateId) {
        districtSelect.innerHTML =
          '<option value="">-- Select District --</option>';
        return;
      }
      try {
        const res = await fetch(
          `http://localhost:4000/api/district/by-state/${stateId}`
        );
        const districts = await res.json();
        districtSelect.innerHTML =
          '<option value="">-- Select District --</option>';
        districts.forEach((d) => {
          const option = document.createElement("option");
          option.value = d._id;
          option.textContent = d.districtName;
          districtSelect.appendChild(option);
        });
      } catch (e) {
        districtSelect.innerHTML =
          '<option value="">Failed to load districts</option>';
      }
    });
  }
}

// Call this after DOMContentLoaded or in your main init
populateCountryStateDistrictDropdowns();
