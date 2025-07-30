<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Stream Management</title>
  <link href="../style.css" rel="stylesheet" />
  <link href="../css/stream.css" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
</head>
<body>
  <?php include '../components/header.php'; ?>
  <?php include '../components/sidebar.php'; ?>
      <div class="main page-transition">
        <?php
        $pageTitle = 'Stream Management';
        $breadcrumb = ['Home', 'Master Data', 'Stream'];
        include '../components/breadcum.php';
        ?>
     
    <!-- Stream management content (form/list) -->
    <div class="main-container">
      <!-- Stream Form -->
      <div class="state-container" id="formDiv" style="display: none;">
        <h2 class="page-title">Add Stream</h2>
        <form id="streamForm" class="state-form" enctype="multipart/form-data">
          <div class="form-row">
            <div class="form-group" style="min-width: 200px;">
              <label>Stream Name:</label>
              <input type="text" name="name" required placeholder="Enter stream name" />
            </div>
            <div class="form-group" style="min-width: 200px;">
              <label>Stream Logo:</label>
              <input type="file" name="logo" accept="image/*" />
            </div>
          </div>
          <div class="form-group">
            <label>About Stream:</label>
            <textarea name="about" required rows="4" placeholder="Enter stream description"></textarea>
          </div>
          <div class="section-block" id="section-initial-block">
            <label>Section Title</label>
            <input type="text" name="section_title[]" placeholder="Section Title">
            <label>Description</label>
            <textarea name="section_description[]" placeholder="Description"></textarea>
          </div>
          <div id="section-container"></div>
          <button type="button" class="add-section-btn">+ Add New Section</button>
          <div class="form-actions">
            <button type="submit" class="btn btn-primary">Submit</button>
            <button type="button" onclick="document.getElementById('showListBtn').click()" class="btn btn-secondary">Cancel</button>
          </div>
        </form>
      </div>

      <!-- Stream List -->
      <div class="state-container" id="listDiv" style="display: block;">
        <div class="page-header">
          <h2 class="page-title">Stream List</h2>
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
                <th>Stream Name</th>
                <th>Logo</th>
                <th>About</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="streamTable"></tbody>
          </table>
        </div>
      </div>

      <!-- Edit Stream Modal -->
      <div id="editStreamModal" class="modal">
        <div class="modal-content">
          <span id="closeEditStreamModal" class="modal-close">&times;</span>
          <h2 class="modal-title">Edit Stream</h2>
          <form id="editStreamForm" class="modal-form" enctype="multipart/form-data">
            <input type="hidden" name="id" id="editStreamId" />
            <div class="form-group">
              <label>Stream Name:</label>
              <input type="text" name="name" id="editStreamName" required />
            </div>
            <div class="form-group">
              <label>About Stream:</label>
              <textarea name="about" id="editStreamAbout" required rows="3"></textarea>
            </div>
            <div class="form-group">
              <label>Stream Logo:</label>
              <input type="file" name="logo" id="editStreamLogo" accept="image/*" />
            </div>
            <div class="modal-actions">
              <button type="submit" class="btn btn-primary">Save</button>
              <button type="button" id="cancelEditStreamBtn" class="btn btn-secondary">Cancel</button>
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
    <script src="../js/stream.js"></script>
  </body>
</html> 