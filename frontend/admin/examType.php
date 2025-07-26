<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Master Data Stream</title>
  <link href="../style.css" rel="stylesheet" />
  <link href="../css/examType.css" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
</head>
<body>
  <?php include '../components/header.php'; ?>
  <?php include '../components/sidebar.php'; ?>
  <div class="main page-transition">
    <?php
        $pageTitle = 'Exam Type';
        $breadcrumb = ['Home', 'Master Data', 'Exam Type'];
        include '../components/breadcum.php';
      ?>
    <div class="main-container">
      <div class="degree-container">
        <form class="degree-form">
          <label for="examShortName">Exam Body Name:</label>
          <input type="text" id="examShortName" name="examShortName" class="degree-input" placeholder="Short Name" />
          <input type="text" id="examFullName" name="examFullName" class="degree-input" placeholder="Full Name" />
          <button type="submit" class="degree-submit" id="examSubmit">Submit</button>
          <button type="button" class="degree-submit" id="examUpdate" style="display:none;">Update</button>
          <button type="button" class="degree-submit" id="examBack" style="display:none;">Back</button>
        </form>
        <table class="degree-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Exam Body Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <!-- Exam bodies will be loaded here by JS -->
          </tbody>
        </table>
      </div>
    </div>
  </div>
 <script src="../js/examType.js"></script>
 <script src="../js/common.js"></script>
</body>
</html> 