// Wait for DOM to load
window.addEventListener("DOMContentLoaded", function () {
  // Add Course button logic: show form, clear form, and scroll to it
  const showCourseFormBtn = document.getElementById("showCourseFormBtn");
  const showRecordListBtn = document.getElementById("showRecordListBtn");
  const courseFormDiv = document.getElementById("courseFormDiv");
  const courseListDiv = document.getElementById("courseListDiv");
  const courseTable = document.getElementById("courseTable");
  const courseForm = courseFormDiv ? courseFormDiv.querySelector("form") : null;

  let updateMode = false;
  let updateCourseId = null;

  // Helper function to populate dropdowns
  async function populateDropdown(url, selectId, valueKey, textKey) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(`populateDropdown for #${selectId} got:`, data);
      const select = document.getElementById(selectId);
      select.innerHTML = '<option value="">-- Select --</option>'; // Reset options
      // For streams: data.success && data.data (array)
      // For degrees: data.degrees (array)
      let items = [];
      if (Array.isArray(data.data)) {
        items = data.data;
      } else if (Array.isArray(data.degrees)) {
        items = data.degrees;
      }
      if (items.length === 0) {
        console.warn(`No items found for #${selectId}. Data:`, data);
      }
      items.forEach((item) => {
        const option = document.createElement("option");
        option.value = item[valueKey];
        option.textContent = item[textKey];
        select.appendChild(option);
      });
    } catch (error) {
      console.error(`Failed to load ${selectId}:`, error);
    }
  }

  // Fetch and display all courses in the table
  async function fetchAndDisplayCourses() {
    try {
      const res = await fetch("http://localhost:4000/api/course/all");
      const data = await res.json();
      const table = document.getElementById("courseTable");
      // Table header
      table.innerHTML = `<tr style="background:#22d3a7;color:#fff;font-weight:700;">
        <th>#</th>
        <th>Course Name</th>
        <th>Degree Type</th>
        <th>Stream Name</th>
        <th>Action</th>
      </tr>`;
      if (data && Array.isArray(data.courses) && data.courses.length > 0) {
        data.courses.forEach((course, idx) => {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${idx + 1}</td>
            <td>${course.name || ""}</td>
            <td>${course.degree?.name || ""}</td>
            <td>${course.stream?.name || ""}</td>
            <td>
              <button class="edit-btn" style="background:#2563eb;color:#fff;border:none;padding:6px 10px;border-radius:4px;margin-right:5px;cursor:pointer;" data-id="${
                course._id
              }"><i class="fa fa-pen-to-square"></i></button>
              <button class="delete-btn" style="background:#ef4444;color:#fff;border:none;padding:6px 10px;border-radius:4px;cursor:pointer;" data-id="${
                course._id
              }"><i class="fa fa-trash"></i></button>
            </td>
          `;
          table.appendChild(row);
        });
        // Attach event listeners for edit and delete
        document.querySelectorAll(".delete-btn").forEach((btn) => {
          btn.addEventListener("click", async function () {
            const id = this.getAttribute("data-id");
            if (confirm("Are you sure you want to delete this course?")) {
              await deleteCourse(id);
              await fetchAndDisplayCourses();
            }
          });
        });
        document.querySelectorAll(".edit-btn").forEach((btn) => {
          btn.addEventListener("click", function () {
            const id = this.getAttribute("data-id");
            editCourse(id);
          });
        });
      } else {
        // No records
        const row = document.createElement("tr");
        row.innerHTML = `<td colspan="5" style="text-align:center;">No records found</td>`;
        table.appendChild(row);
      }
    } catch (err) {
      console.error("Error fetching courses:", err);
    }
  }

  // Delete course by ID
  async function deleteCourse(id) {
    try {
      const res = await fetch(
        `http://localhost:4000/api/course/delete?id=${id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      alert(data.message || "Course deleted!");
    } catch (err) {
      alert("Failed to delete course.");
      console.error("Delete error:", err);
    }
  }

  // Edit course by ID (fetch and fill form)
  async function editCourse(id) {
    try {
      const res = await fetch(`http://localhost:4000/api/course/get?id=${id}`);
      const data = await res.json();
      if (!data.course) {
        alert("Course not found!");
        return;
      }
      const course = data.course;
      // Show form and fill values
      courseFormDiv.style.display = "block";
      courseListDiv.style.display = "none";
      courseForm.reset();
      document.getElementById("streamName").value = course.stream?._id || "";
      document.getElementById("degreeType").value = course.degree?._id || "";
      document.getElementById("courseName").value = course.name || "";
      document.getElementById("description").value = course.description || "";
      document.getElementById("admissionProcess").value =
        course.admissionProcess || "";
      document.getElementById("eligibilityCriteria").value =
        course.eligibilityCriteria || "";
      document.getElementById("entranceExams").value =
        course.entranceExams || "";
      document.getElementById("howToPrepare").value = course.howToPrepare || "";
      document.getElementById("courseIcon").value = course.courseIcon || "";
      document.getElementById("averageFee").value = course.averageFee || "";
      // Note: logo cannot be pre-filled for file input
      updateMode = true;
      updateCourseId = id;
      courseFormDiv.scrollIntoView({ behavior: "smooth" });
    } catch (err) {
      alert("Failed to fetch course for editing.");
      console.error("Edit fetch error:", err);
    }
  }

  if (showCourseFormBtn && courseFormDiv && courseForm && courseListDiv) {
    showCourseFormBtn.addEventListener("click", function () {
      courseFormDiv.style.display = "block";
      courseListDiv.style.display = "none";
      courseForm.reset();
      // Populate dropdowns
      populateDropdown(
        "http://localhost:4000/api/stream/all",
        "streamName",
        "_id",
        "name"
      );
      populateDropdown(
        "http://localhost:4000/api/degree/all",
        "degreeType",
        "_id",
        "name"
      );
      courseFormDiv.scrollIntoView({ behavior: "smooth" });
    });
  }

  if (showRecordListBtn && courseListDiv && courseFormDiv && courseTable) {
    showRecordListBtn.addEventListener("click", async function () {
      courseFormDiv.style.display = "none";
      courseListDiv.style.display = "block";
      await fetchAndDisplayCourses();
    });
  }

  // Form submission handler (AJAX)
  if (courseForm) {
    courseForm.onsubmit = async function (e) {
      e.preventDefault();
      const formData = new FormData(courseForm);
      try {
        if (updateMode && updateCourseId) {
          // Update course
          formData.append("id", updateCourseId);
          const response = await fetch(
            `http://localhost:4000/api/course/update?id=${updateCourseId}`,
            {
              method: "POST",
              body: formData,
            }
          );
          const result = await response.json();
          alert(result.message || "Course updated!");
          updateMode = false;
          updateCourseId = null;
        } else {
          // Add new course
          const response = await fetch("http://localhost:4000/api/course/add", {
            method: "POST",
            body: formData,
          });
          const result = await response.json();
          alert(result.message || "Course added!");
        }
        courseForm.reset();
        // Optionally hide the form or show a success message
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("Failed to submit course.");
      }
    };
  }
});
