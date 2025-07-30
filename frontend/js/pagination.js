// Simple Pagination System - New Version
class SimplePagination {
  constructor(options = {}) {
    this.container = options.container || null;
    this.data = options.data || [];
    this.itemsPerPage = options.itemsPerPage || 10;
    this.currentPage = 1;
    this.onPageChange = options.onPageChange || (() => {});
    this.renderFunction = options.renderFunction || this.defaultRender;
    this.totalPages = Math.ceil(this.data.length / this.itemsPerPage);

    this.init();
  }

  // Default render function for states
  defaultRender(data, startIndex) {
    if (!this.container) return;

    this.container.innerHTML = data
      .map((item, index) => {
        const globalIndex = startIndex + index;
        return `
          <tr>
            <td>${globalIndex + 1}</td>
            <td>${item.name || ""}</td>
            <td class="state-code">${item.code || ""}</td>
            <td class="image-cell">
              ${
                item.logo
                  ? `<img src="http://localhost:4000/${item.logo}" alt="logo" class="state-logo" />`
                  : '<span class="no-image">N/A</span>'
              }
            </td>
            <td class="image-cell">
              ${
                item.flag
                  ? `<img src="http://localhost:4000/${item.flag}" alt="map" class="state-map" />`
                  : '<span class="no-image">N/A</span>'
              }
            </td>
            <td class="action-buttons">
              <button class="edit-state-btn" data-id="${
                item._id
              }"><i class="fa fa-edit"></i></button>
              <button class="delete-state-btn" data-id="${
                item._id
              }"><i class="fa fa-trash"></i></button>
            </td>
          </tr>
        `;
      })
      .join("");
  }

  getCurrentPageData() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.data.slice(start, end);
  }

  renderTable() {
    const currentData = this.getCurrentPageData();
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.renderFunction(currentData, startIndex);
  }

  createPaginationHTML() {
    const totalItems = this.data.length;
    const startItem =
      totalItems === 0 ? 0 : (this.currentPage - 1) * this.itemsPerPage + 1;
    const endItem = Math.min(this.currentPage * this.itemsPerPage, totalItems);

    let html = `
      <div class="pagination-info">
        Showing ${startItem} to ${endItem} of ${totalItems} entries
      </div>
      <div class="pagination-controls">
    `;

    // Previous button
    const prevDisabled = this.currentPage === 1 ? "disabled" : "";
    html += `<button class="pagination-btn prev-btn ${prevDisabled}" ${prevDisabled}>Previous</button>`;

    // Page numbers
    for (let i = 1; i <= this.totalPages; i++) {
      const activeClass = i === this.currentPage ? "active" : "";
      html += `<button class="pagination-btn page-btn ${activeClass}" data-page="${i}">${i}</button>`;
    }

    // Next button
    const nextDisabled = this.currentPage === this.totalPages ? "disabled" : "";
    html += `<button class="pagination-btn next-btn ${nextDisabled}" ${nextDisabled}>Next</button>`;

    html += "</div>";
    return html;
  }

  renderPagination() {
    const paginationContainer = document.getElementById("pagination-container");
    if (!paginationContainer) {
      console.error("Pagination container not found!");
      return;
    }

    paginationContainer.innerHTML = this.createPaginationHTML();
    this.attachEventListeners();
  }

  attachEventListeners() {
    const paginationContainer = document.getElementById("pagination-container");
    if (!paginationContainer) return;

    // Previous button
    const prevBtn = paginationContainer.querySelector(".prev-btn");
    if (prevBtn && !prevBtn.hasAttribute("disabled")) {
      prevBtn.onclick = () => {
        if (this.currentPage > 1) {
          this.goToPage(this.currentPage - 1);
        }
      };
    }

    // Next button
    const nextBtn = paginationContainer.querySelector(".next-btn");
    if (nextBtn && !nextBtn.hasAttribute("disabled")) {
      nextBtn.onclick = () => {
        if (this.currentPage < this.totalPages) {
          this.goToPage(this.currentPage + 1);
        }
      };
    }

    // Page number buttons
    const pageBtns = paginationContainer.querySelectorAll(".page-btn");
    pageBtns.forEach((btn) => {
      btn.onclick = () => {
        const page = parseInt(btn.getAttribute("data-page"));
        if (page && page !== this.currentPage) {
          this.goToPage(page);
        }
      };
    });
  }

  goToPage(page) {
    if (page < 1 || page > this.totalPages || page === this.currentPage) {
      return;
    }

    this.currentPage = page;
    this.renderTable();
    this.renderPagination();
    this.onPageChange(this.getCurrentPageData(), this.currentPage);
  }

  updateData(newData) {
    this.data = newData || [];
    this.totalPages = Math.ceil(this.data.length / this.itemsPerPage);
    this.currentPage = Math.min(this.currentPage, this.totalPages || 1);
    this.renderTable();
    this.renderPagination();
  }

  init() {
    if (this.data.length === 0) {
      if (this.container) {
        this.container.innerHTML =
          '<tr><td colspan="6" style="text-align:center; color:#9ca3af;">No data found</td></tr>';
      }

      const paginationContainer = document.getElementById(
        "pagination-container"
      );
      if (paginationContainer) {
        paginationContainer.innerHTML = `
          <div class="pagination-info">Showing 0 to 0 of 0 entries</div>
          <div class="pagination-controls">
            <button class="pagination-btn prev-btn" disabled>Previous</button>
            <button class="pagination-btn next-btn" disabled>Next</button>
          </div>
        `;
      }
      return;
    }

    this.renderTable();
    this.renderPagination();
    window.currentPagination = this;
  }
}

// Helper function to initialize pagination
function initPagination(options) {
  return new SimplePagination(options);
}

// Export for global use
window.SimplePagination = SimplePagination;
window.initPagination = initPagination;
