<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Master Data Stream</title>
  <link href="../style.css" rel="stylesheet" />
  <link href="../css/stream.css" rel="stylesheet">
  <link href="../css/course.css" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
</head>
<body>
  <?php include '../components/header.php'; ?>
  <?php include '../components/sidebar.php'; ?>
  <div class="main page-transition">
    <?php
        $pageTitle = 'Course Type';
        $breadcrumb = ['Home', 'Master Data', 'Course'];
        include '../components/breadcum.php';
      ?>
    <div class="main-container course-container">
      <div class="top-actions">
        <button id="showCourseFormBtn" class="action-btn"><i class="fa fa-plus"></i> Add Record</button>
        <button id="showRecordListBtn" class="action-btn"><i class="fa fa-list"></i> Record List</button>
      </div>
      <div id="courseFormDiv" class="form-section" style="display:none;">
        <form class="course-form">
          <div class="form-row">
            <div class="form-group">
              <label for="streamName">Stream Name* :</label>
              <select id="streamName" name="stream" required>
                <option value="">-- Select --</option>
                <!-- Options loaded dynamically -->
              </select>
            </div>
            <div class="form-group">
              <label for="degreeType">Degree Type* :</label>
              <select id="degreeType" name="degree" required>
                <option value="">-- Select --</option>
                <!-- Options loaded dynamically -->
              </select>
            </div>
            <div class="form-group">
              <label for="courseName">Course Name* :</label>
              <input type="text" id="courseName" name="name" placeholder="Enter course name" required>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="logo">Course Logo :</label>
              <input id="logo" name="logo" type="file">
            </div>
            <div class="form-group">
              <label for="courseIcon">Course Icon (Fa Icon) :</label>
              <input id="courseIcon" name="courseIcon" type="text" placeholder="e.g. fa-book">
            </div>
            <div class="form-group">
              <label for="averageFee">Average Fee * :</label>
              <input id="averageFee" name="averageFee" type="text" required>
            </div>
          </div>
          <div class="form-group full-width">
            <label for="description">Description * :</label>
            <textarea id="description" name="description" required></textarea>
          </div>
          <div class="form-group full-width">
            <label for="admissionProcess">Admission Process * :</label>
            <textarea id="admissionProcess" name="admissionProcess" required></textarea>
          </div>
          <div class="form-group full-width">
            <label for="eligibilityCriteria">Eligibility Criteria * :</label>
            <textarea id="eligibilityCriteria" name="eligibilityCriteria" required></textarea>
          </div>
          <div class="form-group full-width">
            <label for="entranceExams">Entrance Exams Details * :</label>
            <textarea id="entranceExams" name="entranceExams" required></textarea>
          </div>
          <div class="form-group full-width">
            <label for="howToPrepare">How to Prepare * :</label>
            <textarea id="howToPrepare" name="howToPrepare" required></textarea>
          </div>
          <div class="form-actions">
            <button type="submit" class="submit-btn">Submit</button>
            <button type="button" class="submit-btn cancel-btn">Cancel</button>
          </div>
        </form>
      </div>
      <div id="courseListDiv" style="display:none;">
        <table id="courseTable" class="record-table">
        </table>
      </div>
    </div>
    <?php include '../components/footer.php'; ?>
  </div>
  <script src="../js/course.js"></script>
  <script src="../js/common.js"></script>
 
</body>
</html> 