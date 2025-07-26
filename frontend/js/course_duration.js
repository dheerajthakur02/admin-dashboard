// Course Duration Management JavaScript

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".degree-form");
  const input = document.getElementById("courseDuration");
  const submitBtn = document.getElementById("courseDurationSubmit");
  const updateBtn = document.getElementById("courseDurationUpdate");
  const backBtn = document.getElementById("courseDurationBack");
  const tableBody = document.querySelector(".degree-table tbody");

  let editingId = null;

  // Fetch and render all course durations
  async function fetchDurations() {
    tableBody.innerHTML = "";
    try {
      const res = await fetch(
        "http://localhost:4000/api/course-duration/all-course-duration"
      );
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        data.forEach((item, idx) => {
          const tr = document.createElement("tr");
          tr.innerHTML = `
            <td>${idx + 1}</td>
            <td>${item.courseDuration}</td>
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

  // Add new course duration
  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    if (editingId) return; // Prevent submit if editing
    const value = input.value.trim();
    if (!value) return alert("Please enter a course duration.");
    try {
      const res = await fetch(
        "http://localhost:4000/api/course-duration/add-course-duration",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ courseDuration: value }),
        }
      );
      if (res.ok) {
        input.value = "";
        fetchDurations();
      } else {
        alert("Failed to add course duration.");
      }
    } catch {
      alert("Error adding course duration.");
    }
  });

  // Update course duration
  updateBtn.addEventListener("click", async function () {
    const value = input.value.trim();
    if (!editingId || !value) return;
    try {
      const res = await fetch(
        `http://localhost:4000/api/course-duration/update-course-duration/${editingId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ courseDuration: value }),
        }
      );
      if (res.ok) {
        resetForm();
        fetchDurations();
      } else {
        alert("Failed to update course duration.");
      }
    } catch {
      alert("Error updating course duration.");
    }
  });

  // Back button logic
  backBtn.addEventListener("click", function () {
    resetForm();
    fetchDurations();
  });

  // Delegate edit and delete button events
  tableBody.addEventListener("click", async function (e) {
    const editBtn = e.target.closest(".edit-btn");
    const deleteBtn = e.target.closest(".delete-btn");
    if (editBtn) {
      const id = editBtn.getAttribute("data-id");
      // Find the row and set input for editing
      const row = editBtn.closest("tr");
      const duration = row.children[1].textContent;
      input.value = duration;
      editingId = id;
      submitBtn.style.display = "none";
      updateBtn.style.display = "inline-block";
      backBtn.style.display = "inline-block";
    } else if (deleteBtn) {
      const id = deleteBtn.getAttribute("data-id");
      if (confirm("Are you sure you want to delete this course duration?")) {
        try {
          const res = await fetch(
            `http://localhost:4000/api/course-duration/delete-course-duration/${id}`,
            {
              method: "DELETE",
            }
          );
          if (res.ok) {
            fetchDurations();
            if (editingId === id) {
              resetForm();
            }
          } else {
            alert("Failed to delete course duration.");
          }
        } catch {
          alert("Error deleting course duration.");
        }
      }
    }
  });

  // Initial fetch
  fetchDurations();
  resetForm();
});
