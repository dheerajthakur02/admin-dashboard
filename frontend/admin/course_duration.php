<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Master Data Stream</title>
  <link href="../style.css" rel="stylesheet" />
  <link href="../css/stream.css" rel="stylesheet">
  <link href="../css/degree.css" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
</head>
<body>
  <?php include '../components/header.php'; ?>
  <?php include '../components/sidebar.php'; ?>
  <div class="main page-transition">
    <?php
        $pageTitle = 'Duration Type';
        $breadcrumb = ['Home', 'Master Data', 'Course Duration'];
        include '../components/breadcum.php';
      ?>
    <div class="main-container">
      <div class="degree-container">
        <form class="degree-form">
          <label for="courseDuration">Course Duration :</label>
          <input type="text" id="courseDuration" name="courseDuration" class="degree-input" placeholder="Enter course duration (e.g., 1 Year, 6 Months)" />
          <button type="submit" class="degree-submit" id="courseDurationSubmit">Submit</button>
          <button type="button" class="degree-submit" id="courseDurationUpdate" style="display:none;">Update</button>
          <button type="button" class="degree-submit" id="courseDurationBack" style="display:none;">Back</button>
        </form>
        <table class="degree-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Course Duration</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <!-- Course durations will be loaded here by JS -->
          </tbody>
        </table>
      </div>
    </div>
  </div>
 <script src="../js/course_duration.js"></script>
</body>
</html> 