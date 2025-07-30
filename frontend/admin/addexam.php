<?php
$pageFor = isset($_GET['type']) && $_GET['type'] == 'list' ? 'list' : 'add';
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Exam Management</title>
  <link href="../style.css" rel="stylesheet" />
  <link href="../css/addexam.css" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
</head>
<body>
  <?php include '../components/header.php'; ?>
  <?php include '../components/sidebar.php'; ?>
      <div class="main page-transition">
      <?php
      $pageTitle = 'Add Exam';
      $breadcrumb = ['Home', 'Exam Master', 'Add Exam'];
      include '../components/breadcum.php';
      ?>
    <!-- Country management content (form/list) -->
    <div class="main-container" style="max-width: 1200px; margin: 0 auto;">
      <div class="top-btns">
        <button id="showFormBtn" class="main-btn">
          <span>➕</span> Add Record
        </button>
        <button id="showListBtn" class="main-btn success">
          <span>📋</span> Record List
        </button>
      </div>
      <div id="examFormDiv" style="display: <?= $pageFor == 'add' ? 'block' : 'none'; ?>;">
        <form id="addExamForm" class="exam-form" enctype="multipart/form-data">
          <div class="form-row">
            <div class="form-group">
              <label>Stream *</label>
              <select name="stream" required>
                <option value="">-- Select --</option>
              </select>
            </div>
            <div class="form-group">
              <label>Course Name :</label>
              <select name="course">
                <option value="">-- Select --</option>
              </select>
            </div>
            <div class="form-group">
              <label>Exam Name *</label>
              <select name="examName" required>
                <option value="">-- Select --</option>
              </select>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group" style="flex: 2;">
              <label>Title :</label>
              <input type="text" name="title" />
            </div>
            <div class="form-group" style="min-width: 180px;">
              <label>Display Rank (Optional):</label>
              <input type="number" name="displayRank" min="0" value="0" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>No of Application :</label>
              <input type="text" name="noOfApplication" />
            </div>
            <div class="form-group">
              <label>Purpose :</label>
              <input type="text" name="purpose" />
            </div>
            <div class="form-group" style="min-width: 180px;">
              <label>Application Fee :</label>
              <input type="number" name="applicationFee" min="0" value="0" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group" style="min-width: 200px;">
              <label>Application Date :</label>
              <input type="date" name="applicationDate" />
            </div>
            <div class="form-group" style="min-width: 200px;">
              <label>Exam Date :</label>
              <input type="date" name="examDate" />
            </div>
            <div class="form-group" style="min-width: 200px;">
              <label>Result Date :</label>
              <input type="date" name="resultDate" />
            </div>
            <div class="form-group" style="min-width: 200px;">
              <label>Exam Level * :</label>
              <select name="examLevel" required>
                <option value="">-- Select --</option>
              </select>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group" style="min-width: 200px;">
              <label>Exam Type :</label>
              <select name="examType">
                <option value="">-- Select --</option>
              </select>
            </div>
            <div class="form-group" style="min-width: 200px;">
              <label>State * :</label>
              <select name="state" required>
                <option value="">-- Select --</option>
              </select>
            </div>
            <div class="form-group" style="min-width: 200px;">
              <label>Upload Logo :</label>
              <input type="file" name="logo" accept="image/*" />
            </div>
            <div class="form-group" style="min-width: 200px;">
              <label>Upload PDF :</label>
              <input type="file" name="pdf" accept="application/pdf" />
            </div>
          </div>
          <div class="form-actions">
            <button type="submit" class="btn btn-primary">Submit</button>
            <button type="reset" class="btn btn-secondary">Reset</button>
          </div>
        </form>
      </div>
      <div id="examListDiv" style="display: <?= $pageFor == 'list' ? 'block' : 'none'; ?>;">
        <h2 style="margin-top: 0; color: #2563eb; font-size: 1.8rem; margin-bottom: 24px;">Exam List</h2>
        <div style="overflow-x: auto;">
          <table class="exam-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Stream</th>
                <th>Course Name</th>
                <th>Exam Name</th>
                <th>Exam Title</th>
                <th style="text-align: center;">Action</th>
              </tr>
            </thead>
            <tbody id="examTable"></tbody>
          </table>
        </div>
      </div>
    </div>

<!-- Edit Exam Modal -->
<div id="editExamModal" class="modal">
  <div class="modal-content">
    <span id="closeEditExamModal" class="modal-close">&times;</span>
    <h2 class="modal-title">Edit Exam</h2>
    <form id="editExamForm" class="modal-form">
      <div class="form-group">
        <label>Stream:</label>
        <input type="text" id="editDepartment" name="stream" required />
      </div>
      <div class="form-group">
        <label>Course Name:</label>
        <input type="text" id="editCourse" name="course" required />
      </div>
      <div class="form-group">
        <label>Exam Name:</label>
        <input type="text" id="editExamName" name="examName" required />
      </div>
      <div class="form-group">
        <label>Exam Title:</label>
        <input type="text" id="editExamTitle" name="title" required />
      </div>
      <div class="modal-actions">
        <button type="submit" class="btn btn-primary">Save</button>
        <button type="button" id="cancelEditExamBtn" class="btn btn-secondary">Cancel</button>
      </div>
    </form>
  </div>
</div>

<!-- JS Scripts -->
<script src="../js/common.js"></script>
<script src="../js/addexam.js"></script>
</body>
</html>