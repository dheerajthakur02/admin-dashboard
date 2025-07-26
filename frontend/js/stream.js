// Wait for DOM to load
window.addEventListener("DOMContentLoaded", function () {
  // Add Stream button logic: show form, clear form, and scroll to it
  const showStreamFormBtn = document.getElementById("showStreamFormBtn");
  const showRecordListBtn = document.getElementById("showRecordListBtn");
  const streamFormDiv = document.getElementById("streamFormDiv");
  const streamListDiv = document.getElementById("streamListDiv");
  const streamTable = document.getElementById("streamTable");
  const streamForm = streamFormDiv ? streamFormDiv.querySelector("form") : null;

  if (showStreamFormBtn && streamFormDiv && streamForm && streamListDiv) {
    showStreamFormBtn.addEventListener("click", function () {
      streamFormDiv.style.display = "block";
      streamListDiv.style.display = "none";
      streamForm.reset();
      streamFormDiv.scrollIntoView({ behavior: "smooth" });
    });
  }

  if (showRecordListBtn && streamListDiv && streamFormDiv && streamTable) {
    showRecordListBtn.addEventListener("click", async function () {
      streamFormDiv.style.display = "none";
      streamListDiv.style.display = "block";
      streamTable.innerHTML = `<tr style="background:#22d3a7;color:#fff;font-weight:700;"><th>#</th><th>Logo</th><th>Stream Name</th><th>About</th><th>Action</th></tr>`;
      try {
        const res = await fetch("http://localhost:4000/api/stream/all");
        const result = await res.json();
        if (result.success) {
          result.data.forEach((stream, idx) => {
            streamTable.innerHTML += `
              <tr>
                <td>${idx + 1}</td>
                <td>${
                  stream.logo
                    ? `<img src="http://localhost:4000/${stream.logo}" alt="logo" style="width:50px;height:50px;object-fit:cover;border-radius:6px;" />`
                    : ""
                }</td>
                <td>${stream.name}</td>
                <td>
                  <b>${
                    stream.about ? stream.about.split(".")[0] + "." : ""
                  }</b><br>
                  ${
                    stream.about
                      ? stream.about.substring(
                          stream.about.indexOf(".") + 1,
                          60
                        ) + "..."
                      : ""
                  }
                </td>
                <td><button class="edit-btn" data-id="${
                  stream._id
                }" style="background:#2563eb;color:#fff;border:none;border-radius:6px;padding:6px 12px;cursor:pointer;"><i class="fa fa-edit"></i></button></td>
              </tr>
            `;
          });
        } else {
          streamTable.innerHTML += `<tr><td colspan='5'>No records found.</td></tr>`;
        }
      } catch (err) {
        streamTable.innerHTML += `<tr><td colspan='5'>Failed to load records.</td></tr>`;
      }
    });
  }

  const addSectionBtn = document.querySelector(".add-section-btn");
  const sectionContainer = document.getElementById("section-container");

  if (addSectionBtn && sectionContainer) {
    addSectionBtn.addEventListener("click", function (e) {
      e.preventDefault();
      // Create a new section block
      const sectionDiv = document.createElement("div");
      sectionDiv.className = "section-block";
      sectionDiv.innerHTML = `
        <label>Section Title</label>
        <input type="text" name="section_title[]" placeholder="Section Title">
        <label>Description</label>
        <textarea name="section_description[]" placeholder="Description"></textarea>
        <button type="button" class="delete-section-btn">Delete</button>
      `;
      sectionContainer.appendChild(sectionDiv);
    });
  }

  // Event delegation for delete buttons
  if (sectionContainer) {
    sectionContainer.addEventListener("click", function (e) {
      if (e.target.classList.contains("delete-section-btn")) {
        e.preventDefault();
        const sectionDiv = e.target.closest(".section-block");
        if (sectionDiv) sectionDiv.remove();
      }
    });
  }

  // Form submission handler (AJAX)
  if (streamForm) {
    streamForm.onsubmit = async function (e) {
      e.preventDefault();
      const formData = new FormData(streamForm);
      try {
        const response = await fetch(
          "http://localhost:4000/api/stream/add-stream",
          {
            method: "POST",
            body: formData,
          }
        );
        const result = await response.json();
        alert(result.message || "Stream added!");
        streamForm.reset();
        // Optionally hide the form or show a success message
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("Failed to submit stream.");
      }
    };
  }
});
