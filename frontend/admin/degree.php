<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Degree Management</title>
  <link href="../style.css" rel="stylesheet" />
  <link href="../css/degree.css" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
</head>
<body>
  <?php include '../components/header.php'; ?>
  <?php include '../components/sidebar.php'; ?>
      <div class="main page-transition">
        <?php
        $pageTitle = 'Degree Management';
        $breadcrumb = ['Home', 'Master Data', 'Degree'];
        include '../components/breadcum.php';
        ?>
     
    <!-- Degree management content (form/list) -->
    <div class="main-container">
      <!-- Degree Form -->
      <div class="state-container" id="formDiv" style="display: none;">
        <h2 class="page-title">Add Degree</h2>
        <form id="degreeForm" class="state-form" enctype="multipart/form-data">
          <div class="form-row">
            <div class="form-group" style="min-width: 200px;">
              <label>Degree Name:</label>
              <input type="text" name="name" required placeholder="Enter degree name" />
            </div>
          </div>
          <div class="form-actions">
            <button type="submit" class="btn btn-primary">Submit</button>
            <button type="button" onclick="document.getElementById('showListBtn').click()" class="btn btn-secondary">Cancel</button>
          </div>
        </form>
      </div>

      <!-- Degree List -->
      <div class="state-container" id="listDiv" style="display: block;">
        <div class="page-header">
          <h2 class="page-title">Degree List</h2>
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
                <th>Degree Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="degreeTable"></tbody>
          </table>
        </div>
      </div>

      <!-- Edit Degree Modal -->
      <div id="editDegreeModal" class="modal">
        <div class="modal-content">
          <span id="closeEditDegreeModal" class="modal-close">&times;</span>
          <h2 class="modal-title">Edit Degree</h2>
          <form id="editDegreeForm" class="modal-form" enctype="multipart/form-data">
            <input type="hidden" name="id" id="editDegreeId" />
            <div class="form-group">
              <label>Degree Name:</label>
              <input type="text" name="name" id="editDegreeName" required />
            </div>
            <div class="modal-actions">
              <button type="submit" class="btn btn-primary">Save</button>
              <button type="button" id="cancelEditDegreeBtn" class="btn btn-secondary">Cancel</button>
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
    <script src="../js/degree.js"></script>
  </body>
</html> 