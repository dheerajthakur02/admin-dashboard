<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>District Management</title>
  <link href="../style.css" rel="stylesheet" />
  <link href="../css/district.css" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
</head>
<body>
  <?php include '../components/header.php'; ?>
  <?php include '../components/sidebar.php'; ?>
      <div class="main page-transition">
        <?php
        $pageTitle = 'District Management';
        $breadcrumb = ['Home', 'Location Directory', 'District'];
        include '../components/breadcum.php';
        ?>
     
    <!-- District management content (form/list) -->
    <div class="main-container">
      <!-- District Form -->
      <div class="state-container" id="formDiv" style="display: none;">
        <h2 class="page-title">Add District</h2>
        <form id="districtForm" class="state-form" enctype="multipart/form-data">
          <div class="form-row">
            <div class="form-group" style="min-width: 250px;">
              <label>State Name:</label>
              <select name="state" id="districtStateDropdown" class="custom-select" required>
                <option value="">-- Select State --</option>
              </select>
            </div>
            <div class="form-group" style="min-width: 200px;">
              <label>District Name:</label>
              <input type="text" name="districtName" required placeholder="Enter district name" />
            </div>
          </div>
          <div class="form-actions">
            <button type="submit" class="btn btn-primary">Submit</button>
            <button type="button" onclick="document.getElementById('showListBtn').click()" class="btn btn-secondary">Cancel</button>
          </div>
        </form>
      </div>

      <!-- District List -->
      <div class="state-container" id="listDiv" style="display: block;">
        <div class="page-header">
          <h2 class="page-title">District List</h2>
          <div class="top-btns">
            <button id="showFormBtn" class="main-btn">
              <span>➕</span> Add Record
            </button>
            <button id="showListBtn" class="main-btn success">
              <span>📋</span> Record List
            </button>
          </div>
        </div>
        <div class="table-container">
          <table class="state-table">
            <thead>
              <tr>
                <th>#</th>
                <th>District Name</th>
                <th>State</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="districtTable"></tbody>
          </table>
        </div>
    
      </div>
      <!-- Edit District Modal -->
      <div id="editDistrictModal" class="modal">
        <div class="modal-content">
          <span id="closeEditDistrictModal" class="modal-close">&times;</span>
          <h2 class="modal-title">Edit District</h2>
          <form id="editDistrictForm" class="modal-form" enctype="multipart/form-data">
            <input type="hidden" name="id" id="editDistrictId" />
            <div class="form-group">
              <label>District Name:</label>
              <input type="text" name="districtName" id="editDistrictName" required />
            </div>
            <div class="form-group">
              <label>State:</label>
              <select name="state" id="editDistrictState" class="custom-select" required></select>
            </div>
            <div class="modal-actions">
              <button type="submit" class="btn btn-primary">Save</button>
              <button type="button" id="cancelEditDistrictBtn" class="btn btn-secondary">Cancel</button>
            </div>
          </form>
        </div>
      </div>
      <?php include '../components/footer.php'; ?>
    </div>
    <script src="../js/script.js"></script>
    <script src="../js/dashboard.js"></script>
    <script src="../js/common.js"></script>
    <script src="../js/pagination.js"></script>
    <script src="../js/district.js"></script>
  </body>
</html>