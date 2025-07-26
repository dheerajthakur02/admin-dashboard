document.addEventListener("DOMContentLoaded", function () {
  const baseUrl = window.baseUrl || "http://localhost:4000/api";
  const form = document.getElementById("examLevelForm");
  const tableBody = document.getElementById("examLevelTable");
  const levelNameInput = document.getElementById("levelName");

  let editMode = false;
  let editId = null;

  // Fetch and render all exam levels
  async function fetchExamLevels() {
    try {
      const res = await fetch(`${baseUrl}/examlevel/all-examlevels`);
      const data = await res.json();
      renderTable(data);
    } catch (err) {
      tableBody.innerHTML =
        '<tr><td colspan="3" style="text-align:center; color:#ef4444;">Failed to load data</td></tr>';
    }
  }

  // Render table rows
  function renderTable(levels) {
    if (!Array.isArray(levels) || levels.length === 0) {
      tableBody.innerHTML =
        '<tr><td colspan="3" style="text-align:center; color:#9ca3af;">No data found</td></tr>';
      return;
    }
    tableBody.innerHTML = levels
      .map(
        (level, i) => `
      <tr>
        <td style="padding: 12px 10px;">${i + 1}</td>
        <td style="padding: 12px 10px;">${level.name}</td>
        <td style="padding: 12px 10px; text-align:center;">
          <button class="edit-btn" data-id="${
            level._id
          }" style="background:#22c55e; color:#fff; border:none; border-radius:6px; padding:6px 18px; margin-right:8px; cursor:pointer; font-size:1rem; font-weight:600;">Edit</button>
          <button class="delete-btn" data-id="${
            level._id
          }" style="background:#ef4444; color:#fff; border:none; border-radius:6px; padding:6px 18px; cursor:pointer; font-size:1rem; font-weight:600;">Delete</button>
        </td>
      </tr>
    `
      )
      .join("");
    // Add event listeners
    document.querySelectorAll(".edit-btn").forEach((btn) => {
      btn.onclick = function () {
        editMode = true;
        editId = this.getAttribute("data-id");
        const level = levels.find((l) => l._id === editId);
        if (level) {
          levelNameInput.value = level.name;
          levelNameInput.focus();
        }
      };
    });
    document.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.onclick = function () {
        const id = this.getAttribute("data-id");
        if (confirm("Are you sure you want to delete this exam level?")) {
          deleteExamLevel(id);
        }
      };
    });
  }

  // Add or edit exam level
  if (form) {
    form.onsubmit = async function (e) {
      e.preventDefault();
      const name = levelNameInput.value.trim();
      if (!name) {
        alert("Please enter a level name.");
        return;
      }
      try {
        let res, result;
        if (editMode && editId) {
          res = await fetch(`${baseUrl}/examlevel/edit-examlevel/${editId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name }),
          });
          result = await res.json();
          alert(result.message || "Updated!");
        } else {
          res = await fetch(`${baseUrl}/examlevel/add-examlevel`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name }),
          });
          result = await res.json();
          alert(result.message || "Added!");
        }
        form.reset();
        editMode = false;
        editId = null;
        fetchExamLevels();
      } catch (err) {
        alert("Failed to save.");
      }
    };
  }

  // Delete exam level
  async function deleteExamLevel(id) {
    try {
      const res = await fetch(`${baseUrl}/examlevel/delete-examlevel/${id}`, {
        method: "DELETE",
      });
      const result = await res.json();
      alert(result.message || "Deleted!");
      fetchExamLevels();
    } catch (err) {
      alert("Failed to delete.");
    }
  }

  fetchExamLevels();
});
