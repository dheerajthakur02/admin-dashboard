document.addEventListener("DOMContentLoaded", function () {
  const baseUrl = window.baseUrl || "http://localhost:4000/api";
  const tableBody = document.getElementById("dataDisplayTable");

  function renderTable(colleges) {
    if (!Array.isArray(colleges) || colleges.length === 0) {
      tableBody.innerHTML =
        '<tr><td colspan="14" style="text-align:center; color:#9ca3af;">No data found</td></tr>';
      return;
    }
    tableBody.innerHTML = colleges
      .map(
        (c, i) => `
      <tr>
        <td>${i + 1}</td>
        <td>${c.name || ""}</td>
        <td>${c.estd || ""}</td>
        <td>${c.affiliation || ""}</td>
        <td>${c.approved || ""}</td>
        <td>${c.stream || ""}</td>
        <td>${c.course || ""}</td>
        <td>${
          c.collegeLogo
            ? `<img src='/${c.collegeLogo}' style='max-width:40px;max-height:40px;border-radius:6px;' />`
            : ""
        }</td>
        <td>${c.address || ""}</td>
        <td>${c.state || ""}</td>
        <td>${c.district || ""}</td>
        <td>${c.phone || ""}</td>
        <td>${c.email || ""}</td>
        <td>${
          c.website
            ? `<a href='${c.website}' target='_blank'>${c.website}</a>`
            : ""
        }</td>
      </tr>
    `
      )
      .join("");
  }

  async function fetchColleges() {
    try {
      const data = await apiRequest(`${baseUrl}/college/all-colleges`);
      renderTable(data);
    } catch (err) {
      tableBody.innerHTML =
        '<tr><td colspan="14" style="text-align:center; color:#ef4444;">Failed to load data</td></tr>';
    }
  }

  fetchColleges();
});
