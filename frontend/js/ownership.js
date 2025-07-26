// Ownership Management JavaScript

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".degree-form");
  const nameInput = document.getElementById("ownershipName");
  const submitBtn = document.getElementById("ownershipSubmit");
  const updateBtn = document.getElementById("ownershipUpdate");
  const backBtn = document.getElementById("ownershipBack");
  const tableBody = document.querySelector(".degree-table tbody");

  let editingId = null;

  // Fetch and render all ownerships
  async function fetchOwnerships() {
    tableBody.innerHTML = "";
    try {
      const res = await fetch(
        "http://localhost:4000/api/ownership/all-ownership"
      );
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        data.forEach((item, idx) => {
          const tr = document.createElement("tr");
          tr.innerHTML = `
            <td>${idx + 1}</td>
            <td>${item.name}</td>
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
        tableBody.innerHTML = `<tr><td colspan='3'>No records found.</td></tr>`;
      }
    } catch (err) {
      tableBody.innerHTML = `<tr><td colspan='3'>Failed to load records.</td></tr>`;
    }
  }

  function resetForm() {
    editingId = null;
    nameInput.value = "";
    submitBtn.style.display = "inline-block";
    updateBtn.style.display = "none";
    backBtn.style.display = "none";
  }

  // Add new ownership
  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    if (editingId) return; // Prevent submit if editing
    const name = nameInput.value.trim();
    if (!name) return alert("Please enter ownership name.");
    try {
      const res = await fetch(
        "http://localhost:4000/api/ownership/create-ownership",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name }),
        }
      );
      if (res.ok) {
        nameInput.value = "";
        fetchOwnerships();
      } else {
        alert("Failed to add ownership.");
      }
    } catch {
      alert("Error adding ownership.");
    }
  });

  // Update ownership
  updateBtn.addEventListener("click", async function () {
    const name = nameInput.value.trim();
    if (!editingId || !name) return;
    try {
      const res = await fetch(
        `http://localhost:4000/api/ownership/update-ownership/${editingId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name }),
        }
      );
      if (res.ok) {
        resetForm();
        fetchOwnerships();
      } else {
        alert("Failed to update ownership.");
      }
    } catch {
      alert("Error updating ownership.");
    }
  });

  // Back button logic
  backBtn.addEventListener("click", function () {
    resetForm();
    fetchOwnerships();
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
      editingId = id;
      submitBtn.style.display = "none";
      updateBtn.style.display = "inline-block";
      backBtn.style.display = "inline-block";
    } else if (deleteBtn) {
      const id = deleteBtn.getAttribute("data-id");
      if (confirm("Are you sure you want to delete this ownership?")) {
        try {
          const res = await fetch(
            `http://localhost:4000/api/ownership/delete-ownership/${id}`,
            {
              method: "DELETE",
            }
          );
          if (res.ok) {
            fetchOwnerships();
            if (editingId === id) {
              resetForm();
            }
          } else {
            alert("Failed to delete ownership.");
          }
        } catch {
          alert("Error deleting ownership.");
        }
      }
    }
  });

  // Initial fetch
  fetchOwnerships();
  resetForm();
});
