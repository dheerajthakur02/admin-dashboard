document.addEventListener("DOMContentLoaded", function () {
  const baseUrl = window.baseUrl || "http://localhost:4000/api";
  const form = document.getElementById("addExamForm");
  const mainContainer = document.querySelector(".main-container");
  const formDiv = document.getElementById("examFormDiv");
  const listDiv = document.getElementById("examListDiv");
  const showFormBtn = document.getElementById("showFormBtn");
  const showListBtn = document.getElementById("showListBtn");

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
  // Show list by default on page load
  showList();

  // Table rendering for exam list
  const tableBody = document.getElementById("examTable");

  // Edit modal elements
  let editExamId = null;
  let editModal = document.getElementById("editExamModal");
  let closeEditModalBtn = document.getElementById("closeEditExamModal");
  let cancelEditBtn = document.getElementById("cancelEditExamBtn");
  let editExamForm = document.getElementById("editExamForm");

  function openEditModal(exam) {
    editExamId = exam._id;
    document.getElementById("editDepartment").value = exam.stream || "";
    document.getElementById("editCourse").value = exam.course || "";
    document.getElementById("editExamName").value = exam.examName || "";
    document.getElementById("editExamTitle").value = exam.title || "";
    if (editModal) editModal.style.display = "flex";
  }
  function closeEditModal() {
    if (editModal) editModal.style.display = "none";
    editExamId = null;
  }
  if (closeEditModalBtn) closeEditModalBtn.onclick = closeEditModal;
  if (cancelEditBtn) cancelEditBtn.onclick = closeEditModal;
  window.onclick = function (event) {
    if (event.target === editModal) closeEditModal();
  };

  // Render table rows
  function renderExamTable(exams) {
    if (!Array.isArray(exams) || exams.length === 0) {
      tableBody.innerHTML =
        '<tr><td colspan="6" style="text-align:center; color:#9ca3af;">No data found</td></tr>';
      return;
    }
    tableBody.innerHTML = exams
      .map(
        (exam, i) => `
      <tr>
        <td>${i + 1}</td>
        <td>${exam.stream || ""}</td>
        <td>${exam.course || ""}</td>
        <td>${exam.examName || ""}</td>
        <td>${exam.title || ""}</td>
        <td style="text-align:center;">
          <button class="edit-btn" data-id="${
            exam._id
          }" style="background:#2563eb; color:#fff; border:none; border-radius:6px; padding:6px 14px; margin-right:6px; cursor:pointer; font-size:1rem;"><i class="fa fa-edit"></i></button>
          <button class="delete-btn" data-id="${
            exam._id
          }" style="background:#ef4444; color:#fff; border:none; border-radius:6px; padding:6px 14px; cursor:pointer; font-size:1rem;"><i class="fa fa-trash"></i></button>
        </td>
      </tr>
    `
      )
      .join("");
    document.querySelectorAll(".edit-btn").forEach((btn) => {
      btn.onclick = function () {
        const id = this.getAttribute("data-id");
        const exam = exams.find((e) => e._id === id);
        if (exam) openEditModal(exam);
      };
    });
    document.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.onclick = function () {
        const id = this.getAttribute("data-id");
        if (confirm("Are you sure you want to delete this exam?")) {
          deleteExam(id);
        }
      };
    });
  }

  // Fetch and render all exams
  async function fetchExams() {
    try {
      const data = await apiRequest(`${baseUrl}/exam/all-exams`);
      renderExamTable(data);
    } catch (err) {
      tableBody.innerHTML =
        '<tr><td colspan="6" style="text-align:center; color:#ef4444;">Failed to load data</td></tr>';
    }
  }

  // Add exam
  handleForm(form, async (formData) => {
    try {
      await apiRequest(`${baseUrl}/exam/add-exam`, {
        method: "POST",
        body: formData,
      });
      alert("Added!");
      form.reset();
      fetchExams();
      showList();
    } catch (err) {
      alert("Failed to save.");
    }
  });

  // Edit exam
  handleForm(editExamForm, async (formData) => {
    if (!editExamId) return;
    try {
      await apiRequest(`${baseUrl}/exam/edit-exam/${editExamId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stream: document.getElementById("editDepartment").value,
          course: document.getElementById("editCourse").value,
          examName: document.getElementById("editExamName").value,
          title: document.getElementById("editExamTitle").value,
        }),
      });
      alert("Updated!");
      closeEditModal();
      fetchExams();
    } catch (err) {
      alert("Failed to update.");
    }
  });

  // Delete exam
  async function deleteExam(id) {
    try {
      await apiRequest(`${baseUrl}/exam/delete-exam/${id}`, {
        method: "DELETE",
      });
      alert("Deleted!");
      fetchExams();
    } catch (err) {
      alert("Failed to delete.");
    }
  }

  fetchExams();
});
