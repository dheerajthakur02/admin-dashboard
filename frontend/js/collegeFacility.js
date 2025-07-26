// College Facility Management JavaScript

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".degree-form");
  const nameInput = document.getElementById("facilityName");
  const logoInput = document.getElementById("facilityLogo");
  const submitBtn = document.getElementById("facilitySubmit");
  const updateBtn = document.getElementById("facilityUpdate");
  const backBtn = document.getElementById("facilityBack");
  const tableBody = document.querySelector(".degree-table tbody");

  let editingId = null;

  // Fetch and render all facilities
  async function fetchFacilities() {
    tableBody.innerHTML = "";
    try {
      const res = await fetch(
        "http://localhost:4000/api/college-facility/all-college-facility"
      );
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        data.forEach((item, idx) => {
          const tr = document.createElement("tr");
          tr.innerHTML = `
            <td>${idx + 1}</td>
            <td>${item.name}</td>
            <td>${
              item.logo
                ? `<img src='http://localhost:4000/${item.logo}' style='height:48px;max-width:64px;object-fit:contain;' />`
                : ""
            }</td>
            <td>
              <button class="edit-btn" style="background:#2563eb;color:#fff;border:none;border-radius:6px;padding:6px 12px;cursor:pointer;margin-right:6px;" data-id="${
                item._id
              }"><i class="fa fa-edit"></i></button>
              <button class="delete-btn" style="background:#e53935;color:#fff;border:none;border-radius:6px;padding:6px 12px;cursor:pointer;" data-id="${
                item._id
              }"><i class="fa fa-trash"></i></button>
            </td>
          `;
          tableBody.appendChild(tr);
        });
      } else {
        tableBody.innerHTML = `<tr><td colspan='4'>No records found.</td></tr>`;
      }
    } catch (err) {
      tableBody.innerHTML = `<tr><td colspan='4'>Failed to load records.</td></tr>`;
    }
  }

  function resetForm() {
    editingId = null;
    nameInput.value = "";
    logoInput.value = "";
    submitBtn.style.display = "inline-block";
    updateBtn.style.display = "none";
    backBtn.style.display = "none";
  }

  // Add new facility
  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    if (editingId) return; // Prevent submit if editing
    const name = nameInput.value.trim();
    if (!name) return alert("Please enter facility name.");
    const formData = new FormData();
    formData.append("name", name);
    if (logoInput.files[0]) formData.append("logo", logoInput.files[0]);
    try {
      const res = await fetch(
        "http://localhost:4000/api/college-facility/add-college-facility",
        {
          method: "POST",
          body: formData,
        }
      );
      if (res.ok) {
        resetForm();
        fetchFacilities();
      } else {
        alert("Failed to add facility.");
      }
    } catch {
      alert("Error adding facility.");
    }
  });

  // Update facility
  updateBtn.addEventListener("click", async function () {
    const name = nameInput.value.trim();
    if (!editingId || !name) return;
    const formData = new FormData();
    formData.append("name", name);
    if (logoInput.files[0]) formData.append("logo", logoInput.files[0]);
    try {
      const res = await fetch(
        `http://localhost:4000/api/college-facility/update-college-facility/${editingId}`,
        {
          method: "PUT",
          body: formData,
        }
      );
      if (res.ok) {
        resetForm();
        fetchFacilities();
      } else {
        alert("Failed to update facility.");
      }
    } catch {
      alert("Error updating facility.");
    }
  });

  // Back button logic
  backBtn.addEventListener("click", function () {
    resetForm();
    fetchFacilities();
  });

  // Delegate edit and delete button events
  tableBody.addEventListener("click", async function (e) {
    const editBtn = e.target.closest(".edit-btn");
    const deleteBtn = e.target.closest(".delete-btn");
    if (editBtn) {
      const id = editBtn.getAttribute("data-id");
      // Find the row and set input for editing
      const row = editBtn.closest("tr");
      nameInput.value = row.children[1].textContent;
      // Note: For image, user must re-upload if changing
      editingId = id;
      submitBtn.style.display = "none";
      updateBtn.style.display = "inline-block";
      backBtn.style.display = "inline-block";
    } else if (deleteBtn) {
      const id = deleteBtn.getAttribute("data-id");
      if (confirm("Are you sure you want to delete this facility?")) {
        try {
          const res = await fetch(
            `http://localhost:4000/api/college-facility/delete-college-facility/${id}`,
            {
              method: "DELETE",
            }
          );
          if (res.ok) {
            fetchFacilities();
            if (editingId === id) {
              resetForm();
            }
          } else {
            alert("Failed to delete facility.");
          }
        } catch {
          alert("Error deleting facility.");
        }
      }
    }
  });

  // Initial fetch
  fetchFacilities();
  resetForm();
});
