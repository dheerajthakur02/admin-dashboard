document.addEventListener("DOMContentLoaded", function () {
  const baseUrl = window.baseUrl || "http://localhost:4000/api";
  if (typeof initSidebar === "function") initSidebar();

  const form = document.getElementById("addExamForm");
  const mainContainer = document.querySelector(".main-container");
  const formDiv = document.getElementById("examFormDiv");
  const listDiv = document.getElementById("examListDiv");
  const showFormBtn = document.getElementById("showFormBtn");
  const showListBtn = document.getElementById("showListBtn");

  // Get dropdown elements
  const streamDropdown = document.querySelector('select[name="stream"]');
  const courseDropdown = document.querySelector('select[name="course"]');
  const examNameDropdown = document.querySelector('select[name="examName"]');
  const examLevelDropdown = document.querySelector('select[name="examLevel"]');
  const examTypeDropdown = document.querySelector('select[name="examType"]');
  const stateDropdown = document.querySelector('select[name="state"]');

  // Populate stream dropdown
  async function populateStreamDropdown(dropdown, selectedId) {
    try {
      console.log("Fetching streams...");
      const response = await apiRequest(`${baseUrl}/stream/all`);
      const streams = response.data || response;
      console.log("Streams received:", streams);
      dropdown.innerHTML = '<option value="">-- Select Stream --</option>';
      streams.forEach((stream) => {
        const option = document.createElement("option");
        option.value = stream._id;
        option.textContent = stream.name;
        if (selectedId && stream._id === selectedId) option.selected = true;
        dropdown.appendChild(option);
      });
      console.log("Stream dropdown populated with", streams.length, "options");
    } catch (err) {
      console.error("Error loading streams:", err);
      dropdown.innerHTML = '<option value="">Failed to load streams</option>';
    }
  }

  // Populate course dropdown based on stream
  async function populateCourseDropdown(streamId, dropdown, selectedCourseId) {
    try {
      const response = await apiRequest(`${baseUrl}/course/all`);
      const courses = response.courses || response;
      dropdown.innerHTML = '<option value="">-- Select Course --</option>';

      // Filter courses by stream if streamId is provided
      const filteredCourses = streamId
        ? courses.filter(
            (course) =>
              course.stream === streamId ||
              (course.stream && course.stream._id === streamId)
          )
        : courses;

      filteredCourses.forEach((course) => {
        const option = document.createElement("option");
        option.value = course._id;
        option.textContent = course.name;
        if (selectedCourseId && course._id === selectedCourseId)
          option.selected = true;
        dropdown.appendChild(option);
      });
    } catch (err) {
      console.error("Error loading courses:", err);
      dropdown.innerHTML = '<option value="">Failed to load courses</option>';
    }
  }

  // Populate exam level dropdown
  async function populateExamLevelDropdown(dropdown, selectedId) {
    try {
      const examLevels = await apiRequest(
        `${baseUrl}/examlevel/all-examlevels`
      );
      dropdown.innerHTML = '<option value="">-- Select Exam Level --</option>';
      examLevels.forEach((level) => {
        const option = document.createElement("option");
        option.value = level._id;
        option.textContent = level.name;
        if (selectedId && level._id === selectedId) option.selected = true;
        dropdown.appendChild(option);
      });
    } catch (err) {
      console.error("Error loading exam levels:", err);
      dropdown.innerHTML =
        '<option value="">Failed to load exam levels</option>';
    }
  }

  // Populate exam type dropdown
  async function populateExamTypeDropdown(dropdown, selectedId) {
    try {
      const examTypes = await apiRequest(`${baseUrl}/exam-type/all-exam-type`);
      dropdown.innerHTML = '<option value="">-- Select Exam Type --</option>';
      examTypes.forEach((type) => {
        const option = document.createElement("option");
        option.value = type._id;
        option.textContent =
          type.examTypeName?.fullName ||
          type.examTypeName?.shortName ||
          type.name ||
          "Unknown";
        if (selectedId && type._id === selectedId) option.selected = true;
        dropdown.appendChild(option);
      });
    } catch (err) {
      console.error("Error loading exam types:", err);
      dropdown.innerHTML =
        '<option value="">Failed to load exam types</option>';
    }
  }

  // Populate state dropdown
  async function populateStateDropdown(dropdown, selectedId) {
    try {
      const states = await apiRequest(`${baseUrl}/state/all-states`);
      dropdown.innerHTML = '<option value="">-- Select State --</option>';
      states.forEach((state) => {
        const option = document.createElement("option");
        option.value = state._id;
        option.textContent = state.name;
        if (selectedId && state._id === selectedId) option.selected = true;
        dropdown.appendChild(option);
      });
    } catch (err) {
      console.error("Error loading states:", err);
      dropdown.innerHTML = '<option value="">Failed to load states</option>';
    }
  }

  // Populate exam name dropdown with exam types from master
  async function populateExamNameDropdown(dropdown, selectedName) {
    try {
      console.log("Fetching exam types for exam name dropdown...");
      const examTypes = await apiRequest(`${baseUrl}/exam-type/all-exam-type`);
      console.log("Exam types received:", examTypes);
      dropdown.innerHTML = '<option value="">-- Select Exam Name --</option>';
      examTypes.forEach((examType) => {
        const option = document.createElement("option");
        option.value =
          examType.examTypeName?.fullName ||
          examType.examTypeName?.shortName ||
          "Unknown";
        option.textContent =
          examType.examTypeName?.fullName ||
          examType.examTypeName?.shortName ||
          "Unknown";
        if (selectedName && option.value === selectedName)
          option.selected = true;
        dropdown.appendChild(option);
      });
      console.log(
        "Exam name dropdown populated with",
        examTypes.length,
        "options"
      );
    } catch (err) {
      console.error("Error loading exam types for exam name dropdown:", err);
      dropdown.innerHTML =
        '<option value="">Failed to load exam types</option>';
    }
  }

  // Show/hide logic for form and list with button toggle
  function showForm() {
    if (formDiv) formDiv.style.display = "block";
    if (listDiv) listDiv.style.display = "none";
    // Hide Add Record button, show Record List button
    if (showFormBtn) showFormBtn.style.display = "none";
    if (showListBtn) showListBtn.style.display = "inline-block";
  }
  function showList() {
    if (formDiv) formDiv.style.display = "none";
    if (listDiv) listDiv.style.display = "block";
    // Hide Record List button, show Add Record button
    if (showListBtn) showListBtn.style.display = "none";
    if (showFormBtn) showFormBtn.style.display = "inline-block";
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
    document.getElementById("editDepartment").value =
      exam.stream?.name || exam.stream || "";
    document.getElementById("editCourse").value =
      exam.course?.name || exam.course || "";
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
    console.log("Rendering exam table with data:", exams);
    if (!Array.isArray(exams) || exams.length === 0) {
      tableBody.innerHTML =
        '<tr><td colspan="6" style="text-align:center; color:#9ca3af;">No data found</td></tr>';
      return;
    }
    tableBody.innerHTML = exams
      .map((exam, i) => {
        console.log(`Exam ${i + 1}:`, {
          stream: exam.stream,
          course: exam.course,
          streamName: exam.stream?.name,
          courseName: exam.course?.name,
        });
        return `
      <tr>
        <td>${i + 1}</td>
        <td>${exam.stream?.name || exam.stream || "N/A"}</td>
        <td>${exam.course?.name || exam.course || "N/A"}</td>
        <td>${exam.examName || ""}</td>
        <td>${exam.title || ""}</td>
        <td class="action-buttons">
          <button class="edit-btn" data-id="${
            exam._id
          }"><i class="fa fa-edit"></i></button>
          <button class="delete-btn" data-id="${
            exam._id
          }"><i class="fa fa-trash"></i></button>
        </td>
      </tr>
    `;
      })
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
      console.log("Fetching exams...");
      const data = await apiRequest(`${baseUrl}/exam/all-exams`);
      console.log("Exams data received:", data);
      renderExamTable(data);
    } catch (err) {
      console.error("Error fetching exams:", err);
      tableBody.innerHTML =
        '<tr><td colspan="6" style="text-align:center; color:#ef4444;">Failed to load data</td></tr>';
    }
  }

  // Add exam
  handleForm(form, async (formData) => {
    try {
      console.log("Form data being sent:", formData);
      const formDataObj = {};
      for (let [key, value] of formData.entries()) {
        formDataObj[key] = value;
      }
      console.log("Form data object:", formDataObj);

      // Log the selected stream and course IDs
      const streamSelect = document.querySelector('select[name="stream"]');
      const courseSelect = document.querySelector('select[name="course"]');
      console.log("Selected stream ID:", streamSelect?.value);
      console.log("Selected course ID:", courseSelect?.value);
      console.log(
        "Selected stream text:",
        streamSelect?.options[streamSelect?.selectedIndex]?.text
      );
      console.log(
        "Selected course text:",
        courseSelect?.options[courseSelect?.selectedIndex]?.text
      );

      // Ensure stream and course IDs are properly set in form data
      if (streamSelect?.value) {
        formData.set("stream", streamSelect.value);
      }
      if (courseSelect?.value) {
        formData.set("course", courseSelect.value);
      }

      await apiRequest(`${baseUrl}/exam/add-exam`, {
        method: "POST",
        body: formData,
      });
      alert("Added!");
      form.reset();
      fetchExams();
      showList();
    } catch (err) {
      console.error("Error adding exam:", err);
      alert("Failed to save.");
    }
  });

  // Edit exam
  handleForm(editExamForm, async (formData) => {
    if (!editExamId) return;
    try {
      // For edit, we need to find the stream and course IDs based on the names
      const streamName = document.getElementById("editDepartment").value;
      const courseName = document.getElementById("editCourse").value;

      // Get stream ID from name
      let streamId = null;
      if (streamName) {
        const response = await apiRequest(`${baseUrl}/stream/all`);
        const streams = response.data || response;
        const stream = streams.find((s) => s.name === streamName);
        streamId = stream?._id;
      }

      // Get course ID from name
      let courseId = null;
      if (courseName) {
        const response = await apiRequest(`${baseUrl}/course/all`);
        const courses = response.courses || response;
        const course = courses.find((c) => c.name === courseName);
        courseId = course?._id;
      }

      await apiRequest(`${baseUrl}/exam/edit-exam/${editExamId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stream: streamId,
          course: courseId,
          examName: document.getElementById("editExamName").value,
          title: document.getElementById("editExamTitle").value,
        }),
      });
      alert("Updated!");
      closeEditModal();
      fetchExams();
    } catch (err) {
      console.error("Error updating exam:", err);
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

  // On stream change, update course dropdown
  if (streamDropdown) {
    streamDropdown.addEventListener("change", function () {
      populateCourseDropdown(streamDropdown.value, courseDropdown);
    });
  }

  // Initialize all dropdowns
  async function initializeDropdowns() {
    console.log("Initializing dropdowns...");
    console.log("Stream dropdown element:", streamDropdown);
    console.log("Course dropdown element:", courseDropdown);
    console.log("Exam name dropdown element:", examNameDropdown);
    console.log("Exam level dropdown element:", examLevelDropdown);
    console.log("Exam type dropdown element:", examTypeDropdown);
    console.log("State dropdown element:", stateDropdown);

    if (streamDropdown) await populateStreamDropdown(streamDropdown);
    if (courseDropdown) await populateCourseDropdown(null, courseDropdown);
    if (examNameDropdown) await populateExamNameDropdown(examNameDropdown);
    if (examLevelDropdown) await populateExamLevelDropdown(examLevelDropdown);
    if (examTypeDropdown) await populateExamTypeDropdown(examTypeDropdown);
    if (stateDropdown) await populateStateDropdown(stateDropdown);
    console.log("All dropdowns initialized");
  }

  // Initialize dropdowns and fetch exams
  initializeDropdowns();
  fetchExams();
});
