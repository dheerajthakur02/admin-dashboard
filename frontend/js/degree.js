// Wait for DOM to load
window.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".degree-form");
  const input = document.querySelector(".degree-input");
  const tableBody = document.querySelector(".degree-table tbody");
  const submitBtn = document.getElementById("degreeSubmit");
  const updateBtn = document.getElementById("degreeUpdate");
  const backBtn = document.getElementById("degreeBack");
  let degreeCount = 0;
  let editingDegreeId = null;

  // Fetch and display all degrees on page load
  async function loadDegrees() {
    try {
      const response = await fetch("http://localhost:4000/api/degree/all");
      if (!response.ok) throw new Error("Failed to fetch degrees");
      const degrees = await response.json();

      tableBody.innerHTML = "";
      degreeCount = 0;
      degrees.degrees.forEach((degree) => {
        degreeCount++;
        const tr = document.createElement("tr");
        tr.innerHTML = `
                    <td>${degreeCount}</td>
                    <td>${degree.name}</td>
                    <td>
                      <button class="edit-btn" data-id="${degree._id}" data-name="${degree.name}">✏️</button>
                      <button class="delete-btn" data-id="${degree._id}">🗑️</button>
                    </td>
                `;
        tableBody.appendChild(tr);
      });
      // Add event listeners for edit and delete buttons
      tableBody.querySelectorAll(".edit-btn").forEach((btn) => {
        btn.addEventListener("click", function () {
          const id = this.getAttribute("data-id");
          const name = this.getAttribute("data-name");
          editingDegreeId = id;
          input.value = name;
          submitBtn.style.display = "none";
          updateBtn.style.display = "inline-block";
          backBtn.style.display = "inline-block";
        });
      });
      tableBody.querySelectorAll(".delete-btn").forEach((btn) => {
        btn.addEventListener("click", async function () {
          const id = this.getAttribute("data-id");
          await deleteDegree(id);
          await loadDegrees();
        });
      });
    } catch (err) {
      tableBody.innerHTML =
        '<tr><td colspan="3">Error loading degrees</td></tr>';
    }
  }

  loadDegrees();

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    if (editingDegreeId) return; // Prevent submit if editing
    const name = input.value.trim();
    if (!name) return;

    // Send POST request to API
    try {
      const response = await fetch("http://localhost:4000/api/degree/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });
      if (!response.ok) throw new Error("Failed to add degree");
      const data = await response.json();

      // Reload the list to keep numbering and data in sync
      await loadDegrees();
      input.value = "";
    } catch (err) {
      alert("Error: " + err.message);
    }
  });

  updateBtn.addEventListener("click", async function () {
    const name = input.value.trim();
    if (!editingDegreeId || !name) return;
    await updateDegree(editingDegreeId, name);
    await loadDegrees();
    resetForm();
  });

  backBtn.addEventListener("click", function () {
    resetForm();
    loadDegrees();
  });

  function resetForm() {
    editingDegreeId = null;
    input.value = "";
    submitBtn.style.display = "inline-block";
    updateBtn.style.display = "none";
    backBtn.style.display = "none";
  }
});

// Add these helper functions at the end of the DOMContentLoaded event listener
async function updateDegree(id, name) {
  try {
    const response = await fetch(
      `http://localhost:4000/api/degree/update?_id=${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      }
    );
    if (!response.ok) throw new Error("Failed to update degree");
  } catch (err) {
    alert("Error: " + err.message);
  }
}

async function deleteDegree(id) {
  try {
    const response = await fetch(
      `http://localhost:4000/api/degree/delete?_id=${id}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) throw new Error("Failed to delete degree");
  } catch (err) {
    alert("Error: " + err.message);
  }
}
