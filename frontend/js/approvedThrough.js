// Approved Through Management JavaScript

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".degree-form");
  const input = document.getElementById("approverName");
  const submitBtn = document.getElementById("approverSubmit");
  const updateBtn = document.getElementById("approverUpdate");
  const backBtn = document.getElementById("approverBack");
  const tableBody = document.querySelector(".degree-table tbody");

  let editingId = null;

  // Fetch and render all approvers
  async function fetchApprovers() {
    tableBody.innerHTML = "";
    try {
      const res = await fetch(
        "http://localhost:4000/api/approved-through/all-approved-through"
      );
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        data.forEach((item, idx) => {
          const tr = document.createElement("tr");
          tr.innerHTML = `
            <td>${idx + 1}</td>
            <td>${item.approvesThroughName}</td>
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

  // Add new approver
  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    if (editingId) return; // Prevent submit if editing
    const value = input.value.trim();
    if (!value) return alert("Please enter an approver board name.");
    try {
      const res = await fetch(
        "http://localhost:4000/api/approved-through/add-approved-through",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ approvesThroughName: value }),
        }
      );
      if (res.ok) {
        input.value = "";
        fetchApprovers();
      } else {
        alert("Failed to add approver.");
      }
    } catch {
      alert("Error adding approver.");
    }
  });

  // Update approver
  updateBtn.addEventListener("click", async function () {
    const value = input.value.trim();
    if (!editingId || !value) return;
    try {
      const res = await fetch(
        `http://localhost:4000/api/approved-through/update-approved-through/${editingId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ approvesThroughName: value }),
        }
      );
      if (res.ok) {
        resetForm();
        fetchApprovers();
      } else {
        alert("Failed to update approver.");
      }
    } catch {
      alert("Error updating approver.");
    }
  });

  // Back button logic
  backBtn.addEventListener("click", function () {
    resetForm();
    fetchApprovers();
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
      if (confirm("Are you sure you want to delete this approver?")) {
        try {
          const res = await fetch(
            `http://localhost:4000/api/approved-through/delete-approved-through/${id}`,
            {
              method: "DELETE",
            }
          );
          if (res.ok) {
            fetchApprovers();
            if (editingId === id) {
              resetForm();
            }
          } else {
            alert("Failed to delete approver.");
          }
        } catch {
          alert("Error deleting approver.");
        }
      }
    }
  });

  // Initial fetch
  fetchApprovers();
  resetForm();
});
