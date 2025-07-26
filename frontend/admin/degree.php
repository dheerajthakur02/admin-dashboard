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
        $pageTitle = 'Degree Type';
        $breadcrumb = ['Home', 'Master Data', 'Degree'];
        include '../components/breadcum.php';
      ?>
    <div class="main-container">
      <div class="degree-container">
        <form class="degree-form">
          <label for="degreeName">Degree Type Name :</label>
          <input type="text" id="degreeName" name="degreeName" class="degree-input" placeholder="Enter degree type name" />
          <button type="submit" class="degree-submit" id="degreeSubmit">Submit</button>
          <button type="button" class="degree-submit" id="degreeUpdate" style="display:none;">Update</button>
          <button type="button" class="degree-submit" id="degreeBack" style="display:none;">Back</button>
        </form>
        <table class="degree-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Degree Type Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <!-- Degrees will be loaded here by JS -->
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <script src="../js/stream.js"></script>
  <script src="../js/degree.js"></script>
  <script src="../js/common.js"></script>
</body>
</html> 