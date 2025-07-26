// Exam Type Management JavaScript

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".degree-form");
  const shortInput = document.getElementById("examShortName");
  const fullInput = document.getElementById("examFullName");
  const submitBtn = document.getElementById("examSubmit");
  const updateBtn = document.getElementById("examUpdate");
  const backBtn = document.getElementById("examBack");
  const tableBody = document.querySelector(".degree-table tbody");

  let editingId = null;

  // Fetch and render all exam types
  async function fetchExamTypes() {
    tableBody.innerHTML = "";
    try {
      const res = await fetch(
        "http://localhost:4000/api/exam-type/all-exam-type"
      );
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        data.forEach((item, idx) => {
          let shortName = "";
          let fullName = "";
          if (
            typeof item.examTypeName === "object" &&
            item.examTypeName !== null
          ) {
            shortName = item.examTypeName.shortName || "";
            fullName = item.examTypeName.fullName || "";
          } else if (typeof item.examTypeName === "string") {
            // fallback for old data
            fullName = item.examTypeName;
          }
          const tr = document.createElement("tr");
          tr.innerHTML = `
            <td>${idx + 1}</td>
            <td><b>${shortName}</b>${
            shortName && fullName ? " - " : ""
          }${fullName}</td>
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
    shortInput.value = "";
    fullInput.value = "";
    submitBtn.style.display = "inline-block";
    updateBtn.style.display = "none";
    backBtn.style.display = "none";
  }

  // Add new exam type
  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    if (editingId) return; // Prevent submit if editing
    const shortName = shortInput.value.trim();
    const fullName = fullInput.value.trim();
    if (!shortName && !fullName)
      return alert("Please enter at least one name.");
    try {
      const res = await fetch(
        "http://localhost:4000/api/exam-type/add-exam-type",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ shortName, fullName }),
        }
      );
      if (res.ok) {
        shortInput.value = "";
        fullInput.value = "";
        fetchExamTypes();
      } else {
        alert("Failed to add exam type.");
      }
    } catch {
      alert("Error adding exam type.");
    }
  });

  // Update exam type
  updateBtn.addEventListener("click", async function () {
    const shortName = shortInput.value.trim();
    const fullName = fullInput.value.trim();
    if (!editingId || (!shortName && !fullName)) return;
    try {
      const res = await fetch(
        `http://localhost:4000/api/exam-type/update-exam-type/${editingId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ examTypeName: { shortName, fullName } }),
        }
      );
      if (res.ok) {
        resetForm();
        fetchExamTypes();
      } else {
        alert("Failed to update exam type.");
      }
    } catch {
      alert("Error updating exam type.");
    }
  });

  // Back button logic
  backBtn.addEventListener("click", function () {
    resetForm();
    fetchExamTypes();
  });

  // Delegate edit and delete button events
  tableBody.addEventListener("click", async function (e) {
    const editBtn = e.target.closest(".edit-btn");
    const deleteBtn = e.target.closest(".delete-btn");
    if (editBtn) {
      const id = editBtn.getAttribute("data-id");
      // Find the row and set input for editing
      const row = editBtn.closest("tr");
      const nameCell = row.children[1].textContent;
      let [shortName, ...fullNameArr] = nameCell.split("-");
      shortInput.value = shortName.trim();
      fullInput.value = fullNameArr.join("-").trim();
      editingId = id;
      submitBtn.style.display = "none";
      updateBtn.style.display = "inline-block";
      backBtn.style.display = "inline-block";
    } else if (deleteBtn) {
      const id = deleteBtn.getAttribute("data-id");
      if (confirm("Are you sure you want to delete this exam type?")) {
        try {
          const res = await fetch(
            `http://localhost:4000/api/exam-type/delete-exam-type/${id}`,
            {
              method: "DELETE",
            }
          );
          if (res.ok) {
            fetchExamTypes();
            if (editingId === id) {
              resetForm();
            }
          } else {
            alert("Failed to delete exam type.");
          }
        } catch {
          alert("Error deleting exam type.");
        }
      }
    }
  });

  // Initial fetch
  fetchExamTypes();
  resetForm();
});
