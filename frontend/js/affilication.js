// Affiliation Management JavaScript

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".degree-form");
  const input = document.getElementById("affiliationName");
  const submitBtn = document.getElementById("affiliationSubmit");
  const updateBtn = document.getElementById("affiliationUpdate");
  const backBtn = document.getElementById("affiliationBack");
  const tableBody = document.querySelector(".degree-table tbody");

  let editingId = null;

  // Fetch and render all affiliations
  async function fetchAffiliations() {
    tableBody.innerHTML = "";
    try {
      const res = await fetch(
        "http://localhost:4000/api/affilication/all-affilication"
      );
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        data.forEach((item, idx) => {
          const tr = document.createElement("tr");
          tr.innerHTML = `
            <td>${idx + 1}</td>
            <td>${item.affliciationName}</td>
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
    input.value = "";
    submitBtn.style.display = "inline-block";
    updateBtn.style.display = "none";
    backBtn.style.display = "none";
  }

  // Add new affiliation
  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    if (editingId) return; // Prevent submit if editing
    const value = input.value.trim();
    if (!value) return alert("Please enter an affiliation name.");
    try {
      const res = await fetch(
        "http://localhost:4000/api/affilication/add-affilication",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ affliciationName: value }),
        }
      );
      if (res.ok) {
        input.value = "";
        fetchAffiliations();
      } else {
        alert("Failed to add affiliation.");
      }
    } catch {
      alert("Error adding affiliation.");
    }
  });

  // Update affiliation
  updateBtn.addEventListener("click", async function () {
    const value = input.value.trim();
    if (!editingId || !value) return;
    try {
      const res = await fetch(
        `http://localhost:4000/api/affilication/update-affilication/${editingId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ affliciationName: value }),
        }
      );
      if (res.ok) {
        resetForm();
        fetchAffiliations();
      } else {
        alert("Failed to update affiliation.");
      }
    } catch {
      alert("Error updating affiliation.");
    }
  });

  // Back button logic
  backBtn.addEventListener("click", function () {
    resetForm();
    fetchAffiliations();
  });

  // Delegate edit and delete button events
  tableBody.addEventListener("click", async function (e) {
    const editBtn = e.target.closest(".edit-btn");
    const deleteBtn = e.target.closest(".delete-btn");
    if (editBtn) {
      const id = editBtn.getAttribute("data-id");
      // Find the row and set input for editing
      const row = editBtn.closest("tr");
      const name = row.children[1].textContent;
      input.value = name;
      editingId = id;
      submitBtn.style.display = "none";
      updateBtn.style.display = "inline-block";
      backBtn.style.display = "inline-block";
    } else if (deleteBtn) {
      const id = deleteBtn.getAttribute("data-id");
      if (confirm("Are you sure you want to delete this affiliation?")) {
        try {
          const res = await fetch(
            `http://localhost:4000/api/affilication/delete-affilication/${id}`,
            {
              method: "DELETE",
            }
          );
          if (res.ok) {
            fetchAffiliations();
            if (editingId === id) {
              resetForm();
            }
          } else {
            alert("Failed to delete affiliation.");
          }
        } catch {
          alert("Error deleting affiliation.");
        }
      }
    }
  });

  // Initial fetch
  fetchAffiliations();
  resetForm();
});
