// Ranking Management JavaScript

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".degree-form");
  const nameInput = document.getElementById("rankingBodyName");
  const valueInput = document.getElementById("rankingValue");
  const submitBtn = document.getElementById("rankingSubmit");
  const updateBtn = document.getElementById("rankingUpdate");
  const backBtn = document.getElementById("rankingBack");
  const tableBody = document.querySelector(".degree-table tbody");

  let editingId = null;

  // Fetch and render all rankings
  async function fetchRankings() {
    tableBody.innerHTML = "";
    try {
      const res = await fetch("http://localhost:4000/api/ranking/all-ranking");
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        data.forEach((item, idx) => {
          const tr = document.createElement("tr");
          tr.innerHTML = `
            <td>${idx + 1}</td>
            <td>${item.name}</td>
            <td>${item.RankValue}</td>
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
    valueInput.value = "";
    submitBtn.style.display = "inline-block";
    updateBtn.style.display = "none";
    backBtn.style.display = "none";
  }

  // Add new ranking
  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    if (editingId) return; // Prevent submit if editing
    const name = nameInput.value.trim();
    const RankValue = valueInput.value.trim();
    if (!name || !RankValue)
      return alert("Please enter both body name and rank value.");
    try {
      const res = await fetch(
        "http://localhost:4000/api/ranking/create-ranking",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, RankValue }),
        }
      );
      if (res.ok) {
        nameInput.value = "";
        valueInput.value = "";
        fetchRankings();
      } else {
        alert("Failed to add ranking.");
      }
    } catch {
      alert("Error adding ranking.");
    }
  });

  // Update ranking
  updateBtn.addEventListener("click", async function () {
    const name = nameInput.value.trim();
    const RankValue = valueInput.value.trim();
    if (!editingId || !name || !RankValue) return;
    try {
      const res = await fetch(
        `http://localhost:4000/api/ranking/update-ranking/${editingId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, RankValue }),
        }
      );
      if (res.ok) {
        resetForm();
        fetchRankings();
      } else {
        alert("Failed to update ranking.");
      }
    } catch {
      alert("Error updating ranking.");
    }
  });

  // Back button logic
  backBtn.addEventListener("click", function () {
    resetForm();
    fetchRankings();
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
      valueInput.value = row.children[2].textContent;
      editingId = id;
      submitBtn.style.display = "none";
      updateBtn.style.display = "inline-block";
      backBtn.style.display = "inline-block";
    } else if (deleteBtn) {
      const id = deleteBtn.getAttribute("data-id");
      if (confirm("Are you sure you want to delete this ranking?")) {
        try {
          const res = await fetch(
            `http://localhost:4000/api/ranking/delete-ranking/${id}`,
            {
              method: "DELETE",
            }
          );
          if (res.ok) {
            fetchRankings();
            if (editingId === id) {
              resetForm();
            }
          } else {
            alert("Failed to delete ranking.");
          }
        } catch {
          alert("Error deleting ranking.");
        }
      }
    }
  });

  // Initial fetch
  fetchRankings();
  resetForm();
});
