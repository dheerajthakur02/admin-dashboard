<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>State Management</title>
  <link href="../style.css" rel="stylesheet" />
  <link href="../css/state.css" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
</head>
<body>
  <?php include '../components/header.php'; ?>
  <?php include '../components/sidebar.php'; ?>
      <div class="main page-transition">
        <?php
        $pageTitle = 'State Management';
        $breadcrumb = ['Home', 'Location Directory', 'State'];
        include '../components/breadcum.php';
        ?>
     
    <!-- State management content (form/list) -->
    <div class="main-container">
      <!-- State Form -->
      <div class="state-container" id="formDiv" style="display: none;">
        <h2 class="page-title">Add State</h2>
        <form id="stateForm" class="state-form" enctype="multipart/form-data">
          <div class="form-row">
            <div class="form-group" style="min-width: 200px;">
              <label>State Name:</label>
              <input type="text" name="name" required placeholder="Enter state name" />
            </div>
            <div class="form-group" style="min-width: 200px;">
              <label>State Code:</label>
              <input type="text" name="code" required placeholder="e.g., BR, UP, GJ" />
            </div>
          </div>
          <div class="form-group">
            <label>Description:</label>
            <textarea name="description" required rows="4" placeholder="Enter state description"></textarea>
          </div>
          <div class="form-row">
            <div class="form-group" style="min-width: 250px;">
              <label>State Logo:</label>
              <input type="file" name="logo" accept="image/*" />
            </div>
            <div class="form-group" style="min-width: 250px;">
              <label>State Map:</label>
              <input type="file" name="flag" accept="image/*" />
            </div>
          </div>
          <div class="form-actions">
            <button type="submit" class="btn btn-primary">Submit</button>
            <button type="button" onclick="document.getElementById('showListBtn').click()" class="btn btn-secondary">Cancel</button>
          </div>
        </form>
      </div>

      <!-- State List -->
      <div class="state-container" id="listDiv" style="display: block;">
        <div class="page-header">
          <h2 class="page-title">State List</h2>
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
                <th>State Name</th>
                <th>State Code</th>
                <th>Logo</th>
                <th>Map</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="stateTable"></tbody>
          </table>
        </div>
    
      </div>
      <!-- Edit State Modal -->
      <div id="editStateModal" class="modal">
        <div class="modal-content">
          <span id="closeEditStateModal" class="modal-close">&times;</span>
          <h2 class="modal-title">Edit State</h2>
          <form id="editStateForm" class="modal-form" enctype="multipart/form-data">
            <input type="hidden" name="id" id="editStateId" />
            <div class="form-group">
              <label>State Name:</label>
              <input type="text" name="name" id="editStateName" required />
            </div>
            <div class="form-group">
              <label>State Code:</label>
              <input type="text" name="code" id="editStateCode" required />
            </div>
            <div class="form-group">
              <label>Description:</label>
              <textarea name="description" id="editStateDescription" required rows="3"></textarea>
            </div>
            <div class="form-group">
              <label>State Logo:</label>
              <input type="file" name="logo" id="editStateLogo" accept="image/*" />
            </div>
            <div class="form-group">
              <label>State Map:</label>
              <input type="file" name="flag" id="editStateFlag" accept="image/*" />
            </div>
            <div class="modal-actions">
              <button type="submit" class="btn btn-primary">Save</button>
              <button type="button" id="cancelEditStateBtn" class="btn btn-secondary">Cancel</button>
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
    <script src="../js/state.js"></script>
  </body>
</html>